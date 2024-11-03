import { Button, buttonVariants } from "~/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { type Habit } from "../_types";
import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";

type DeleteHabitDialogProps = { habit: Habit };

const DeleteHabitDialog = ({ habit }: DeleteHabitDialogProps) => {
  const utils = api.useUtils();

  const deleteHabit = api.habit.delete.useMutation({
    onSuccess: async () => {
      await utils.habit.invalidate();
    },
  });

  const onClick = async () => {
    deleteHabit.mutate({
      id: habit.id,
    });
  };

  console.warn(cn(buttonVariants()));

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={cn(buttonVariants({ variant: "destructive" }))}
            onClick={onClick}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteHabitDialog;
