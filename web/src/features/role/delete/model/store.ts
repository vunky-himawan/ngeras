import { useMutation } from "@tanstack/react-query";
import { deleteRoleMutation } from "../api/mutation";
import { useToast } from "@/shared/hooks/use-toast";
import { queryClient } from "@/shared/lib/tanstack/query-client";
import { roleQueryKeys } from "@/entities/role/api/queries";
import { useModalStore } from "@/shared/stores/modal.store";

export const useDeleteRole = () => {
  const { showToast } = useToast();

  return useMutation(
    deleteRoleMutation.deleteRole({
      onSuccess: () => {
        useModalStore.getState().close();
        queryClient.invalidateQueries({ queryKey: roleQueryKeys.all });
        showToast("Role deleted successfully", "success");
      },
      onError: () => {
        useModalStore.getState().close();
        showToast("Failed to delete role", "error");
      },
    }),
  );
};
