import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form/form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
// import type { FC } from "react";

// interface Props {
//   // permissions?: Permission[];
//   search: string;
//   onSearchChange: (value: string) => void;
//   isLoading?: boolean;
// }

export const UpdateRoleFormFields = () => {
  return (
    <>
      <FormField
        name="name"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input placeholder="Enter role name" {...field} />
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="description">Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Enter role description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* <FormField
        name="permissions"
        render={({ field }) => {
          return (
            <FormItem>
              <FormMessage />
              <FormLabel htmlFor="permissions">Permissions</FormLabel>
              <Search
                withButton={false}
                placeholderSearch="Search permissions..."
                onSearch={onSearchChange}
                search={search}
              />
              {isLoading && (
                <div className="flex min-h-[8rem] items-center justify-center">
                  <Loading />
                </div>
              )}
              {!isLoading && !permissions && (
                <div className="my-4 text-center text-sm text-destructive">
                  Failed to load permissions. Please try again.
                </div>
              )}
              {!isLoading && permissions?.length === 0 && (
                <div className="my-4 text-center text-sm text-muted-foreground">
                  No permissions found. Try adjusting your search.
                </div>
              )}
              {!isLoading &&
                permissions &&
                permissions.map((permission) => (
                  <PermissionCardAsFormField
                    key={permission.id}
                    field={{ value: field.value, onChange: field.onChange }}
                    permission={permission}
                  />
                ))}
            </FormItem>
          );
        }}
      /> */}
    </>
  );
};
