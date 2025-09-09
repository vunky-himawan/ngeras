use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SuccessResponse<T: Serialize> {
    pub status_code: u16,
    pub message: String,
    pub data: T,
}

#[derive(Debug, Clone, Serialize, Deserialize, ToSchema)]
pub struct PaginationMeta {
    pub page: i64,
    pub page_size: i64,
    pub total: i64,
    pub total_pages: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize, ToSchema)]
pub struct PaginationResponse<T: Serialize> {
    pub status_code: u16,
    pub message: String,
    pub data: Vec<T>,
    pub meta: PaginationMeta,
}
