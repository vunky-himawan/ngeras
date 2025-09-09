import { PermissionSheetContent } from "@/entities/permission/ui/sheet/detail-permission-sheet";
import { PermissionDataTable } from "@/entities/permission/ui/table/table";
import { UpdatePermissionSheetContent } from "@/features/permission/update/ui/sheet";
import { useModalStore } from "@/shared/stores/modal.store";
import type { TBreadcrumbItem } from "@/shared/types/breadcrumb";
import { AdminPage } from "@/shared/ui/admin/container";
import { Sheet } from "@/shared/ui/sheet";

export const PermissionsPage = () => {
  const { action, isOpen, onOpenChange } = useModalStore();

  const breadcrumbs: TBreadcrumbItem[] = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Permissions", path: "/permissions" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={(open) => onOpenChange(open)}>
      <AdminPage
        breadcrumbs={breadcrumbs}
        title="Permissions Management"
        description="Manage user permissions here."
      >
        <PermissionDataTable />
        {action === "show" && <PermissionSheetContent />}
        {action === "update" && <UpdatePermissionSheetContent />}
      </AdminPage>
    </Sheet>
  );
};
