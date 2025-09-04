import type { ColumnDef } from "@tanstack/react-table";
import type { Role } from "../model/types";
import { Link } from "@tanstack/react-router";
import { Button } from "@/shared/ui/button";
import { Eye, Pencil, Trash } from "lucide-react";
import { DialogTrigger } from "@/shared/ui/dialog";
import { useDeleteRole } from "../model/context";

export const useRoleTableColumns = (): ColumnDef<Role>[] => {
  const { setIsModalOpen, setRoleId } = useDeleteRole();

  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => row.getValue("name"),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => row.getValue("description") ?? "-",
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => new Date(row.getValue("created_at")).toLocaleDateString(),
    },
    {
      accessorKey: "updated_at",
      header: "Updated At",
      cell: ({ row }) => new Date(row.getValue("updated_at")).toLocaleDateString(),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Link to={`/roles/${row.original.id}/`}>
            <Button
              variant="outline"
              size="icon"
              className="bg-blue-100 text-blue-600 hover:bg-blue-200"
            >
              <Eye />
            </Button>
          </Link>
          <Link to={`/roles/${row.original.id}/update/`}>
            <Button
              variant="outline"
              size="icon"
              className="bg-green-100 text-green-600 hover:bg-green-200"
            >
              <Pencil />
            </Button>
          </Link>
          <DialogTrigger asChild>
            <Button
              variant={"outline"}
              size="icon"
              onClick={() => {
                setRoleId(row.original.id);
                setIsModalOpen(true);
              }}
              className="bg-red-100 text-red-600 hover:bg-red-200"
            >
              <Trash />
            </Button>
          </DialogTrigger>
        </div>
      ),
    },
  ];
};
