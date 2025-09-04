import { DetailRolePage } from "@/pages/(admin)/roles/[id]/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(admin)/roles/$roleId/")({
  component: DetailRolePage,
});
