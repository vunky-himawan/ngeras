use axum::Router;
use common::AppState;

pub mod docs;
pub mod permissions;
pub mod roles;
pub mod users;

pub use docs::*;
pub use roles::roles_routes;

use crate::{permissions::permissions_routes, users::users_routes};

pub async fn create_routes() -> Router<AppState> {
    let routes = Router::new()
        .merge(roles_routes().await)
        .merge(permissions_routes().await)
        .merge(users_routes().await);

    Router::new().nest("/v1", routes)
}
