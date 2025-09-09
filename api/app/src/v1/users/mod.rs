use axum::{Router, routing::get};
use common::AppState;

pub mod controller;
pub mod dto;
pub mod repository;
pub mod service;

pub async fn users_routes() -> Router<AppState> {
    Router::new()
        .route("/users", get(controller::find_many))
        .route("/users/{id}", get(controller::find))
}
