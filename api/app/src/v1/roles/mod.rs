pub mod controller;
pub mod dto;
pub mod repository;
pub mod service;

pub use controller::*;
pub use repository::*;

use axum::{
    Router,
    routing::{delete, get, post, put},
};
use common::AppState;

pub async fn roles_routes() -> Router<AppState> {
    Router::new()
        .route("/roles", get(controller::find_many))
        .route("/roles/{id}", get(controller::find))
        .route("/roles", post(controller::create))
        .route("/roles/{id}", put(controller::update))
        .route("/roles/{id}", delete(controller::remove))
}
