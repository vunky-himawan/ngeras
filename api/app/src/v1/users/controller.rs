use axum::{
    extract::{Path, Query, State},
    response::Response,
};
use common::{
    AppState, BaseParams, CommonResponse,
    success::{PaginationResponse, SuccessResponse},
};
use domain::User;

use crate::users::service::UserService;

#[utoipa::path(
    get,
    path = "/api/v1/users",
    tag = "Users",
    description = "Get a list of users",
    params(
        ("page" = Option<i64>, Query, description = "Page number"),
        ("per_page" = Option<i64>, Query, description = "Items per page"),
        ("search" = Option<String>, Query, description = "Search term"),
    ),
    responses(
        (status = 200, description = "List users", body = [PaginationResponse<User>]),
        (status = 500, description = "Internal server error", body = [CommonResponse]),
    )
)]
pub async fn find_many(
    State(state): State<AppState>,
    Query(params): Query<BaseParams>,
) -> Response {
    UserService::find_many(params, &state).await
}

#[utoipa::path(
    get,
    path = "/api/v1/users/{id}",
    tag = "Users",
    description = "Get a user by id",
    responses(
        (status = 200, description = "User", body = [SuccessResponse<User>]),
        (status = 404, description = "User not found", body = [CommonResponse]),
        (status = 500, description = "Internal server error", body = [CommonResponse]),
    )
)]
pub async fn find(State(state): State<AppState>, Path(id): Path<String>) -> Response {
    UserService::find(id, &state).await
}

pub async fn create() {
    todo!("Implement user creation")
}

pub async fn update() {
    todo!("Implement user update")
}

pub async fn delete() {
    todo!("Implement user deletion")
}
