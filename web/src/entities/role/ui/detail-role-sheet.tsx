import { Loading } from "@/shared/ui/loading";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/shared/ui/sheet";
import { useGetRole } from "../model/store";
import { useModalStore } from "../model/modal.store";

export const RoleSheetContent = () => {
  const { id } = useModalStore();

  const { data, isLoading } = useGetRole(id);

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
            <div>{data?.name}</div>
          </div>
          <div>
            <h1 className="text-foreground font-semibold">Permissions</h1>
            {/* TODO: display permissions */}
          </div>
        </div>
      )}
    </SheetContent>
  );
};
