use dotenvy::dotenv;

pub struct JWTConfig {
    pub access_token_secret: String,
    pub refresh_token_secret: String,
}

impl JWTConfig {
    pub fn new() -> Self {
        dotenv().ok();
        Self {
            access_token_secret: std::env::var("ACCESS_TOKEN_SECRET").unwrap(),
            refresh_token_secret: std::env::var("REFRESH_TOKEN_SECRET").unwrap(),
        }
    }
}
