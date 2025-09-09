import type { TMenuItem } from "@/shared/types/menu";
import { Settings, UserLock } from "lucide-react";

export const ADMIN_MENU_ITEMS: TMenuItem[] = [
  {
    label: "Dashboard",
    icon: <Settings />,
    to: "/dashboard",
  },
  {
    label: "Roles",
    icon: <UserLock />,
    to: "/roles",
  },
  {
    label: "Permissions",
    icon: <UserLock />,
    to: "/permissions",
  },
];
