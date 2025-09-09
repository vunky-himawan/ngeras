import { mutationOptions } from "@tanstack/react-query";
import { remove } from "./requests";

export const deleteRoleMutation = {
  deleteRole: (opts: { onSuccess?: (data: unknown) => void; onError?: (error: unknown) => void }) =>
    mutationOptions({
      mutationFn: ({ id }: { id: number }) => remove(id),
      onSuccess: opts?.onSuccess,
      onError: opts?.onError,
    }),
};
