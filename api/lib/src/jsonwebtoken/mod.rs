use axum::http::StatusCode;
use chrono::{Duration, TimeDelta, Utc};
use config::JWTConfig;
use jsonwebtoken::{DecodingKey, EncodingKey, Header, Validation, decode, encode};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Claims {
    pub exp: usize,
    pub iat: usize,
    pub sub: String,
}

pub fn generate_access_token(sub: String) -> Result<String, StatusCode> {
    let jwt_config = JWTConfig::new();
    let secret = jwt_config.access_token_secret;
    let now = Utc::now();
    let expire: TimeDelta = Duration::minutes(15);
    let exp: usize = (now + expire).timestamp() as usize;
    let iat: usize = now.timestamp() as usize;
    let claims = Claims { exp, iat, sub };
    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret.as_ref()),
    )
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)
}

pub fn generate_refresh_token(sub: String) -> Result<String, StatusCode> {
    let jwt_config = JWTConfig::new();
    let secret = jwt_config.refresh_token_secret;
    let now = Utc::now();
    let expire: TimeDelta = Duration::days(30);
    let exp: usize = (now + expire).timestamp() as usize;
    let iat: usize = now.timestamp() as usize;
    let claims = Claims { exp, iat, sub };
    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret.as_ref()),
    )
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)
}

pub fn verify_access_token(token: String) -> Result<Claims, StatusCode> {
    let jwt_config = JWTConfig::new();
    let secret = jwt_config.access_token_secret;
    decode(
        &token,
        &DecodingKey::from_secret(secret.as_ref()),
        &Validation::default(),
    )
    .map(|data| data.claims)
    .map_err(|_| StatusCode::UNAUTHORIZED)
}

pub fn verify_refresh_token(token: String) -> Result<Claims, StatusCode> {
    let jwt_config = JWTConfig::new();
    let secret = jwt_config.refresh_token_secret;
    decode(
        &token,
        &DecodingKey::from_secret(secret.as_ref()),
        &Validation::default(),
    )
    .map(|data| data.claims)
    .map_err(|_| StatusCode::UNAUTHORIZED)
}

pub fn decode_jwt(token: String) -> Result<Claims, StatusCode> {
    let jwt_config = JWTConfig::new();
    let secret = jwt_config.access_token_secret;
    decode(
        &token,
        &DecodingKey::from_secret(secret.as_ref()),
        &Validation::default(),
    )
    .map(|data| data.claims)
    .map_err(|_| StatusCode::UNAUTHORIZED)
}
