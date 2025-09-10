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
        permissions::controller::find_many,
        permissions::controller::find,
        permissions::controller::update,
        users::controller::find_many,
        users::controller::find,
        users::controller::create,
        users::controller::update,
        users::controller::delete,
    ),
    components(),
    info(title = "My API", version = "1.0.0", description = "API documentation",)
)]
pub struct ApiDoc;
