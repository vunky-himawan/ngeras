import { roleQueryKeys } from "@/entities/role/api/queries";
import { roleMutations } from "@/features/role/api/mutations";
import {
  CreateOrUpdateRoleSchema,
  type TCreateOrUpdateRole,
} from "@/features/role/model/create-or-update-role.schema";
import { CreateOrUpdateFormField } from "@/features/role/ui/create-or-update-form-field";
import { useToast } from "@/shared/hooks/use-toast";
import { queryClient } from "@/shared/lib/tanstack/query-client";
import type { TBreadcrumbItem } from "@/shared/types/breadcrumb";
import { DynamicForm } from "@/shared/ui/form/dynamic-form";
import { AdminPage } from "@/widgets/admin/ui/container";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export const CreateRolePage = () => {
  const { showToast } = useToast();
  const router = useRouter();

  const { mutate } = useMutation(
    roleMutations.createRole({
      onSuccess: async () => {
        await router.navigate({ to: "/roles" });
        queryClient.invalidateQueries({ queryKey: roleQueryKeys.all });

        showToast("success", "Role created successfully.");
      },
      onError: () => {
        showToast("error", "Error creating role");
      },
    }),
  );

  const handleSubmit = (data: TCreateOrUpdateRole) => {
    mutate({ data });
  };

  const breadcrumbs: TBreadcrumbItem[] = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Roles", path: "/roles" },
    { label: "Create Role", path: "/roles/create" },
  ];

  return (
    <AdminPage
      breadcrumbs={breadcrumbs}
      title="Create Role"
      description="Create a new user role here."
    >
      <DynamicForm onSubmit={handleSubmit} formSchema={CreateOrUpdateRoleSchema}>
        <CreateOrUpdateFormField />
      </DynamicForm>
    </AdminPage>
  );
};
