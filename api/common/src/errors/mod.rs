use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ValidationErrorResponse {
    pub status_code: u16,
    pub message: String,
    pub errors: Vec<String>,
}
