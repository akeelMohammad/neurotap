
import { describe, it, expect } from "vitest";
import {
  calculateScore,
  calculateAccuracy
} from "./gameLogic";

describe("NeuroTap Game Logic", () => {

  it("adds 10 points for a correct answer", () => {
    expect(calculateScore(0, true)).toBe(10);
  });

  it("does not add points for a wrong answer", () => {
    expect(calculateScore(10, false)).toBe(10);
  });

  it("calculates 50 percent accuracy", () => {
    expect(calculateAccuracy(5, 10)).toBe(50);
  });

  it("returns zero when there are no attempts", () => {
    expect(calculateAccuracy(0, 0)).toBe(0);
  });

});
