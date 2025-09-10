use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;
use utoipa::ToSchema;

#[derive(Serialize, Debug, Deserialize, Default, FromRow, ToSchema)]
pub struct Permission {
    pub permission_id: i64,
    pub permission_name: String,
    pub permission_description: Option<String>,
}
