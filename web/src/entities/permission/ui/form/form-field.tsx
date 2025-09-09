import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form/form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";

export const UpdatePermissionFormFields = () => {
  return (
    <>
      <FormField
        name="name"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input placeholder="Enter role name" {...field} disabled />
              <FormDescription>Name is not editable</FormDescription>
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
    </>
  );
};
