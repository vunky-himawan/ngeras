use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
};
use common::{AppState, BaseParams, success::SuccessResponse};
use utils::response::{
    create_pagination::create_pagination_response,
    formatter::{common_response, paginate_response, success_response},
};

use crate::users::repository::UserRepository;

pub struct UserService;

impl UserService {
    pub async fn find_many(params: BaseParams, state: &AppState) -> Response {
        let repo = UserRepository::new(state);

        let users = repo.get_users_with_pagination(params).await;

        match users {
            Ok(users) => {
                let response = create_pagination_response(users);

                paginate_response(response).into_response()
            }
            Err(_err) => common_response(
                String::from("Failed to fetch users"),
                StatusCode::INTERNAL_SERVER_ERROR,
            )
            .into_response(),
        }
    }

    pub async fn find(id: String, state: &AppState) -> Response {
        let repo = UserRepository::new(state);

        let user = repo.get_user_with_id(id).await;

        match user {
            Ok(user) => match user {
                Some(user) => success_response(SuccessResponse {
                    status_code: StatusCode::OK.as_u16(),
                    message: String::from("User fetched successfully."),
                    data: user,
                })
                .into_response(),
                None => common_response(String::from("User not found"), StatusCode::NOT_FOUND)
                    .into_response(),
            },
            Err(_err) => common_response(
                String::from("Failed to fetch user"),
                StatusCode::INTERNAL_SERVER_ERROR,
            )
            .into_response(),
        }
    }

    pub async fn create() {
        todo!("Implement user creation")
    }

    pub async fn update() {
        todo!("Implement user update")
    }

    pub async fn delete() {
        todo!("Implement user deletion")
    }
}
