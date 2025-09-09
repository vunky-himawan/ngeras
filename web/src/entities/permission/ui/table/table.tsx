import { DataTable } from "@/shared/ui/table/data-table";
import { PermissionColumnFactory } from "./column-factory";
import { useGetPermissions } from "../../model/store";
import { useQueryFilters } from "@/features/filter";
import { makePagination } from "@/shared/utils/pagination";

export const PermissionDataTable = () => {
  const columns = PermissionColumnFactory();

  const { handleChange, search, pagination } = useQueryFilters();

  const { data, isLoading } = useGetPermissions({
    ...makePagination(pagination),
    search,
  });

  return (
    <DataTable
      columns={columns}
      source={data}
      isLoading={isLoading}
      handleChange={handleChange}
      search={search}
      placeholderSearch="Search permissions..."
    />
  );
};
