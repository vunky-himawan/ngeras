use axum::{Router, http::HeaderValue};

pub mod v1;
use common::AppState;
use config::AppConfig;
use lib::Database;
use tower_http::cors::CorsLayer;
pub use v1::create_routes;

pub async fn build_routes(db: Database) -> Router {
    let app_config = AppConfig::new();
    let state = AppState { db: db.pool };

    let origin = HeaderValue::from_str(&app_config.url).expect("invalid origin URL in AppConfig");

    let cors_layer = CorsLayer::new().allow_origin(origin);

    Router::new()
        .nest("/api", create_routes().await)
        .with_state(state)
        .layer(cors_layer)
}
