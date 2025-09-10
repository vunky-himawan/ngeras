import type { TBaseQueryParams } from "@/shared/types/query-params";
import { queryOptions } from "@tanstack/react-query";
import { getUser, getUsers } from "./requests";

export const userQueries = {
  findMany: (params: TBaseQueryParams) =>
    queryOptions({
      queryKey: userQueryKeys.list(params || {}),
      queryFn: () => getUsers(params),
    }),
  find: (id?: string) =>
    queryOptions({
      queryKey: userQueryKeys.detail(id!),
      queryFn: () => getUser(id!),
      enabled: !!id,
    }),
};

export const userQueryKeys = {
  all: ["users"] as const,
  lists: () => [...userQueryKeys.all, "list"] as const,
  list: (params: TBaseQueryParams) => [...userQueryKeys.lists(), { params }] as const,
  details: () => [...userQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...userQueryKeys.details(), id] as const,
};
