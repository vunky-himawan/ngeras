import { Loading } from "@/shared/ui/loading";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/shared/ui/sheet";
import { useModalStore } from "@/shared/stores/modal.store";
import { useGetPermission } from "../../model/store";

export const PermissionSheetContent = () => {
  const { id } = useModalStore();

  const { data, isLoading } = useGetPermission(id as number);

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Role Detail</SheetTitle>
        <SheetDescription>Displays the role detail</SheetDescription>
      </SheetHeader>
      {isLoading && (
        <div className="flex min-h-[8rem] items-center justify-center">
          <Loading />
        </div>
      )}
      {!isLoading && data && (
        <div className="flex flex-col gap-3 px-4">
          <div>
            <h1 className="text-foreground font-semibold">Name</h1>
            <div>{data?.permission_name}</div>
          </div>
          <div>
            <h1 className="text-foreground font-semibold">Description</h1>
            <p>{data?.permission_description ?? "-"}</p>
          </div>
        </div>
      )}
    </SheetContent>
  );
};
