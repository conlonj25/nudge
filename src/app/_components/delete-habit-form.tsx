"use client";

import { api } from "~/trpc/react";
import { type Habit } from "../_types";
import { Form } from "~/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";

type EditHabitDialogProps = { habit: Habit };

const DeleteHabitForm = ({ habit }: EditHabitDialogProps) => {
  const utils = api.useUtils();

  const deleteHabit = api.habit.delete.useMutation({
    onSuccess: async () => {
      await utils.habit.invalidate();
    },
  });

  const onSubmit = async () => {
    deleteHabit.mutate({
      id: habit.id,
    });
  };

  const form = useForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Button variant={"destructive"} type="submit">
          Delete
        </Button>
      </form>
    </Form>
  );
};

export default DeleteHabitForm;
