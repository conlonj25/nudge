"use client";

import { api } from "~/trpc/react";
import useDate from "~/hooks/useDate";
import { getHabitLogs, type HabitLog } from "~/lib/getHabitLogs";
import DatePicker from "./date-picker";
import { Checkbox } from "~/components/ui/checkbox";
import { Card } from "~/components/ui/card";
import ListSkeleton from "./list-skeleton";

export function DailyHabits() {
  const { date, calendarDate, increaseDate, decreaseDate, setExactDate } =
    useDate();

  const queryParams = { date: calendarDate ?? "" };
  const { isPending, data: habitsData } = api.habit.getByUser.useQuery();
  const { data: logsData } = api.log.getByUserAndDate.useQuery(queryParams, {
    trpc: { abortOnUnmount: true },
  });

  const utils = api.useUtils();
  const { mutate } = api.log.setLogEntry.useMutation({
    onSuccess: async () => {
      await utils.log.invalidate();
    },
    onMutate: async (newData) => {
      await utils.log.getByUserAndDate.cancel();
      utils.log.getByUserAndDate.setData(queryParams, (oldData) => {
        return oldData?.map((log) => {
          return log.habitId === newData.habitId ? { ...log, ...newData } : log;
        });
      });
    },
  });

  const habitLogs = getHabitLogs({
    habits: habitsData,
    logs: logsData,
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
    <Card className="flex flex-col gap-4 p-4">
      <DatePicker
        date={date}
        increaseDate={increaseDate}
        decreaseDate={decreaseDate}
        setExactDate={setExactDate}
      />
      <hr />
      {isPending ? (
        <ListSkeleton />
      ) : (
        habitLogs.map((habitLog) => (
          <>
            <div
              className="flex h-6 flex-row items-center justify-between p-2 text-base"
              key={habitLog.habitId}
            >
              {habitLog.name}
              <Checkbox
                className="h-8 w-8"
                checked={habitLog.valueBoolean}
                onCheckedChange={() => onChange(habitLog)}
              />
            </div>
            <hr />
          </>
        ))
      )}
    </Card>
  );
}
