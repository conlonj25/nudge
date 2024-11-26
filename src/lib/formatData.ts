import { type Log } from "~/app/_types";
import { getDayOfTheWeek, type DaysOfTheWeek } from "./getDayOfTheWeek";

type FormatLogsAsApexSeriesOptions = { logs: Log[] };
type FormatLogsAsApexSeries = (
  options: FormatLogsAsApexSeriesOptions,
) => ApexAxisChartSeries;

export const formatLogsAsApexSeries: FormatLogsAsApexSeries = ({ logs }) => {
  if (logs.length <= 1) return [];

  const template: Record<DaysOfTheWeek, number[]> = {
    ["Monday"]: [],
    ["Tuesday"]: [],
    ["Wednesday"]: [],
    ["Thursday"]: [],
    ["Friday"]: [],
    ["Saturday"]: [],
    ["Sunday"]: [],
  };

  logs.forEach((log) => {
    template[getDayOfTheWeek(new Date(log.date))].push(
      log.valueBoolean ? 1 : 0,
    );
  });

  const yLabels: Record<DaysOfTheWeek, string> = {
    ["Monday"]: "Mon",
    ["Tuesday"]: " ",
    ["Wednesday"]: "Wed",
    ["Thursday"]: " ",
    ["Friday"]: "Fri",
    ["Saturday"]: " ",
    ["Sunday"]: " ",
  };

  return Object.entries(template)
    .map(([k, v]) => ({
      name: yLabels[k as DaysOfTheWeek],
      data: v.map((el, i) => ({ x: "", y: el })),
    }))
    .reverse();
};
