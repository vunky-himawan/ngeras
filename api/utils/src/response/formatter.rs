use axum::{
    Json,
    http::StatusCode,
    response::{IntoResponse, Response},
};
use common::{
    CommonResponse,
    success::{PaginationResponse, SuccessResponse},
};
use serde::Serialize;
use serde_json::json;

pub fn paginate_response<T: Serialize>(params: PaginationResponse<T>) -> Response {
    (StatusCode::OK, Json(json!(params))).into_response()
}

pub fn success_response<T: Serialize>(params: SuccessResponse<T>) -> Response {
    (StatusCode::OK, Json(json!(params))).into_response()
}

pub fn common_response(message: String, status: StatusCode) -> Response {
    let response = CommonResponse {
        status_code: status.as_u16(),
        message,
    };
    (status, Json(response)).into_response()
}
