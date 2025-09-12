use common::{AppState, BaseParams};
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
        params: BaseParams,
    ) -> Result<PaginatedResponse<Permission>, sqlx::Error> {
        let params = QueryParamsBuilder::<Permission>::new()
            .with_pagination(params.page.unwrap_or(1), params.per_page.unwrap_or(10))
            .with_search(params.search.unwrap_or_default(), vec!["permission_name"])
            .with_sort("permission_id", QuerySortDirection::Ascending)
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
        let permission =
            query_as::<_, Permission>("SELECT * FROM permissions WHERE permission_id = $1")
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
            "UPDATE permissions SET permission_description = $1 WHERE permission_id = $2 RETURNING *",
        )
        .bind(description)
        .bind(id)
        .fetch_one(&self.state.db)
        .await?;

        Ok(updated_permission)
    }

    pub async fn find_existing_permission_ids(&self, ids: &[i64]) -> Result<Vec<i64>, sqlx::Error> {
        let existing = sqlx::query_scalar::<_, i64>(
            "SELECT permission_id FROM permissions WHERE permission_id = ANY($1)",
        )
        .bind(ids)
        .fetch_all(&self.state.db)
        .await?;

        Ok(existing)
    }
}
