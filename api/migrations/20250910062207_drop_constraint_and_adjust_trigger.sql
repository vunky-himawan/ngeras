-- Add migration script here
ALTER TABLE users
    DROP CONSTRAINT IF EXISTS users_role_id_fkey;

ALTER TABLE users
    ADD CONSTRAINT users_user_role_id_fkey
    FOREIGN KEY (user_role_id) REFERENCES roles(role_id) ON DELETE SET NULL;

DROP TRIGGER IF EXISTS update_users_updated_at ON users;

CREATE OR REPLACE FUNCTION update_users_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.user_updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_user_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_users_updated_at_column();
