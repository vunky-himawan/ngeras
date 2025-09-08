use axum::{
    Json,
    extract::{Path, Query, State},
    response::Response,
};
use common::{AppState, BaseParams};

use crate::permissions::{dto::UpdatePermissionDTO, service::PermissionService};

pub async fn find_many(
    State(state): State<AppState>,
    Query(params): Query<BaseParams>,
) -> Response {
    PermissionService::find_many(params, &state).await
}

pub async fn find(State(state): State<AppState>, Path(id): Path<i64>) -> Response {
    PermissionService::find(id, &state).await
}

pub async fn update(
    State(state): State<AppState>,
    Path(id): Path<i64>,
    Json(dto): Json<UpdatePermissionDTO>,
) -> Response {
    PermissionService::update(id, dto, &state).await
}
