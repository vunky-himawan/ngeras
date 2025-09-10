use crate::v1::*;
use utoipa::OpenApi;

#[derive(OpenApi)]
#[openapi(
    paths(
        roles::controller::get_roles,
        roles::controller::get_role,
        roles::controller::create_role,
        roles::controller::update_role,
        roles::controller::delete_role,
        permissions::controller::get_permissions,
        permissions::controller::get_permission,
        permissions::controller::update_permission,
        users::controller::get_users,
        users::controller::get_user,
        users::controller::create_user,
        users::controller::update_user,
        users::controller::delete_user,
    ),
    components(),
    info(title = "My API", version = "1.0.0", description = "API documentation",)
)]
pub struct ApiDoc;
