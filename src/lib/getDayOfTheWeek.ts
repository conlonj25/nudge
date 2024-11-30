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
