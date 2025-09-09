use axum::{
    Router,
    http::{
        HeaderValue, Method,
        header::{AUTHORIZATION, CONTENT_TYPE},
    },
};

pub mod v1;

use common::AppState;
use config::AppConfig;
use libs::Database;
use tower_http::cors::CorsLayer;

use utoipa_swagger_ui::SwaggerUi;
pub use v1::*;

pub async fn build_routes(db: Database) -> Router {
    let app_config = AppConfig::new();
    let state = AppState { db: db.pool };

    let origin = HeaderValue::from_str(&app_config.url).expect("invalid origin URL in AppConfig");

    let cors_layer = CorsLayer::new()
        .allow_origin(origin)
        .allow_methods([
            Method::GET,
            Method::POST,
            Method::PUT,
            Method::DELETE,
            Method::OPTIONS,
        ])
        .allow_headers([CONTENT_TYPE, AUTHORIZATION]);

    Router::new()
        .nest("/api", create_routes().await)
        .merge(SwaggerUi::new("/api/v1/docs").url("/api/v1/openapi.json", api_v1_docs_route()))
        .with_state(state)
        .layer(cors_layer)
}
