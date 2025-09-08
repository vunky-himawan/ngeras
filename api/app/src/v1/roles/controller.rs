use crate::v1::roles::{dto::CreateOrUpdateRoleDTO, service::RoleService};
use axum::{
    Json,
    extract::{Path, Query, State},
    response::Response,
};
use common::{AppState, BaseParams};

pub async fn find_many(
    State(state): State<AppState>,
    Query(params): Query<BaseParams>,
) -> Response {
    RoleService::find_many(params, &state).await
}

pub async fn find(State(state): State<AppState>, Path(id): Path<i64>) -> Response {
    RoleService::find(id, &state).await
}

pub async fn create(
    State(state): State<AppState>,
    Json(dto): Json<CreateOrUpdateRoleDTO>,
) -> Response {
    RoleService::create_role(dto, &state).await
}

pub async fn update(
    State(state): State<AppState>,
    Path(id): Path<i64>,
    Json(dto): Json<CreateOrUpdateRoleDTO>,
) -> Response {
    RoleService::update_role(id, dto, &state).await
}

pub async fn remove(State(state): State<AppState>, Path(id): Path<i64>) -> Response {
    RoleService::delete_role(id, &state).await
}
