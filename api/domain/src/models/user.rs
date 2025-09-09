use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use sqlx::prelude::{FromRow, Type};
use utoipa::ToSchema;

#[derive(Debug, Clone, Default, Serialize, Deserialize, ToSchema, FromRow)]
pub struct User {
    pub id: String,

    pub name: String,

    #[schema(example = "Male")]
    pub gender: Gender,

    pub email: String,
    pub password: Option<String>,

    #[schema(value_type = String, format = "date_time", example = "2023-10-05T14:48:00Z")]
    pub created_at: NaiveDateTime,

    #[schema(value_type = String, format = "date_time", example = "2023-10-05T14:48:00Z")]
    pub updated_at: NaiveDateTime,

    #[schema(value_type = String, format = "date_time", example = "2023-10-05T14:48:00Z")]
    pub deleted_at: Option<NaiveDateTime>,
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
