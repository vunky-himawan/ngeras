-- Add migration script here
ALTER TABLE role_has_permissions
    RENAME COLUMN role_id TO role_has_permissions_role_id;

ALTER TABLE role_has_permissions
    RENAME COLUMN permission_id TO role_has_permissions_permission_id;

ALTER TABLE role_has_permissions
    DROP CONSTRAINT role_has_permissions_pkey;

ALTER TABLE role_has_permissions
    ADD PRIMARY KEY (role_has_permissions_role_id, role_has_permissions_permission_id);

ALTER TABLE role_has_permissions
    ADD FOREIGN KEY (role_has_permissions_role_id) REFERENCES roles(role_id) ON DELETE CASCADE;

ALTER TABLE role_has_permissions
    ADD FOREIGN KEY (role_has_permissions_permission_id) REFERENCES permissions(permission_id) ON DELETE CASCADE;
