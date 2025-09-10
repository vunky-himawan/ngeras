import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "../../model/types";

export const UserColumnFactory = (): ColumnDef<User>[] => {
  return [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "role_id", header: "Role" },
  ];
};
