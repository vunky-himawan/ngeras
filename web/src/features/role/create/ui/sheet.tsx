import { CreateOrUpdateRoleFormFields } from "@/entities/role/ui/form/form-field";
import { useCreateRole } from "@/features/role/create/model/store";
import { UpdateRoleForm } from "@/features/role/update/ui/form/form";
import { memo, type FC } from "react";

export const CreateRoleSheetContent: FC = memo(() => {
  const { mutate } = useCreateRole();

  return (
    <UpdateRoleForm
      onSubmit={(data) => mutate({ data })}
      defaultValues={{ name: "", description: "" }}
    >
      <CreateOrUpdateRoleFormFields />
    </UpdateRoleForm>
  );
});
