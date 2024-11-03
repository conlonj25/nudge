"use client";

import { Card } from "~/components/ui/card";
import DatePicker from "./date-picker";
import useDate from "~/hooks/useDate";
import { type HabitLog } from "~/lib/getHabitLogs";
import { Checkbox } from "~/components/ui/checkbox";
import Link from "next/link";

const PleaseSignIn = () => {
  const { date, increaseDate, decreaseDate, setExactDate } = useDate();

  const habitLogs: HabitLog[] = [
    { userId: "1", habitId: 1, name: "Journal", valueBoolean: false },
    { userId: "2", habitId: 2, name: "10,000 steps", valueBoolean: false },
  ];

  return (
    <Card className="flex flex-col gap-4 p-4">
      <DatePicker
        date={date}
        increaseDate={increaseDate}
        decreaseDate={decreaseDate}
        setExactDate={setExactDate}
      />
      <hr />
      {habitLogs.map((habitLog) => (
        <>
          <div
            className="flex h-6 flex-row items-center justify-between p-2 text-base"
            key={habitLog.habitId}
          >
            {habitLog.name}
            <Checkbox className="h-8 w-8" />
          </div>
          <hr />
        </>
      ))}
      <div
        className="flex h-6 flex-row items-center justify-between p-2 text-base"
        key={3}
      >
        Track progress on Nudge
        <Link href="/api/auth/signin">
          <Checkbox className="h-8 w-8" />
        </Link>
      </div>
      <hr />
    </Card>
  );
};

export default PleaseSignIn;
