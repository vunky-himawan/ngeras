use common::{AppState, BaseParams};
use domain::Role;
use sqlx::{query, query_as};
use sqlx_paginated::{PaginatedResponse, QueryParamsBuilder, paginated_query_as};

use crate::v1::roles::dto::CreateOrUpdateRoleDTO;

pub struct RoleRepository<'a> {
    state: &'a AppState,
}

impl<'a> RoleRepository<'a> {
    pub fn new(state: &'a AppState) -> Self {
        Self { state }
    }

    pub async fn get_roles_with_pagination(
        &self,
        params: BaseParams,
    ) -> Result<PaginatedResponse<Role>, sqlx::Error> {
        let params = QueryParamsBuilder::<Role>::new()
            .with_pagination(params.page.unwrap_or(1), params.per_page.unwrap_or(10))
            .with_search(params.search.unwrap_or_default(), vec!["role_name"])
            .with_sort("role_name", sqlx_paginated::QuerySortDirection::Ascending)
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
        let role = query_as::<_, Role>("SELECT * FROM roles WHERE role_id = $1")
            .bind(id)
            .fetch_optional(&self.state.db) // bedanya fetch_optional bisa return None
            .await?;

        Ok(role)
    }

    pub async fn get_role_by_name(&self, name: String) -> Result<Option<Role>, sqlx::Error> {
        let role = query_as::<_, Role>("SELECT * FROM roles WHERE role_name = $1")
            .bind(name)
            .fetch_optional(&self.state.db) // bedanya fetch_optional bisa return None
            .await?;

        Ok(role)
    }

    pub async fn create_role(&self, new_role: &CreateOrUpdateRoleDTO) -> Result<Role, sqlx::Error> {
        let created_role = query_as::<_, Role>(
            "INSERT INTO roles (role_name, role_description) VALUES ($1, $2) RETURNING *",
        )
        .bind(&new_role.name)
        .bind(&new_role.description)
        .fetch_one(&self.state.db)
        .await?;

        Ok(created_role)
    }

    pub async fn update_role(
        &self,
        id: i64,
        new_role: &CreateOrUpdateRoleDTO,
    ) -> Result<Role, sqlx::Error> {
        let updated_role = query_as::<_, Role>(
            "UPDATE roles SET role_name = $1, role_description = $2 WHERE role_id = $3 RETURNING *",
        )
        .bind(&new_role.name)
        .bind(&new_role.description)
        .bind(id)
        .fetch_one(&self.state.db)
        .await?;

        Ok(updated_role)
    }

    pub async fn delete_role(&self, id: i64) -> Result<(), sqlx::Error> {
        query("DELETE FROM roles WHERE role_id = $1")
            .bind(id)
            .execute(&self.state.db)
            .await?;

        Ok(())
    }
}
