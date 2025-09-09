import { PATCH } from "@/shared/api/client";
import type { TUpdatePermission } from "../model/update.schema";

export const updatePermission = async ({ id, data }: { id: number; data: TUpdatePermission }) => {
  delete data.name; // name is not updatable
  const response = await PATCH(`/permissions/${id}`, data);

  console.log("Response:", response);

  return response.data;
};
