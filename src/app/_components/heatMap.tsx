"use client";

import { type ApexOptions } from "apexcharts";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { formatLogsAsApexSeries } from "~/lib/formatData";
import {
  interpolateLogsByCurrentYear,
  interpolateLogsByLastThreeMonths,
} from "~/lib/interpolateLogs";
import { api } from "~/trpc/react";

const options: ApexOptions = {
  chart: {
    height: "100px",
    type: "heatmap",
  },
  plotOptions: {
    heatmap: {
      radius: 4,
      colorScale: {
        ranges: [
          {
            from: 0,
            to: 0,
            color: "#d1d5db",
            name: " ",
          },
          {
            from: 1,
            to: 1,
            color: "#16a34a",
            name: " ",
          },
        ],
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  title: {
    text: "Progress this year",
  },
};

export const HeatMap = () => {
  const [selectedHabitIndex, setSelectedHabitIndex] = useState(0);

  const { data: habits } = api.habit.getByUser.useQuery();

  const { data: logs } = api.log.getByThisYear.useQuery(
    {
      habitId: habits?.[selectedHabitIndex]?.id ?? 0,
    },
    { enabled: !!habits },
  );

  const logsInterpolated = logs && interpolateLogsByCurrentYear(logs);
  const logsThreeMonths = logs && interpolateLogsByLastThreeMonths(logs);
  const logsApexSeries =
    logsInterpolated && formatLogsAsApexSeries({ logs: logsInterpolated });
  const logsMiniApexSeries =
    logsThreeMonths && formatLogsAsApexSeries({ logs: logsThreeMonths });

  return (
    <>
      <div className="flex flex-row justify-end">
        <Select
          onValueChange={(newValue) => {
            const matchedHabit = habits?.findIndex(
              (habit) => habit.name === newValue,
            );
            if (matchedHabit) setSelectedHabitIndex(matchedHabit);
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

      <div className="hidden md:block">
        <ReactApexChart
          options={{ ...options, title: { text: "This year" } }}
          series={logsApexSeries ?? []}
          type="heatmap"
          height="225"
        />
      </div>

      <div className="md:hidden">
        <ReactApexChart
          options={{ ...options, title: { text: "Last Three Months" } }}
          series={logsMiniApexSeries ?? []}
          type="heatmap"
          height="225"
        />
      </div>
    </>
  );
};
