import { DataTable } from "@/shared/ui/table/data-table";
import { RolesTableColumnFactory } from "./column-factory";
import { useGetRoles } from "@/entities/role/model/store";
import { useQueryFilters } from "@/features/filter";
import { makePagination } from "@/shared/utils/pagination";

export const RolesDataTable = () => {
  const { pagination, search, handleChange } = useQueryFilters();

  const columns = RolesTableColumnFactory();

  const { data } = useGetRoles({
    ...makePagination(pagination),
    search,
  });

  return (
    <DataTable
      columns={columns}
      source={data}
      handleChange={handleChange}
      search={search}
      placeholderSearch="Search roles..."
    />
  );
};
