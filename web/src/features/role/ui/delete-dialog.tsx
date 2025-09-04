import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { roleMutations } from "../api/mutations";
import { useDeleteRole } from "@/entities/role/model/context";
import { useToast } from "@/shared/hooks/use-toast";
import { Button } from "@/shared/ui/button";
import { queryClient } from "@/shared/lib/tanstack/query-client";
import { roleQueryKeys } from "@/entities/role/api/queries";

const DeleteRoleDialog = () => {
  const { roleId, setIsModalOpen } = useDeleteRole();
  const { showToast } = useToast();

  const { mutate } = useMutation(
    roleMutations.deleteRole({
      onSuccess: async () => {
        queryClient.invalidateQueries({ queryKey: roleQueryKeys.all });

        showToast("success", "Role deleted successfully.");
        setIsModalOpen(false);
      },
      onError: () => {
        showToast("error", "Failed to delete role.");
        setIsModalOpen(false);
      },
    }),
  );

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Role</DialogTitle>
        <DialogDescription>Are you sure you want to delete this role?</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
        </DialogClose>
        <Button variant="destructive" onClick={() => mutate({ id: Number(roleId) })}>
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
export default DeleteRoleDialog;
