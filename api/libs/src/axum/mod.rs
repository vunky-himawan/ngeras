use std::net::SocketAddr;

use axum::{Router, serve};
use config::AppConfig;
use tokio::net::TcpListener;

use crate::Database;

pub async fn axum_init<F, Fut>(router_fn: F)
where
    F: FnOnce(Database) -> Fut,
    Fut: Future<Output = Router>,
{
    let app_config = AppConfig::new();

    let db = Database::connect()
        .await
        .expect("Failed to connect to the database");

    let router = router_fn(db).await;

    let addr = format!("{}:{}", app_config.host, app_config.port)
        .parse::<SocketAddr>()
        .expect("Invalid address");

    println!("{} v{} starting up...", app_config.name, app_config.version);

    let listener = TcpListener::bind(addr).await.unwrap();

    println!("Listening on {}", addr);

    match serve(listener, router).await {
        Ok(_) => println!("Server exited normally"),
        Err(e) => eprintln!("Server error: {}", e),
    }
}
