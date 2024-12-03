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
import { type Habit, type Log } from "../_types";

const options: ApexOptions = {
  chart: {
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
  legend: {
    show: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    labels: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
};

type PlaygroundHeatMapProps = {
  habits: Habit[];
  logs: Log[];
};

export const PlaygroundHeatMap = ({
  habits,
  logs: unfilteredLogs,
}: PlaygroundHeatMapProps) => {
  const [selectedHabitIndex, setSelectedHabitIndex] = useState(0);

  const logs = unfilteredLogs.filter(
    (log) => log.habitId === selectedHabitIndex,
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
            const matchedHabitIndex = habits?.findIndex(
              (habit) => habit.name === newValue,
            );
            if (matchedHabitIndex !== undefined)
              setSelectedHabitIndex(matchedHabitIndex);
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
          options={{ ...options, title: { text: "This year" } }}
          series={logsApexSeries ?? []}
          type="heatmap"
          height="100%"
        />
      </div>

      <div className="aspect-[1.6] md:hidden">
        <ReactApexChart
          options={{ ...options, title: { text: "Last Three Months" } }}
          series={logsMiniApexSeries ?? []}
          type="heatmap"
          height="100%"
        />
      </div>
    </>
  );
};
