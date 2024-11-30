import { describe, expect, it } from "vitest";
import { getDayStartingMonday } from "~/lib/getDayOfTheWeek";

describe("getDayStartingMonday", () => {
  it("should", () => {
    expect(getDayStartingMonday(new Date("2024-01-01"))).toBe(0);
    expect(getDayStartingMonday(new Date("2024-01-02"))).toBe(1);
    expect(getDayStartingMonday(new Date("2024-01-03"))).toBe(2);
    expect(getDayStartingMonday(new Date("2024-01-04"))).toBe(3);
    expect(getDayStartingMonday(new Date("2024-01-05"))).toBe(4);
    expect(getDayStartingMonday(new Date("2024-01-06"))).toBe(5);
    expect(getDayStartingMonday(new Date("2024-01-07"))).toBe(6);
  });
});
