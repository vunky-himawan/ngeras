use std::env;

use dotenvy::dotenv;

pub struct DatabaseConfig {
    pub url: String,
}

impl DatabaseConfig {
    pub fn new() -> Self {
        dotenv().ok();
        Self {
            url: env::var("DATABASE_URL")
                .unwrap_or_else(|_| "postgres://user:password@localhost:5432/mydatabase".into()),
        }
    }
}
