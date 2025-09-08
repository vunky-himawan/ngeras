use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdatePermissionDTO {
    pub description: Option<String>,
}
