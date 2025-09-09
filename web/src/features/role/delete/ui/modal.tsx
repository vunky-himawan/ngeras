import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { useDeleteRole } from "../model/store";
import { Button } from "@/shared/ui/button";
import { useSearch } from "@tanstack/react-router";

export const DeleteRoleModal = () => {
  const { id } = useSearch({ from: "/(admin)/roles/" });

  const { mutate } = useDeleteRole();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Role</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this role? This action cannot be undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button variant="destructive" onClick={() => mutate({ id })}>
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
