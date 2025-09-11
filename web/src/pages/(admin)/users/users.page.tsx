import { UserSheetContent } from "@/entities/user/ui/sheet/detail-user-sheet";
import { UserDataTable } from "@/entities/user/ui/table/table";
import { useModalStore } from "@/shared/stores/modal.store";
import type { TBreadcrumbItem } from "@/shared/types/breadcrumb";
import { AdminPage } from "@/shared/ui/admin/container";
import { Sheet } from "@/shared/ui/sheet";

export const UsersPage = () => {
  const { action, isOpen, onOpenChange } = useModalStore();

  const breadcrumbs: TBreadcrumbItem[] = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Users", path: "/users" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={(open) => onOpenChange(open)}>
      <AdminPage
        breadcrumbs={breadcrumbs}
        title="User Management"
        description="Manage application users and their roles"
      >
        <UserDataTable />
        {action === "show" && <UserSheetContent />}
      </AdminPage>
    </Sheet>
  );
};
