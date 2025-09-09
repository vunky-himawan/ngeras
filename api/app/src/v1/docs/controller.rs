use utoipa::OpenApi;

#[derive(OpenApi)]
#[openapi(
    paths(crate::v1::roles::find_many),
    components(),
    info(title = "My API", version = "1.0.0", description = "API documentation",)
)]
pub struct ApiDoc;
