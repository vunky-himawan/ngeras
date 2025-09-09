import { useLocation } from "@tanstack/react-router";
import type { FC } from "react";
import { isUrlActive } from "@/shared/utils/url";
import { Link } from "@tanstack/react-router";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import type { TBreadcrumbItem } from "@/shared/types/breadcrumb";

interface AdminHeaderProps {
  breadcrumbItems: TBreadcrumbItem[];
  children: React.ReactNode;
}

export const AdminHeader: FC<AdminHeaderProps> = ({ breadcrumbItems, children }) => {
  const location = useLocation();

  return (
    <header className="flex items-center justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => {
            const isActive = isUrlActive(item.path, location.pathname);
            const isLast = index === breadcrumbItems.length - 1;

            return (
              <React.Fragment key={item.path}>
                {isActive ? (
                  <BreadcrumbPage className="cursor-default">{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbItem className="cursor-pointer">
                    <Link to={item.path}>{item.label}</Link>
                  </BreadcrumbItem>
                )}
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      {children}
    </header>
  );
};
