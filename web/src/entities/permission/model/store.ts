import { useQuery } from "@tanstack/react-query";
import { permissionQueries } from "../api/queries";
import type { TBaseQueryParams } from "@/shared/types/query-params";

export const useGetPermissions = (params: TBaseQueryParams) => {
  return useQuery(permissionQueries.list(params));
};

export const useGetPermission = (id?: number) => {
  return useQuery(permissionQueries.find(id));
};
