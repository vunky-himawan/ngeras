import type { TBreadcrumbItem } from "@/shared/types/breadcrumb";
import { Loading } from "@/shared/ui/loading";
import { Separator } from "@/shared/ui/separator";
import { SidebarTrigger } from "@/shared/ui/sidebar";
import { AdminHeader } from "@/widgets/admin/ui/header";
import type { FC, ReactNode } from "react";

interface AdminPageProps {
  breadcrumbs?: TBreadcrumbItem[];
  header?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  topAction?: ReactNode;
  isLoading?: boolean;
}

export const AdminPage: FC<AdminPageProps> = ({
  children,
  isLoading,
  breadcrumbs,
  header,
  title,
  description,
  topAction,
}) => {
  return (
    <div className="flex w-full min-h-screen relative flex-col gap-y-5 px-4 py-2">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="cursor-pointer" />
        <AdminHeader breadcrumbItems={breadcrumbs || []}>{header}</AdminHeader>
      </div>
      <Separator />
      <div className="flex flex-col gap-y-2 md:flex-row justify-between">
        <div className="flex flex-col gap-2">
          {title && <h1 className="text-2xl font-bold">{title}</h1>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {topAction}
      </div>
      <div className="flex-1 relative h-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loading />
          </div>
        )}
        {!isLoading && children}
      </div>
    </div>
  );
};
