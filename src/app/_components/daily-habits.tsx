"use client";

import { PopoverTrigger } from "@radix-ui/react-popover";
import { Popover, PopoverContent } from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "~/components/ui/calendar";
import useDate from "~/hooks/useDate";
import { getHabitLogs, type HabitLog } from "~/lib/getHabitLogs";

export function DailyHabits() {
  const { date, calendarDate, increaseDate, decreaseDate, setExactDate } =
    useDate();

  const { data: habitsData } = api.habit.getByUser.useQuery();
  const { data: logsData } = api.log.getByUserAndDate.useQuery({
    date: calendarDate ?? "",
  });

  const utils = api.useUtils();
  const { isPending, variables, mutate } = api.log.setLogEntry.useMutation({
    onSuccess: async () => {
      await utils.log.invalidate();
    },
  });

  const habitLogs = getHabitLogs({
    habits: habitsData,
    logs: logsData,
    isPending,
    variables,
  });

  const onChange = (habitLog: HabitLog) => {
    const newValue = !habitLog.valueBoolean;
    mutate({
      date: calendarDate ?? "",
      habitId: habitLog.habitId,
      valueBoolean: newValue,
    });
  };

  return (
    <div className="w-full max-w-xs">
      <Button onClick={decreaseDate}>{"<"}</Button>
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
            onSelect={setExactDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button onClick={increaseDate}>{">"}</Button>
      {date.toDateString()}
      {habitLogs.map((habitLog) => (
        <div
          className="flex flex-row content-around items-end bg-slate-50"
          key={habitLog.habitId}
        >
          {habitLog.name}
          <input
            type="checkbox"
            checked={habitLog.valueBoolean}
            onChange={() => onChange(habitLog)}
          />
        </div>
      ))}
    </div>
  );
}
