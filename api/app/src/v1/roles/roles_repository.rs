use common::AppState;
use sqlx::query_as;
use sqlx_paginated::{PaginatedResponse, QueryParamsBuilder, paginated_query_as};

use crate::v1::roles::roles_dto::{CreateRoleDTO, Role};

pub struct RoleRepository<'a> {
    state: &'a AppState,
}

impl<'a> RoleRepository<'a> {
    pub fn new(state: &'a AppState) -> Self {
        Self { state }
    }

    pub async fn get_roles_with_pagination(
        &self,
        page: i64,
        per_page: i64,
    ) -> Result<PaginatedResponse<Role>, sqlx::Error> {
        let params = QueryParamsBuilder::<Role>::new()
            .with_pagination(page, per_page)
            .build();

        let paginated = paginated_query_as!(
            Role,
            r#"
            SELECT *
            FROM roles
            "#
        )
        .with_params(params)
        .fetch_paginated(&self.state.db)
        .await?;

        Ok(paginated)
    }

    pub async fn get_role_by_id(&self, id: i64) -> Result<Option<Role>, sqlx::Error> {
        let role = query_as::<_, Role>("SELECT * FROM roles WHERE id = $1")
            .bind(id)
            .fetch_optional(&self.state.db) // bedanya fetch_optional bisa return None
            .await?;

        Ok(role)
    }

    pub async fn get_role_by_name(&self, name: String) -> Result<Option<Role>, sqlx::Error> {
        let role = query_as::<_, Role>("SELECT * FROM roles WHERE name = $1")
            .bind(name)
            .fetch_optional(&self.state.db) // bedanya fetch_optional bisa return None
            .await?;

        Ok(role)
    }

    pub async fn create_role(&self, new_role: &CreateRoleDTO) -> Result<Role, sqlx::Error> {
        let created_role = query_as::<_, Role>(
            "INSERT INTO roles (name, description) VALUES ($1, $2) RETURNING *",
        )
        .bind(&new_role.name)
        .bind(&new_role.description)
        .fetch_one(&self.state.db)
        .await?;

        Ok(created_role)
    }
}
