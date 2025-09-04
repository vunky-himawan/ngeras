import type { TSource } from "@/shared/types/pagination";
import type { TBaseQueryParams } from "@/shared/types/query-params";
import type { Role } from "../model/types";
import { GET } from "@/shared/api/client";
import { makeSource } from "@/shared/utils/pagination";

export const findMany = async (params: TBaseQueryParams): Promise<TSource<Role[]>> => {
  const response = await GET("/roles", { params });

  const data = response.data;

  return makeSource<Role[]>(data);
};
