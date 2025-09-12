use common::AppState;

use crate::permissions::repository::PermissionRepository;

pub async fn validate_permission_ids(
    permission_ids: Option<&Vec<i64>>,
    state: &AppState,
) -> Result<(), String> {
    if let Some(ids) = permission_ids {
        if ids.is_empty() {
            return Ok(());
        }

        let permission_repository = PermissionRepository::new(state);

        // Cek permission invalid
        let invalid_ids: Vec<i64> = ids
            .iter()
            .cloned()
            .collect::<std::collections::HashSet<_>>()
            .difference(
                &permission_repository
                    .find_existing_permission_ids(ids)
                    .await
                    .map_err(|_| "Failed to fetch permissions".to_string())?
                    .into_iter()
                    .collect::<std::collections::HashSet<_>>(),
            )
            .cloned()
            .collect();

        if !invalid_ids.is_empty() {
            return Err(format!("Invalid permission IDs: {:?}", invalid_ids));
        }
    }
    Ok(())
}
