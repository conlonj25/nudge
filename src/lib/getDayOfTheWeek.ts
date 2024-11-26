export type DaysOfTheWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export const DAYS_OF_THE_WEEK: DaysOfTheWeek[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const getDayOfTheWeek = (d: Date): DaysOfTheWeek => {
  return DAYS_OF_THE_WEEK[d.getDay()] ?? "Sunday";
};
