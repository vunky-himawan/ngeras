import { PUT } from "@/shared/api/client";
import type { TCreateOrUpdateRole } from "../model/create-or-update-role.schema";

export const updateRole = async (id: number, data: TCreateOrUpdateRole) => {
  const response = await PUT(`/roles/${id}`, data);

  return response.data.data;
};
