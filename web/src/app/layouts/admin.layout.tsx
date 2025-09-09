import { SidebarProvider } from "@/app/providers/sidebar.provider";
import { ADMIN_MENU_ITEMS } from "@/features/admin";
import { MenuSidebar } from "@/shared/ui/sidebar/menu-sidebar";
import type { FC, PropsWithChildren } from "react";

export const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <MenuSidebar
        menuItems={ADMIN_MENU_ITEMS}
        header={<h1 className="text-lg font-bold">Admin Panel</h1>}
      />
      <div className="w-full">{children}</div>
    </SidebarProvider>
  );
};
