import type { TMenuItem } from "@/shared/types/menu";
import { ADMIN_MENU_ITEMS } from "./menu";

export const useAdminMenuItems = (): TMenuItem[] => {
  //   const { userPermissions } = useAuth();
  const userPermissions: string[] = []; // TODO: replace with actual permissions from auth

  return ADMIN_MENU_ITEMS.filter((item) => {
    if (Array.isArray(item.requiredPermission)) {
      return item.requiredPermission.some((perm) => userPermissions.includes(perm));
    } else if (item.requiredPermission) {
      return userPermissions.includes(item.requiredPermission);
    }
    return true;
  });
};
