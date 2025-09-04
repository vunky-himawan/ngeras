import { useMemo } from "react";
import { useQueryParams } from "@/shared/hooks/filters/use-query-params";
import { useFilters } from "@/shared/hooks/filters/use-filters";
import { useDebounce } from "@/shared/hooks/use-debounce";

export function useQueryFilters<
  TFilters extends {
    page: number;
    per_page: number;
    search: string;
    sort?: string;
    order?: "asc" | "desc";
    [key: string]: string | number | boolean | undefined;
  },
>() {
  const defaultValues: TFilters = {
    page: 1,
    per_page: 10,
    search: "",
  } as TFilters;

  const { search, setParams } = useQueryParams<TFilters>();
  const { filters, updateFilters } = useFilters<TFilters>({ ...defaultValues, ...search });

  const debouncedSearch = useDebounce((value: string) => {
    updateFilters({ search: value } as Partial<TFilters>);
    setParams({ ...filters, search: value, page: 1, per_page: 10 } as Partial<TFilters>);
  }, 500);

  const handleChange = {
    onFilterChange: (newFilters: Partial<TFilters>) => {
      updateFilters(newFilters);
      setParams({ ...filters, ...newFilters, page: 1, per_page: 10 });
    },
    onSortingChange: (sort: string, order: "asc" | "desc") => {
      updateFilters({ sort, order } as Partial<TFilters>);
      setParams({ ...filters, sort, order, page: 1, per_page: 10 } as Partial<TFilters>);
    },
    onPaginationChange: (page: number, per_page: number) => {
      updateFilters({ page, per_page } as Partial<TFilters>);
      setParams({ ...filters, page, per_page } as Partial<TFilters>);
    },
    onSearch: (searchTerm: string) => {
      debouncedSearch(searchTerm);
    },
  };

  const pagination = useMemo(
    () => ({
      page: filters.page,
      per_page: filters.per_page,
    }),
    [filters.page, filters.per_page],
  );

  return { search: filters.search, handleChange, pagination, filters };
}
