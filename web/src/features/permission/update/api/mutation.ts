import { mutationOptions } from "@tanstack/react-query";
import { updatePermission } from "./request";
import type { TUpdatePermission } from "../model/update.schema";

export const updatePermissionMutation = {
  updatePermission: (opts?: { onSuccess?: () => void; onError?: () => void }) =>
    mutationOptions({
      mutationFn: ({ id, data }: { id: number; data: TUpdatePermission }) => {
        return updatePermission({ data, id });
      },
      onSuccess: opts?.onSuccess,
      onError: opts?.onError,
    }),
};
