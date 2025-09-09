import type { TBaseQueryParams } from "@/shared/types/query-params";
import { queryOptions } from "@tanstack/react-query";
import { getPermission, getPermissions } from "./requests";

export const permissionQueries = {
  list: (params: TBaseQueryParams) =>
    queryOptions({
      queryKey: permissionQueryKeys.list(params || {}),
      queryFn: () => getPermissions(params),
    }),
  find: (id?: number) =>
    queryOptions({
      queryKey: permissionQueryKeys.detail(id!),
      queryFn: () => getPermission(id!),
      enabled: !!id,
    }),
};

export const permissionQueryKeys = {
  all: ["permissions"] as const,
  lists: () => [...permissionQueryKeys.all, "list"] as const,
  list: (params: TBaseQueryParams) => [...permissionQueryKeys.lists(), params] as const,
  details: () => [...permissionQueryKeys.all, "detail"] as const,
  detail: (id: number) => [...permissionQueryKeys.details(), id] as const,
};
