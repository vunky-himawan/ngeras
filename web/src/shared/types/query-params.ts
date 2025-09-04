import z from "zod";

export interface IPaginationMeta {
  total: number;
  page_size: number;
  total_pages: number;
  page: number;
}

export const BaseQueryParamsSchema = z.object({
  page: z.number().optional(),
  per_page: z.number().optional(),
  search: z.string().optional(),
});

export type TBaseQueryParams = z.infer<typeof BaseQueryParamsSchema>;
