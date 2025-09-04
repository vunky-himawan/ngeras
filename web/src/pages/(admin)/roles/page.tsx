import { roleQueries } from "@/entities/role/api/queries";
import { useDeleteRole } from "@/entities/role/model/context";
import { useRoleTableColumns } from "@/entities/role/ui/column";
import { useQueryFilters } from "@/features/filter";
import DeleteRoleDialog from "@/features/role/ui/delete-dialog";
import type { TBreadcrumbItem } from "@/shared/types/breadcrumb";
import { Button } from "@/shared/ui/button";
import { Dialog } from "@/shared/ui/dialog";
import { DataTable } from "@/shared/ui/table/data-table";
import { makePagination } from "@/shared/utils/pagination";
import { AdminPage } from "@/widgets/admin/ui/container";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

const RolesPage = () => {
  const { pagination, handleChange, search } = useQueryFilters();
  const roleTableColumns = useRoleTableColumns();
  const { isModalOpen, setIsModalOpen } = useDeleteRole();

  const { data, isLoading } = useQuery(
    roleQueries.findMany({
      ...makePagination(pagination),
    }),
  );

  const breadcrumbs: TBreadcrumbItem[] = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Roles", path: "/roles" },
  ];

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <AdminPage
        title="Roles Management"
        description="Manage user roles and permissions here."
        breadcrumbs={breadcrumbs}
        isLoading={isLoading}
        topAction={<TopAction />}
      >
        <DataTable
          columns={roleTableColumns}
          source={data}
          handleChange={handleChange}
          search={search}
          placeholderSearch="Search roles..."
        />
        <DeleteRoleDialog />
      </AdminPage>
    </Dialog>
  );
};

const TopAction = () => {
  return (
    <Link to="/roles/create">
      <Button>
        Create Role
        <Plus />
      </Button>
    </Link>
  );
};

export default RolesPage;
