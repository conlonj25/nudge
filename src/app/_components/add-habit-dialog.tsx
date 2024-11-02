"use client";

import { api } from "~/trpc/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";

const AddHabitDialog = () => {
  const utils = api.useUtils();

  const newHabitSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
  });

  const form = useForm<z.infer<typeof newHabitSchema>>({
    resolver: zodResolver(newHabitSchema),
    defaultValues: { name: "" },
  });

  const { mutate, isPending } = api.habit.create.useMutation({
    onSuccess: async () => {
      form.reset();
      await utils.habit.invalidate();
    },
  });

  const onSubmitCreate = async (values: z.infer<typeof newHabitSchema>) => {
    mutate({
      name: values.name,
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-row items-center gap-4 rounded-md border-2 p-2"
        onSubmit={form.handleSubmit(onSubmitCreate)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  {...field}
                  placeholder="add new habit"
                  type="text"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          Add
        </Button>
      </form>
    </Form>
  );
};

export default AddHabitDialog;
