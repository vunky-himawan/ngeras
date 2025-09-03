use std::env;

use dotenvy::dotenv;

pub struct AppConfig {
    pub name: String,
    pub version: String,
    pub port: u16,
    pub host: String,
}

impl AppConfig {
    pub fn new() -> Self {
        dotenv().ok();

        Self {
            name: env::var("APP_NAME").unwrap_or_else(|_| "my_app".into()),
            version: env::var("APP_VERSION").unwrap_or_else(|_| "1.0.0".into()),
            port: env::var("APP_PORT")
                .unwrap_or_else(|_| "3000".into())
                .parse()
                .unwrap_or(3000),
            host: env::var("APP_HOST").unwrap_or_else(|_| "localhost".into()),
        }
    }
}
