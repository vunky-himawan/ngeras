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
        .route("/users", get(controller::get_users))
        .route("/users", post(controller::create_user))
        .route("/users/{id}", get(controller::get_user))
        .route("/users/{id}", put(controller::update_user))
        .route("/users/{id}", delete(controller::delete_user))
}
