import type { TPaginationResponse } from "@/shared/types/pagination";
import type { TBaseQueryParams } from "../types/query-params";

export const makeSource = <T>(data?: TPaginationResponse<T>) => {
  return {
    data: data?.data,
    meta: data?.meta,
  };
};

export const makePagination = (pagination: Omit<TBaseQueryParams, "search">) => {
  return {
    page: pagination.page ?? 1,
    per_page: pagination.per_page ?? 10,
  };
};
