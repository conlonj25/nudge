import { expect, it } from "vitest";
import { dayGTE, dayLTE, shortISOToDate } from "~/lib/date";

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

it("shortISOToDate", () => {
  expect(shortISOToDate("2024-01-01").toISOString().slice(0, 10)).toEqual(
    "2024-01-01",
  );
  expect(shortISOToDate("garbage input").toISOString().slice(0, 10)).toEqual(
    "1970-01-01",
  );
  expect(shortISOToDate("20XX-01-XX").toISOString().slice(0, 10)).toEqual(
    "1970-01-01",
  );
});
