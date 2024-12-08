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
import { heatMapOptions } from "~/constants/apexOptions";
import {
  interpolateLogsByCurrentYear,
  interpolateLogsByLastThreeMonths,
  formatLogsAsApexSeries,
} from "~/lib/logs";

import { api } from "~/trpc/react";

export const HeatMap = () => {
  const [selectedHabitIndex, setSelectedHabitIndex] = useState(0);

  const { data: habits } = api.habit.getByUser.useQuery();

  const { data: logs } = api.log.getByThisYear.useQuery(
    {
      habitId: habits?.[selectedHabitIndex]?.id ?? 0,
    },
    { enabled: !!habits },
  );

  const utils = api.useUtils();
  if (habits) {
    habits.forEach((habit) => {
      void utils.log.getByThisYear.prefetch({ habitId: habit.id });
    });
  }

  const logsInterpolated = logs && interpolateLogsByCurrentYear(logs);
  const logsThreeMonths = logs && interpolateLogsByLastThreeMonths(logs);
  const logsApexSeries = logsInterpolated && formatLogsAsApexSeries(logs);
  const logsMiniApexSeries =
    logsThreeMonths && formatLogsAsApexSeries(logsThreeMonths);

  return (
    <>
      <div className="flex flex-row justify-end">
        <Select
          onValueChange={(newValue) => {
            const matchedHabitIndex = habits?.findIndex(
              (habit) => habit.name === newValue,
            );
            if (matchedHabitIndex !== undefined)
              setSelectedHabitIndex(matchedHabitIndex);
          }}
        >
          <SelectTrigger className="w-[180px]">
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
          series={logsApexSeries ?? []}
          type="heatmap"
          height="100%"
        />
      </div>

      <div className="aspect-[1.6] md:hidden">
        <ReactApexChart
          options={{ ...heatMapOptions, title: { text: "Last Three Months" } }}
          series={logsMiniApexSeries ?? []}
          type="heatmap"
          height="100%"
        />
      </div>
    </>
  );
};
