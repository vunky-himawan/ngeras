import { useModalStore } from "@/shared/stores/modal.store";
import { useQuery } from "@tanstack/react-query";
import { memo, type FC } from "react";
import { useUpdatePermission } from "../model/store";
import { UpdatePermissionForm } from "./form";
import { permissionQueries } from "@/entities/permission/api/queries";
import { UpdatePermissionFormFields } from "@/entities/permission/ui/form/form-field";

export const UpdatePermissionSheetContent: FC = memo(() => {
  const { id } = useModalStore();

  const { data: permissionDefault } = useQuery(permissionQueries.find(id as number));

  const { mutate } = useUpdatePermission();

  return (
    <UpdatePermissionForm
      onSubmit={(data) => mutate({ data, id: id! as number })}
      defaultValues={{ description: permissionDefault?.description, name: permissionDefault?.name }}
    >
      <UpdatePermissionFormFields />
    </UpdatePermissionForm>
  );
});
