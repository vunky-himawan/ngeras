import { GET } from "@/shared/api/client";
import { makeSource } from "@/shared/utils/pagination";
import type { Role } from "../model/types";
import type { TBaseQueryParams } from "@/shared/types/query-params";
import type { TSource } from "@/shared/types/pagination";

export const find = async (id: number): Promise<Role> => {
  const response = await GET(`/roles/${id}`);

  const data = response.data;

  return data.data;
};

export const findMany = async (params: TBaseQueryParams): Promise<TSource<Role[]>> => {
  const response = await GET("/roles", { params });

  const data = response.data;

  return makeSource<Role[]>(data);
};
