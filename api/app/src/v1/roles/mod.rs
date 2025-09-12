pub mod controller;
pub mod dto;
pub mod repository;
pub mod service;
pub mod validation;

pub use controller::*;
pub use repository::*;

use axum::{
    Router,
    routing::{delete, get, post, put},
};
use common::AppState;

pub async fn roles_routes() -> Router<AppState> {
    Router::new()
        .route("/roles", get(controller::get_roles))
        .route("/roles/{id}", get(controller::get_role))
        .route("/roles", post(controller::create_role))
        .route("/roles/{id}", put(controller::update_role))
        .route("/roles/{id}", delete(controller::delete_role))
}
