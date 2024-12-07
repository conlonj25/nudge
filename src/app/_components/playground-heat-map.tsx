"use client";

import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { type Habit } from "../_types";
import { formatLogMapAsApexSeries, type LogBook } from "~/lib/logbook";
import { heatMapOptions } from "~/constants/apexOptions";

type PlaygroundHeatMapProps = {
  habits: Habit[];
  logBook: LogBook;
};

export const PlaygroundHeatMap = ({
  habits,
  logBook,
}: PlaygroundHeatMapProps) => {
  const keys = Object.keys(logBook);
  const [selectedHabitIndex, setSelectedHabitIndex] = useState(keys[0] ?? "0");

  const logMap = logBook[selectedHabitIndex];

  const logMapApexSeries = logMap && formatLogMapAsApexSeries(logMap);

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
        <ReactApexChart
          options={{ ...heatMapOptions, title: { text: "This year" } }}
          series={logMapApexSeries ?? []}
          type="heatmap"
          height="100%"
        />
      </div>

      {/* <div className="aspect-[1.6] md:hidden">
        <ReactApexChart
          options={{ ...options, title: { text: "Last Three Months" } }}
          series={logsMiniApexSeries ?? []}
          type="heatmap"
          height="100%"
        />
      </div> */}
    </>
  );
};
