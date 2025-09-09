import { useQuery } from "@tanstack/react-query";
import { roleQueries } from "../api/queries";
import type { TBaseQueryParams } from "@/shared/types/query-params";

export const useGetRoles = (params: TBaseQueryParams) => {
  return useQuery(roleQueries.findMany(params));
};

export const useGetRole = (id?: number) => {
  return useQuery(roleQueries.find(id));
};
