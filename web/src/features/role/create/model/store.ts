import { useMutation } from "@tanstack/react-query";
import { roleMutations } from "../api/mutations";
import { useToast } from "@/shared/hooks/use-toast";
import { queryClient } from "@/shared/lib/tanstack/query-client";
import { roleQueryKeys } from "@/entities/role/api/queries";
import { useModalStore } from "@/entities/role/model/modal.store";

export const useCreateRole = () => {
  const { showToast } = useToast();

  return useMutation(
    roleMutations.createRole({
      onSuccess: () => {
        useModalStore.getState().onOpenChange(false);

        queryClient.invalidateQueries({ queryKey: roleQueryKeys.all });

        showToast("Role created successfully", "success");
      },
      onError: () => {
        showToast("Failed to create role", "error");
      },
    }),
  );
};
