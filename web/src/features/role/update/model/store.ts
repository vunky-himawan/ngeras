import { useMutation } from "@tanstack/react-query";
import { roleMutations } from "../api/mutations";
import { useToast } from "@/shared/hooks/use-toast";
import { queryClient } from "@/shared/lib/tanstack/query-client";
import { roleQueryKeys } from "@/entities/role/api/queries";
import { useModalStore } from "@/shared/stores/modal.store";

export const useUpdateRole = () => {
  const { showToast } = useToast();

  return useMutation(
    roleMutations.updateRole({
      onSuccess: () => {
        useModalStore.getState().close();

        queryClient.invalidateQueries({ queryKey: roleQueryKeys.all });

        showToast("Role updated successfully", "success");
      },
      onError: () => {
        useModalStore.getState().close();

        showToast("Failed to update role", "error");
      },
    }),
  );
};
