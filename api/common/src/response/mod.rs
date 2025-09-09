use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

pub mod success;

#[derive(Debug, Clone, Serialize, Deserialize, ToSchema)]
pub struct CommonResponse {
    pub status_code: u16,
    pub message: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BaseParams {
    pub page: Option<i64>,
    pub per_page: Option<i64>,
    pub search: Option<String>,
}
