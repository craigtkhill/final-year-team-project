// utils/shuffleArray.test.ts
import { shuffleArray } from "./arrayUtils";
import { expect, test } from "bun:test";

test("shuffleArray does not lose any elements", () => {
  const arr = [1, 2, 3, 4, 5];
  const shuffled = shuffleArray(arr);
  expect(shuffled.length).toBe(arr.length);
  arr.forEach((item) => {
    expect(shuffled).toContain(item);
  });
});

test("shuffleArray changes the order of elements", () => {
  const arr = [1, 2, 3, 4, 5];
  let sameOrderCount = 0;
  for (let i = 0; i < 100; i++) {
    const shuffled = shuffleArray(arr);
    if (shuffled.join(",") === arr.join(",")) {
      sameOrderCount++;
    }
  }
  expect(sameOrderCount).toBeLessThan(5);
});
