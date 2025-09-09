use domain::Gender;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use validator::Validate;

#[derive(Debug, Serialize, Deserialize, ToSchema, Validate)]
pub struct CreateOrUpdateUserDto {
    #[validate(length(
        min = 1,
        max = 255,
        message = "Name must be between 1 and 255 characters"
    ))]
    pub name: String,

    #[validate(email(message = "Invalid email format"))]
    #[validate(length(max = 255, message = "Email must be at most 255 characters"))]
    pub email: String,

    pub gender: Gender,

    #[validate(range(min = 1, message = "Role id must be positive"))]
    pub role_id: i64,
}
