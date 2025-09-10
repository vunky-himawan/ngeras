use axum::{
    Json,
    extract::{Path, Query, State},
    response::Response,
};
use common::{
    AppState, BaseParams, CommonResponse,
    success::{PaginationResponse, SuccessResponse},
};
use domain::User;
use sqlx::types::Uuid;

use crate::users::{dto::CreateOrUpdateUserDto, service::UserService};

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
pub async fn get_users(
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
pub async fn get_user(State(state): State<AppState>, Path(id): Path<Uuid>) -> Response {
    UserService::find(id, &state).await
}

#[utoipa::path(
    post,
    path = "/api/v1/users",
    tag = "Users",
    description = "Create a new user",
    request_body = CreateOrUpdateUserDto,
    responses(
        (status = 201, description = "User created", body = [SuccessResponse<User>]),
        (status = 400, description = "Bad request", body = [CommonResponse]),
        (status = 409, description = "Conflict - e.g. email already exists", body = [CommonResponse]),
        (status = 500, description = "Internal server error", body = [CommonResponse]),
    )
)]
pub async fn create_user(
    State(state): State<AppState>,
    Json(body): Json<CreateOrUpdateUserDto>,
) -> Response {
    UserService::create(body, &state).await
}

#[utoipa::path(
    put,
    path = "/api/v1/users/{id}",
    tag = "Users",
    description = "Update an existing user",
    request_body = CreateOrUpdateUserDto,
    responses(
        (status = 200, description = "User updated", body = [SuccessResponse<User>]),
        (status = 400, description = "Bad request", body = [CommonResponse]),
        (status = 404, description = "User not found", body = [CommonResponse]),
        (status = 409, description = "Conflict - e.g. email already exists", body = [CommonResponse]),
        (status = 500, description = "Internal server error", body = [CommonResponse]),
    )
)]
pub async fn update_user(
    State(state): State<AppState>,
    Path(id): Path<Uuid>,
    Json(body): Json<CreateOrUpdateUserDto>,
) -> Response {
    UserService::update(body, id, &state).await
}

#[utoipa::path(
    delete,
    path = "/api/v1/users/{id}",
    tag = "Users",
    description = "Delete an existing user",
    responses(
        (status = 200, description = "User deleted", body = [SuccessResponse<User>]),
        (status = 404, description = "User not found", body = [CommonResponse]),
        (status = 500, description = "Internal server error", body = [CommonResponse]),
    )
)]
pub async fn delete_user(State(state): State<AppState>, Path(id): Path<Uuid>) -> Response {
    UserService::delete(id, &state).await
}
