"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { type Habit } from "../_types";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import DeleteHabitDialog from "./delete-habit-dialog";

type EditHabitDialogProps = { habit: Habit };

const EditHabitForm = ({ habit }: EditHabitDialogProps) => {
  const [editing, setEditing] = useState(false);
  const utils = api.useUtils();

  const updateHabit = api.habit.update.useMutation({
    onSuccess: async () => {
      setEditing(false);
      await utils.habit.invalidate();
    },
  });

  const updateHabitSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
  });

  const onSubmitUpdate = async (values: z.infer<typeof updateHabitSchema>) => {
    updateHabit.mutate({
      id: habit.id,
      newName: values.name,
    });
  };

  const form = useForm<z.infer<typeof updateHabitSchema>>({
    resolver: zodResolver(updateHabitSchema),
    defaultValues: { name: habit.name },
  });

  return (
    <div className="flex w-full flex-row justify-between gap-2">
      <Form {...form}>
        <form
          className="flex w-full items-center justify-between gap-2"
          onSubmit={form.handleSubmit(onSubmitUpdate)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    disabled={!editing || updateHabit.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!editing && <Button onClick={() => setEditing(true)}>Edit</Button>}
          {editing && <Button type="submit">Save</Button>}
          {editing && (
            <Button
              onClick={() => {
                form.reset();
                setEditing(false);
              }}
            >
              Discard
            </Button>
          )}
        </form>
      </Form>
      <DeleteHabitDialog habit={habit} />
    </div>
  );
};

export default EditHabitForm;
