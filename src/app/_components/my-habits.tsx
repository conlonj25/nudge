"use client";

import { api } from "~/trpc/react";
import { Card } from "~/components/ui/card";
import AddHabitDialog from "./add-habit-dialog";
import EditHabitForm from "./edit-habit-form";

export function MyHabits() {
  const [latestHabits] = api.habit.getLatest.useSuspenseQuery();

  return (
    <Card className="flex flex-col gap-4 p-4">
      {latestHabits ? <span>Your habits</span> : <p>You have no habits yet.</p>}
      {latestHabits.map((habit) => (
        <>
          <EditHabitForm key={habit.id} habit={habit} />
          <hr />
        </>
      ))}
      <AddHabitDialog />
    </Card>
  );
}
