import { useMutation } from "@tanstack/react-query";
import { updatePermissionMutation } from "../api/mutation";
import { useToast } from "@/shared/hooks/use-toast";
import { useModalStore } from "@/shared/stores/modal.store";
import { queryClient } from "@/shared/lib/tanstack/query-client";
import { permissionQueryKeys } from "@/entities/permission/api/queries";

export const useUpdatePermission = () => {
  const { showToast } = useToast();

  return useMutation(
    updatePermissionMutation.updatePermission({
      onSuccess: () => {
        useModalStore.getState().close();

        queryClient.invalidateQueries({ queryKey: permissionQueryKeys.all });

        showToast("Permission updated successfully", "success");
      },
      onError: () => {
        useModalStore.getState().close();

        showToast("Failed to update permission", "error");
      },
    }),
  );
};
