import { DAYS_OF_THE_WEEK } from "~/constants/dates";
import {
  firstDayOfThisYearNoon,
  getDayStartingMonday,
  getListOfDatesInRange,
  lastDayOfThisYearNoon,
  shortISOToDate,
  todayMinusThreeMonthsNoon,
  todayNoon,
} from "./dates";
import { type Habit, type Log, type DaysOfTheWeek } from "~/types";

export const formatLogsAsApexSeries = (logs: Log[]): ApexAxisChartSeries => {
  const firstLog = logs[0];
  const lastLog = logs.slice(-1)[0];

  if (!firstLog || !lastLog) return [];

  const template: number[][] = [[], [], [], [], [], [], []];

  const firstLogDayIndex = getDayStartingMonday(shortISOToDate(firstLog.date));
  const lastLogDayIndex = getDayStartingMonday(shortISOToDate(lastLog.date));

  for (let i = 0; i < firstLogDayIndex; i++) {
    template[i]?.push(0);
  }

  logs.forEach((log) => {
    template[getDayStartingMonday(shortISOToDate(log.date))]?.push(
      log.valueBoolean ? 1 : 0,
    );
  });

  for (let i = lastLogDayIndex + 1; i < 7; i++) {
    template[i]?.push(0);
  }

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
  return interpolateLogs(
    logs,
    firstDayOfThisYearNoon(),
    lastDayOfThisYearNoon(),
  );
};

export const interpolateLogsByLastThreeMonths = (logs: Log[]) => {
  return interpolateLogs(logs, todayMinusThreeMonthsNoon(), todayNoon());
};
