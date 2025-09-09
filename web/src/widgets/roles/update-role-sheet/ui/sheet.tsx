import { roleQueries } from "@/entities/role/api/queries";
import { useModalStore } from "@/entities/role/model/modal.store";
import { CreateOrUpdateRoleFormFields } from "@/entities/role/ui/form-field";
import { useUpdateRole } from "@/features/role/update/model/store";
import { UpdateRoleForm } from "@/features/role/update/ui/form/form";
import { useQuery } from "@tanstack/react-query";
import { memo, type FC } from "react";

export const UpdateRoleSheetContent: FC = memo(() => {
  const { id } = useModalStore();

  const { data: roleDefault } = useQuery(roleQueries.find(id));

  const { mutate } = useUpdateRole();

  return (
    <UpdateRoleForm
      onSubmit={(data) => mutate({ id: id!, data })}
      defaultValues={{ name: roleDefault?.name, description: roleDefault?.description }}
    >
      <CreateOrUpdateRoleFormFields />
    </UpdateRoleForm>
  );
});
