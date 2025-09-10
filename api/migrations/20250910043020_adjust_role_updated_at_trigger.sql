-- Add migration script here
CREATE OR REPLACE FUNCTION set_role_updated_at()
RETURNS TRIGGER AS $$
BEGIN
   NEW.role_updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_roles_updated_at ON roles;

CREATE TRIGGER update_roles_role_updated_at
BEFORE UPDATE ON roles
FOR EACH ROW
EXECUTE FUNCTION set_role_updated_at();

