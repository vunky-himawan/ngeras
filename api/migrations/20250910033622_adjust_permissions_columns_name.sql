-- Add migration script here
ALTER TABLE permissions
    RENAME COLUMN id TO permission_id;

ALTER TABLE permissions
    RENAME COLUMN name TO permission_name;

ALTER TABLE permissions
    RENAME COLUMN description TO permission_description;
