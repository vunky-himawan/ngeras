import { DeleteRoleProvider } from "@/entities/role/model/context";
import RolesPage from "@/pages/(admin)/roles/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(admin)/roles/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DeleteRoleProvider>
      <RolesPage />
    </DeleteRoleProvider>
  );
}
