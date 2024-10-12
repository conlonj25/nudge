"use client";

import { PopoverTrigger } from "@radix-ui/react-popover";
import React from "react";
import { useState } from "react";
import { Popover, PopoverContent } from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";

import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "~/components/ui/calendar";

export function DailyHabits() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const dateComponent = date
    ?.toISOString()
    .slice(0, 19)
    .replace("T", " ")
    .split(" ")[0];

  const [todaysHabits] = api.habit.getByDate.useSuspenseQuery({
    date: dateComponent ?? "",
  });

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
        <li key={habit.id}>{habit.name}</li>
      ))}
    </div>
  );
}
