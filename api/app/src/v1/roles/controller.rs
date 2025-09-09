use crate::v1::roles::{dto::CreateOrUpdateRoleDTO, service::RoleService};
use axum::{
    Json,
    extract::{Path, Query, State},
    response::Response,
};
use common::{
    AppState, BaseParams, CommonResponse,
    success::{PaginationResponse, SuccessResponse},
};
use domain::Role;

#[utoipa::path(
    get,
    path = "/api/v1/roles",
    tag = "Roles",
    description = "Get a list of roles",
    params(
        ("page" = Option<i64>, Query, description = "Page number"),
        ("per_page" = Option<i64>, Query, description = "Items per page"),
        ("search" = Option<String>, Query, description = "Search term"),
    ),
    responses(
        (status = 200, description = "List roles", body = [PaginationResponse<CreateOrUpdateRoleDTO>]),
        (status = 500, description = "Internal server error", body = [CommonResponse]),
    )
)]
pub async fn find_many(
    State(state): State<AppState>,
    Query(params): Query<BaseParams>,
) -> Response {
    RoleService::find_many(params, &state).await
}

#[utoipa::path(
    get,
    path = "/api/v1/roles/{id}",
    tag = "Roles",
    description = "Get a role by id",
    responses(
        (status = 200, description = "Role", body = [SuccessResponse<Role>]),
        (status = 404, description = "Role not found", body = [CommonResponse]),
        (status = 500, description = "Internal server error", body = [CommonResponse]),
    )
)]
pub async fn find(State(state): State<AppState>, Path(id): Path<i64>) -> Response {
    RoleService::find(id, &state).await
}

#[utoipa::path(
    post,
    path = "/api/v1/roles",
    tag = "Roles",
    description = "Create a new role",
    request_body = CreateOrUpdateRoleDTO,
    responses(
        (status = 201, description = "Role created", body = [SuccessResponse<Role>]),
        (status = 400, description = "Bad request", body = [CommonResponse]),
        (status = 500, description = "Internal server error", body = [CommonResponse]),
    )
)]
pub async fn create(
    State(state): State<AppState>,
    Json(dto): Json<CreateOrUpdateRoleDTO>,
) -> Response {
    RoleService::create_role(dto, &state).await
}

#[utoipa::path(
    put,
    path = "/api/v1/roles/{id}",
    tag = "Roles",
    description = "Update a role",
    request_body = CreateOrUpdateRoleDTO,
    responses(
        (status = 200, description = "Role updated", body = [SuccessResponse<Role>]),
        (status = 400, description = "Bad request", body = [CommonResponse]),
        (status = 404, description = "Role not found", body = [CommonResponse]),
        (status = 500, description = "Internal server error", body = [CommonResponse]),
    )
)]
pub async fn update(
    State(state): State<AppState>,
    Path(id): Path<i64>,
    Json(dto): Json<CreateOrUpdateRoleDTO>,
) -> Response {
    RoleService::update_role(id, dto, &state).await
}

#[utoipa::path(
    delete,
    path = "/api/v1/roles/{id}",
    tag = "Roles",
    description = "Delete a role",
    responses(
        (status = 200, description = "Role deleted", body = [SuccessResponse<Role>]),
        (status = 404, description = "Role not found", body = [CommonResponse]),
        (status = 500, description = "Internal server error", body = [CommonResponse]),
    )
)]
pub async fn remove(State(state): State<AppState>, Path(id): Path<i64>) -> Response {
    RoleService::delete_role(id, &state).await
}
