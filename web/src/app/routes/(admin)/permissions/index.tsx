import { PermissionsPage } from "@/pages/(admin)/permissions/permissions.page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(admin)/permissions/")({
  component: PermissionsPage,
});
