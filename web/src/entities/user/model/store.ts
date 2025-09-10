import { useQuery } from "@tanstack/react-query";
import { userQueries } from "../api/queries";
import type { TBaseQueryParams } from "@/shared/types/query-params";

export const useUsers = (params: TBaseQueryParams) => {
  return useQuery(userQueries.findMany(params));
};

export const useUser = (id?: string) => {
  return useQuery(userQueries.find(id));
};
