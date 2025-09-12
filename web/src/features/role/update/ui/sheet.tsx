import { useGetRole } from "@/entities/role/model/store";
import { CreateOrUpdateRoleFormFields } from "@/entities/role/ui/form/form-field";
import { useUpdateRole } from "@/features/role/update/model/store";
import { UpdateRoleForm } from "@/features/role/update/ui/form/form";
import { useModalStore } from "@/shared/stores/modal.store";
import { memo, type FC } from "react";

export const UpdateRoleSheetContent: FC = memo(() => {
  const { id } = useModalStore();

  const { data: roleDefault } = useGetRole(id as number);

  const { mutate } = useUpdateRole();

  return (
    <UpdateRoleForm
      onSubmit={(data) => mutate({ id: id! as number, data })}
      defaultValues={{
        name: roleDefault?.role_name ?? "",
        description: roleDefault?.role_description,
      }}
    >
      <CreateOrUpdateRoleFormFields />
    </UpdateRoleForm>
  );
});
