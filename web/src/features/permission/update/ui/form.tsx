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
import { UpdatePermissionSchema, type TUpdatePermission } from "../model/update.schema";

interface Props extends PropsWithChildren {
  onSubmit: (data: TUpdatePermission) => void;
  defaultValues?: TUpdatePermission;
}

export const UpdatePermissionForm: FC<Props> = ({ children, onSubmit, defaultValues }) => {
  return (
    <DynamicForm
      formSchema={UpdatePermissionSchema}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{"Update Permission"}</SheetTitle>
          <SheetDescription>"Fill the form to update a permission"</SheetDescription>
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
