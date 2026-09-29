import { isQualified } from "~/lib/qualify";
import type { Lead } from "~/types/lead";

const MOCK_LEADS: Lead[] = [
  {
    id: "lead-1",
    name: "Ankur Bhatia",
    phone: "+91 98765 43210",
    language: "hinglish",
    config: "3bhk",
    budgetINR: 12_000_000,
    timelineMonths: 3,
    locality: "Vaishali, Ghaziabad",
    wantsLoanAssistance: true,
    qualified: isQualified({ budgetINR: 12_000_000, timelineMonths: 3 }),
    propensityScore: 82,
    summary: "Wants a 3 BHK, moving in ~3 months, loan help needed.",
    createdAt: "2026-09-20T10:15:00.000Z",
  },
  {
    id: "lead-2",
    name: "Priya Sharma",
    phone: "+91 91234 56789",
    language: "english",
    config: "2bhk",
    budgetINR: 8_500_000,
    timelineMonths: 2,
    locality: "Indirapuram, Ghaziabad",
    wantsLoanAssistance: true,
    qualified: isQualified({ budgetINR: 8_500_000, timelineMonths: 2 }),
    propensityScore: 76,
    summary: "Wants a 2 BHK, moving in ~2 months, loan help needed.",
    createdAt: "2026-09-21T14:40:00.000Z",
  },
  {
    id: "lead-3",
    name: "Mohammed Irfan",
    phone: "+91 90000 11223",
    language: "hindi",
    config: "2bhk_study",
    budgetINR: 6_000_000,
    timelineMonths: 12,
    locality: "Not shared",
    wantsLoanAssistance: true,
    qualified: isQualified({ budgetINR: 6_000_000, timelineMonths: 12 }),
    propensityScore: 34,
    summary: "Interested but timeline ~12 months out; pushed for exact loan eligibility/EMI figures, escalated to a human.",
    createdAt: "2026-09-22T09:05:00.000Z",
  },
  {
    id: "lead-4",
    name: "Sunita Yadav",
    phone: "+91 99887 76655",
    language: "hinglish",
    config: "3bhk_servant",
    budgetINR: null,
    timelineMonths: null,
    locality: "Not shared",
    wantsLoanAssistance: false,
    qualified: isQualified({ budgetINR: null, timelineMonths: null }),
    propensityScore: 12,
    summary: "Only asked for 3 BHK pricing; call dropped before budget/timeline were captured.",
    createdAt: "2026-09-23T18:22:00.000Z",
  },
];

/**
 * TODO(next increment): replace with a Drizzle query against `leads`, scoped to
 * the authenticated session. Must keep returning the `Lead` shape unchanged so
 * <LeadCard> never has to change when this seam is swapped.
 */
export function getMockLead(id?: string): Lead {
  return MOCK_LEADS.find((l) => l.id === id) ?? MOCK_LEADS[0];
}

export function listMockLeads(): Lead[] {
  return MOCK_LEADS;
}
