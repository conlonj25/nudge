import { test } from "vitest";
import { interpolateLogsByThisYear } from "~/lib/interpolateLogs";

const logs = [
  {
    id: 62,
    userId: "7808c450-7626-44bf-b277-d68698a2bf86",
    habitId: 31,
    date: "2024-11-03",
    valueBoolean: true,
  },
  {
    id: 65,
    userId: "7808c450-7626-44bf-b277-d68698a2bf86",
    habitId: 31,
    date: "2024-11-04",
    valueBoolean: true,
  },
  {
    id: 67,
    userId: "7808c450-7626-44bf-b277-d68698a2bf86",
    habitId: 31,
    date: "2024-11-07",
    valueBoolean: true,
  },
  {
    id: 69,
    userId: "7808c450-7626-44bf-b277-d68698a2bf86",
    habitId: 31,
    date: "2024-11-12",
    valueBoolean: true,
  },
  {
    id: 74,
    userId: "7808c450-7626-44bf-b277-d68698a2bf86",
    habitId: 31,
    date: "2024-11-13",
    valueBoolean: true,
  },
  {
    id: 73,
    userId: "7808c450-7626-44bf-b277-d68698a2bf86",
    habitId: 31,
    date: "2024-11-14",
    valueBoolean: true,
  },
  {
    id: 72,
    userId: "7808c450-7626-44bf-b277-d68698a2bf86",
    habitId: 31,
    date: "2024-11-15",
    valueBoolean: true,
  },
  {
    id: 77,
    userId: "7808c450-7626-44bf-b277-d68698a2bf86",
    habitId: 31,
    date: "2024-11-16",
    valueBoolean: true,
  },
  {
    id: 96,
    userId: "7808c450-7626-44bf-b277-d68698a2bf86",
    habitId: 31,
    date: "2024-11-18",
    valueBoolean: false,
  },
  {
    id: 90,
    userId: "7808c450-7626-44bf-b277-d68698a2bf86",
    habitId: 31,
    date: "2024-11-19",
    valueBoolean: false,
  },
  {
    id: 99,
    userId: "7808c450-7626-44bf-b277-d68698a2bf86",
    habitId: 31,
    date: "2024-11-20",
    valueBoolean: true,
  },
];
