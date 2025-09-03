use axum::Router;

pub mod v1;
use lib::Database;
pub use v1::create_routes;

pub async fn build_routes(_db: Database) -> Router {
    Router::new().nest("/api", create_routes().await)
}
