use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;
use utoipa::ToSchema;

#[derive(Debug, Serialize, Deserialize, FromRow, Default, ToSchema, Clone)]
pub struct Role {
    pub role_id: i64,
    pub role_name: String,
    pub role_description: Option<String>,

    #[schema(value_type = String, format = "date_time", example = "2023-10-05T14:48:00Z")]
    pub role_created_at: NaiveDateTime,

    #[schema(value_type = String, format = "date_time", example = "2023-10-05T14:48:00Z")]
    pub role_updated_at: NaiveDateTime,
}
