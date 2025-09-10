use common::{AppState, BaseParams};
use domain::User;
use sqlx::{query, query_as, types::Uuid};
use sqlx_paginated::{
    PaginatedResponse, QueryParamsBuilder, QuerySortDirection, paginated_query_as,
};

use crate::users::dto::CreateOrUpdateUserDto;

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
            .with_search(
                params.search.unwrap_or_default(),
                vec!["user_name", "user_email"],
            )
            .with_sort("user_name", QuerySortDirection::Ascending)
            .build();

        let users = paginated_query_as!(User, r#"SELECT * FROM users"#)
            .with_params(params)
            .fetch_paginated(&self.state.db)
            .await?;

        Ok(users)
    }

    pub async fn get_user_with_id(&self, id: &Uuid) -> Result<Option<User>, sqlx::Error> {
        let user = query_as::<_, User>("SELECT * FROM users WHERE user_id = $1")
            .bind(id)
            .fetch_optional(&self.state.db)
            .await?;

        Ok(user)
    }

    pub async fn get_user_with_email(&self, email: &String) -> Result<Option<User>, sqlx::Error> {
        let user = query_as::<_, User>("SELECT * FROM users WHERE user_email = $1")
            .bind(email)
            .fetch_optional(&self.state.db)
            .await?;

        Ok(user)
    }

    pub async fn create(&self, body: &CreateOrUpdateUserDto) -> Result<User, sqlx::Error> {
        let user = query_as::<_, User>(
            "INSERT INTO users (user_name, user_email, user_gender, user_role_id) VALUES ($1, $2, $3, $4) RETURNING *",
        )
        .bind(&body.name)
        .bind(&body.email)
        .bind(&body.gender)
        .bind(&body.role_id)
        .fetch_one(&self.state.db)
        .await?;

        Ok(user)
    }

    pub async fn update(
        &self,
        id: Uuid,
        body: &CreateOrUpdateUserDto,
    ) -> Result<User, sqlx::Error> {
        let user = query_as::<_, User>(
            "UPDATE users SET user_name = $1, user_email = $2, user_gender = $3, user_role_id = $4 WHERE user_id = $5 RETURNING *",
        )
        .bind(&body.name)
        .bind(&body.email)
        .bind(&body.gender)
        .bind(&body.role_id)
        .bind(id)
        .fetch_one(&self.state.db)
        .await?;

        Ok(user)
    }

    pub async fn soft_delete(&self, id: &Uuid) -> Result<(), sqlx::Error> {
        query("UPDATE users SET user_deleted_at = NOW() WHERE user_id = $1")
            .bind(id)
            .execute(&self.state.db)
            .await?;

        Ok(())
    }
}
