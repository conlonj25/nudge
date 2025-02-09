"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { heatMapOptions } from "~/constants/apexOptions";
import { todayMinusThreeMonthsNoon, todayNoon } from "~/lib/dates";
import { formatLogMapAsApexSeries, trimLogMap } from "~/lib/logMaps";
import { type LogMapBook, type Habit } from "~/types";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type PlaygroundHeatMapProps = {
  habits: Habit[];
  logMapBook: LogMapBook;
};

export const PlaygroundHeatMap = ({
  habits,
  logMapBook,
}: PlaygroundHeatMapProps) => {
  const keys = Object.keys(logMapBook);
  const [selectedHabitIndex, setSelectedHabitIndex] = useState(keys[0] ?? "0");

  const logMap = logMapBook[selectedHabitIndex];
  const logMapThreeMonths =
    logMap && trimLogMap(logMap, todayMinusThreeMonthsNoon(), todayNoon());

  const logMapApexSeries = logMap && formatLogMapAsApexSeries(logMap);
  const logMapThreeMonthsApexSeries =
    logMapThreeMonths && formatLogMapAsApexSeries(logMapThreeMonths);

  return (
    <>
      <div className="flex flex-row justify-end">
        <Select
          onValueChange={(newValue) => {
            const matchedHabitIndex = habits?.findIndex(
              (habit) => habit.name === newValue,
            );
            if (matchedHabitIndex !== undefined)
              setSelectedHabitIndex(String(matchedHabitIndex));
          }}
        >
          <SelectTrigger className="w-1/3">
            <SelectValue placeholder={habits?.[0]?.name ?? "Habit"} />
          </SelectTrigger>
          <SelectContent>
            {habits?.map((habit) => (
              <SelectItem key={habit.id} value={habit.name}>
                {habit.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="hidden aspect-[5] md:block">
        {ReactApexChart && (
          <ReactApexChart
            options={{ ...heatMapOptions, title: { text: "This year" } }}
            series={logMapApexSeries ?? []}
            type="heatmap"
            height="100%"
          />
        )}
      </div>

      <div className="aspect-[1.6] md:hidden">
        {ReactApexChart && (
          <ReactApexChart
            options={{
              ...heatMapOptions,
              title: { text: "Last Three Months" },
            }}
            series={logMapThreeMonthsApexSeries ?? []}
            type="heatmap"
            height="100%"
          />
        )}
      </div>
    </>
  );
};
