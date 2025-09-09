import z from "zod";

export const UpdatePermissionSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

export type TUpdatePermission = z.infer<typeof UpdatePermissionSchema>;
