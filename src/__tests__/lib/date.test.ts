import { expect, it } from "vitest";
import { dayGTE, dayLTE } from "~/lib/date";

it("should return true as long as the day part of the date is LTE", () => {
  expect(dayLTE(new Date(2024, 0, 1), new Date(2024, 0, 1))).toBe(true);
  expect(dayLTE(new Date(2024, 0, 1, 12), new Date(2024, 0, 1, 12))).toBe(true);
  expect(dayLTE(new Date(2024, 0, 1, 18), new Date(2024, 0, 1, 12))).toBe(true);
  expect(dayLTE(new Date(2024, 0, 2, 12), new Date(2024, 0, 1, 12))).toBe(
    false,
  );
});

it("should return true as long as the day part of the date is GTE", () => {
  expect(dayGTE(new Date(2024, 0, 1), new Date(2024, 0, 1))).toBe(true);
  expect(dayGTE(new Date(2024, 0, 1, 12), new Date(2024, 0, 1, 12))).toBe(true);
  expect(dayGTE(new Date(2024, 0, 1, 6), new Date(2024, 0, 1, 12))).toBe(true);
  expect(dayGTE(new Date(2023, 11, 31, 12), new Date(2024, 0, 1, 12))).toBe(
    false,
  );
});
