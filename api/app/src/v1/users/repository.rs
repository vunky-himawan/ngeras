use common::{AppState, BaseParams};
use domain::User;
use sqlx::query_as;
use sqlx_paginated::{
    PaginatedResponse, QueryParamsBuilder, QuerySortDirection, paginated_query_as,
};

pub struct UserRepository<'a> {
    state: &'a AppState,
}

impl<'a> UserRepository<'a> {
    pub fn new(state: &'a AppState) -> UserRepository<'a> {
        UserRepository { state }
    }

    pub async fn get_users_with_pagination(
        &self,
        params: BaseParams,
    ) -> Result<PaginatedResponse<User>, sqlx::Error> {
        let params = QueryParamsBuilder::new()
            .with_pagination(params.page.unwrap_or(1), params.per_page.unwrap_or(10))
            .with_search(params.search.unwrap_or_default(), vec!["name", "email"])
            .with_sort("name", QuerySortDirection::Ascending)
            .build();

        let users = paginated_query_as!(User, r#"SELECT * FROM users"#)
            .with_params(params)
            .fetch_paginated(&self.state.db)
            .await?;

        Ok(users)
    }

    pub async fn get_user_with_id(&self, id: String) -> Result<Option<User>, sqlx::Error> {
        let user = query_as::<_, User>("SELECT * FROM users WHERE id = $1")
            .bind(id)
            .fetch_optional(&self.state.db)
            .await?;

        Ok(user)
    }

    pub async fn create(&self) {
        todo!("Implement user creation")
    }

    pub async fn update(&self) {
        todo!("Implement user update")
    }

    pub async fn delete(&self) {
        todo!("Implement user deletion")
    }
}
