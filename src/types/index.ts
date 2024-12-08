import { type InferSelectModel } from "drizzle-orm";
import { type habits } from "~/server/db/schema";
import { type logs } from "~/server/db/schema";

export type Habit = InferSelectModel<typeof habits>;
export type Log = InferSelectModel<typeof logs>;
export type FormattedLogs = Record<string, Log[]>;
