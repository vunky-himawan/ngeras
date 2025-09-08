pub mod controller;
pub mod dto;
pub mod repository;
pub mod service;

use axum::{
    Router,
    routing::{get, patch},
};
use common::AppState;

pub async fn permissions_routes() -> Router<AppState> {
    Router::new()
        .route("/permissions", get(controller::find_many))
        .route("/permissions/{id}", get(controller::find))
        .route("/permissions/{id}", patch(controller::update))
}
