-- Add migration script here
ALTER TABLE users
    RENAME COLUMN id TO user_id;

ALTER TABLE users
    RENAME COLUMN password TO user_password;

ALTER TABLE users
    RENAME COLUMN role_id TO user_role_id;

ALTER TABLE users
    RENAME COLUMN created_at TO user_created_at;

ALTER TABLE users
    RENAME COLUMN updated_at TO user_updated_at;

ALTER TABLE users
    RENAME COLUMN deleted_at TO user_deleted_at;

ALTER TABLE users
    RENAME COLUMN verified TO user_verified;

ALTER TABLE users
    RENAME COLUMN name TO user_name;

ALTER TABLE users
    RENAME COLUMN email TO user_email;

ALTER TABLE users
    RENAME COLUMN gender TO user_gender;
