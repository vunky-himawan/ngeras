-- Add migration script here
ALTER TABLE roles
    RENAME COLUMN id TO role_id;

ALTER TABLE roles
    RENAME COLUMN created_at TO role_created_at;

ALTER TABLE roles
    RENAME COLUMN updated_at TO role_updated_at;

ALTER TABLE roles
    RENAME COLUMN name TO role_name;

ALTER TABLE roles
    RENAME COLUMN description TO role_description;
