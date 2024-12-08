"use client";

import { Card } from "~/components/ui/card";
import useDate from "~/hooks/useDate";
import { Checkbox } from "~/components/ui/checkbox";
import { Fragment, useState } from "react";
import DatePicker from "./date-picker";
import { PlaygroundHeatMap } from "./playground-heat-map";
import { type LogMapBook, type Habit } from "~/types";
import { defaultPlaygroundHabits } from "~/constants/habits";
import { dateToShortISO } from "~/lib/dates";
import {
  createLogMapBookWithSeededValuesForThisYear,
  sortLogMap,
  mergeLogMapBooks,
} from "~/lib/logMaps";

const PlaygroundDailyHabits = () => {
  const { date, increaseDate, decreaseDate, setExactDate } = useDate();

  const [logMapBook, setLogMapBook] = useState<LogMapBook>(
    createLogMapBookWithSeededValuesForThisYear(defaultPlaygroundHabits),
  );

  console.warn({ logMapBook });
  const logMap = logMapBook[0];
  if (logMap) {
    console.warn({ sorted: sortLogMap(logMap) });
  }

  const onCheckedChange = (habit: Habit, value: boolean) => {
    const newLogMapBook = {
      [habit.id]: new Map([[dateToShortISO(date), !value]]),
    };

    setLogMapBook((oldLogMapBook) =>
      mergeLogMapBooks(oldLogMapBook, newLogMapBook),
    );
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
        {Object.keys(logMapBook).map((key) => {
          const habit = defaultPlaygroundHabits.find(
            (habit) => habit.id === Number(key),
          );
          const value = logMapBook[key]?.get(dateToShortISO(date)) ?? false;
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
        <PlaygroundHeatMap
          habits={defaultPlaygroundHabits}
          logMapBook={logMapBook}
        />
      </Card>
    </>
  );
};

export default PlaygroundDailyHabits;
