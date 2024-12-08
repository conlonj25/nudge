import { DAYS_OF_THE_WEEK } from "~/constants/dates";
import { getDayStartingMonday, getListOfDatesInRange } from "./dates";
import { type Habit, type Log, type DaysOfTheWeek } from "~/types";

export const formatLogsAsApexSeries = (logs: Log[]): ApexAxisChartSeries => {
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

export const getHabitLogs = (
  habits: Habit[] | undefined,
  logs: Log[] | undefined,
) => {
  return (
    habits?.map((habit) => {
      const matchedLog = logs?.find((log) => log.habitId === habit.id);

      const logData = matchedLog
        ? {
            logId: matchedLog.id,
            date: matchedLog.date,
            valueBoolean: matchedLog.valueBoolean,
          }
        : {};

      return {
        userId: habit.userId,
        habitId: habit.id,
        name: habit.name,
        valueBoolean: false,
        ...logData,
      };
    }) ?? []
  );
};

export const interpolateLogs = (
  logs: Log[],
  startDate: Date,
  endDate: Date,
) => {
  const listOfDatesInRange = getListOfDatesInRange(startDate, endDate);

  const placeHolderUserId = logs?.[0]?.userId ?? "-1";
  const placeHolderHabitId = logs?.[0]?.habitId ?? -1;

  const baseObject: Record<string, Log> = listOfDatesInRange.reduce(
    (acc, cv, i) => ({
      ...acc,
      [cv]: {
        id: i,
        userId: placeHolderUserId,
        habitId: placeHolderHabitId,
        date: cv,
        valueBoolean: false,
      },
    }),
    {},
  );

  const logObject: Record<string, Log> = logs?.reduce(
    (acc, cv) => ({ ...acc, [cv.date]: cv }),
    {},
  );

  const mergedObject = { ...baseObject, ...logObject };

  return Object.values(mergedObject);
};

export const interpolateLogsByCurrentYear = (logs: Log[]) => {
  const currentYear = new Date().getFullYear();
  const firstDayOfCurrentYear = new Date(currentYear, 0, 1, 12);
  const lastDayOfCurrentYear = new Date(currentYear, 11, 31, 12);

  return interpolateLogs(logs, firstDayOfCurrentYear, lastDayOfCurrentYear);
};

export const interpolateLogsByLastThreeMonths = (logs: Log[]) => {
  const today = new Date();
  const todayMinusThreeMonths = new Date(
    new Date(today).setMonth(today.getMonth() - 3),
  );

  return interpolateLogs(logs, todayMinusThreeMonths, today);
};
