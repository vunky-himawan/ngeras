use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;
use utoipa::ToSchema;

#[derive(Serialize, Debug, Deserialize, Default, FromRow, ToSchema)]
pub struct Permission {
    pub id: i64,
    pub name: String,
    pub description: Option<String>,
}
