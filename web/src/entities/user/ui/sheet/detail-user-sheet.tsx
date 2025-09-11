import { Loading } from "@/shared/ui/loading";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/shared/ui/sheet";
import { useModalStore } from "@/shared/stores/modal.store";
import { useGetUser } from "../../model/store";
import { Badge } from "@/shared/ui/badge";

export const UserSheetContent = () => {
  const { id } = useModalStore();

  const { data, isLoading } = useGetUser(id as string);

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>User Detail</SheetTitle>
        <SheetDescription>Displays the user detail</SheetDescription>
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
            <p>{data?.user_name}</p>
          </div>
          <div>
            <h1 className="text-foreground font-semibold">Email</h1>
            <p>{data?.user_email}</p>
          </div>
          <div>
            <h1 className="text-foreground font-semibold">Gender</h1>
            <p>{data?.user_gender}</p>
          </div>
          <div>
            <h1 className="text-foreground font-semibold">Role</h1>
            <Badge>{data?.user_role.role_name}</Badge>
          </div>
          <div>
            <h1 className="text-foreground font-semibold">Created At</h1>
            <p>{new Date(data?.user_created_at).toLocaleDateString()}</p>
          </div>
          <div>
            <h1 className="text-foreground font-semibold">Updated At</h1>
            <p>{new Date(data?.user_updated_at).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </SheetContent>
  );
};
