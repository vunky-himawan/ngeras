import { mutationOptions } from "@tanstack/react-query";
import { updateRole } from "./requests";
import type { TCreateOrUpdateRole } from "@/shared/lib/zod-validations/role/create-or-update-role.schema";

export const roleMutations = {
  updateRole: (opts: { onSuccess?: (data: unknown) => void; onError?: (error: unknown) => void }) =>
    mutationOptions({
      mutationFn: ({ id, data }: { id: number; data: TCreateOrUpdateRole }) => updateRole(id, data),
      onSuccess: opts?.onSuccess,
      onError: opts?.onError,
    }),
};
