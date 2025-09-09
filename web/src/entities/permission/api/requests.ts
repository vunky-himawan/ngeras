import { GET } from "@/shared/api/client";
import type { TSource } from "@/shared/types/pagination";
import type { TBaseQueryParams } from "@/shared/types/query-params";
import { makeSource } from "@/shared/utils/pagination";
import type { Permission } from "../model/types";

export const getPermissions = async (params: TBaseQueryParams): Promise<TSource<Permission[]>> => {
  const response = await GET("/permissions", { params });

  const data = response.data;

  return makeSource(data);
};

export const getPermission = async (id: number) => {
  const response = await GET(`/permissions/${id}`);

  const data = response.data;

  return data.data;
};
