"use client";
import { heatMapOptions } from "~/constants/apexOptions";
import { formatLogsAsApexSeries } from "~/lib/logs";
import dynamic from "next/dynamic";
import { api } from "~/trpc/react";
import { type Habit } from "~/types";
import { todayMinusThreeMonthsNoon, todayNoon } from "~/lib/dates";
import { Card } from "~/components/ui/card";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const ThreeMonthHeatMap = ({ habit }: { habit: Habit }) => {
  const { data: logs } = api.log.getByHabitAndDate.useQuery({
    habitId: habit.id,
    startDate: todayMinusThreeMonthsNoon(),
    endDate: todayNoon(),
  });

  const apexSeries = formatLogsAsApexSeries(logs ?? []);

  return (
    <>
      <span>{habit.name}</span>
      {ReactApexChart && (
        <ReactApexChart
          options={{
            ...heatMapOptions,
          }}
          series={apexSeries}
          type="heatmap"
          height="100%"
        />
      )}
    </>
  );
};
