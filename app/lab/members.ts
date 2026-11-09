export type Member = {
  name: string;
  korean?: string;
  program: "PhD" | "MS/PhD integrated" | "MS" | "Internship";
  period: string;
};

export const currentMembers: Member[] = [
  { name: "Sunhyun Park", korean: "박선현", program: "MS/PhD integrated", period: "2025-1 ~" },
  { name: "Seyeong Park", korean: "박세영", program: "MS", period: "2025-1 ~" },
  { name: "Changhyeok Shin", korean: "신창혁", program: "MS", period: "2025-2 ~" },
  { name: "Gwanho Nam", korean: "남관호", program: "MS", period: "2026-1 ~" },
  { name: "Chaewon Lee", korean: "이채원", program: "MS", period: "2026-1 ~" },
  { name: "Jaewoo Choi", korean: "최재우", program: "MS", period: "2026-1 ~" },
  { name: "Jeongin Choi", korean: "최정인", program: "MS", period: "2026-2 ~" },
];

export const alumni: Member[] = [
  { name: "Odonchimeg Senden", program: "MS", period: "~ 2026-1" },
  { name: "Geonho Byeon", korean: "변건호", program: "Internship", period: "2026-1" },
  { name: "Sangjoon An", korean: "안상준", program: "Internship", period: "2026-1" },
  { name: "Sua Lee", korean: "이수아", program: "Internship", period: "2025-2" },
];

const programOrder: Record<Member["program"], number> = {
  PhD: 0,
  "MS/PhD integrated": 0,
  MS: 1,
  Internship: 2,
};

function periodKey(member: Member, group: "current" | "alumni") {
  // Current members use the entry term; alumni use the completion term.
  const terms = member.period.match(/\b\d{4}-[12]\b/g);
  if (!terms?.length) throw new Error(`Missing year-term period for ${member.name}`);
  const term = group === "current" ? terms[0] : terms[terms.length - 1];
  const [year, semester] = term.split("-").map(Number);
  return year * 2 + semester;
}

function compareNames(a: Member, b: Member) {
  if (a.korean && b.korean) {
    return a.korean.localeCompare(b.korean, "ko") || a.name.localeCompare(b.name, "en");
  }
  // Do not invent Korean transliterations; names without one follow Korean names.
  if (a.korean) return -1;
  if (b.korean) return 1;
  return a.name.localeCompare(b.name, "en");
}

export function sortMembers(members: readonly Member[], group: "current" | "alumni"): Member[] {
  const direction = group === "current" ? 1 : -1;
  return [...members].sort((a, b) =>
    programOrder[a.program] - programOrder[b.program]
    || direction * (periodKey(a, group) - periodKey(b, group))
    || compareNames(a, b)
  );
}
