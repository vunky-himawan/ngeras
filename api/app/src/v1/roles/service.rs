use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
};
use common::{AppState, BaseParams, success::SuccessResponse};
use utils::response::{
    create_pagination::create_pagination_response,
    formatter::{common_response, paginate_response, success_response},
};

use crate::{
    roles::validation::validate_permission_ids,
    v1::roles::{RoleRepository, dto::CreateOrUpdateRoleDTO},
};

pub struct RoleService;

impl RoleService {
    pub async fn find_many(params: BaseParams, state: &AppState) -> Response {
        let repository = RoleRepository::new(state);

        let roles = repository.get_roles_with_pagination(params).await;

        match roles {
            Ok(roles) => {
                let response = create_pagination_response(roles);

                paginate_response(response).into_response()
            }
            Err(_err) => common_response(
                String::from("Failed to fetch roles"),
                StatusCode::INTERNAL_SERVER_ERROR,
            )
            .into_response(),
        }
    }

    pub async fn find(id: i64, state: &AppState) -> Response {
        let repository = RoleRepository::new(state);

        let role = repository.get_role_by_id(id).await;

        match role {
            Ok(Some(role)) => success_response(SuccessResponse {
                status_code: StatusCode::OK.as_u16(),
                message: String::from("Role fetched successfully."),
                data: role,
            })
            .into_response(),

            Ok(None) => common_response(String::from("Role not found"), StatusCode::NOT_FOUND)
                .into_response(),

            Err(_err) => common_response(
                String::from("Failed to fetch role"),
                StatusCode::INTERNAL_SERVER_ERROR,
            )
            .into_response(),
        }
    }

    pub async fn create_role(dto: CreateOrUpdateRoleDTO, state: &AppState) -> Response {
        let repository = RoleRepository::new(state);

        if let Ok(Some(_)) = repository.get_role_by_name(dto.name.clone()).await {
            return common_response("Role already exists".to_string(), StatusCode::BAD_REQUEST)
                .into_response();
        }

        if let Err(err_msg) = validate_permission_ids(dto.permission_ids.as_ref(), state).await {
            return common_response(err_msg, StatusCode::BAD_REQUEST).into_response();
        }

        match repository.create_role_with_permissions(&dto).await {
            Ok(role) => success_response(SuccessResponse {
                status_code: StatusCode::CREATED.as_u16(),
                message: "Role created successfully.".to_string(),
                data: role,
            })
            .into_response(),

            Err(error) => {
                println!("Error creating role : {:?}", error);
                common_response(
                    "Failed to create role".to_string(),
                    StatusCode::INTERNAL_SERVER_ERROR,
                )
                .into_response()
            }
        }
    }

    pub async fn update_role(id: i64, dto: CreateOrUpdateRoleDTO, state: &AppState) -> Response {
        let repository = RoleRepository::new(state);

        let role_with_duplicate_name = repository.get_role_by_name(dto.name.clone()).await;

        match role_with_duplicate_name {
            Ok(Some(_role)) => {
                common_response(String::from("Role already exists"), StatusCode::BAD_REQUEST)
                    .into_response()
            }

            Ok(None) => {
                let updated_role = repository.update_role(id, &dto).await;

                match updated_role {
                    Ok(role) => success_response(SuccessResponse {
                        status_code: StatusCode::OK.as_u16(),
                        message: String::from("Role updated successfully."),
                        data: role,
                    })
                    .into_response(),

                    Err(_err) => common_response(
                        String::from("Failed to update role"),
                        StatusCode::INTERNAL_SERVER_ERROR,
                    )
                    .into_response(),
                }
            }
            Err(_err) => common_response(
                String::from("Failed to fetch role"),
                StatusCode::INTERNAL_SERVER_ERROR,
            )
            .into_response(),
        }
    }

    pub async fn delete_role(id: i64, state: &AppState) -> Response {
        let repository = RoleRepository::new(state);

        let deleted_role = repository.delete_role(id).await;

        match deleted_role {
            Ok(_) => common_response(String::from("Role deleted successfully."), StatusCode::OK)
                .into_response(),

            Err(_err) => common_response(
                String::from("Failed to delete role"),
                StatusCode::INTERNAL_SERVER_ERROR,
            )
            .into_response(),
        }
    }
}
