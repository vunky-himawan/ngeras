import { useQuery } from "@tanstack/react-query";
import { userQueries } from "../api/queries";
import type { TBaseQueryParams } from "@/shared/types/query-params";

export const useGetUsers = (params: TBaseQueryParams) => {
  return useQuery(userQueries.findMany(params));
};

export const useGetUser = (id?: string) => {
  return useQuery(userQueries.find(id));
};
