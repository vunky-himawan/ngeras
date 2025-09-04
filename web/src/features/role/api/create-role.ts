import { POST } from "@/shared/api/client";
import type { TCreateOrUpdateRole } from "../model/create-or-update-role.schema";

export const createRole = async (payload: TCreateOrUpdateRole) => {
  const response = await POST("/roles", payload);

  const data = await response.data.data;

  return data;
};
