import { checkIsActive } from "@/shared/helpers/menu";
import type { TMenuItem } from "@/shared/types/menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/shared/ui/sidebar/sidebar";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import type { FC } from "react";

interface Props {
  menuItems: TMenuItem[];
  header?: React.ReactNode;
}

export const MenuSidebar: FC<Props> = ({ menuItems, header = "Sidebar" }) => {
  const pathName = useLocation().pathname;

  return (
    <Sidebar variant="floating">
      <SidebarHeader>{header}</SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => {
            if (item.children?.length) {
              return (
                <SidebarMenuItem key={item.label}>
                  <Collapsible
                    className="group/collapsible"
                    defaultOpen={item.children.some((child) => checkIsActive(pathName, child))}
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        {item.icon}
                        {item.label}
                        <ChevronDown className="ml-auto" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.children.map((child) => (
                          <SidebarMenuSubItem key={child.label}>
                            <SidebarMenuButton asChild isActive={checkIsActive(pathName, child)}>
                              <Link to={child.to?.toString()}>
                                {child.icon}
                                {child.label}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarMenuItem>
              );
            }

            return (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild isActive={checkIsActive(pathName, item)}>
                  <Link to={item.to?.toString()}>
                    {item.icon}
                    {item.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};
