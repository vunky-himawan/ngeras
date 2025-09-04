import { UpdateRolePage } from "@/pages/(admin)/roles/[id]/update/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(admin)/roles/$roleId/update/")({
  component: UpdateRolePage,
});
