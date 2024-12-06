import { type FormattedLogs, type Habit, type Log } from "~/app/_types";

// Formatting

export const formatLogs = (habits: Habit[], logs: Log[]): FormattedLogs => {
  const formattedLogs: FormattedLogs = habits.reduce(
    (acc, cv) => ({ ...acc, [cv.id]: [] }),
    {},
  );

  logs.forEach((log) => {
    formattedLogs[log.habitId] = (formattedLogs[log.habitId] ?? []).concat(log);
  });

  return formattedLogs;
};

export const mergeLogs = (oldLogs: Log[], newLogs: Log[]): Log[] => {
  const oldLogsWithUniqueKeys = oldLogs.reduce(
    (acc, cv) => ({ ...acc, [`${cv.date}[${cv.habitId}]`]: cv }),
    {},
  );

  const newLogsWithUniqueKeys = newLogs.reduce(
    (acc, cv) => ({ ...acc, [`${cv.date}[${cv.habitId}]`]: cv }),
    {},
  );

  return Object.values({ ...oldLogsWithUniqueKeys, ...newLogsWithUniqueKeys });
};

export const mergeFormattedLogs = (
  habits: Habit[],
  oldLogs: FormattedLogs,
  newLogs: FormattedLogs,
): FormattedLogs => {
  return habits.reduce((acc, cv) => {
    return {
      ...acc,
      [cv.id]: mergeLogs(oldLogs[cv.id] ?? [], newLogs[cv.id] ?? []),
    };
  }, {});
};

// Interpolation

type InterpolateLogsOptions = {
  habits: Habit[];
  logs: Log[];
  startDate: Date;
  endDate: Date;
};
type InterpolateLogs = (options: InterpolateLogsOptions) => FormattedLogs;

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

const createDummyLogs = (habitId: number, startDate: Date, endDate: Date) => {
  const listOfDatesInRange = getListOfDatesInRange(startDate, endDate);
  return listOfDatesInRange.map((date) => ({
    id: 1,
    userId: "1",
    habitId,
    date,
    valueBoolean: false,
  }));
};

export const interpolateLogs: InterpolateLogs = ({
  habits,
  logs,
  startDate,
  endDate,
}) => {
  const baseObject = formatLogs(habits, []);
  const existingFormattedLogs = formatLogs(habits, logs);

  const dummyLogs = Object.entries(baseObject).reduce((acc, [k]) => {
    return { ...acc, [k]: createDummyLogs(Number(k), startDate, endDate) };
  }, {});

  return mergeFormattedLogs(habits, dummyLogs, existingFormattedLogs);
};

export const interpolateLogsByCurrentYear = (habits: Habit[], logs: Log[]) => {
  const currentYear = new Date().getFullYear();
  const firstDayOfCurrentYear = new Date(currentYear, 0, 1, 12);
  const lastDayOfCurrentYear = new Date(currentYear, 11, 31, 12);

  return interpolateLogs({
    habits,
    logs: logs,
    startDate: firstDayOfCurrentYear,
    endDate: lastDayOfCurrentYear,
  });
};

export const interpolateLogsByLastThreeMonths = (
  habits: Habit[],
  logs: Log[],
) => {
  const today = new Date();
  const todayMinusThreeMonths = new Date(
    new Date(today).setMonth(today.getMonth() - 3),
  );

  return interpolateLogs({
    habits,
    logs: logs,
    startDate: todayMinusThreeMonths,
    endDate: today,
  });
};
