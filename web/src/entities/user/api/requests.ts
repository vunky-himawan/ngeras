import { GET } from "@/shared/api/client";
import type { TSource } from "@/shared/types/pagination";
import type { TBaseQueryParams } from "@/shared/types/query-params";
import { makeSource } from "@/shared/utils/pagination";
import type { UserWithRole } from "../model/types";

export const getUsers = async (params: TBaseQueryParams): Promise<TSource<UserWithRole[]>> => {
  const response = await GET("/users", { params });

  const data = response.data;

  return makeSource(data);
};

export const getUser = async (id: string): Promise<UserWithRole> => {
  const response = await GET(`/users/${id}`);

  return response.data.data;
};
