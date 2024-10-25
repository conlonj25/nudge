"use client";

import { useState } from "react";

import { api } from "~/trpc/react";
import { EditHabitDialog } from "./edit-habit-dialog";

export function MyHabits() {
  const [latestHabits] = api.habit.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createHabit = api.habit.create.useMutation({
    onSuccess: async () => {
      await utils.habit.invalidate();
      setName("");
    },
  });

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      {latestHabits ? <p>Your habits</p> : <p>You have no habits yet.</p>}
      {latestHabits.map((habit) => (
        <EditHabitDialog key={habit.id} habit={habit} />
      ))}
    </div>
  );
}
