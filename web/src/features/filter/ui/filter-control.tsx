import { useState, type FC } from "react";
import { useFilters } from "@/shared/hooks/filters/use-filters";
import { useQueryParams } from "@/shared/hooks/filters/use-query-params";
import type { TFilterItem } from "@/shared/types/filter";
import { FilterPanel } from "@/shared/ui/filter/filter-panel";
import { FilterItem } from "@/shared/ui/filter/filter-item";
import type { TLocalFilter } from "../model";

interface Props {
  filterItems?: TFilterItem[];
  onFilterChange?: (filters: Record<string, string | number | undefined>) => void;
}

export const FilterControl: FC<Props> = ({ filterItems, onFilterChange = () => {} }) => {
  const [filters, setFilters] = useState<TLocalFilter>({});
  const { updateFilters } = useFilters<TLocalFilter>();
  const { setParams } = useQueryParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const resetFilters = () => {
    const params: Partial<TLocalFilter> = {};

    if (filters.search && filters.search !== "") {
      params.search = filters.search;
    }

    params.page = filters.page ?? 1;
    params.per_page = filters.per_page ?? 10;

    updateFilters(params);
    setParams(params);
    setFilters(params as TLocalFilter);
  };

  const setFilter = (key: keyof TLocalFilter, value: TLocalFilter[keyof TLocalFilter]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <FilterPanel filterItems={filterItems} onFilterChange={handleSubmit} onReset={resetFilters}>
      {filterItems?.map((filter) => (
        <FilterItem
          key={filter.key}
          onFilterChange={(newFilter) => {
            const key = Object.keys(newFilter)[0] as keyof typeof filters;
            const value = newFilter[key];
            setFilter(key, value as (typeof filters)[typeof key]);
          }}
          filter={filter}
        />
      ))}
    </FilterPanel>
  );
};
