use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;
use utoipa::ToSchema;

#[derive(Debug, Serialize, Deserialize, FromRow, Default, ToSchema)]
pub struct Role {
    pub id: i64,
    pub name: String,
    pub description: Option<String>,

    #[schema(value_type = String, format = "date_time", example = "2023-10-05T14:48:00Z")]
    pub created_at: NaiveDateTime,

    #[schema(value_type = String, format = "date_time", example = "2023-10-05T14:48:00Z")]
    pub updated_at: NaiveDateTime,
}
