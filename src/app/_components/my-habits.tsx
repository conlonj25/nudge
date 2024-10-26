"use client";

import { type SyntheticEvent, useState } from "react";

import { api } from "~/trpc/react";
import { EditHabitDialog } from "./edit-habit-dialog";

export function MyHabits() {
  const [latestHabits] = api.habit.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [newName, setNewName] = useState("");
  const createHabit = api.habit.create.useMutation({
    onSuccess: async () => {
      await utils.habit.invalidate();
      setNewName("");
    },
  });

  const onSubmitCreate = (e: SyntheticEvent) => {
    e.preventDefault();
    createHabit.mutate({
      name: newName,
    });
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      {latestHabits ? <p>Your habits</p> : <p>You have no habits yet.</p>}
      {latestHabits.map((habit) => (
        <EditHabitDialog key={habit.id} habit={habit} />
      ))}
      <form className="flex" onSubmit={onSubmitCreate}>
        <input
          type="text"
          className="w-full rounded-full px-4 py-2 text-black"
          name="jim"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-3 py-3 font-semibold transition hover:bg-white/20"
        >
          Add
        </button>
      </form>
    </div>
  );
}
