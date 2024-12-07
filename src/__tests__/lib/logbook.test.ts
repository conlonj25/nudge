import { it } from "vitest";
import { type Habit } from "~/app/_types";
import {
  createLogBookWithRandomValuesWithRange,
  createLogBookWithRange,
  mergeLogBooks,
} from "~/lib/logbook";

const habits: Habit[] = [
  { id: 0, name: "Journal", userId: "1" },
  { id: 1, name: "10,000 Steps", userId: "1" },
  { id: 2, name: "Log progress on Nudge", userId: "1" },
];

it("should...", () => {
  const book1 = createLogBookWithRange(
    habits,
    new Date(2024, 0, 1, 12),
    new Date(2024, 0, 7, 12),
  );
  const book2 = createLogBookWithRandomValuesWithRange(
    habits,
    new Date(2024, 0, 1, 12),
    new Date(2024, 0, 7, 12),
  );

  const res = mergeLogBooks(book1, book2);
  console.log(res);
});
