import { describe, expect, it, test } from "vitest";
import { type Habit } from "~/app/_types";
import { interpolateLogs } from "~/lib/logManipulations";

describe("Interpolation", () => {
  it("should expand the logs over a given date range", () => {
    const habits: Habit[] = [
      { id: 0, name: "Journal", userId: "1" },
      { id: 1, name: "10,000 Steps", userId: "1" },
      { id: 2, name: "Log progress on Nudge", userId: "1" },
    ];

    const logs = [
      {
        id: 1,
        userId: "1",
        habitId: 0,
        date: "2024-01-01",
        valueBoolean: true,
      },
      {
        id: 3,
        userId: "1",
        habitId: 1,
        date: "2024-01-04",
        valueBoolean: true,
      },
      {
        id: 6,
        userId: "1",
        habitId: 2,
        date: "2024-01-07",
        valueBoolean: true,
      },
    ];

    const res = interpolateLogs({
      habits,
      logs,
      startDate: new Date(2024, 0, 1, 12),
      endDate: new Date(2024, 0, 7, 12),
    });

    expect(res[0]?.length).toBe(7);
    expect(res[1]?.length).toBe(7);
    expect(res[2]?.length).toBe(7);
    expect(res[0]?.[0]?.valueBoolean).toBe(true);
    expect(res[1]?.[3]?.valueBoolean).toBe(true);
    expect(res[2]?.[6]?.valueBoolean).toBe(true);
  });

  it("should trim any logs outside the given date range", () => {
    const habits: Habit[] = [
      { id: 0, name: "Journal", userId: "1" },
      { id: 1, name: "10,000 Steps", userId: "1" },
      { id: 2, name: "Log progress on Nudge", userId: "1" },
    ];

    const logs = [
      {
        id: 1,
        userId: "1",
        habitId: 0,
        date: "2024-01-01",
        valueBoolean: true,
      },
      {
        id: 3,
        userId: "1",
        habitId: 1,
        date: "2024-01-04",
        valueBoolean: true,
      },
      {
        id: 6,
        userId: "1",
        habitId: 2,
        date: "2024-01-07",
        valueBoolean: true,
      },
    ];

    const outOfRangeDate = {
      id: 6,
      userId: "1",
      habitId: 2,
      date: "2024-08-11",
      valueBoolean: true,
    };

    const res = interpolateLogs({
      habits,
      logs: [...logs, outOfRangeDate],
      startDate: new Date(2024, 0, 1, 12),
      endDate: new Date(2024, 0, 7, 12),
    });

    expect(res[0]?.length).toBe(7);
    expect(res[1]?.length).toBe(7);
    expect(res[2]?.length).toBe(7);
    expect(res[0]?.[0]?.valueBoolean).toBe(true);
    expect(res[1]?.[3]?.valueBoolean).toBe(true);
    expect(res[2]?.[6]?.valueBoolean).toBe(true);
  });
});
