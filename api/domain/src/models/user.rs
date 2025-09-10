use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::prelude::{FromRow, Type};
use utoipa::ToSchema;
use uuid::Uuid;

#[derive(Debug, Clone, Default, Serialize, Deserialize, ToSchema, FromRow)]
pub struct User {
    pub user_id: Uuid,
    pub user_name: String,
    pub user_email: String,
    pub user_password: Option<String>,
    pub user_role_id: i64,

    #[schema(example = "Male")]
    pub user_gender: Gender,

    #[schema(value_type = String, format = "date_time", example = "2023-10-05T14:48:00Z")]
    pub user_created_at: DateTime<Utc>,

    #[schema(value_type = String, format = "date_time", example = "2023-10-05T14:48:00Z")]
    pub user_updated_at: DateTime<Utc>,

    #[schema(value_type = String, format = "date_time", example = "2023-10-05T14:48:00Z")]
    pub user_deleted_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, Serialize, Deserialize, ToSchema, Type)]
#[sqlx(type_name = "gender", rename_all = "lowercase")]
pub enum Gender {
    Male,
    Female,
}

impl Default for Gender {
    fn default() -> Self {
        Gender::Male
    }
}
