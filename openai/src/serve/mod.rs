pub mod middleware;
#[cfg(feature = "limit")]
pub mod tokenbucket;

use actix_web::http::header;
use actix_web::middleware::Logger;
use actix_web::web::Json;
use actix_web::{get, patch, post, App, HttpResponse, HttpServer, Responder};
use actix_web::{web, HttpRequest};
use derive_builder::Builder;
use reqwest::Client;
use serde_json::Value;
use std::fs::File;
use std::io::BufReader;
use std::sync::Once;

use rustls::{Certificate, PrivateKey, ServerConfig};
use std::net::IpAddr;
use std::path::PathBuf;

use crate::oauth::OAuthClient;
use crate::serve::tokenbucket::TokenBucket;
use crate::{info, oauth};

use super::api::{HEADER_UA, URL_CHATGPT_BASE};

static INIT: Once = Once::new();
static mut CLIENT: Option<Client> = None;
static mut OAUTH_CLIENT: Option<OAuthClient> = None;

fn client() -> Client {
    if let Some(client) = unsafe { &CLIENT } {
        return client.clone();
    }
    panic!("The requesting client must be initialized")
}

fn oauth_client() -> OAuthClient {
    if let Some(oauth_client) = unsafe { &OAUTH_CLIENT } {
        return oauth_client.clone();
    }
    panic!("The requesting oauth client must be initialized")
}

#[derive(Builder, Clone)]
pub struct Launcher {
    /// Listen addres
    host: IpAddr,
    /// Listen port
    port: u16,
    /// Machine worker pool
    workers: usize,
    /// TLS keypair
    tls_keypair: Option<(PathBuf, PathBuf)>,
    /// Enable token bucket flow limitation
    tb_enable: bool,
    /// Token bucket capacity
    tb_capacity: u32,
    /// Token bucket fill rate
    tb_fill_rate: u32,
    /// Token bucket expired (second)
    tb_expired: u32,
}

impl Launcher {
    pub async fn run(self) -> anyhow::Result<()> {
        use reqwest::header;
        let mut headers = header::HeaderMap::new();
        headers.insert(
            header::USER_AGENT,
            header::HeaderValue::from_static(HEADER_UA),
        );
        let client = reqwest::ClientBuilder::new()
            .chrome_builder(reqwest::browser::ChromeVersion::V105)
            .default_headers(headers)
            .cookie_store(false)
            .build()?;

        let oauth_client = oauth::OAuthClientBuilder::builder()
            .cookie_store(true)
            .pool_max_idle_per_host(self.workers)
            .build();

        unsafe {
            INIT.call_once(|| {
                CLIENT = Some(client);
                OAUTH_CLIENT = Some(oauth_client);
            });
        }

        info!(
            "Starting HTTP(S) server at http(s)://{}:{}",
            self.host, self.port
        );
        let ctls_keypaird = self.tls_keypair.clone();
        let default_serve = async {
            let serve = HttpServer::new(move || {
                App::new()
                    .wrap(Logger::default())
                    .service(
                        web::scope("/backend-api")
                            .wrap(middleware::TokenAuthorization)
                            .service(get_models)
                            .service(get_account_check)
                            .service(get_conversation)
                            .service(get_conversations)
                            .service(post_conversation)
                            .service(post_conversation_gen_title)
                            .service(post_conversation_message_feedback)
                            .service(patch_conversation)
                            .service(patch_conversations),
                    )
                    .service(
                        web::scope("/oauth")
                            .service(do_access_token)
                            .service(do_refresh_token)
                            .service(do_revoke_token),
                    )
            })
            .keep_alive(None)
            .workers(self.workers);
            match ctls_keypaird {
                Some(keypair) => {
                    let tls_config = Self::load_rustls_config(keypair.0, keypair.1).await?;
                    serve
                        .bind_rustls((self.host, self.port), tls_config)?
                        .run()
                        .await
                        .map_err(|e| anyhow::anyhow!(e))
                }
                None => serve
                    .bind((self.host, self.port))?
                    .run()
                    .await
                    .map_err(|e| anyhow::anyhow!(e)),
            }
        };

        #[cfg(feature = "limit")]
        if self.tb_enable {
            let serve = HttpServer::new(move || {
                let mw = TokenBucket::new(self.tb_capacity, self.tb_fill_rate, self.tb_expired);
                App::new()
                    .wrap(Logger::default())
                    .wrap(middleware::TokenBucketRateLimiter::new(mw))
                    .service(
                        web::scope("/backend-api")
                            .wrap(middleware::TokenAuthorization)
                            .service(get_models)
                            .service(get_account_check)
                            .service(get_conversation)
                            .service(get_conversations)
                            .service(post_conversation)
                            .service(post_conversation_gen_title)
                            .service(post_conversation_message_feedback)
                            .service(patch_conversation)
                            .service(patch_conversations),
                    )
                    .service(
                        web::scope("/oauth")
                            .service(do_access_token)
                            .service(do_refresh_token)
                            .service(do_revoke_token),
                    )
            })
            .keep_alive(None)
            .workers(self.workers);
            match self.tls_keypair {
                Some(keypair) => {
                    let tls_config = Self::load_rustls_config(keypair.0, keypair.1).await?;
                    serve
                        .bind_rustls((self.host, self.port), tls_config)?
                        .run()
                        .await
                        .map_err(|e| anyhow::anyhow!(e))
                }
                None => serve
                    .bind((self.host, self.port))?
                    .run()
                    .await
                    .map_err(|e| anyhow::anyhow!(e)),
            }
        } else {
            default_serve.await
        }
        #[cfg(not(feature = "limit"))]
        default_serve.await
    }

