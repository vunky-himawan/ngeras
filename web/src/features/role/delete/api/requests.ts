import { DELETE } from "@/shared/api/client";

export const remove = async (id: number) => {
  const response = await DELETE(`/roles/${id}`);

  return response.data.data;
};
