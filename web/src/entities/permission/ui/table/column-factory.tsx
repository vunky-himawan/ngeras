import type { ColumnDef } from "@tanstack/react-table";
import type { Permission } from "../../model/types";
import { Button } from "@/shared/ui/button";
import { Eye, Pencil } from "lucide-react";
import { useModalStore } from "@/shared/stores/modal.store";

export const PermissionColumnFactory = (): ColumnDef<Permission>[] => {
  const { onOpenChange } = useModalStore();

  const handleAction = async (id: number, action: "update" | "show") => {
    onOpenChange(true, action, id);
  };

  return [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <span>{row.original.description || "-"}</span>,
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant={"ghost"}
            size="icon"
            className="text-green-600 hover:text-green-700"
            onClick={() => handleAction(row.original.id, "show")}
          >
            <Eye />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-blue-600 hover:text-blue-700"
            onClick={() => handleAction(row.original.id, "update")}
          >
            <Pencil />
          </Button>
        </div>
      ),
    },
  ];
};
