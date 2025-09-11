import { UsersPage } from "@/pages/(admin)/users/users.page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(admin)/users/")({
  component: UsersPage,
});
