import { type InferSelectModel } from "drizzle-orm";
import { type habits } from "~/server/db/schema";
import { type logs } from "~/server/db/schema";

export type Habit = InferSelectModel<typeof habits>;
export type Log = InferSelectModel<typeof logs>;
export type HabitLog = {
  userId: string;
  habitId: number;
  name: string;
  logId?: number;
  date?: string;
  valueBoolean: boolean;
};

export type LogMap = Map<string, boolean>;
export type LogMapBook = Record<string, LogMap>;
export type DaysOfTheWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
