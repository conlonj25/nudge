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
  isPending: boolean;
  variables:
    | {
        date: string;
        habitId: number;
        valueBoolean: boolean;
      }
    | undefined;
};
type GetHabitLogs = (params: GetHabitLogsParams) => HabitLog[];

export const getHabitLogs: GetHabitLogs = ({
  habits,
  logs,
  isPending,
  variables,
}) => {
  return (
    habits?.map((habit) => {
      const matchedLog = logs?.find((log) => log.habitId === habit.id);
      const matchedOptimisticValue =
        variables?.habitId === habit.id ? variables.valueBoolean : false;

      let newValue = false;

      if (matchedLog) {
        newValue = matchedLog.valueBoolean;
      }

      if (isPending && matchedOptimisticValue) {
        newValue = matchedOptimisticValue;
      }

      if (matchedLog) {
        return {
          userId: habit.userId,
          habitId: habit.id,
          name: habit.name,
          logId: matchedLog.id,
          date: matchedLog.date,
          valueBoolean: isPending ? matchedOptimisticValue : newValue,
        };
      }

      return {
        userId: habit.userId,
        habitId: habit.id,
        name: habit.name,
        valueBoolean: false,
      };
    }) ?? []
  );
};
