export const RASHI_SYMBOLS = {
  Mesha: "♈", Vrishabha: "♉", Mithuna: "♊", Karka: "♋",
  Simha: "♌", Kanya: "♍", Tula: "♎", Vrischika: "♏",
  Dhanu: "♐", Makara: "♑", Kumbha: "♒", Meena: "♓"
};

export const RASHI_ORDER = [
  "Mesha","Vrishabha","Mithuna","Karka","Simha","Kanya",
  "Tula","Vrischika","Dhanu","Makara","Kumbha","Meena"
];

export const GRAHA_INFO = {
  surya:   { sym: "सू", name_sa: "सूर्य",  color: "#C4873B", match: "sur" },
  chandra: { sym: "चं", name_sa: "चन्द्र", color: "#E8DCC8", match: "cha" },
  mangal:  { sym: "मं", name_sa: "मंगल",   color: "#8B2500", match: "man" },
  budh:    { sym: "बु", name_sa: "बुध",    color: "#4A6741", match: "bud" },
  guru:    { sym: "गु", name_sa: "गुरु",   color: "#B8860B", match: "gur" },
  shukra:  { sym: "शु", name_sa: "शुक्र",  color: "#D4BC96", match: "shu" },
  shani:   { sym: "श",  name_sa: "शनि",    color: "#2F1B14", match: "sha" },
  rahu:    { sym: "रा", name_sa: "राहु",   color: "#5C4033", match: "rah" },
  ketu:    { sym: "के", name_sa: "केतु",   color: "#5C4033", match: "ket" },
};

export function findGrahaKey(grahaName) {
  const lower = grahaName.toLowerCase();
  return Object.keys(GRAHA_INFO).find(k => lower.startsWith(GRAHA_INFO[k].match)) || null;
}

export const DIGNITY_COLORS = {
  uccha: "#4A6741",
  neecha: "#8B2500",
  swakshetra: "#B8860B",
  moolatrikona: "#C4873B",
  neutral: "#5C4033",
};

export const SEVERITY_STYLES = {
  shubh:    { bg: "rgba(74,103,65,0.12)",  border: "#4A6741", dot: "#4A6741" },
  savdhan:  { bg: "rgba(184,134,11,0.12)", border: "#B8860B", dot: "#B8860B" },
  chetavani:{ bg: "rgba(139,37,0,0.12)",   border: "#8B2500", dot: "#8B2500" },
};
