import { roleQueries } from "@/entities/role/api/queries";
import type { TBreadcrumbItem } from "@/shared/types/breadcrumb";
import { AdminPage } from "@/widgets/admin/ui/container";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";

const route = getRouteApi("/(admin)/roles/$roleId/");

export const DetailRolePage = () => {
  const { roleId } = route.useParams();

  const { data, isLoading } = useQuery(roleQueries.find(Number(roleId)));

  const breadcrumbs: TBreadcrumbItem[] = [
    { label: "Dashboard", path: "/dashboard" },
    {
      label: "Roles",
      path: "/roles",
    },
    {
      label: "Role Detail",
      path: `/roles/$roleId`,
    },
  ];

  return (
    <AdminPage
      breadcrumbs={breadcrumbs}
      title="Role Detail"
      isLoading={isLoading}
      description="Role detail page"
    >
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </AdminPage>
  );
};
