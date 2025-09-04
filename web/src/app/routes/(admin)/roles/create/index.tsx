import { CreateRolePage } from "@/pages/(admin)/roles/create/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(admin)/roles/create/")({
  component: CreateRolePage,
});
