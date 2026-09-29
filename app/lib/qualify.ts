/**
 * Qualified-lead rule: a lead is qualified iff budget >= Rs 45,00,000 AND
 * timeline <= 6 months. A missing or non-numeric value means "not qualified".
 */

export const QUALIFIED_MIN_BUDGET_INR = 4_500_000;
export const QUALIFIED_MAX_TIMELINE_MONTHS = 6;

export interface QualifyInput {
  budgetINR?: number | null;
  timelineMonths?: number | null;
}

export function isQualified({ budgetINR, timelineMonths }: QualifyInput): boolean {
  if (typeof budgetINR !== "number" || !Number.isFinite(budgetINR)) return false;
  if (typeof timelineMonths !== "number" || !Number.isFinite(timelineMonths)) {
    return false;
  }
  return (
    budgetINR >= QUALIFIED_MIN_BUDGET_INR &&
    timelineMonths <= QUALIFIED_MAX_TIMELINE_MONTHS
  );
}
