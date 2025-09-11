import type { ColumnDef } from "@tanstack/react-table";
import type { UserWithRole } from "../../model/types";
import { Button } from "@/shared/ui/button";
import { Eye } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { useModalStore } from "@/shared/stores/modal.store";

export const UserColumnFactory = (): ColumnDef<UserWithRole>[] => {
  const { onOpenChange } = useModalStore();

  const handleAction = async (id: string, action: "update" | "show" | "delete") => {
    onOpenChange(true, action, id);
  };

  return [
    { accessorKey: "user_name", header: "Name" },
    { accessorKey: "user_email", header: "Email" },
    {
      accessorKey: "user_role.role_name",
      header: "Role",
      cell: ({ row }) => <Badge>{row.original.user_role.role_name}</Badge>,
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            onClick={() => handleAction(row.original.user_id, "show")}
            variant={"ghost"}
            className="text-green-600 hover:text-green-700"
            size={"icon"}
          >
            <Eye />
          </Button>
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={() => handleAction(row.original.role_id, "update")}
            className="text-blue-600 hover:text-blue-700"
          >
            <Pencil />
          </Button> */}
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={() => handleAction(row.original.role_id, "delete")}
            className="text-red-600 hover:text-red-700"
          >
            <Trash />
          </Button> */}
        </div>
      ),
    },
  ];
};
