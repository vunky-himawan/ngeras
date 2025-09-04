import { mutationOptions } from "@tanstack/react-query";
import { createRole } from "./create-role";
import type { TCreateOrUpdateRole } from "../model/create-or-update-role.schema";
import { deleteRole } from "./delete-role";
import { updateRole } from "./update-role";

export const roleMutations = {
  createRole: (opts: { onSuccess?: (data: unknown) => void; onError?: (error: unknown) => void }) =>
    mutationOptions({
      mutationKey: roleMutationKeys.createRole,
      mutationFn: ({ data }: { data: TCreateOrUpdateRole }) => createRole(data),
      onSuccess: opts?.onSuccess,
      onError: opts?.onError,
    }),
  updateRole: (opts: { onSuccess?: (data: unknown) => void; onError?: (error: unknown) => void }) =>
    mutationOptions({
      mutationKey: roleMutationKeys.updateRole,
      mutationFn: ({ id, data }: { id: number; data: TCreateOrUpdateRole }) => updateRole(id, data),
      onSuccess: opts?.onSuccess,
      onError: opts?.onError,
    }),
  deleteRole: (opts: { onSuccess?: (data: unknown) => void; onError?: (error: unknown) => void }) =>
    mutationOptions({
      mutationKey: roleMutationKeys.deleteRole,
      mutationFn: ({ id }: { id: number }) => deleteRole(id),
      onSuccess: opts?.onSuccess,
      onError: opts?.onError,
    }),
};

export const roleMutationKeys = {
  createRole: ["createRole"],
  updateRole: ["updateRole"],
  deleteRole: ["deleteRole"],
};
