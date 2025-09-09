import type { TBaseQueryParams } from "@/shared/types/query-params";
import { queryOptions } from "@tanstack/react-query";
import { find, findMany } from "./requests";

export const roleQueries = {
  findMany: (params: TBaseQueryParams) =>
    queryOptions({
      queryKey: roleQueryKeys.list(params || {}),
      queryFn: () => findMany(params),
    }),
  find: (id?: number) =>
    queryOptions({
      queryKey: roleQueryKeys.detail(id!),
      queryFn: () => find(id!),
      enabled: !!id,
    }),
};

export const roleQueryKeys = {
  all: ["roles"] as const,
  lists: () => [...roleQueryKeys.all, "list"] as const,
  list: (params: TBaseQueryParams) => [...roleQueryKeys.lists(), params] as const,
  details: () => [...roleQueryKeys.all, "detail"] as const,
  detail: (id: number) => [...roleQueryKeys.details(), id] as const,
};
