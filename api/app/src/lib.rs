use axum::Router;

pub mod v1;
use common::AppState;
use lib::Database;
pub use v1::create_routes;

pub async fn build_routes(db: Database) -> Router {
    let state = AppState { db: db.pool };

    Router::new()
        .nest("/api", create_routes().await)
        .with_state(state)
}
