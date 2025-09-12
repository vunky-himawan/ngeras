import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/ui/button";
import { Eye, Pencil, Trash } from "lucide-react";
import type { Role } from "@/entities/role/model/types";
import { useModalStore } from "@/shared/stores/modal.store";

export const RolesTableColumnFactory = (): ColumnDef<Role>[] => {
  const { onOpenChange } = useModalStore();

  const handleAction = (id: number, action: "update" | "show" | "delete") => {
    onOpenChange(true, action, id);
  };

  return [
    {
      accessorKey: "role_name",
      header: "Name",
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => row.original.role_description || "-",
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => new Date(row.original.role_created_at).toLocaleDateString(),
    },
    {
      accessorKey: "updated_at",
      header: "Updated At",
      cell: ({ row }) => new Date(row.original.role_updated_at).toLocaleDateString(),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            onClick={() => handleAction(row.original.role_id, "show")}
            variant={"ghost"}
            className="text-green-600 hover:text-green-700"
            size={"icon"}
          >
            <Eye />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleAction(row.original.role_id, "update")}
            className="text-blue-600 hover:text-blue-700"
          >
            <Pencil />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleAction(row.original.role_id, "delete")}
            className="text-red-600 hover:text-red-700"
          >
            <Trash />
          </Button>
        </div>
      ),
    },
  ];
};
