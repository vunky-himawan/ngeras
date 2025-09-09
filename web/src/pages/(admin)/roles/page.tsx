import type { TBreadcrumbItem } from "@/shared/types/breadcrumb";
import { Button } from "@/shared/ui/button";
import { AdminPage } from "@/shared/ui/admin/container";
import { Plus } from "lucide-react";
import { RolesDataTable } from "@/widgets/roles/table/ui/table";
import { Sheet } from "@/shared/ui/sheet";
import { Dialog } from "@/shared/ui/dialog";
import { UpdateRoleSheetContent } from "@/widgets/roles/update-role-sheet/ui/sheet";
import { CreateRoleSheetContent } from "@/widgets/roles/create-role-sheet/ui/sheet";
import { DeleteRoleModal } from "@/features/role/delete/ui/modal";
import { RoleSheetContent } from "@/entities/role/ui/detail-role-sheet";
import { useModalStore } from "@/entities/role/model/modal.store";

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