    async fn load_rustls_config(
        tls_cert: PathBuf,
        tls_key: PathBuf,
    ) -> anyhow::Result<ServerConfig> {
        use rustls_pemfile::{certs, pkcs8_private_keys};

        // init server config builder with safe defaults
        let config = ServerConfig::builder()
            .with_safe_defaults()
            .with_no_client_auth();

        // load TLS key/cert files
        let cert_file = &mut BufReader::new(File::open(tls_cert)?);
        let key_file = &mut BufReader::new(File::open(tls_key)?);

        // convert files to key/cert objects
        let cert_chain = certs(cert_file)?.into_iter().map(Certificate).collect();
        let mut keys: Vec<PrivateKey> = pkcs8_private_keys(key_file)?
            .into_iter()
            .map(PrivateKey)
            .collect();

        // exit if no keys could be parsed
        if keys.is_empty() {
            anyhow::bail!("Could not locate PKCS 8 private keys.")
        }

        Ok(config.with_single_cert(cert_chain, keys.remove(0))?)
    }
}

#[post("/token")]
async fn do_access_token(account: Json<oauth::OAuthAccount>) -> impl Responder {
    match oauth_client().do_access_token(account.into_inner()).await {
        Ok(token) => HttpResponse::Ok().json(token),
        Err(err) => response_oauth_bad_handle(&err.to_string()),
    }
}

