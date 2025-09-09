use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
};
use common::{AppState, BaseParams, success::SuccessResponse};
use utils::response::{
    create_pagination::create_pagination_response,
    formatter::{common_response, paginate_response, success_response},
};

use crate::users::{dto::CreateOrUpdateUserDto, repository::UserRepository};

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

        let user = repo.get_user_with_id(&id).await;

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

    pub async fn create(body: CreateOrUpdateUserDto, state: &AppState) -> Response {
        let repo = UserRepository::new(state);

        let existing_user = repo.get_user_with_email(&body.email).await;

        match existing_user {
            Ok(Some(_user)) => common_response(
                String::from("User with this email already exists"),
                StatusCode::CONFLICT,
            )
            .into_response(),
            Ok(None) => {
                let user = repo.create(&body).await;

                match user {
                    Ok(user) => success_response(SuccessResponse {
                        status_code: StatusCode::CREATED.as_u16(),
                        message: String::from("User created successfully."),
                        data: user,
                    })
                    .into_response(),
                    Err(_err) => common_response(
                        String::from("Failed to create user"),
                        StatusCode::INTERNAL_SERVER_ERROR,
                    )
                    .into_response(),
                }
            }
            Err(_err) => common_response(
                String::from("Failed to check for existing user"),
                StatusCode::INTERNAL_SERVER_ERROR,
            )
            .into_response(),
        }
    }

    pub async fn update(body: CreateOrUpdateUserDto, id: String, state: &AppState) -> Response {
        let repo = UserRepository::new(state);

        let existing_user = repo.get_user_with_email(&body.email).await;

        match existing_user {
            Ok(Some(_user)) => common_response(
                String::from("User with this email already exists"),
                StatusCode::CONFLICT,
            )
            .into_response(),
            Ok(None) => {
                let updated_user = repo.update(id, &body).await;

                match updated_user {
                    Ok(user) => success_response(SuccessResponse {
                        status_code: StatusCode::OK.as_u16(),
                        message: String::from("User updated successfully."),
                        data: user,
                    })
                    .into_response(),
                    Err(_err) => common_response(
                        String::from("Failed to update user"),
                        StatusCode::INTERNAL_SERVER_ERROR,
                    )
                    .into_response(),
                }
            }
            Err(_err) => common_response(
                String::from("Failed to check for existing user"),
                StatusCode::INTERNAL_SERVER_ERROR,
            )
            .into_response(),
        }
    }

    pub async fn delete(id: String, state: &AppState) -> Response {
        let repo = UserRepository::new(state);

        let existing_user = repo.get_user_with_id(&id).await;

        match existing_user {
            Ok(Some(_user)) => {
                let deleted_user = repo.soft_delete(&id).await;

                match deleted_user {
                    Ok(_) => {
                        common_response(String::from("User deleted successfully"), StatusCode::OK)
                            .into_response()
                    }
                    Err(_err) => common_response(
                        String::from("Failed to delete user"),
                        StatusCode::INTERNAL_SERVER_ERROR,
                    )
                    .into_response(),
                }
            }

            // User not found
            Ok(None) => common_response(String::from("User not found"), StatusCode::NOT_FOUND)
                .into_response(),

            Err(_err) => common_response(
                String::from("Failed to fetch user"),
                StatusCode::INTERNAL_SERVER_ERROR,
            )
            .into_response(),
        }
    }
}
