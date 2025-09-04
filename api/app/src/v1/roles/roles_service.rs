use axum::{
    http::StatusCode,
    response::{IntoResponse, Response},
};
use common::{AppState, BaseParams, success::SuccessResponse};
use utils::response::{
    create_pagination::create_pagination_response,
    formatter::{common_response, paginate_response, success_response},
};

use crate::v1::roles::{RoleRepository, roles_dto::CreateRoleDTO};

pub struct RoleService;

impl RoleService {
    pub async fn find_many(params: BaseParams, state: &AppState) -> Response {
        let repository = RoleRepository::new(state);

        let roles = repository
            .get_roles_with_pagination(params.page.unwrap_or(1), params.per_page.unwrap_or(10))
            .await;

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

    pub async fn create_role(dto: CreateRoleDTO, state: &AppState) -> Response {
        let repository = RoleRepository::new(state);

        let existing_role = repository.get_role_by_name(dto.name.clone()).await;

        match existing_role {
            Ok(Some(_role)) => {
                common_response(String::from("Role already exists"), StatusCode::BAD_REQUEST)
                    .into_response()
            }

            Ok(None) => {
                let created_role = repository.create_role(&dto).await;

                match created_role {
                    Ok(role) => success_response(SuccessResponse {
                        status_code: StatusCode::CREATED.as_u16(),
                        message: String::from("Role created successfully."),
                        data: role,
                    })
                    .into_response(),

                    Err(_err) => common_response(
                        String::from("Failed to create role"),
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
}
