use axum::{Router, routing::get};

pub async fn roles_routes() -> Router {
    /* TODO: Implement the roles routes */
    Router::new().route("/roles", get(async || "List of roles"))
}
