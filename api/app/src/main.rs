use app::build_routes;
use libs::axum_init;

#[tokio::main]
async fn main() {
    println!("🚀 Starting API server...");

    axum_init(build_routes).await;
}
