import { type Habit } from "~/app/_types";
import {
  dateToShortISO,
  firstDayOfThisYearNoon,
  getListOfDatesInRange,
  lastDayOfThisYearNoon,
  yesterdayNoon,
} from "./date";
import {
  DAYS_OF_THE_WEEK,
  type DaysOfTheWeek,
  getDayStartingMonday,
} from "./getDayOfTheWeek";

export type LogMap = Map<string, boolean>;
export type LogBook = Record<string, LogMap>;

export const createLogBookWithNoRange = (habits: Habit[]) => {
  const logBook: LogBook = habits.reduce(
    (acc, cv) => ({ ...acc, [cv.id]: new Map<string, boolean>() }),
    {},
  );

  return logBook;
};

export const createLogBookWithRange = (
  habits: Habit[],
  startDate: Date,
  endDate: Date,
) => {
  const days = getListOfDatesInRange(startDate, endDate);

  const logBook: LogBook = habits.reduce(
    (acc, cv) => ({ ...acc, [cv.id]: new Map<string, boolean>() }),
    {},
  );

  Object.keys(logBook).forEach((key) => {
    const map = logBook[key];
    if (map) {
      days.forEach((day) => map.set(day, false));
    }
  });

  return logBook;
};

export const createLogBookWithRandomValuesWithRange = (
  habits: Habit[],
  startDate: Date,
  endDate: Date,
) => {
  const days = getListOfDatesInRange(startDate, endDate);

  const logBook: LogBook = habits.reduce(
    (acc, cv) => ({ ...acc, [cv.id]: new Map<string, boolean>() }),
    {},
  );

  Object.keys(logBook).forEach((key) => {
    const map = logBook[key];
    if (map) {
      days.forEach((day) => map.set(day, Math.random() < 0.5));
    }
  });

  return logBook;
};

export const createLogBookWithSeededValuesForThisYear = (habits: Habit[]) => {
  return mergeLogBooks(
    createLogBookWithRange(
      habits,
      firstDayOfThisYearNoon(),
      lastDayOfThisYearNoon(),
    ),
    createLogBookWithRandomValuesWithRange(
      habits,
      firstDayOfThisYearNoon(),
      yesterdayNoon(),
    ),
  );
};

export const mergeLogBooks = (oldBook: LogBook, newBook: LogBook) => {
  const res = { ...oldBook };
  Object.keys(res).forEach((key) => {
    const oldMap = res[key];
    const newMap = newBook[key];
    if (oldMap && newMap) {
      res[key] = new Map([...oldMap, ...newMap]);
    }
  });

  return res;
};

export const sortLogMap = (logMap: LogMap): LogMap => {
  const entries = [...logMap.entries()];
  entries.sort(([a], [b]) => a.localeCompare(b));
  return new Map(entries);
};

export const trimLogMap = (
  logMap: LogMap,
  startDate: Date,
  endDate: Date,
): LogMap => {
  const entries = [...logMap.entries()];
  const entriesFiltered = entries.filter(
    ([d]) =>
      d.localeCompare(dateToShortISO(startDate)) >= 0 &&
      d.localeCompare(dateToShortISO(endDate)) <= 0,
  );
  return new Map(entriesFiltered);
};

export const formatLogMapAsApexSeries = (logMap: LogMap) => {
  const formattedMap = sortLogMap(
    trimLogMap(logMap, firstDayOfThisYearNoon(), lastDayOfThisYearNoon()),
  );
  const data = [...formattedMap.entries()];
  const firstLog = data[0];
  const lastLog = data.slice(-1)[0];

  if (!firstLog || !lastLog) return [];

  const template: number[][] = [[], [], [], [], [], [], []];

  const firstLogDayIndex = getDayStartingMonday(new Date(firstLog[0]));
  const lastLogDayIndex = getDayStartingMonday(new Date(lastLog[0]));

  template.slice(0, firstLogDayIndex).forEach((el) => el.push(0));

  data.forEach((log) => {
    template[getDayStartingMonday(new Date(log[0]))]?.push(log[1] ? 1 : 0);
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
