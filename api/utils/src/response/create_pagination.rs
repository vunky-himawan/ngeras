use axum::http::StatusCode;
use common::success::{PaginationMeta, PaginationResponse};
use serde::Serialize;
use sqlx_paginated::PaginatedResponse;

pub fn create_pagination_response<T: Serialize>(
    paginated_data: PaginatedResponse<T>,
) -> PaginationResponse<T> {
    let pagination = paginated_data.pagination.as_ref().unwrap();

    PaginationResponse {
        status_code: StatusCode::OK.as_u16(),
        message: "Data fetched successfully.".to_string(),
        data: paginated_data.records,
        meta: PaginationMeta {
            page: pagination.page,
            page_size: pagination.page_size,
            total_pages: paginated_data.total_pages.unwrap_or(0),
            total: paginated_data.total.unwrap_or(0),
        },
    }
}
