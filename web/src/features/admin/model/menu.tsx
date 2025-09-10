import type { TMenuItem } from "@/shared/types/menu";
import { Lock, Settings, UserCog, UserLock, UsersRound } from "lucide-react";

export const ADMIN_MENU_ITEMS: TMenuItem[] = [
  {
    label: "Dashboard",
    icon: <Settings />,
    to: "/dashboard",
  },
  {
    label: "User Management",
    icon: <UserCog />,
    children: [
      {
        label: "Permissions",
        icon: <Lock />,
        to: "/permissions",
      },
      {
        label: "Roles",
        icon: <UserLock />,
        to: "/roles",
      },
      {
        label: "Users",
        icon: <UsersRound />,
        to: "/users",
      },
    ],
  },
];
