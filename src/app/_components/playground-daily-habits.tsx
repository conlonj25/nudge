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
  mergeLogMapBooks,
} from "~/lib/logMaps";
import { Button } from "~/components/ui/button";
import { signIn } from "next-auth/react";

const PlaygroundDailyHabits = () => {
  const { date, increaseDate, decreaseDate, setExactDate } = useDate();

  const [logMapBook, setLogMapBook] = useState<LogMapBook>(
    createLogMapBookWithSeededValuesForThisYear(defaultPlaygroundHabits),
  );

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
      <Card className="flex flex-col items-center p-4">
        <div className="flex flex-row items-center gap-4">
          <p>Sign in to track your own habits</p>
          <Button onClick={() => signIn()}>Sign In</Button>
        </div>
      </Card>
    </>
  );
};

export default PlaygroundDailyHabits;
