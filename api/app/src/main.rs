use app::build_routes;
use lib::axum_init;

#[tokio::main]
async fn main() {
    println!("🚀 Starting API server...");

    axum_init(build_routes).await;
}
