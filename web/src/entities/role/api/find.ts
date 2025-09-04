import { GET } from "@/shared/api/client";

export const find = async (id: number) => {
  const response = await GET(`/roles/${id}`);

  const data = response.data;

  return data.data;
};
