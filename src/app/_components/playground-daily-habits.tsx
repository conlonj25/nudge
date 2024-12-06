"use client";

import { Card } from "~/components/ui/card";
import useDate from "~/hooks/useDate";
import { getHabitLogs, type HabitLog } from "~/lib/getHabitLogs";
import { Checkbox } from "~/components/ui/checkbox";
import { type Habit, type Log } from "~/app/_types";
import { Fragment, useEffect, useState } from "react";
import { toISOStringShort } from "~/lib/getDayOfTheWeek";
import DatePicker from "./date-picker";
import { PlaygroundHeatMap } from "./playground-heat-map";
import { seedLogsByCurrentYear } from "~/lib/interpolateLogs";

const createEmptyLogsForDate = (habits: Habit[], d: Date): Log[] => {
  return habits.map((habit) => {
    return {
      date: toISOStringShort(d),
      id: 1,
      userId: "1",
      habitId: habit.id,
      valueBoolean: false,
    };
  });
};

const mergeLogs = (oldLogs: Log[], newLogs: Log[]): Log[] => {
  const oldLogsWithUniqueKeys = oldLogs.reduce(
    (acc, cv) => ({ ...acc, [`${cv.date}[${cv.habitId}]`]: cv }),
    {},
  );

  const newLogsWithUniqueKeys = newLogs.reduce(
    (acc, cv) => ({ ...acc, [`${cv.date}[${cv.habitId}]`]: cv }),
    {},
  );

  return Object.values({ ...oldLogsWithUniqueKeys, ...newLogsWithUniqueKeys });
};

const habits: Habit[] = [
  { id: 0, name: "Journal", userId: "1" },
  { id: 1, name: "10,000 Steps", userId: "1" },
  { id: 2, name: "Log progress on Nudge", userId: "1" },
];

const PlaygroundDailyHabits = () => {
  const { date, increaseDate, decreaseDate, setExactDate } = useDate();

  const [logs, setLogs] = useState<Log[]>(seedLogsByCurrentYear(habits));

  useEffect(() => {
    const emptyLogs = createEmptyLogsForDate(habits, date);

    setLogs((existingLogs) => mergeLogs(emptyLogs, existingLogs));
  }, [date]);

  const habitLogs = getHabitLogs({
    habits,
    logs: logs.filter((log) => log.date === toISOStringShort(date)),
  });

  const onCheckedChange = (habitLog: HabitLog) => {
    setLogs((oldLogs) => {
      const newValueBoolean = !habitLog.valueBoolean;
      const matchedLogIndex = oldLogs?.findIndex(
        (log) => log.habitId === habitLog.habitId && log.date === habitLog.date,
      );

      const newLog: Log = {
        date: toISOStringShort(date),
        id: 1,
        userId: "1",
        habitId: habitLog.habitId,
        valueBoolean: newValueBoolean,
      };

      if (matchedLogIndex === -1) {
        return [...oldLogs, newLog];
      }

      return [...oldLogs].map((log, i) =>
        i === matchedLogIndex ? newLog : log,
      );
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
        {habitLogs.map((habitLog, i) => (
          <Fragment key={`habitLog[${i}]`}>
            <div className="flex h-6 flex-row items-center justify-between p-2 text-base">
              {habitLog.name}
              <Checkbox
                className="h-8 w-8"
                checked={habitLog.valueBoolean}
                onCheckedChange={() => onCheckedChange(habitLog)}
              />
            </div>
            <hr />
          </Fragment>
        ))}
      </Card>
      <Card className="flex flex-col gap-4 p-4">
        <PlaygroundHeatMap habits={habits} logs={logs} />
      </Card>
    </>
  );
};

export default PlaygroundDailyHabits;
