use crate::v1::roles::{roles_dto::CreateRoleDTO, roles_service::RoleService};
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

pub async fn create_role(
    State(state): State<AppState>,
    Json(dto): Json<CreateRoleDTO>,
) -> Response {
    RoleService::create_role(dto, &state).await
}
