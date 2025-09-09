use crate::v1::*;
use utoipa::OpenApi;

#[derive(OpenApi)]
#[openapi(
    paths(
        roles::controller::find_many,
        roles::controller::find,
        roles::controller::create,
        roles::controller::update,
        roles::controller::remove,
        permissions::controller::find_many,
        permissions::controller::find,
        permissions::controller::update,
    ),
    components(),
    info(title = "My API", version = "1.0.0", description = "API documentation",)
)]
pub struct ApiDoc;
