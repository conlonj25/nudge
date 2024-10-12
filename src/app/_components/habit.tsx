"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function LatestHabits() {
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
    <div className="w-full max-w-xs">
      {latestHabits ? <p>Your habits</p> : <p>You have no habits yet.</p>}
      {latestHabits.map((habit) => (
        <li key={habit.id}>{habit.name}</li>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createHabit.mutate({ name });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createHabit.isPending}
        >
          {createHabit.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
