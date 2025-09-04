pub mod roles_controller;
pub mod roles_dto;
pub mod roles_repository;
pub mod roles_service;

pub use roles_controller::*;
pub use roles_repository::*;

use axum::{
    Router,
    routing::{get, post},
};
use common::AppState;

pub async fn roles_routes() -> Router<AppState> {
    Router::new()
        .route("/roles", get(roles_controller::find_many))
        .route("/roles/{id}", get(roles_controller::find))
        .route("/roles", post(roles_controller::create_role))
    // .route("/roles/{id}", put(roles_controller::update_role))
    // .route("/roles/{id}", delete(roles_controller::delete_role))
}
