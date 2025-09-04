use axum::Router;

pub mod roles;
use common::AppState;
pub use roles::roles_routes;

pub async fn create_routes() -> Router<AppState> {
    Router::new().nest("/v1", roles_routes().await)
}
