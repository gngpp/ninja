use std::time::Duration;

use futures_util::StreamExt;
use reqwest::{
    browser,
    header::{HeaderMap, HeaderValue},
    Proxy, StatusCode,
};
use serde::{de::DeserializeOwned, Serialize};
use tokio::sync::RwLock;

use super::{
    models::{req, resp},
    ApiError, ApiResult, PostConvoStreamResponse, RequestMethod, HEADER_UA, URL_CHATGPT_BACKEND,
    URL_CHATGPT_PUBLIC,
};

pub struct OpenGPT {
    api_prefix: String,
    client: reqwest::Client,
    access_token: RwLock<String>,
}

impl OpenGPT {
    async fn request<U>(&self, url: String, method: RequestMethod) -> ApiResult<U>
    where
        U: DeserializeOwned,
    {
        let token = self.access_token.read().await;
        let resp = match method {
            RequestMethod::GET => self.client.get(&url),
            RequestMethod::POST => self.client.post(&url),
            RequestMethod::PATCH => self.client.patch(&url),
            RequestMethod::PUT => self.client.put(&url),
            RequestMethod::DELETE => self.client.delete(&url),
        }
        .bearer_auth(token)
        .send()
        .await?;
        self.response_handle(resp).await
    }

    async fn request_payload<T, U>(
        &self,
        url: String,
        method: RequestMethod,
        payload: &T,
    ) -> ApiResult<U>
    where
        T: Serialize + ?Sized,
        U: DeserializeOwned,
    {
        let token = self.access_token.read().await;
        let resp = match method {
            RequestMethod::POST => self.client.post(&url),
            RequestMethod::PATCH => self.client.patch(&url),
            RequestMethod::PUT => self.client.put(&url),
            RequestMethod::DELETE => self.client.delete(&url),
            _ => {
                return Err(ApiError::FailedRequestError(
                    "not supported method".to_owned(),
                ))
            }
        }
        .bearer_auth(token)
        .json(payload)
        .send()
        .await?;
        self.response_handle::<U>(resp).await
    }

    async fn response_handle<U: DeserializeOwned>(&self, resp: reqwest::Response) -> ApiResult<U> {
        match resp.error_for_status_ref() {
            Ok(_) => Ok(resp
                .json::<U>()
                .await
                .map_err(ApiError::JsonReqwestDeserializeError)?),
            Err(err) => Err(self.err_handle(err, resp).await?),
        }
    }

    async fn err_handle(
        &self,
        err: reqwest::Error,
        resp: reqwest::Response,
    ) -> ApiResult<ApiError> {
        let url = resp.url().clone();
        let err_msg = format!("error: {}, url: {}", resp.text().await?, url);
        match err.status() {
                Some(
                    status_code
                    @
                    // 4xx
                    (StatusCode::UNAUTHORIZED
                    | StatusCode::REQUEST_TIMEOUT
                    | StatusCode::TOO_MANY_REQUESTS
                    | StatusCode::BAD_REQUEST
                    | StatusCode::PAYMENT_REQUIRED
                    | StatusCode::FORBIDDEN
                    // 5xx
                    | StatusCode::INTERNAL_SERVER_ERROR
                    | StatusCode::BAD_GATEWAY
                    | StatusCode::SERVICE_UNAVAILABLE
                    | StatusCode::GATEWAY_TIMEOUT),
                ) => {
                    if status_code == StatusCode::UNAUTHORIZED {
                        return Ok(ApiError::BadAuthenticationError(err_msg))
                    }
                    if status_code == StatusCode::TOO_MANY_REQUESTS {
                        return Ok(ApiError::TooManyRequestsError(err_msg))
                    }
                    if status_code.is_client_error() {
                        return Ok(ApiError::BadRequestError(err_msg))
                    }
                    Ok(ApiError::ServerError)
                },
                _ => Ok(ApiError::FailedRequestError(err_msg)),
            }
    }
}

impl OpenGPT {
    pub async fn get_models(&self) -> ApiResult<resp::GetModelsResponse> {
        self.request(format!("{URL_CHATGPT_BACKEND}/models"), RequestMethod::GET)
            .await
    }

    pub async fn get_account_check(&self) -> ApiResult<resp::GetAccountsCheckResponse> {
        self.request(
            format!("{URL_CHATGPT_BACKEND}/accounts/check"),
            RequestMethod::GET,
        )
        .await
    }

    pub async fn get_account_check_4(&self) -> ApiResult<resp::GetAccountsCheckV4Response> {
        self.request(
            format!("{URL_CHATGPT_BACKEND}/accounts/check/v4-2023-04-27"),
            RequestMethod::GET,
        )
        .await
    }

