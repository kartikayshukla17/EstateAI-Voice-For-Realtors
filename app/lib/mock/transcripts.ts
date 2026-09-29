import type { TranscriptLine } from "~/types/call";

let seq = 0;
function line(
  speaker: TranscriptLine["speaker"],
  text: string,
  language: TranscriptLine["language"],
  timestampMs: number,
): TranscriptLine {
  seq += 1;
  return { id: `t-${seq}`, speaker, text, language, timestampMs };
}

/** Ankur Bhatia (lead-1) — qualified, ends in a booked site visit. */
export const TRANSCRIPT_BOOKED: TranscriptLine[] = [
  line(
    "agent",
    "Hi, this is Riya, an automated assistant for the Sunridge Parkview sales team. Quick note — this chat may be recorded and your details shared with our team to set up a visit. How can I help?",
    "english",
    0,
  ),
  line("caller", "Hi, main Sunridge Parkview ke baare mein pooch raha tha, ek 3 BHK dekh rahe hain.", "hinglish", 6_000),
  line("agent", "Great, 3 BHK — bilkul. Aapka rough budget kya hoga?", "hinglish", 12_000),
  line("caller", "Around 1.2 crore tak ja sakte hain.", "hinglish", 18_000),
  line("agent", "Perfect, that fits well. Aap kitni jaldi move karna chahte hain — kitne months mein?", "hinglish", 24_000),
  line("caller", "Teen mahine mein finalize karna hai, thoda urgent hai.", "hinglish", 31_000),
  line("agent", "Understood. Abhi aap kahaan rehte hain?", "hindi", 37_000),
  line("caller", "Vaishali, Ghaziabad mein.", "hindi", 42_000),
  line("agent", "Got it. Kya aapko home loan mein assistance chahiye?", "hinglish", 47_000),
  line("caller", "Haan, loan ke baare mein baat karni hai.", "hindi", 52_000),
  line(
    "agent",
    "Sure, ek colleague loan eligibility aur EMI details explain karenge. Yeh sounds like a good fit — would you like to book a site visit?",
    "hinglish",
    58_000,
  ),
  line("caller", "Haan, this weekend possible hai?", "hinglish", 65_000),
  line("agent", "Let me check Saturday. 11 AM ya 3 PM available hai — kaunsa better rahega?", "hinglish", 72_000),
  line("caller", "3 PM theek rahega.", "hindi", 78_000),
  line("agent", "Booked — Saturday 3 PM, sample flat at the site sales lounge. Aapka naam aur number confirm kar doon?", "hinglish", 83_000),
  line("caller", "Ankur Bhatia, 98765 43210.", "english", 90_000),
  line("agent", "Perfect, Ankur — dekh lete hain Saturday ko. Thank you for calling!", "hinglish", 95_000),
];

/** Priya Sharma (lead-2) — qualified, mostly English, ends in a booked site visit. */
export const TRANSCRIPT_BOOKED_EN: TranscriptLine[] = [
  line(
    "agent",
    "Hi, this is Riya, an automated assistant for the Sunridge Parkview sales team. Quick note — this chat may be recorded and your details shared with our team to set up a visit. How can I help?",
    "english",
    0,
  ),
  line("caller", "Hi, I wanted to know more about the 2 BHK units.", "english", 6_000),
  line("agent", "Sure — what's your rough budget for it?", "english", 12_000),
  line("caller", "Around 85 lakh.", "english", 18_000),
  line("agent", "That works well for a 2 BHK. How soon are you looking to move in?", "english", 24_000),
  line("caller", "In the next couple of months, ideally.", "english", 30_000),
  line("agent", "Got it. Where are you currently based?", "english", 36_000),
  line("caller", "Indirapuram, Ghaziabad.", "english", 41_000),
  line("agent", "Would you like some assistance with a home loan?", "english", 46_000),
  line("caller", "Yes, that would help.", "english", 51_000),
  line(
    "agent",
    "A colleague from our loan desk can walk you through eligibility and EMI options. This sounds like a good fit — would you like to book a site visit?",
    "english",
    57_000,
  ),
  line("caller", "Yes, is this weekend possible?", "english", 64_000),
  line("agent", "Let me check Saturday — 11 AM or 3 PM works, which is better for you?", "english", 71_000),
  line("caller", "11 AM, please.", "english", 77_000),
  line("agent", "Booked — Saturday 11 AM at the site sales lounge. Can I confirm your name and number?", "english", 82_000),
  line("caller", "Priya Sharma, 91234 56789.", "english", 88_000),
  line("agent", "Perfect, Priya — see you Saturday. Thank you for calling!", "english", 93_000),
];

/** Mohammed Irfan (lead-3) — pushed past a guardrail, escalated to a human. */
export const TRANSCRIPT_HANDOFF: TranscriptLine[] = [
  line(
    "agent",
    "Hi, this is Riya, an automated assistant for the Sunridge Parkview sales team. Quick note — this chat may be recorded and your details shared with our team to set up a visit. How can I help?",
    "english",
    0,
  ),
  line("caller", "Mujhe ek 2 BHK chahiye, study ke saath.", "hindi", 5_000),
  line("agent", "Great, budget kya hoga roughly?", "hinglish", 10_000),
  line("caller", "60 lakh tak.", "hindi", 15_000),
  line("agent", "Understood. Aur timeline?", "hindi", 20_000),
  line("caller", "Abhi decide nahi hai, shayad saal bhar mein.", "hindi", 26_000),
  line(
    "agent",
    "Okay, noted. Ek baat poochni thi — kya aap mujhe exact EMI aur loan eligibility bata sakte hain agar main yeh flat loon?",
    "hinglish",
    32_000,
  ),
  line("caller", "Haan bilkul, mujhe exact numbers chahiye abhi.", "hindi", 40_000),
  line(
    "agent",
    "I'm not able to give exact loan eligibility or EMI figures — hamara loan desk colleague aapko yeh explain kar sakta hai. Would you like me to connect you to a person right now?",
    "hinglish",
    46_000,
  ),
  line("caller", "Haan, please, mujhe abhi baat karni hai kisi se.", "hindi", 54_000),
  line("agent", "Sure — connecting you to our sales team now, ek moment.", "hinglish", 59_000),
];

/** Sunita Yadav (lead-4) — call dropped before qualification completed. */
export const TRANSCRIPT_ABANDONED: TranscriptLine[] = [
  line(
    "agent",
    "Hi, this is Riya, an automated assistant for the Sunridge Parkview sales team. Quick note — this chat may be recorded and your details shared with our team to set up a visit. How can I help?",
    "english",
    0,
  ),
  line("caller", "Mujhe bas 3 BHK ka price pata karna tha.", "hindi", 5_000),
  line(
    "agent",
    "3 BHK starts around Rs 1.18 crore, floor aur facing ke hisaab se. Aapka rough budget kya hai?",
    "hinglish",
    11_000,
  ),
];
