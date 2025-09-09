use axum::{
    Router,
    routing::{delete, get, post, put},
};
use common::AppState;

pub mod controller;
pub mod dto;
pub mod repository;
pub mod service;

pub async fn users_routes() -> Router<AppState> {
    Router::new()
        .route("/users", get(controller::find_many))
        .route("/users", post(controller::create))
        .route("/users/{id}", get(controller::find))
        .route("/users/{id}", put(controller::update))
        .route("/users/{id}", delete(controller::delete))
}
