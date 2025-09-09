use domain::Gender;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateUserDto {
    pub name: String,
    pub email: String,
    pub gender: Gender,
}
