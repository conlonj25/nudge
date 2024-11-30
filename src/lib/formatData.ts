import { type Log } from "~/app/_types";
import {
  DAYS_OF_THE_WEEK,
  getDayStartingMonday,
  type DaysOfTheWeek,
} from "./getDayOfTheWeek";

type FormatLogsAsApexSeriesOptions = { logs: Log[] };
type FormatLogsAsApexSeries = (
  options: FormatLogsAsApexSeriesOptions,
) => ApexAxisChartSeries;

export const formatLogsAsApexSeries: FormatLogsAsApexSeries = ({ logs }) => {
  const firstLog = logs[0];
  const lastLog = logs.slice(-1)[0];

  if (!firstLog || !lastLog) return [];

  const template: number[][] = [[], [], [], [], [], [], []];

  const firstLogDayIndex = getDayStartingMonday(new Date(firstLog.date));
  const lastLogDayIndex = getDayStartingMonday(new Date(lastLog.date));

  template.slice(0, firstLogDayIndex).forEach((el) => el.push(0));

  logs.forEach((log) => {
    template[getDayStartingMonday(new Date(log.date))]?.push(
      log.valueBoolean ? 1 : 0,
    );
  });

  template.slice(lastLogDayIndex + 1).forEach((el) => el.push(0));
  template.forEach((el) => console.log(el.length));

  const templateWithLabels = template.reduce(
    (acc, cv, i) => ({ ...acc, [DAYS_OF_THE_WEEK[i] as string]: cv }),
    {} as Record<DaysOfTheWeek, number[]>,
  );

  const yLabels: Record<DaysOfTheWeek, string> = {
    ["Monday"]: "Mon",
    ["Tuesday"]: " ",
    ["Wednesday"]: "Wed",
    ["Thursday"]: " ",
    ["Friday"]: "Fri",
    ["Saturday"]: " ",
    ["Sunday"]: " ",
  };

  return Object.entries(templateWithLabels)
    .map(([k, v]) => ({
      name: yLabels[k as DaysOfTheWeek],
      data: v.map((el) => ({ x: "", y: el })),
    }))
    .reverse();
};
