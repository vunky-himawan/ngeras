import { Button } from "@/shared/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form/form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";

export const CreateOrUpdateFormField = () => {
  return (
    <>
      <FormField
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel required htmlFor="name">
              Name
            </FormLabel>
            <FormControl>
              <Input placeholder="Enter role name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
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
      <Button>Create Role</Button>
    </>
  );
};
