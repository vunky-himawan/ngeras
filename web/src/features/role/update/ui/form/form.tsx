import {
  CreateOrUpdateRoleSchema,
  type TCreateOrUpdateRole,
} from "@/shared/lib/zod-validations/role/create-or-update-role.schema";
import { Button } from "@/shared/ui/button";
import { DynamicForm } from "@/shared/ui/form/dynamic-form";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui/sheet";
import type { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  onSubmit: (data: TCreateOrUpdateRole) => void;
  defaultValues?: TCreateOrUpdateRole;
}

export const UpdateRoleForm: FC<Props> = ({ children, onSubmit, defaultValues }) => {
  return (
    <DynamicForm
      formSchema={CreateOrUpdateRoleSchema}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{"UpdateRole"}</SheetTitle>
          <SheetDescription>"Fill the form to update a new role"</SheetDescription>
        </SheetHeader>
        <div className="px-4 space-y-4">{children}</div>
        <SheetFooter>
          <Button type="submit" form="dynamic-form">
            Submit
          </Button>
        </SheetFooter>
      </SheetContent>
    </DynamicForm>
  );
};
