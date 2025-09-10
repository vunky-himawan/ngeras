import { UserDataTable } from "@/entities/user/ui/table/table";
import type { TBreadcrumbItem } from "@/shared/types/breadcrumb";
import { AdminPage } from "@/shared/ui/admin/container";

export const UsersPage = () => {
  const breadcrumbs: TBreadcrumbItem[] = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Users", path: "/users" },
  ];

  return (
    <AdminPage
      breadcrumbs={breadcrumbs}
      title="User Management"
      description="Manage application users and their roles"
    >
      <UserDataTable />
    </AdminPage>
  );
};
