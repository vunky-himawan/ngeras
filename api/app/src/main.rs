use axum::{Router, routing::get};
use lib::{Database, axum_init};

async fn create_router(_db: Database) -> Router {
    Router::new().route("/ping", get(|| async { "pong" }))
}

#[tokio::main]
async fn main() {
    axum_init(create_router).await;
}
