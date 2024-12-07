"use client";

import { Card } from "~/components/ui/card";
import useDate from "~/hooks/useDate";
import { Checkbox } from "~/components/ui/checkbox";
import { type Habit } from "~/app/_types";
import { Fragment, useState } from "react";
import DatePicker from "./date-picker";
import { PlaygroundHeatMap } from "./playground-heat-map";
import {
  createLogBookWithSeededValuesForThisYear,
  mergeLogBooks,
  sortLogMap,
  type LogBook,
} from "~/lib/logbook";
import { dateToShortISO } from "~/lib/date";

const habits: Habit[] = [
  { id: 0, name: "Journal", userId: "1" },
  { id: 1, name: "10,000 Steps", userId: "1" },
  { id: 2, name: "Log progress on Nudge", userId: "1" },
];

const PlaygroundDailyHabits = () => {
  const { date, increaseDate, decreaseDate, setExactDate } = useDate();

  const [logBook, setLogBook] = useState<LogBook>(
    createLogBookWithSeededValuesForThisYear(habits),
  );

  console.warn({ logBook });
  const logMap = logBook[0];
  if (logMap) {
    console.warn({ sorted: sortLogMap(logMap) });
  }

  const onCheckedChange = (habit: Habit, value: boolean) => {
    const newLogBook = {
      [habit.id]: new Map([[dateToShortISO(date), !value]]),
    };

    setLogBook((oldLogBook) => mergeLogBooks(oldLogBook, newLogBook));
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
        {Object.keys(logBook).map((key) => {
          const habit = habits.find((habit) => habit.id === Number(key));
          const value = logBook[key]?.get(dateToShortISO(date)) ?? false;
          return (
            habit && (
              <Fragment key={`habit[${habit.id}]`}>
                <div className="flex h-6 flex-row items-center justify-between p-2 text-base">
                  {habit.name}
                  <Checkbox
                    className="h-8 w-8"
                    checked={value}
                    onCheckedChange={() => {
                      onCheckedChange(habit, value);
                    }}
                  />
                </div>
                <hr />
              </Fragment>
            )
          );
        })}
      </Card>
      <Card className="flex flex-col gap-4 p-4">
        <PlaygroundHeatMap habits={habits} logBook={logBook} />
      </Card>
    </>
  );
};

export default PlaygroundDailyHabits;
