use utoipa::OpenApi;

pub mod controller;

pub use controller::*;

pub fn api_v1_docs_route() -> utoipa::openapi::OpenApi {
    ApiDoc::openapi()
}
