use axum::Router;

pub mod permissions;
pub mod roles;
use common::AppState;

pub use roles::roles_routes;

use crate::permissions::permissions_routes;

pub async fn create_routes() -> Router<AppState> {
    Router::new()
        .nest("/v1", roles_routes().await)
        .nest("/v1", permissions_routes().await)
}
