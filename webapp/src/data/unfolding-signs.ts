import type { Sign } from "./types";

export const unfoldingSigns: Sign[] = [
  // === Social & Moral Decay ===
  {
    id: "tall-buildings",
    title: "Barefoot shepherds competing in tall buildings",
    description:
      "Gulf states' skyscraper boom — Bedouin communities transformed into wealthy nations competing to build the tallest structures, exemplified by the Burj Khalifa and similar mega-projects.",
    source: "Bukhari 50",
    status: "unfolding",
    category: "Social & Moral Decay",
  },
  {
    id: "slave-woman",
    title: "Slave woman gives birth to her master",
    description:
      "Reversal of social hierarchies; children commanding parents. Scholars interpret this as children treating parents like servants, or broader societal inversions of authority.",
    source: "Muslim 8",
    status: "unfolding",
    category: "Social & Moral Decay",
  },
  {
    id: "widespread-zina",
    title: "Widespread adultery (Zina)",
    description:
      "Dating apps, hookup culture, and pornography prevalence have normalized illicit relationships on a scale unimaginable in previous eras.",
    source: "Bukhari 81",
    status: "unfolding",
    category: "Social & Moral Decay",
  },
  {
    id: "alcohol-consumption",
    title: "Alcohol consumption",
    description:
      "The global alcohol industry generates hundreds of billions annually, with normalization of drinking even in traditionally Muslim societies.",
    source: "Bukhari 81",
    status: "unfolding",
    category: "Social & Moral Decay",
  },
  {
    id: "musical-instruments",
    title: "Musical instruments everywhere",
    description:
      "The music industry, streaming platforms, and constant auditory stimulation through headphones and speakers have made music inescapable in daily life.",
    source: "Bukhari 5590",
    status: "unfolding",
    category: "Social & Moral Decay",
  },
  {
    id: "men-decrease",
    title: "Men decrease, women increase",
    description:
      "Demographic shifts in many regions showing declining male populations, though the prophesied extreme ratio of 50:1 has not yet been reached.",
    source: "Bukhari 81",
    status: "unfolding",
    category: "Social & Moral Decay",
  },
  {
    id: "trust-lost",
    title: "Loss of trust/authority to unworthy",
    description:
      "Political corruption, nepotism, and incompetent leaders placed in positions of power — authority entrusted to those undeserving of it.",
    source: "Bukhari 59",
    status: "unfolding",
    category: "Social & Moral Decay",
  },
  {
    id: "family-ties-cut",
    title: "Cutting family ties",
    description:
      "Elder abandonment, sibling estrangement, and rampant individualism eroding the bonds of kinship that Islam holds sacred.",
    source: "Multiple hadith",
    status: "unfolding",
    category: "Social & Moral Decay",
  },

  // === Knowledge & Religion ===
  {
    id: "knowledge-disappears",
    title: "Disappearance of knowledge",
    description:
      "The death of true scholars and the rise of surface-level religious understanding. Knowledge is lifted not by books vanishing, but by the passing of those who carry it.",
    source: "Bukhari 80",
    status: "unfolding",
    category: "Knowledge & Religion",
  },
  {
    id: "ignorance-prevails",
    title: "Ignorance prevails",
    description:
      "Misinformation, rejection of expertise, and the spread of opinions without knowledge — an era where everyone speaks on matters they do not understand.",
    source: "Bukhari 80",
    status: "unfolding",
    category: "Knowledge & Religion",
  },
  {
    id: "many-worshippers",
    title: "Many worshippers, few scholars",
    description:
      "Quantity over quality in religious practice — mosques may be full, but deep understanding of the religion becomes increasingly rare.",
    source: "Abu Dawud",
    status: "unfolding",
    category: "Knowledge & Religion",
  },
  {
    id: "decorated-mosques",
    title: "Competing to decorate mosques",
    description:
      "Architectural extravagance versus spiritual substance — mosques built as monuments of pride rather than houses of sincere worship.",
    source: "Multiple hadith",
    status: "unfolding",
    category: "Knowledge & Religion",
  },
  {
    id: "shirk-returns",
    title: "Shirk creeping back",
    description:
      "Grave worship, saint veneration, and superstitious practices gradually returning to Muslim communities, undermining pure monotheism.",
    source: "Tabarani",
    status: "unfolding",
    category: "Knowledge & Religion",
  },

  // === Economic & Environmental ===
  {
    id: "wealth-abundance",
    title: "Abundance of wealth",
    description:
      "The global wealth explosion and pervasive materialism — people drowning in possessions yet spiritually impoverished.",
    source: "Bukhari",
    status: "unfolding",
    category: "Economic & Environmental",
  },
  {
    id: "riba-normalized",
    title: "Riba (interest) normalized",
    description:
      "The global banking system built entirely on interest, with crypto speculation and financial instruments making it nearly impossible to avoid riba.",
    source: "Multiple hadith",
    status: "unfolding",
    category: "Economic & Environmental",
  },
  {
    id: "halal-income-ignored",
    title: "People unconcerned with halal income",
    description:
      "Fast fashion, exploitative labor, financial crimes, and a general indifference to whether one's earnings come from permissible sources.",
    source: "Multiple hadith",
    status: "unfolding",
    category: "Economic & Environmental",
  },
  {
    id: "earthquakes-increase",
    title: "Earthquakes increasing",
    description:
      "Seismic activity data shows patterns of increasing frequency, though the interpretation is debated scientifically among researchers.",
    source: "Bukhari 1036",
    status: "unfolding",
    category: "Economic & Environmental",
  },
  {
    id: "time-passes-quickly",
    title: "Time passes quickly",
    description:
      "Shortened attention spans, the feeling that years pass like months and months like weeks — a subjective acceleration of time experienced globally.",
    source: "Bukhari 1036",
    status: "unfolding",
    category: "Economic & Environmental",
  },
  {
    id: "rain-no-crops",
    title: "Rain abundance but crop failure",
    description:
      "Climate change creating an agricultural paradox — increased rainfall in some regions yet declining crop yields due to soil degradation and extreme weather patterns.",
    source: "Multiple hadith",
    status: "unfolding",
    category: "Economic & Environmental",
  },

  // === Political & Global ===
  {
    id: "traveler-safety",
    title: "Safety for travelers",
    description:
      "Modern security infrastructure, global travel networks, and solo female travel becoming commonplace — unprecedented safety for journeys across the world.",
    source: "Bukhari",
    status: "unfolding",
    category: "Political & Global",
  },
  {
    id: "reddish-people-war",
    title: "Wars with reddish people with small eyes",
    description:
      "Historical Mongol invasions fit this description closely; modern interpretations vary among scholars regarding contemporary applicability.",
    source: "Bukhari 2948",
    status: "unfolding",
    category: "Political & Global",
  },
  {
    id: "peace-yellow-race",
    title: "Peace with yellow race",
    description:
      "Diplomatic relations with East Asian nations — trade partnerships and peaceful coexistence as interpreted by some scholars.",
    source: "Interpretive",
    status: "unfolding",
    category: "Political & Global",
  },
  {
    id: "muslim-groups-fighting",
    title: "Two Muslim groups fighting",
    description:
      "Sunni-Shia conflicts, civil wars in Muslim-majority countries, and sectarian violence tearing the ummah apart from within.",
    source: "Bukhari 7084",
    status: "unfolding",
    category: "Political & Global",
  },
];
