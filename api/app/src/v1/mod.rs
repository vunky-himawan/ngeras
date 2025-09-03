use axum::Router;

pub mod roles;
pub use roles::roles_routes;

pub async fn create_routes() -> Router {
    Router::new().nest("/v1", roles_routes().await)
}
