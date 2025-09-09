import { PUT } from "@/shared/api/client";
import type { TCreateOrUpdateRole } from "@/shared/lib/zod-validations/role/create-or-update-role.schema";

export const updateRole = async (id: number, data: TCreateOrUpdateRole) => {
  const response = await PUT(`/roles/${id}`, data);

  return response.data.data;
};
