pub mod docs;
pub use docs::*;

use axum::Router;

pub mod permissions;
pub mod roles;
use common::AppState;

pub use roles::roles_routes;

use crate::permissions::permissions_routes;

pub async fn create_routes() -> Router<AppState> {
    let routes = Router::new()
        .merge(roles_routes().await)
        .merge(permissions_routes().await);

    Router::new().nest("/v1", routes)
}
