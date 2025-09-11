import type { Role } from "@/entities/role/model/types";

export enum Gender {
  Male = "Male",
  Female = "Female",
}

export type User = {
  user_id: string;
  user_email: string;
  user_name: string;
  user_gender: Gender;
  user_role_id: number;
  user_created_at: string;
  user_updated_at: string;
  user_deleted_at: string | null;
};

export type UserWithRole = Omit<User, "role_id"> & {
  user_role: Role;
};
