import { type Log, type Habit } from "~/app/_types";

export type HabitLog = {
  userId: string;
  habitId: number;
  name: string;
  logId?: number;
  date?: string;
  valueBoolean: boolean;
};

type GetHabitLogsParams = {
  habits: Habit[] | undefined;
  logs: Log[] | undefined;
};

type GetHabitLogs = (params: GetHabitLogsParams) => HabitLog[];

export const getHabitLogs: GetHabitLogs = ({ habits, logs }) => {
  return (
    habits?.map((habit) => {
      const matchedLog = logs?.find((log) => log.habitId === habit.id);

      const logData = matchedLog
        ? {
            logId: matchedLog.id,
            date: matchedLog.date,
            valueBoolean: matchedLog.valueBoolean,
          }
        : {};

      return {
        userId: habit.userId,
        habitId: habit.id,
        name: habit.name,
        valueBoolean: false,
        ...logData,
      };
    }) ?? []
  );
};
