import type { TBreadcrumbItem } from "@/shared/types/breadcrumb";
import { Button } from "@/shared/ui/button";
import { AdminPage } from "@/shared/ui/admin/container";
import { Plus } from "lucide-react";
import { Sheet } from "@/shared/ui/sheet";
import { Dialog } from "@/shared/ui/dialog";
import { DeleteRoleModal } from "@/features/role/delete/ui/modal";
import { RoleSheetContent } from "@/entities/role/ui/sheet/detail-role-sheet";
import { useModalStore } from "@/entities/role/model/modal.store";
import { CreateRoleSheetContent } from "@/features/role/create/ui/sheet";
import { UpdateRoleSheetContent } from "@/features/role/update/ui/sheet";
import { RolesDataTable } from "@/entities/role/ui/table/table";

const RolesPage = () => {
  const { action, isOpen, onOpenChange } = useModalStore();

  const breadcrumbs: TBreadcrumbItem[] = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Roles", path: "/roles" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={(open) => onOpenChange(open)}>
      <AdminPage
        title="Roles Management"
        description="Manage user roles and permissions here."
        breadcrumbs={breadcrumbs}
        topAction={<TopAction />}
      >
        <RolesDataTable />
        {action === "show" && <RoleSheetContent />}
        {action === "create" && <CreateRoleSheetContent />}
        {action === "update" && <UpdateRoleSheetContent />}
        <Dialog open={action === "delete"} onOpenChange={(open) => onOpenChange(open)}>
          {action === "delete" && <DeleteRoleModal />}
        </Dialog>
      </AdminPage>
    </Sheet>
  );
};

const TopAction = () => {
  return (
    <Button onClick={() => useModalStore.getState().onOpenChange(true, "create")}>
      Create Role
      <Plus />
    </Button>
  );
};

export default RolesPage;
