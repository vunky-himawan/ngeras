import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";
import { useForm, type DefaultValues, type Resolver } from "react-hook-form";
import type { infer as ZodInfer, ZodObject, ZodRawShape } from "zod";
import { Form } from "./form";

interface Props<TSchema extends ZodObject<ZodRawShape>> {
  readonly children: ReactNode;
  readonly onSubmit: (data: ZodInfer<TSchema>) => void;
  readonly formSchema: TSchema;
  readonly defaultValues?: DefaultValues<ZodInfer<TSchema>>;
}

export const DynamicForm = <TSchema extends ZodObject<ZodRawShape>>({
  children,
  onSubmit,
  formSchema,
  defaultValues,
}: Props<TSchema>) => {
  const form = useForm<ZodInfer<TSchema>>({
    resolver: zodResolver(formSchema) as Resolver<ZodInfer<TSchema>>,
    defaultValues: defaultValues as DefaultValues<ZodInfer<TSchema>>,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {children}
      </form>
    </Form>
  );
};
