export type UnitConfig = "2bhk" | "2bhk_study" | "3bhk" | "3bhk_servant";
export type LeadLanguage = "hindi" | "english" | "hinglish";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  language: LeadLanguage;
  config: UnitConfig | null;
  budgetINR: number | null;
  timelineMonths: number | null;
  locality: string | null;
  wantsLoanAssistance: boolean;
  /** Computed via lib/qualify.ts::isQualified() — never set independently. */
  qualified: boolean;
  /** 0-100, UI-only field for the pre-call lead card. */
  propensityScore: number;
  summary: string | null;
  createdAt: string;
}

export const UNIT_CONFIG_LABELS: Record<UnitConfig, string> = {
  "2bhk": "2 BHK",
  "2bhk_study": "2 BHK + Study",
  "3bhk": "3 BHK",
  "3bhk_servant": "3 BHK + Servant",
};
