use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use validator::Validate;

#[derive(Debug, Validate, Serialize, Deserialize, ToSchema)]
pub struct CreateOrUpdateRoleDTO {
    #[validate(length(min = 1, message = "Name cannot be empty"))]
    pub name: String,
    pub description: Option<String>,
}
