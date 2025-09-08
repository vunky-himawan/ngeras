use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
};
use common::{AppState, BaseParams, success::SuccessResponse};
use utils::response::{
    create_pagination::create_pagination_response,
    formatter::{common_response, paginate_response, success_response},
};

use crate::permissions::{dto::UpdatePermissionDTO, repository::PermissionRepository};

pub struct PermissionService;

impl PermissionService {
    pub async fn find_many(params: BaseParams, state: &AppState) -> Response {
        let repo = PermissionRepository::new(state);

        let result = repo.get_permissions_with_pagination(params).await;

        match result {
            Ok(permissions) => {
                let response = create_pagination_response(permissions);

                paginate_response(response).into_response()
            }

            Err(err) => {
                println!("error: {:?}", err);

                common_response(
                    String::from("Failed to fetch permissions"),
                    StatusCode::INTERNAL_SERVER_ERROR,
                )
                .into_response()
            }
        }
    }

    pub async fn find(id: i64, state: &AppState) -> Response {
        let repo = PermissionRepository::new(state);

        let permission = repo.get_permission_by_id(id).await;

        match permission {
            Ok(Some(permission)) => success_response(SuccessResponse {
                status_code: StatusCode::OK.as_u16(),
                message: String::from("Permission fetched successfully."),
                data: permission,
            })
            .into_response(),

            Ok(None) => {
                common_response(String::from("Permission not found"), StatusCode::NOT_FOUND)
                    .into_response()
            }

            Err(_err) => common_response(
                String::from("Failed to fetch permission"),
                StatusCode::INTERNAL_SERVER_ERROR,
            )
            .into_response(),
        }
    }

    pub async fn update(id: i64, dto: UpdatePermissionDTO, state: &AppState) -> Response {
        let repo = PermissionRepository::new(state);

        let permission_with_duplicate_name = repo.get_permission_by_id(id).await;

        match permission_with_duplicate_name {
            Ok(Some(_permission)) => common_response(
                String::from("Permission already exists"),
                StatusCode::BAD_REQUEST,
            )
            .into_response(),

            Ok(None) => {
                let updated_permission = repo.update_permission(id, dto.description).await;

                match updated_permission {
                    Ok(permission) => success_response(SuccessResponse {
                        status_code: StatusCode::OK.as_u16(),
                        message: String::from("Permission updated successfully."),
                        data: permission,
                    })
                    .into_response(),

                    Err(_err) => common_response(
                        String::from("Failed to update permission"),
                        StatusCode::INTERNAL_SERVER_ERROR,
                    )
                    .into_response(),
                }
            }
            Err(_err) => common_response(
                String::from("Failed to fetch permission"),
                StatusCode::INTERNAL_SERVER_ERROR,
            )
            .into_response(),
        }
    }
}
