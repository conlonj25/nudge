import { type Habit, type Log } from "~/app/_types";

const getListOfDatesInRange = function (startDate: Date, endDate: Date) {
  const arr = [];
  for (
    const dt = new Date(startDate);
    dt <= new Date(endDate);
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt));
  }
  return arr.map((v) => v.toISOString().slice(0, 10));
};

type SeedLogsOptions = {
  startDate: Date;
  endDate: Date;
  habits: Habit[];
};
type SeedLogs = (options: SeedLogsOptions) => Log[];

type InterpolateLogsOptions = {
  logs: Log[];
  startDate: Date;
  endDate: Date;
};
type InterpolateLogs = (options: InterpolateLogsOptions) => Log[];

export const seedLogs: SeedLogs = ({ startDate, endDate, habits }) => {
  const listOfDatesInRange = getListOfDatesInRange(startDate, endDate);

  return habits
    .map((habit) =>
      listOfDatesInRange.map((date) => ({
        id: 1,
        userId: "1",
        habitId: habit.id,
        date,
        valueBoolean: Math.random() >= 0.5,
      })),
    )
    .reduce((acc, cv) => [...acc, ...cv], []);
};

export const seedLogsByCurrentYear = (habits: Habit[]) => {
  const currentYear = new Date().getFullYear();
  const firstDayOfCurrentYear = new Date(currentYear, 0, 1, 12);
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

  return seedLogs({
    startDate: firstDayOfCurrentYear,
    endDate: yesterday,
    habits,
  });
};

export const interpolateLogs: InterpolateLogs = ({
  logs,
  startDate,
  endDate,
}) => {
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

  return interpolateLogs({
    logs: logs,
    startDate: firstDayOfCurrentYear,
    endDate: lastDayOfCurrentYear,
  });
};

export const interpolateLogsByLastThreeMonths = (logs: Log[]) => {
  const today = new Date();
  const todayMinusThreeMonths = new Date(
    new Date(today).setMonth(today.getMonth() - 3),
  );

  return interpolateLogs({
    logs: logs,
    startDate: todayMinusThreeMonths,
    endDate: today,
  });
};