    pub async fn get_conversation<'a>(
        &self,
        req: req::GetConvoRequest<'a>,
    ) -> ApiResult<resp::GetConvoResonse> {
        match req.conversation_id {
            Some(conversation_id) => {
                self.request::<resp::GetConvoResonse>(
                    format!("{URL_CHATGPT_BACKEND}/conversation/{conversation_id}"),
                    RequestMethod::GET,
                )
                .await
            }
            None => Err(ApiError::RequiredParameter("conversation_id".to_string())),
        }
    }

    pub async fn get_conversations<'a>(
        &self,
        req: req::GetConvoRequest<'a>,
    ) -> ApiResult<resp::GetConvosResponse> {
        self.request::<resp::GetConvosResponse>(
            format!(
                "{URL_CHATGPT_BACKEND}/conversations?offset={}&limit={}&order=updated",
                req.offset, req.limit
            ),
            RequestMethod::GET,
        )
        .await
    }

    pub async fn post_conversation<'a>(
        &self,
        req: req::PostConvoRequest<'a>,
    ) -> ApiResult<PostConvoStreamResponse> {
        let url = format!("{URL_CHATGPT_BACKEND}/conversation");
        let resp = self
            .client
            .post(url)
            .bearer_auth(&self.access_token.read().await)
            .json(&req)
            .send()
            .await?;
        match resp.error_for_status_ref() {
            Ok(_) => Ok(PostConvoStreamResponse::new(Box::pin(resp.bytes_stream()))),
            Err(err) => Err(self.err_handle(err, resp).await?),
        }
    }

    pub async fn post_conversation_completions<'a>(
        &self,
        req: req::PostConvoRequest<'a>,
    ) -> ApiResult<Vec<resp::PostConvoResponse>> {
        let url = format!("{URL_CHATGPT_BACKEND}/conversation");
        let resp = self
            .client
            .post(url)
            .bearer_auth(&self.access_token.read().await)
            .json(&req)
            .send()
            .await?;

        match resp.error_for_status_ref() {
            Ok(_) => {
                let mut v = Vec::new();
                let mut stream = resp.bytes_stream();

                while let Some(item) = stream.next().await {
                    let body =
                        String::from_utf8(item?.to_vec()).map_err(ApiError::FromUtf8Error)?;

                    if body.starts_with("data: {") {
                        let chunks: Vec<&str> = body.lines().filter(|s| !s.is_empty()).collect();
                        for ele in chunks {
                            let body = ele.trim_start_matches("data: ").trim();
                            let res = serde_json::from_str::<resp::PostConvoResponse>(body)
                                .map_err(ApiError::SerdeDeserializeError)?;
                            v.push(res);
                        }
                    } else if body.starts_with("data: [DONE]") {
                        break;
                    }
                }

                Ok(v)
            }
            Err(err) => Err(self.err_handle(err, resp).await?),
        }
    }

    pub async fn patch_conversation<'a>(
        &self,
        req: req::PatchConvoRequest<'a>,
    ) -> ApiResult<resp::PatchConvoResponse> {
        match &req.conversation_id {
            Some(conversation_id) => {
                self.request_payload(
                    format!("{URL_CHATGPT_BACKEND}/conversation/{conversation_id}"),
                    RequestMethod::PATCH,
                    &req,
                )
                .await
            }
            None => Err(ApiError::RequiredParameter("conversation_id".to_string())),
        }
    }

    pub async fn patch_conversations<'a>(
        &self,
        req: req::PatchConvoRequest<'a>,
    ) -> ApiResult<resp::PatchConvoResponse> {
        self.request_payload(
            format!("{URL_CHATGPT_BACKEND}/conversations"),
            RequestMethod::PATCH,
            &req,
        )
        .await
    }

    pub async fn post_conversation_gen_title<'a>(
        &self,
        req: req::PostConvoGenTitleRequest<'a>,
    ) -> ApiResult<resp::PostConvoGenTitleResponse> {
        self.request_payload(
            format!(
                "{URL_CHATGPT_BACKEND}/conversation/gen_title/{}",
                req.conversation_id
            ),
            RequestMethod::POST,
            &req,
        )
        .await
    }

    pub async fn message_feedback<'a>(
        &self,
        req: req::MessageFeedbackRequest<'a>,
    ) -> ApiResult<resp::MessageFeedbackResponse> {
        self.request_payload(
            format!("{URL_CHATGPT_BACKEND}/conversation/message_feedbak"),
            RequestMethod::POST,
            &req,
        )
        .await
    }

    pub async fn get_conversation_limit(&self) -> ApiResult<resp::GetConvoLimitResponse> {
        self.request(
            format!("{URL_CHATGPT_PUBLIC}/conversation/message_feedbak"),
            RequestMethod::GET,
        )
        .await
    }
}

impl super::RefreshToken for OpenGPT {
    fn refresh_token(&mut self, access_token: String) {
        self.access_token = RwLock::new(access_token)
    }
}

pub struct OpenGPTBuilder {
    builder: reqwest::ClientBuilder,
    api: OpenGPT,
}

impl OpenGPTBuilder {
    pub fn api_prefix(mut self, url: String) -> Self {
        self.api.api_prefix = url;
        self
    }

    pub fn proxy(mut self, proxy: Proxy) -> Self {
        self.builder = self.builder.proxy(proxy);
        self
    }

    pub fn no_proxy(mut self) -> Self {
        self.builder = self.builder.no_proxy();
        self
    }

    pub fn client_timeout(mut self, timeout: Duration) -> Self {
        self.builder = self.builder.timeout(timeout);
        self
    }

    pub fn client_connect_timeout(mut self, timeout: Duration) -> Self {
        self.builder = self.builder.connect_timeout(timeout);
        self
    }

    pub fn cookie_store(mut self, store: bool) -> Self {
        self.builder = self.builder.cookie_store(store);
        self
    }

    pub fn access_token(mut self, access_token: String) -> Self {
        self.api.access_token = tokio::sync::RwLock::new(access_token);
        self
    }

    pub fn build(mut self) -> OpenGPT {
        self.api.client = self.builder.build().expect("ClientBuilder::build()");
        self.api
    }

    pub fn builder() -> OpenGPTBuilder {
        let mut req_headers = HeaderMap::new();
        req_headers.insert(
            reqwest::header::USER_AGENT,
            HeaderValue::from_static(HEADER_UA),
        );

        let client = reqwest::ClientBuilder::new()
            .chrome_builder(browser::ChromeVersion::V105)
            .cookie_store(true)
            .default_headers(req_headers);

        OpenGPTBuilder {
            builder: client,
            api: OpenGPT {
                api_prefix: String::from(URL_CHATGPT_BACKEND),
                client: reqwest::Client::new(),
                access_token: RwLock::default(),
            },
        }
    }
}
