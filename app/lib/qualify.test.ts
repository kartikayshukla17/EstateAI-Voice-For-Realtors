import { describe, expect, it } from "vitest";
import { isQualified } from "./qualify";

describe("isQualified", () => {
  it("qualifies at exactly the budget floor and timeline ceiling", () => {
    expect(isQualified({ budgetINR: 4_500_000, timelineMonths: 6 })).toBe(true);
  });

  it("qualifies a strong lead", () => {
    expect(isQualified({ budgetINR: 12_000_000, timelineMonths: 3 })).toBe(true);
  });

  it("rejects a budget one rupee below the floor", () => {
    expect(isQualified({ budgetINR: 4_499_999, timelineMonths: 6 })).toBe(false);
  });

  it("rejects a timeline beyond 6 months", () => {
    expect(isQualified({ budgetINR: 8_000_000, timelineMonths: 7 })).toBe(false);
  });

  it("rejects when budget is missing", () => {
    expect(isQualified({ timelineMonths: 3 })).toBe(false);
  });

  it("rejects when timeline is missing", () => {
    expect(isQualified({ budgetINR: 8_000_000 })).toBe(false);
  });

  it("rejects an empty input", () => {
    expect(isQualified({})).toBe(false);
  });

  it("rejects null / NaN values", () => {
    expect(isQualified({ budgetINR: null, timelineMonths: null })).toBe(false);
    expect(isQualified({ budgetINR: Number.NaN, timelineMonths: 3 })).toBe(false);
  });
});
