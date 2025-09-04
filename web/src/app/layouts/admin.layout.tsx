import { SidebarProvider } from "@/app/providers/sidebar.provider";
import { ADMIN_MENU_ITEMS } from "@/features/admin";
import { SidebarWidget } from "@/widgets/sidebar/ui/sidebar";
import type { FC, PropsWithChildren } from "react";

export const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <SidebarWidget
        menuItems={ADMIN_MENU_ITEMS}
        header={<h1 className="text-lg font-bold">Admin Panel</h1>}
      />
      <div className="w-full">{children}</div>
    </SidebarProvider>
  );
};
