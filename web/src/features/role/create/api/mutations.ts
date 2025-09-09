import { mutationOptions } from "@tanstack/react-query";
import { createRole } from "./requests";
import type { TCreateOrUpdateRole } from "@/shared/lib/zod-validations/role/create-or-update-role.schema";

export const roleMutations = {
  createRole: (opts: { onSuccess?: (data: unknown) => void; onError?: (error: unknown) => void }) =>
    mutationOptions({
      mutationFn: ({ data }: { data: TCreateOrUpdateRole }) => createRole(data),
      onSuccess: opts?.onSuccess,
      onError: opts?.onError,
    }),
};
