use axum::{
    Json,
    extract::{Path, Query, State},
    response::Response,
};
use common::{
    AppState, BaseParams,
    success::{PaginationResponse, SuccessResponse},
};
use domain::Permission;

use crate::permissions::{dto::UpdatePermissionDTO, service::PermissionService};

#[utoipa::path(
    get,
    path = "/api/v1/permissions",
    tag = "Permissions",
    description = "Get a list of permissions",
    params(
        ("page" = Option<i64>, Query, description = "Page number"),
        ("per_page" = Option<i64>, Query, description = "Items per page"),
        ("search" = Option<String>, Query, description = "Search term"),
    ),
    responses(
        (status = 200, description = "List permissions", body = [PaginationResponse<Permission>]),
        (status = 500, description = "Internal server error", body = [common::CommonResponse]),
    )
)]
pub async fn find_many(
    State(state): State<AppState>,
    Query(params): Query<BaseParams>,
) -> Response {
    PermissionService::find_many(params, &state).await
}

#[utoipa::path(
    get,
    path = "/api/v1/permissions/{id}",
    tag = "Permissions",
    description = "Get a permission by id",
    responses(
        (status = 200, description = "Permission", body = [SuccessResponse<Permission>]),
        (status = 404, description = "Permission not found", body = [common::CommonResponse]),
        (status = 500, description = "Internal server error", body = [common::CommonResponse]),
    )
)]
pub async fn find(State(state): State<AppState>, Path(id): Path<i64>) -> Response {
    PermissionService::find(id, &state).await
}

#[utoipa::path(
    patch,
    path = "/api/v1/permissions",
    tag = "Permissions",
    description = "Create a new permission",
    request_body = UpdatePermissionDTO,
    responses(
        (status = 201, description = "Permission created", body = [SuccessResponse<Permission>]),
        (status = 400, description = "Bad request", body = [common::CommonResponse]),
        (status = 500, description = "Internal server error", body = [common::CommonResponse]),
    )
)]
pub async fn update(
    State(state): State<AppState>,
    Path(id): Path<i64>,
    Json(dto): Json<UpdatePermissionDTO>,
) -> Response {
    PermissionService::update(id, dto, &state).await
}
