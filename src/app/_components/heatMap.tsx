"use client";

import { type ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { formatLogsAsApexSeries } from "~/lib/formatData";
import { interpolateLogsByCurrentYear } from "~/lib/interpolateLogs";
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
  const [selectedHabitId, setSelectedHabitId] = useState(0);

  const { isPending, data: habitsData } = api.habit.getByUser.useQuery();

  useEffect(() => {
    if (selectedHabitId === 0) {
      setSelectedHabitId(habitsData?.[0]?.id ?? 0);
    }
  }, [habitsData]);

  const { data: logs } = api.log.getByThisYear.useQuery({
    habitId: selectedHabitId,
  });

  const data1 = logs && interpolateLogsByCurrentYear(logs);
  const data2 = data1 && formatLogsAsApexSeries({ logs: data1 });

  return (
    <>
      <Select
        onValueChange={(newValue) => {
          const matchedHabit = habitsData?.find(
            (habit) => habit.name === newValue,
          );
          if (matchedHabit) setSelectedHabitId(matchedHabit.id);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={habitsData?.[0]?.name ?? "Habit"} />
        </SelectTrigger>
        <SelectContent>
          {habitsData?.map((habit) => (
            <SelectItem key={habit.id} value={habit.name}>
              {habit.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <ReactApexChart
        options={options}
        series={data2 ?? []}
        type="heatmap"
        height="200"
      />
    </>
  );
};
