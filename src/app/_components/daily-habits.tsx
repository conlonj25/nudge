"use client";

import { PopoverTrigger } from "@radix-ui/react-popover";
import React, { useEffect } from "react";
import { useState } from "react";
import { Popover, PopoverContent } from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "~/components/ui/calendar";

type Habit = {
  id: number;
  name: string | null;
  value: boolean | null;
};

export function DailyHabits() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const dateComponent = date
    ?.toISOString()
    .slice(0, 19)
    .replace("T", " ")
    .split(" ")[0];

  const [todaysHabits, setTodaysHabits] = useState<Habit[]>([]);

  const [data] = api.habit.getByDate.useSuspenseQuery({
    date: dateComponent ?? "",
  });

  useEffect(() => {
    setTodaysHabits(data);
  }, [data]);

  const utils = api.useUtils();
  const setLog = api.habit.setLogEntry.useMutation({
    onSuccess: async () => {
      await utils.habit.invalidate();
    },
  });

  const onChange = (habit: Habit) => {
    const newValue = !habit.value;
    const optimisticData = todaysHabits.map((h) => {
      return h.id === habit.id ? { ...habit, value: newValue } : h;
    });
    console.log({ newValue, todaysHabits, optimisticData, habit });
    setTodaysHabits(optimisticData);
    setLog.mutate({
      id: habit.id,
      value: newValue,
    });
  };

  return (
    <div className="w-full max-w-xs">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {todaysHabits ? <p>Your habits</p> : <p>You have no habits yet.</p>}
      {todaysHabits.map((habit) => (
        <div
          className="flex flex-row content-around items-end bg-slate-50"
          key={habit.id}
        >
          {habit.name}
          <input
            type="checkbox"
            checked={habit.value ?? undefined}
            onChange={() => onChange(habit)}
          />
        </div>
      ))}
    </div>
  );
}
