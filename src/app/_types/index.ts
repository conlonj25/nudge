import { type InferSelectModel } from "drizzle-orm";
import { type habits } from "~/server/db/schema";

export type Habit = InferSelectModel<typeof habits>