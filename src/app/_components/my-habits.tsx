"use client";

import { api } from "~/trpc/react";
import { Card } from "~/components/ui/card";
import AddHabitDialog from "./add-habit-dialog";
import EditHabitForm from "./edit-habit-form";
import ListSkeleton from "./skeletons/list-skeleton";

export function MyHabits() {
  const [myHabits, { isPending }] = api.habit.getByUser.useSuspenseQuery();

  return isPending ? (
    <ListSkeleton />
  ) : (
    <Card className="flex flex-col gap-4 p-4">
      {myHabits ? <span>My habits</span> : <p>You have no habits yet.</p>}
      {myHabits.map((habit) => (
        <>
          <EditHabitForm key={habit.id} habit={habit} />
          <hr />
        </>
      ))}
      <AddHabitDialog />
    </Card>
  );
}
