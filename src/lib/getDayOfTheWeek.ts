export type DaysOfTheWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export const DAYS_OF_THE_WEEK: DaysOfTheWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const getDayStartingMonday = (d: Date): number => {
  return (6 + d.getDay()) % 7;
};

export const toISOStringShort = (d: Date): string => {
  return d.toISOString().slice(0, 19).split("T")[0] ?? "1970-01-01";
};
