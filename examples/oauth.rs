#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // let _opt = Opt::parse();
    let mut auth = openai::oauth::OpenAIOAuthBuilder::builder()
        .email("opengpt@gmail.com".to_string())
        .password("gngpp".to_string())
        .cache(true)
        .client_cookie_store(true)
        .client_timeout(std::time::Duration::from_secs(20))
        .build();
    let token = auth.authenticate().await?;
    println!("Token: {}", token);
    println!("UserInfo: {:#?}", auth.get_user_info()?);
    tokio::time::sleep(std::time::Duration::from_secs(4)).await;
    auth.do_refresh_token().await?;
    tokio::time::sleep(std::time::Duration::from_secs(4)).await;
    auth.do_revoke_token().await?;
    Ok(())
}