use anyhow::Context;
use config::DatabaseConfig;
use sqlx::{Pool, Postgres, postgres::PgPoolOptions};

pub type ConnectionPool = Pool<Postgres>;

#[derive(Debug, Clone)]
pub struct Database {
    pub pool: ConnectionPool,
}

impl Database {
    pub async fn connect() -> anyhow::Result<Self> {
        let database_config = DatabaseConfig::new();

        let pool = PgPoolOptions::new()
            .max_connections(5)
            .connect(database_config.url.as_str())
            .await
            .context("error while initializing the database connection pool")?;

        Ok(Self { pool })
    }
}
