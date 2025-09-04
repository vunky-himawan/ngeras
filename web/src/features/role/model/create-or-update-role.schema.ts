import z from "zod";

export const CreateOrUpdateRoleSchema = z.object({
  name: z.string().min(2).max(255),
  description: z.string().optional().nullable(),
});

export type TCreateOrUpdateRole = z.infer<typeof CreateOrUpdateRoleSchema>;
