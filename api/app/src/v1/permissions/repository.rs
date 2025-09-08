use common::AppState;
use domain::Permission;
use sqlx::query_as;
use sqlx_paginated::{
    PaginatedResponse, QueryParamsBuilder, QuerySortDirection, paginated_query_as,
};

pub struct PermissionRepository<'a> {
    state: &'a AppState,
}

impl<'a> PermissionRepository<'a> {
    pub fn new(state: &'a AppState) -> Self {
        Self { state }
    }

    pub async fn get_permissions_with_pagination(
        &self,
        page: i64,
        per_page: i64,
        search: Option<String>,
    ) -> Result<PaginatedResponse<Permission>, sqlx::Error> {
        let params = QueryParamsBuilder::<Permission>::new()
            .with_pagination(page, per_page)
            .with_search(search.unwrap_or(String::from("")), vec!["name"])
            .with_sort("id", QuerySortDirection::Ascending)
            .build();

        let paginated = paginated_query_as!(
            Permission,
            r#"
        SELECT *
        FROM permissions
        "#
        )
        .with_params(params)
        .fetch_paginated(&self.state.db)
        .await?;

        Ok(paginated)
    }

    pub async fn get_permission_by_id(&self, id: i64) -> Result<Option<Permission>, sqlx::Error> {
        let permission = query_as::<_, Permission>("SELECT * FROM permissions WHERE id = $1")
            .bind(id)
            .fetch_optional(&self.state.db)
            .await?;

        Ok(permission)
    }

    pub async fn update_permission(
        &self,
        id: i64,
        description: Option<String>,
    ) -> Result<Permission, sqlx::Error> {
        let updated_permission = query_as::<_, Permission>(
            "UPDATE permissions SET description = $1 WHERE id = $2 RETURNING *",
        )
        .bind(description)
        .bind(id)
        .fetch_one(&self.state.db)
        .await?;

        Ok(updated_permission)
    }
}
