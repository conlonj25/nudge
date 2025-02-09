"use client";

import { api } from "~/trpc/react";
import useDate from "~/hooks/useDate";
import DatePicker from "./date-picker";
import { Checkbox } from "~/components/ui/checkbox";
import { Card } from "~/components/ui/card";
import ListSkeleton from "./skeletons/list-skeleton";
import Link from "next/link";
import { HeatMap } from "./heat-map";
import { getHabitLogs } from "~/lib/logs";
import { type HabitLog } from "~/types";
import { Fragment } from "react";
import { ThreeMonthHeatMap } from "./charts/three-month-heat-map";

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
        if (!oldData?.find((log) => log.habitId === newData.habitId)) {
          return oldData && [...oldData, { id: 0, userId: "", ...newData }];
        }
        return oldData?.map((log) => {
          return log.habitId === newData.habitId ? { ...log, ...newData } : log;
        });
      });
    },
  });

  const habitLogs = getHabitLogs(habitsData, logsData);

  const onChange = (habitLog: HabitLog) => {
    const newValue = !habitLog.valueBoolean;
    mutate({
      date: calendarDate ?? "",
      habitId: habitLog.habitId,
      valueBoolean: newValue,
    });
  };

  return (
    <>
      <Card className="flex flex-col gap-4 p-4">
        <DatePicker
          date={date}
          increaseDate={increaseDate}
          decreaseDate={decreaseDate}
          setExactDate={setExactDate}
        />
        <hr />
        {!isPending && habitLogs.length === 0 && (
          <>
            <p className="text-center">
              {"You don't have any habits right now."}
            </p>
            <p className="text-center">
              <Link
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                href={"/habits"}
              >
                Add some
              </Link>{" "}
              to start tracking results.
            </p>
          </>
        )}
        {isPending ? (
          <ListSkeleton />
        ) : (
          habitLogs.map((habitLog) => (
            <Fragment key={habitLog.habitId}>
              <div className="flex h-6 flex-row items-center justify-between p-2 text-base">
                {habitLog.name}
                <Checkbox
                  className="h-8 w-8"
                  checked={habitLog.valueBoolean}
                  onCheckedChange={() => onChange(habitLog)}
                />
              </div>
              <hr />
            </Fragment>
          ))
        )}
      </Card>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {habitsData?.map((habit) => (
          <Card
            key={habit.id}
            className="center flex aspect-[2] flex-col gap-4 p-4"
          >
            <ThreeMonthHeatMap habit={habit} />
          </Card>
        ))}
      </div>
    </>
  );
}
