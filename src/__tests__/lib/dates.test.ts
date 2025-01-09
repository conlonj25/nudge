import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  dateToShortISO,
  firstDayOfThisYearNoon,
  getDayStartingMonday,
  getListOfDatesInRange,
  lastDayOfThisYearNoon,
  shortISOToDate,
  todayMinusThreeMonthsNoon,
  todayNoon,
  yesterdayNoon,
} from "~/lib/dates";

describe("general date functions", () => {
  describe("dateToShortISO", () => {
    it("should return the expected short iso strings", () => {
      expect(dateToShortISO(new Date(2024, 6, 4, 12))).toBe("2024-07-04");
      expect(dateToShortISO(new Date(2024, 0, 1, 12))).toBe("2024-01-01");
      expect(dateToShortISO(new Date(2024, 11, 31, 12))).toBe("2024-12-31");
    });
  });

  describe("shortISOToDate", () => {
    it("should return the expected dates", () => {
      expect(shortISOToDate("2024-07-04").getTime()).toBe(
        new Date(2024, 6, 4, 12).getTime(),
      );
      expect(shortISOToDate("2024-01-01").getTime()).toBe(
        new Date(2024, 0, 1, 12).getTime(),
      );
      expect(shortISOToDate("2024-12-31").getTime()).toBe(
        new Date(2024, 11, 31, 12).getTime(),
      );
    });
  });

  describe("getListOfDatesInRange", () => {
    const months = [
      { start: new Date(2024, 0, 1), end: new Date(2024, 0, 31), length: 31 },
      { start: new Date(2024, 1, 1), end: new Date(2024, 1, 29), length: 29 },
      { start: new Date(2024, 2, 1), end: new Date(2024, 2, 31), length: 31 },
      { start: new Date(2024, 3, 1), end: new Date(2024, 3, 30), length: 30 },
      { start: new Date(2024, 4, 1), end: new Date(2024, 4, 31), length: 31 },
      { start: new Date(2024, 5, 1), end: new Date(2024, 5, 30), length: 30 },
      { start: new Date(2024, 6, 1), end: new Date(2024, 6, 31), length: 31 },
      { start: new Date(2024, 7, 1), end: new Date(2024, 7, 31), length: 31 },
      { start: new Date(2024, 8, 1), end: new Date(2024, 8, 30), length: 30 },
      { start: new Date(2024, 9, 1), end: new Date(2024, 9, 31), length: 31 },
      { start: new Date(2024, 10, 1), end: new Date(2024, 10, 30), length: 30 },
      { start: new Date(2024, 11, 1), end: new Date(2024, 11, 31), length: 31 },
    ];

    it.each(months)(
      "should return the correct length list for each month",
      ({ start, end, length }) => {
        const result = getListOfDatesInRange(start, end);
        expect(result.length).toBe(length);
      },
    );
  });

  describe("getDayStartingMonday", () => {
    it("should return the index day of the week starting monday", () => {
      expect(getDayStartingMonday(new Date(2024, 0, 1))).toBe(0);
      expect(getDayStartingMonday(new Date(2024, 0, 2))).toBe(1);
      expect(getDayStartingMonday(new Date(2024, 0, 3))).toBe(2);
      expect(getDayStartingMonday(new Date(2024, 0, 4))).toBe(3);
      expect(getDayStartingMonday(new Date(2024, 0, 5))).toBe(4);
      expect(getDayStartingMonday(new Date(2024, 0, 6))).toBe(5);
      expect(getDayStartingMonday(new Date(2024, 0, 7))).toBe(6);
    });
  });
});

describe("relative date functions", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("firstDayOfThisYearNoon", () => {
    it("should correctly return the first day of this year", () => {
      const mockSystemTime = new Date(2024, 6, 4, 12);
      const mockFirstDayOfThisYearNoon = new Date(2024, 0, 1, 12);

      vi.setSystemTime(mockSystemTime);

      expect(firstDayOfThisYearNoon().getTime()).toBe(
        mockFirstDayOfThisYearNoon.getTime(),
      );
    });
  });

  describe("lastDayOfThisYearNoon", () => {
    it("should correctly return the last day of this year", () => {
      const mockSystemTime = new Date(2024, 6, 4, 12);
      const mockLastDayOfThisYearNoon = new Date(2024, 11, 31, 12);

      vi.setSystemTime(mockSystemTime);

      expect(lastDayOfThisYearNoon().getTime()).toBe(
        mockLastDayOfThisYearNoon.getTime(),
      );
    });
  });

  describe("todayNoon", () => {
    it("should correctly return todays date", () => {
      const mockSystemTime = new Date(2024, 6, 4, 12);

      vi.setSystemTime(mockSystemTime);

      expect(todayNoon().getTime()).toBe(mockSystemTime.getTime());
    });
  });

  describe("yesterdayNoon", () => {
    it("should correctly return yesterdays date", () => {
      const mockSystemTime = new Date(2024, 6, 4, 12);
      const mockYesterdayNoon = new Date(2024, 6, 3, 12);

      vi.setSystemTime(mockSystemTime);

      expect(yesterdayNoon().getTime()).toBe(mockYesterdayNoon.getTime());
    });
  });

  describe("todayMinusThreeMonthsNoon", () => {
    it("should correctly return the date from three months ago", () => {
      const mockSystemTime = new Date(2024, 6, 4, 12);
      const mockTodayMinusThreeMonthsNoon = new Date(2024, 3, 4, 12);

      vi.setSystemTime(mockSystemTime);

      expect(todayMinusThreeMonthsNoon().getTime()).toBe(
        mockTodayMinusThreeMonthsNoon.getTime(),
      );
    });
  });
});
