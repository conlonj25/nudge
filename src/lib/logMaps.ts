import { DAYS_OF_THE_WEEK } from "~/constants/dates";
import {
  type LogMapBook,
  type Habit,
  type LogMap,
  type DaysOfTheWeek,
} from "~/types";
import {
  getListOfDatesInRange,
  firstDayOfThisYearNoon,
  lastDayOfThisYearNoon,
  yesterdayNoon,
  dateToShortISO,
  getDayStartingMonday,
  shortISOToDate,
} from "./dates";

export const createLogMapBookWithRange = (
  habits: Habit[],
  startDate: Date,
  endDate: Date,
) => {
  const days = getListOfDatesInRange(startDate, endDate);

  const logMapBook: LogMapBook = habits.reduce(
    (acc, cv) => ({ ...acc, [cv.id]: new Map<string, boolean>() }),
    {},
  );

  Object.keys(logMapBook).forEach((key) => {
    const map = logMapBook[key];
    if (map) {
      days.forEach((day) => map.set(day, false));
    }
  });

  return logMapBook;
};

export const createLogMapBookWithRandomValuesWithRange = (
  habits: Habit[],
  startDate: Date,
  endDate: Date,
) => {
  const days = getListOfDatesInRange(startDate, endDate);

  const logMapBook: LogMapBook = habits.reduce(
    (acc, cv) => ({ ...acc, [cv.id]: new Map<string, boolean>() }),
    {},
  );

  Object.keys(logMapBook).forEach((key) => {
    const map = logMapBook[key];
    if (map) {
      days.forEach((day) => map.set(day, Math.random() < 0.5));
    }
  });

  return logMapBook;
};

export const createLogMapBookWithSeededValuesForThisYear = (
  habits: Habit[],
) => {
  return mergeLogMapBooks(
    createLogMapBookWithRange(
      habits,
      firstDayOfThisYearNoon(),
      lastDayOfThisYearNoon(),
    ),
    createLogMapBookWithRandomValuesWithRange(
      habits,
      firstDayOfThisYearNoon(),
      yesterdayNoon(),
    ),
  );
};

export const mergeLogMapBooks = (oldBook: LogMapBook, newBook: LogMapBook) => {
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

  const firstLogDayIndex = getDayStartingMonday(shortISOToDate(firstLog[0]));
  const lastLogDayIndex = getDayStartingMonday(shortISOToDate(lastLog[0]));

  for (let i = 0; i < firstLogDayIndex; i++) {
    template[i]?.push(0);
  }

  data.forEach((log) => {
    template[getDayStartingMonday(shortISOToDate(log[0]))]?.push(
      log[1] ? 1 : 0,
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
