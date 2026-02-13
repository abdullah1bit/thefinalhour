import type { GlossaryTerm, QuranicVerse, ScholarlyWork, Interpretation } from "./types";

export const glossaryTerms: GlossaryTerm[] = [
  { term: "Al-Sa'a", arabic: "الساعة", definition: "The Hour (Day of Judgment)" },
  { term: "Ashrat", arabic: "أشراط", definition: "Signs/indications of the Hour" },
  { term: "Fitna", arabic: "فتنة", definition: "Trial/tribulation" },
  {
    term: "Mahdi",
    arabic: "المهدي",
    definition: "The rightly guided one who will fill the earth with justice",
  },
  {
    term: "Dajjal",
    arabic: "الدجّال",
    definition: "The great deceiver; the false messiah",
  },
  {
    term: "Ya'juj wa Ma'juj",
    arabic: "يأجوج ومأجوج",
    definition: "Gog and Magog — two tribes of corrupting power",
  },
  {
    term: "Al-Dabba",
    arabic: "الدابة",
    definition: "The Beast that will emerge from the earth",
  },
  {
    term: "Al-Dukhan",
    arabic: "الدخان",
    definition: "The Smoke that will cover the earth",
  },
  {
    term: "Isa",
    arabic: "عيسى",
    definition: "Jesus (peace be upon him) — a prophet in Islam",
  },
  {
    term: "Al-Nar",
    arabic: "النار",
    definition: "The Fire from Yemen that drives people to the gathering",
  },
  {
    term: "Nafkhat al-Sur",
    arabic: "نفخة الصور",
    definition: "The blowing of the Trumpet signaling the end",
  },
  {
    term: "Ilm al-Akhira",
    arabic: "علم الآخرة",
    definition: "The knowledge of the Hereafter / eschatology",
  },
];

export const quranicVerses: QuranicVerse[] = [
  {
    reference: "47:18",
    text: "Are they only waiting for the Hour to take them by surprise? Yet some of its signs have already come...",
    context: "Warning about the approaching Hour",
  },
  {
    reference: "33:63",
    text: "People ask you about the Hour. Say: 'The knowledge of it is with Allah alone.'",
    context: "Only Allah knows the exact timing",
  },
  {
    reference: "43:61",
    text: "And indeed, Jesus is a sign of the Hour...",
    context: "The return of Isa as a major sign",
  },
  {
    reference: "54:1",
    text: "The Hour has drawn near, and the moon has split.",
    context: "Reference to the splitting of the moon",
  },
  {
    reference: "44:10-11",
    text: "Then watch for the Day when the sky will bring a visible smoke, covering the people — this is a painful torment.",
    context: "The sign of the Smoke",
  },
  {
    reference: "27:82",
    text: "And when the Word is fulfilled against them, We will bring forth for them a creature from the earth speaking to them...",
    context: "The emergence of the Beast",
  },
];

export const scholarlyWorks: ScholarlyWork[] = [
  { title: "Al-Tadhkira", author: "Imam al-Qurtubi", deathDate: "d. 671 AH" },
  { title: "Al-Nihaya", author: "Imam Ibn Kathir", deathDate: "d. 774 AH" },
  { title: "Al-Isha'a", author: "Imam al-Barzanji", deathDate: "d. 1103 AH" },
];

export const interpretations: Interpretation[] = [
  {
    prophecy: "Barefoot shepherds competing in tall buildings",
    modernInterpretation: "Gulf skyscraper boom (Burj Khalifa, etc.)",
    scholarlyCaution: "Avoid specific naming; general trend",
  },
  {
    prophecy: "Dajjal's 'paradise and hell'",
    modernInterpretation: "Virtual reality, AI, mass media manipulation",
    scholarlyCaution: "Speculative — not confirmed by scholars",
  },
  {
    prophecy: "Ya'juj and Ma'juj barrier",
    modernInterpretation: "Siberian Wall, Great Wall of China, or metaphorical",
    scholarlyCaution: "No scholarly consensus on location",
  },
  {
    prophecy: "Euphrates revealing gold",
    modernInterpretation: "River drying revealing resources/war",
    scholarlyCaution: "Ongoing monitoring — not yet confirmed",
  },
  {
    prophecy: "Fire in Hijaz",
    modernInterpretation: "Volcanic activity or literal fire",
    scholarlyCaution: "Historical occurrence debated among scholars",
  },
];
