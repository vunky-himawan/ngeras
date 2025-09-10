import { DataTable } from "@/shared/ui/table/data-table";
import { UserColumnFactory } from "./column-factory";
import { useUsers } from "../../model/store";
import { useQueryFilters } from "@/features/filter";
import { makePagination } from "@/shared/utils/pagination";

export const UserDataTable = () => {
  const { pagination, handleChange, search } = useQueryFilters();

  const columns = UserColumnFactory();

  const { data, isLoading } = useUsers({
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
      placeholderSearch="Search users..."
    />
  );
};
