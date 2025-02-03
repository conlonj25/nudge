import { describe, expect, it } from "vitest";
import { interpolateLogs } from "~/lib/logs";
import { type Log } from "~/types";

const emptyLogs: Log[] = [];

const partialLogs: Log[] = [
  {
    date: "2024-01-02",
    id: 1,
    userId: "17",
    habitId: 21,
    valueBoolean: true,
  },
  {
    date: "2024-01-04",
    id: 2,
    userId: "17",
    habitId: 21,
    valueBoolean: true,
  },
];

const fullLogs: Log[] = [
  {
    date: "2024-01-01",
    id: 1,
    userId: "17",
    habitId: 21,
    valueBoolean: false,
  },
  {
    date: "2024-01-02",
    id: 1,
    userId: "17",
    habitId: 21,
    valueBoolean: true,
  },
  {
    date: "2024-01-03",
    id: 1,
    userId: "17",
    habitId: 21,
    valueBoolean: false,
  },
  {
    date: "2024-01-04",
    id: 1,
    userId: "17",
    habitId: 21,
    valueBoolean: true,
  },
  {
    date: "2024-01-05",
    id: 1,
    userId: "17",
    habitId: 21,
    valueBoolean: false,
  },
  {
    date: "2024-01-06",
    id: 1,
    userId: "17",
    habitId: 21,
    valueBoolean: true,
  },
  {
    date: "2024-01-07",
    id: 1,
    userId: "17",
    habitId: 21,
    valueBoolean: false,
  },
];

const year2024Logs: Log[] = [
  {
    date: "2024-07-04",
    id: 1,
    userId: "17",
    habitId: 21,
    valueBoolean: true,
  },
  {
    date: "2024-09-11",
    id: 1,
    userId: "17",
    habitId: 21,
    valueBoolean: true,
  },
];

const year2025Logs: Log[] = [
  {
    date: "2025-07-04",
    id: 1,
    userId: "17",
    habitId: 21,
    valueBoolean: true,
  },
  {
    date: "2025-09-11",
    id: 1,
    userId: "17",
    habitId: 21,
    valueBoolean: true,
  },
];

describe("interpolateLogs", () => {
  it("should provide a full set when given empty logs", () => {
    const result = interpolateLogs(
      emptyLogs,
      new Date(2024, 0, 1, 12),
      new Date(2024, 0, 7, 12),
    );

    expect(result.length).toBe(7);
    expect(result.every((el) => el.valueBoolean === false)).toBe(true);
    expect(result.every((el) => el.userId === "-1")).toBe(true);
    expect(result.every((el) => el.habitId === -1)).toBe(true);
  });

  it("should provide a full set when given partial logs", () => {
    const result = interpolateLogs(
      partialLogs,
      new Date(2024, 0, 1, 12),
      new Date(2024, 0, 7, 12),
    );

    expect(result.length).toBe(7);
    expect(result[1]?.valueBoolean).toBe(true);
    expect(result[3]?.valueBoolean).toBe(true);
    expect(result.every((el) => el.userId === "17")).toBe(true);
    expect(result.every((el) => el.habitId === 21)).toBe(true);
  });

  it("should provide a full set when given full logs", () => {
    const result = interpolateLogs(
      fullLogs,
      new Date(2024, 0, 1, 12),
      new Date(2024, 0, 7, 12),
    );

    expect(result.length).toBe(7);
    expect(result[1]?.valueBoolean).toBe(true);
    expect(result[3]?.valueBoolean).toBe(true);
    expect(result[5]?.valueBoolean).toBe(true);
    expect(result.every((el) => el.userId === "17")).toBe(true);
    expect(result.every((el) => el.habitId === 21)).toBe(true);
  });

  it("should create correct logs for 2024", () => {
    const result = interpolateLogs(
      year2024Logs,
      new Date(2024, 0, 1, 12),
      new Date(2024, 11, 31, 12),
    );

    expect(result.length).toBe(366);
    expect(result[185]?.valueBoolean).toBe(true);
    expect(result[254]?.valueBoolean).toBe(true);
    expect(result.reduce((acc, cv) => acc + (cv.valueBoolean ? 1 : 0), 0)).toBe(
      2,
    );
    expect(
      result.reduce((acc, cv) => acc + (!cv.valueBoolean ? 1 : 0), 0),
    ).toBe(364);
  });
});
