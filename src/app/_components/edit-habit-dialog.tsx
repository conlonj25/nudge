"use client";

import { type SyntheticEvent, useState } from "react";
import { api } from "~/trpc/react";
import { type Habit } from "../_types";

type EditHabitDialogProps = { habit: Habit };

export function EditHabitDialog({ habit }: EditHabitDialogProps) {
  const utils = api.useUtils();
  const [newName, setNewName] = useState(habit.name);
  const [editing, setEditing] = useState(false);
  const updateHabit = api.habit.update.useMutation({
    onSuccess: async () => {
      setEditing(false);
      await utils.habit.invalidate();
    },
  });

  const deleteHabit = api.habit.delete.useMutation({
    onSuccess: async () => {
      await utils.habit.invalidate();
    },
  });

  const onSubmitUpdate = (e: SyntheticEvent) => {
    e.preventDefault();
    if (newName != habit.name) {
      updateHabit.mutate({
        id: habit.id,
        newName,
      });
    } else {
      setEditing(false);
    }
  };

  const onSubmitDelete = (e: SyntheticEvent) => {
    e.preventDefault();
    deleteHabit.mutate({ id: habit.id });
  };

  return (
    <div className="flex w-full max-w-xs flex-row gap-2">
      <form className="flex" onSubmit={onSubmitUpdate}>
        <input
          type="text"
          readOnly={!editing}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        {!editing && (
          <button
            className="rounded-full bg-white/10 px-3 py-3 font-semibold transition hover:bg-white/20"
            onClick={() => setEditing(true)}
          >
            edit
          </button>
        )}
        {editing && (
          <button
            type="submit"
            className="rounded-full bg-white/10 px-3 py-3 font-semibold transition hover:bg-white/20"
            disabled={updateHabit.isPending}
          >
            save
          </button>
        )}
      </form>

      <form className="flex" onSubmit={onSubmitDelete}>
        {!editing && (
          <button
            type="submit"
            className="rounded-full bg-white/10 px-3 py-3 font-semibold transition hover:bg-white/20"
          >
            delete
          </button>
        )}
      </form>
    </div>
  );
}
