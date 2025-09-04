import { roleQueries } from "@/entities/role/api/queries";
import { roleMutations } from "@/features/role/api/mutations";
import {
  CreateOrUpdateRoleSchema,
  type TCreateOrUpdateRole,
} from "@/features/role/model/create-or-update-role.schema";
import { CreateOrUpdateFormField } from "@/features/role/ui/create-or-update-form-field";
import { useToast } from "@/shared/hooks/use-toast";
import type { TBreadcrumbItem } from "@/shared/types/breadcrumb";
import { DynamicForm } from "@/shared/ui/form/dynamic-form";
import { AdminPage } from "@/widgets/admin/ui/container";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getRouteApi, useRouter } from "@tanstack/react-router";

const route = getRouteApi("/(admin)/roles/$roleId/update/");

export const UpdateRolePage = () => {
  const { roleId } = route.useParams();
  const { showToast } = useToast();
  const router = useRouter();

  const { mutate } = useMutation(
    roleMutations.updateRole({
      onSuccess: async () => {
        await router.navigate({ to: "/roles" });
        showToast("success", "Role updated successfully.");
      },
      onError: () => {
        showToast("error", "Error updating role");
      },
    }),
  );

  const { data, isLoading } = useQuery(roleQueries.find(Number(roleId)));

  const handleSubmit = (data: TCreateOrUpdateRole) => {
    mutate({ id: Number(roleId), data });
  };

  const breadcrumbs: TBreadcrumbItem[] = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Roles", path: "/roles" },
    { label: "Update Role", path: `/roles/$roleId/update` },
  ];

  return (
    <AdminPage
      breadcrumbs={breadcrumbs}
      title="Update Role"
      description="Update a role here."
      isLoading={isLoading}
    >
      <DynamicForm
        onSubmit={handleSubmit}
        formSchema={CreateOrUpdateRoleSchema}
        defaultValues={{ name: data?.name, description: data?.description }}
      >
        <CreateOrUpdateFormField />
      </DynamicForm>
    </AdminPage>
  );
};
