use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Error, Debug, Clone)]
pub enum AppError {
    #[error("Validation error: {0:?}")]
    Validation(Vec<String>),
    #[error("Not found: {0}")]
    NotFound(String),
    #[error("Unauthorized: {0}")]
    Unauthorized(String),
    #[error("Internal server error: {0}")]
    Internal(String),
    #[error("Bad request: {0}")]
    BadRequest(String),
}

impl AppError {
    pub fn status_code(&self) -> u16 {
        match self {
            AppError::Validation(_) => 422,
            AppError::NotFound(_) => 404,
            AppError::Unauthorized(_) => 401,
            AppError::BadRequest(_) => 400,
            _ => 500,
        }
    }

    pub fn message(&self) -> String {
        self.to_string()
    }

    pub fn to_response(&self) -> ValidationErrorResponse {
        ValidationErrorResponse {
            status_code: self.status_code(),
            message: self.message(),
            errors: match self {
                AppError::Validation(errors) => errors.clone(),
                _ => vec![self.to_string()],
            },
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ValidationErrorResponse {
    pub status_code: u16,
    pub message: String,
    pub errors: Vec<String>,
}