#[post("/refresh_token")]
async fn do_refresh_token(req: HttpRequest) -> impl Responder {
    if let Some(token) = req.headers().get(header::AUTHORIZATION) {
        match token.to_str() {
            Ok(token_val) => {
                let token_val = token_val.trim_start_matches("Bearer ");
                match oauth_client().do_refresh_token(token_val).await {
                    Ok(token) => HttpResponse::Ok().json(token),
                    Err(err) => response_oauth_bad_handle(&err.to_string()),
                }
            }
            Err(err) => HttpResponse::InternalServerError().json(err.to_string()),
        }
    } else {
        HttpResponse::Unauthorized().body(r#"{ "message": "refresh_token is required! "}"#)
    }
}

#[post("/revoke_token")]
async fn do_revoke_token(req: HttpRequest) -> impl Responder {
    if let Some(token) = req.headers().get(header::AUTHORIZATION) {
        match token.to_str() {
            Ok(token_val) => {
                let token_val = token_val.trim_start_matches("Bearer ");
                match oauth_client().do_revoke_token(token_val).await {
                    Ok(_) => HttpResponse::Ok().finish(),
                    Err(err) => response_oauth_bad_handle(&err.to_string()),
                }
            }
            Err(err) => HttpResponse::InternalServerError().json(err.to_string()),
        }
    } else {
        HttpResponse::Unauthorized().body(r#"{ "message": "refresh_token is required! "}"#)
    }
}

#[get("/models")]
async fn get_models(req: HttpRequest) -> impl Responder {
    match client()
        .get(format!("{URL_CHATGPT_BASE}/models"))
        .headers(header_convert(req.headers()))
        .send()
        .await
    {
        Ok(resp) => response_handle(resp),
        Err(err) => response_internal_server_handle(err),
    }
}

#[post("/accounts/check")]
async fn get_account_check(req: HttpRequest) -> impl Responder {
    match client()
        .get(format!("{URL_CHATGPT_BASE}/accounts/check"))
        .headers(header_convert(req.headers()))
        .send()
        .await
    {
        Ok(resp) => response_handle(resp),
        Err(err) => response_internal_server_handle(err),
    }
}

#[get("/conversation/{conversation_id}")]
async fn get_conversation(req: HttpRequest, conversation_id: web::Path<String>) -> impl Responder {
    match client()
        .get(format!(
            "{URL_CHATGPT_BASE}/conversation/{}",
            conversation_id.into_inner()
        ))
        .headers(header_convert(req.headers()))
        .send()
        .await
    {
        Ok(resp) => response_handle(resp),
        Err(err) => response_internal_server_handle(err),
    }
}

#[get("/conversations")]
async fn get_conversations(req: HttpRequest, param: web::Query<ConvosQuery>) -> impl Responder {
    let param = param.into_inner();
    match client()
        .get(format!(
            "{URL_CHATGPT_BASE}/conversations?offset={}&limit={}&order={}",
            param.offset, param.limit, param.order
        ))
        .headers(header_convert(req.headers()))
        .send()
        .await
    {
        Ok(resp) => response_handle(resp),
        Err(err) => response_internal_server_handle(err),
    }
}

#[post("/conversation")]
async fn post_conversation(req: HttpRequest, body: Json<Value>) -> impl Responder {
    match client()
        .post(format!("{URL_CHATGPT_BASE}/conversation"))
        .headers(header_convert(req.headers()))
        .json(&body)
        .send()
        .await
    {
        Ok(resp) => response_handle(resp),
        Err(err) => response_internal_server_handle(err),
    }
}

#[patch("/conversation/{conversation_id}")]
async fn patch_conversation(
    req: HttpRequest,
    conversation_id: web::Path<String>,
    body: Json<Value>,
) -> impl Responder {
    match client()
        .patch(format!("{URL_CHATGPT_BASE}/conversation/{conversation_id}"))
        .headers(header_convert(req.headers()))
        .json(&body)
        .send()
        .await
    {
        Ok(resp) => response_handle(resp),
        Err(err) => response_internal_server_handle(err),
    }
}

#[patch("/conversations")]
async fn patch_conversations(req: HttpRequest, body: Json<Value>) -> impl Responder {
    match client()
        .patch(format!("{URL_CHATGPT_BASE}/conversations"))
        .headers(header_convert(req.headers()))
        .json(&body)
        .send()
        .await
    {
        Ok(resp) => response_handle(resp),
        Err(err) => response_internal_server_handle(err),
    }
}

#[post("/conversation/gen_title/{conversation_id}")]
async fn post_conversation_gen_title(
    req: HttpRequest,
    conversation_id: web::Path<String>,
    body: Json<Value>,
) -> impl Responder {
    match client()
        .post(format!(
            "{URL_CHATGPT_BASE}/conversation/gen_title/{conversation_id}"
        ))
        .headers(header_convert(req.headers()))
        .json(&body)
        .send()
        .await
    {
        Ok(resp) => response_handle(resp),
        Err(err) => response_internal_server_handle(err),
    }
}

#[post("/conversation/message_feedbak")]
async fn post_conversation_message_feedback(req: HttpRequest, body: Json<Value>) -> impl Responder {
    match client()
        .post(format!("{URL_CHATGPT_BASE}/conversation/message_feedbak"))
        .headers(header_convert(req.headers()))
        .json(&body)
        .send()
        .await
    {
        Ok(resp) => response_handle(resp),
        Err(err) => response_internal_server_handle(err),
    }
}

fn header_convert(headers: &actix_web::http::header::HeaderMap) -> reqwest::header::HeaderMap {
    headers
        .iter()
        .filter(|v| {
            let h = v.0;
            h.ne(&header::CONNECTION) && h.ne(&header::USER_AGENT)
        })
        .map(|(k, v)| (k.clone(), v.clone()))
        .collect()
}

fn response_internal_server_handle(err: reqwest::Error) -> HttpResponse {
    HttpResponse::InternalServerError().json(err.to_string())
}

fn response_oauth_bad_handle(msg: &str) -> HttpResponse {
    HttpResponse::BadRequest().json(msg)
}

fn response_handle(resp: reqwest::Response) -> HttpResponse {
    let status = resp.status();
    let mut builder = HttpResponse::build(status);
    resp.headers().into_iter().for_each(|kv| {
        builder.insert_header(kv);
    });
    builder.streaming(resp.bytes_stream())
}

use serde::Deserialize;

#[derive(Deserialize)]
struct ConvosQuery {
    #[serde(default = "ConvosQuery::default_offset")]
    offset: u32,
    #[serde(default = "ConvosQuery::default_limit")]
    limit: u32,
    #[serde(default = "ConvosQuery::default_order")]
    order: String,
}

impl ConvosQuery {
    fn default_offset() -> u32 {
        0
    }
    fn default_limit() -> u32 {
        20
    }

    fn default_order() -> String {
        String::from("updated")
    }
}
