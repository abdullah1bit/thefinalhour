import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

const prisma = new PrismaClient();

const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "sqlite" }),
  emailAndPassword: { enabled: true },
  trustedOrigins: ["http://localhost:*"],
  advanced: {
    trustedProxyHeaders: true,
    disableCSRFCheck: true,
  },
});

async function main() {
  console.log("Seeding database...");

  // ─── Clear existing data ─────────────────────────────────────
  await prisma.majorSignDetail.deleteMany();
  await prisma.majorSign.deleteMany();
  await prisma.sign.deleteMany();
  await prisma.glossaryTerm.deleteMany();
  await prisma.quranicVerse.deleteMany();
  await prisma.scholarlyWork.deleteMany();
  await prisma.timelineEvent.deleteMany();
  await prisma.interpretation.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verification.deleteMany();
  await prisma.user.deleteMany();

  // ─── Create Admin User ───────────────────────────────────────
  console.log("Creating admin user...");
  await auth.api.signUpEmail({
    body: { email: "admin@thefinalhour.com", password: "admin123", name: "Admin" },
  });
  await prisma.user.update({
    where: { email: "admin@thefinalhour.com" },
    data: { role: "admin" },
  });
  console.log("Admin user created: admin@thefinalhour.com / admin123");

  // ─── Fulfilled Signs (11 items) ──────────────────────────────
  console.log("Seeding fulfilled signs...");
  const fulfilledSigns = [
    { slug: "prophethood", title: "Prophethood of Muhammad (SAW)", description: '"I and the Hour were sent like this" (holding two fingers together). The coming of the final Prophet is itself the greatest sign that the Hour has drawn near.', source: "Bukhari & Muslim", status: "fulfilled", category: "Prophetic Era", period: "7th Century CE", sortOrder: 0 },
    { slug: "moon-split", title: "Splitting of the Moon", description: "A Quranic miracle where the moon was split in two as a sign for the disbelievers of Makkah, as mentioned in Surah al-Qamar (54:1).", source: "Bukhari 4864", status: "fulfilled", category: "Prophetic Era", period: "7th Century CE", sortOrder: 1 },
    { slug: "prophet-death", title: "Death of the Prophet (SAW)", description: "The passing of the Messenger of Allah is considered the first sign that the Hour is approaching. His departure marked the end of direct prophetic guidance.", source: "Historical", status: "fulfilled", category: "Prophetic Era", period: "7th Century CE", sortOrder: 2 },
    { slug: "caliph-martyrdom", title: "Martyrdom of Caliphs", description: "The murder of Umar ibn al-Khattab (644 CE) and Uthman ibn Affan (656 CE), two of the rightly guided caliphs, as foretold by the Prophet.", source: "Bukhari 3697", status: "fulfilled", category: "Prophetic Era", period: "7th Century CE", sortOrder: 3 },
    { slug: "civil-wars", title: "Civil Wars Among Sahaba", description: "The First Fitna (656-661 CE) between the companions of the Prophet, and the Battle of al-Harrah in Madinah, fulfilling prophecies of internal conflict.", source: "Historical", status: "fulfilled", category: "Early Islamic Period", period: "7th-8th Century", sortOrder: 4 },
    { slug: "husayn-martyrdom", title: "Martyrdom of Husayn", description: "The grandson of the Prophet Muhammad (SAW) was killed at the Battle of Karbala (680 CE), a profound tragedy foretold in prophetic traditions.", source: "Historical", status: "fulfilled", category: "Early Islamic Period", period: "7th-8th Century", sortOrder: 5 },
    { slug: "jerusalem-conquest", title: "Conquest of Jerusalem", description: "Umar ibn al-Khattab entered Jerusalem peacefully (638 CE), fulfilling the Prophet's prophecy about the Muslim conquest of the holy city.", source: "Bukhari 2782", status: "fulfilled", category: "Early Islamic Period", period: "7th-8th Century", sortOrder: 6 },
    { slug: "constantinople-conquest", title: "Conquest of Constantinople", description: "The fall of Constantinople to Ottoman Sultan Mehmed II (1453 CE), fulfilling the famous prophecy praising the army and commander who would conquer it.", source: "Muslim 2922", status: "fulfilled", category: "Early Islamic Period", period: "7th-8th Century", sortOrder: 7 },
    { slug: "hijaz-fire", title: "Fire in the Hijaz", description: "A great fire that illuminated the land, visible from as far as Busra in Syria. Scholars debate whether this refers to events in 654 CE or the volcanic eruption near Madinah in 1256 CE.", source: "Bukhari 7118", status: "fulfilled", category: "Medieval Period", period: "Medieval", sortOrder: 8 },
    { slug: "false-prophets", title: "False Prophets", description: "The Prophet foretold that nearly 30 impostors would claim prophethood, including Musaylima al-Kadhdhab and others throughout history.", source: "Bukhari 3609", status: "fulfilled", category: "Medieval Period", period: "Medieval", sortOrder: 9 },
    { slug: "madinah-exodus", title: "People Leaving Madinah", description: "A mass exodus from the Prophet's city, with people abandoning Madinah in favor of other lands, as foretold in prophetic traditions.", source: "Historical", status: "fulfilled", category: "Medieval Period", period: "Medieval", sortOrder: 10 },
  ];

  for (const sign of fulfilledSigns) {
    await prisma.sign.create({ data: sign });
  }

  // ─── Unfolding Signs (22 items) ──────────────────────────────
  console.log("Seeding unfolding signs...");
  const unfoldingSigns = [
    { slug: "tall-buildings", title: "Barefoot shepherds competing in tall buildings", description: "Gulf states' skyscraper boom \u2014 Bedouin communities transformed into wealthy nations competing to build the tallest structures, exemplified by the Burj Khalifa and similar mega-projects.", source: "Bukhari 50", status: "unfolding", category: "Social & Moral Decay", sortOrder: 0 },
    { slug: "slave-woman", title: "Slave woman gives birth to her master", description: "Reversal of social hierarchies; children commanding parents. Scholars interpret this as children treating parents like servants, or broader societal inversions of authority.", source: "Muslim 8", status: "unfolding", category: "Social & Moral Decay", sortOrder: 1 },
    { slug: "widespread-zina", title: "Widespread adultery (Zina)", description: "Dating apps, hookup culture, and pornography prevalence have normalized illicit relationships on a scale unimaginable in previous eras.", source: "Bukhari 81", status: "unfolding", category: "Social & Moral Decay", sortOrder: 2 },
    { slug: "alcohol-consumption", title: "Alcohol consumption", description: "The global alcohol industry generates hundreds of billions annually, with normalization of drinking even in traditionally Muslim societies.", source: "Bukhari 81", status: "unfolding", category: "Social & Moral Decay", sortOrder: 3 },
    { slug: "musical-instruments", title: "Musical instruments everywhere", description: "The music industry, streaming platforms, and constant auditory stimulation through headphones and speakers have made music inescapable in daily life.", source: "Bukhari 5590", status: "unfolding", category: "Social & Moral Decay", sortOrder: 4 },
    { slug: "men-decrease", title: "Men decrease, women increase", description: "Demographic shifts in many regions showing declining male populations, though the prophesied extreme ratio of 50:1 has not yet been reached.", source: "Bukhari 81", status: "unfolding", category: "Social & Moral Decay", sortOrder: 5 },
    { slug: "trust-lost", title: "Loss of trust/authority to unworthy", description: "Political corruption, nepotism, and incompetent leaders placed in positions of power \u2014 authority entrusted to those undeserving of it.", source: "Bukhari 59", status: "unfolding", category: "Social & Moral Decay", sortOrder: 6 },
    { slug: "family-ties-cut", title: "Cutting family ties", description: "Elder abandonment, sibling estrangement, and rampant individualism eroding the bonds of kinship that Islam holds sacred.", source: "Multiple hadith", status: "unfolding", category: "Social & Moral Decay", sortOrder: 7 },
    { slug: "knowledge-disappears", title: "Disappearance of knowledge", description: "The death of true scholars and the rise of surface-level religious understanding. Knowledge is lifted not by books vanishing, but by the passing of those who carry it.", source: "Bukhari 80", status: "unfolding", category: "Knowledge & Religion", sortOrder: 8 },
    { slug: "ignorance-prevails", title: "Ignorance prevails", description: "Misinformation, rejection of expertise, and the spread of opinions without knowledge \u2014 an era where everyone speaks on matters they do not understand.", source: "Bukhari 80", status: "unfolding", category: "Knowledge & Religion", sortOrder: 9 },
    { slug: "many-worshippers", title: "Many worshippers, few scholars", description: "Quantity over quality in religious practice \u2014 mosques may be full, but deep understanding of the religion becomes increasingly rare.", source: "Abu Dawud", status: "unfolding", category: "Knowledge & Religion", sortOrder: 10 },
    { slug: "decorated-mosques", title: "Competing to decorate mosques", description: "Architectural extravagance versus spiritual substance \u2014 mosques built as monuments of pride rather than houses of sincere worship.", source: "Multiple hadith", status: "unfolding", category: "Knowledge & Religion", sortOrder: 11 },
    { slug: "shirk-returns", title: "Shirk creeping back", description: "Grave worship, saint veneration, and superstitious practices gradually returning to Muslim communities, undermining pure monotheism.", source: "Tabarani", status: "unfolding", category: "Knowledge & Religion", sortOrder: 12 },
    { slug: "wealth-abundance", title: "Abundance of wealth", description: "The global wealth explosion and pervasive materialism \u2014 people drowning in possessions yet spiritually impoverished.", source: "Bukhari", status: "unfolding", category: "Economic & Environmental", sortOrder: 13 },
    { slug: "riba-normalized", title: "Riba (interest) normalized", description: "The global banking system built entirely on interest, with crypto speculation and financial instruments making it nearly impossible to avoid riba.", source: "Multiple hadith", status: "unfolding", category: "Economic & Environmental", sortOrder: 14 },
    { slug: "halal-income-ignored", title: "People unconcerned with halal income", description: "Fast fashion, exploitative labor, financial crimes, and a general indifference to whether one's earnings come from permissible sources.", source: "Multiple hadith", status: "unfolding", category: "Economic & Environmental", sortOrder: 15 },
    { slug: "earthquakes-increase", title: "Earthquakes increasing", description: "Seismic activity data shows patterns of increasing frequency, though the interpretation is debated scientifically among researchers.", source: "Bukhari 1036", status: "unfolding", category: "Economic & Environmental", sortOrder: 16 },
    { slug: "time-passes-quickly", title: "Time passes quickly", description: "Shortened attention spans, the feeling that years pass like months and months like weeks \u2014 a subjective acceleration of time experienced globally.", source: "Bukhari 1036", status: "unfolding", category: "Economic & Environmental", sortOrder: 17 },
    { slug: "rain-no-crops", title: "Rain abundance but crop failure", description: "Climate change creating an agricultural paradox \u2014 increased rainfall in some regions yet declining crop yields due to soil degradation and extreme weather patterns.", source: "Multiple hadith", status: "unfolding", category: "Economic & Environmental", sortOrder: 18 },
    { slug: "traveler-safety", title: "Safety for travelers", description: "Modern security infrastructure, global travel networks, and solo female travel becoming commonplace \u2014 unprecedented safety for journeys across the world.", source: "Bukhari", status: "unfolding", category: "Political & Global", sortOrder: 19 },
    { slug: "reddish-people-war", title: "Wars with reddish people with small eyes", description: "Historical Mongol invasions fit this description closely; modern interpretations vary among scholars regarding contemporary applicability.", source: "Bukhari 2948", status: "unfolding", category: "Political & Global", sortOrder: 20 },
    { slug: "muslim-groups-fighting", title: "Two Muslim groups fighting", description: "Sunni-Shia conflicts, civil wars in Muslim-majority countries, and sectarian violence tearing the ummah apart from within.", source: "Bukhari 7084", status: "unfolding", category: "Political & Global", sortOrder: 21 },
  ];

  for (const sign of unfoldingSigns) {
    await prisma.sign.create({ data: sign });
  }

  // ─── Major Signs (10 items) ──────────────────────────────────
  console.log("Seeding major signs...");

  // Sign 1: The Mahdi
  await prisma.majorSign.create({
    data: {
      slug: "mahdi",
      number: 1,
      title: "THE MAHDI",
      arabicTitle: "Al-Mahdi",
      subtitle: "The Guided One",
      description: "A righteous leader from the lineage of the Prophet Muhammad (SAW) who will emerge during a time of great corruption and injustice. He will unite the Muslim ummah and fill the earth with justice as it was filled with oppression.",
      sources: JSON.stringify(["Abu Dawud 4285", "Ibn Majah 4084", "Tirmidhi 2231"]),
      sortOrder: 0,
      details: {
        create: [
          { label: "Lineage", content: "From the descendants of the Prophet Muhammad (SAW), specifically from the line of Fatimah (RA). His name will match the Prophet's name.", sortOrder: 0 },
          { label: "Name", content: "His name will be Muhammad ibn Abdullah, matching the Prophet's name and his father's name.", sortOrder: 1 },
          { label: "Appearance", content: "He will have a broad forehead and a prominent nose. He will be recognized by his character and righteousness, not by miracles.", sortOrder: 2 },
          { label: "Location", content: "He will emerge from the East and receive allegiance in Makkah, between the Rukn (corner of the Ka'bah) and the Maqam (station of Ibrahim).", sortOrder: 3 },
          { label: "Mission", content: "He will fill the earth with justice and equity as it was filled with oppression and tyranny. He will distribute wealth equally and unite the Muslim ummah.", sortOrder: 4 },
          { label: "Duration", content: "He will rule for seven or nine years, during which time the earth will bring forth its bounties and the heavens will send down rain abundantly.", sortOrder: 5 },
          { label: "Context", content: "He will emerge during a time of great tribulation, when the world is filled with injustice. His appearance marks the beginning of the major signs of the Hour.", sortOrder: 6 },
        ],
      },
    },
  });

  // Sign 2: The Dajjal
  await prisma.majorSign.create({
    data: {
      slug: "dajjal",
      number: 2,
      title: "THE DAJJAL",
      arabicTitle: "Al-Dajjal",
      subtitle: "The False Messiah",
      description: "The greatest trial to face humanity \u2014 a one-eyed deceiver who will claim divinity and lead masses astray with supernatural powers. Every prophet warned their nation about him.",
      sources: JSON.stringify(["Muslim 2937", "Bukhari 7127", "Muslim 2933", "Abu Dawud 4321"]),
      sortOrder: 1,
      details: {
        create: [
          { label: "Appearance", content: "A large, red-complexioned man with curly hair. His right eye is blind and looks like a floating grape. The word 'Kafir' (disbeliever) will be written between his eyes, readable by every believer.", sortOrder: 0 },
          { label: "Emergence", content: "He will emerge from the East, between Syria and Iraq, and will travel the entire earth except Makkah and Madinah, which are guarded by angels.", sortOrder: 1 },
          { label: "Powers", content: "He will command rain and earth to produce, bring the dead to life (by Allah's permission as a test), and have a river of water and a river of fire (the opposite of what they appear).", sortOrder: 2 },
          { label: "Duration", content: "He will remain on earth for 40 days: the first day like a year, the second like a month, the third like a week, and the rest like normal days.", sortOrder: 3 },
          { label: "Restriction", content: "He cannot enter Makkah or Madinah. Angels stand guard at their entrances. When he approaches Madinah, the earth will shake three times, expelling every hypocrite.", sortOrder: 4 },
          { label: "Followers", content: "70,000 Jews from Isfahan will follow him wearing Persian shawls. The weak in faith, the ignorant, and those who chase worldly gains will be most susceptible to his deception.", sortOrder: 5 },
          { label: "End", content: "Isa (Jesus) will descend and pursue him to the gate of Ludd (Lod in modern-day Israel), where he will kill him. Upon seeing Isa, the Dajjal will dissolve like salt in water.", sortOrder: 6 },
        ],
      },
    },
  });

  // Sign 3: The Descent of Isa
  await prisma.majorSign.create({
    data: {
      slug: "isa-descent",
      number: 3,
      title: "THE DESCENT OF ISA",
      arabicTitle: "Nuzul Isa",
      subtitle: "The Return of Jesus",
      description: "Isa ibn Maryam (Jesus, son of Mary) will descend from the heavens as a just ruler, break the cross, abolish the jizyah, and establish justice on earth. He will pray behind the Mahdi and lead the believers.",
      sources: JSON.stringify(["Muslim 155", "Bukhari 3448", "Muslim 2937", "Abu Dawud 4324"]),
      sortOrder: 2,
      details: {
        create: [
          { label: "Descent", content: "He will descend at the white minaret in the eastern part of Damascus, placing his hands on the wings of two angels. When he lowers his head, drops of water will fall; when he raises it, pearls will scatter.", sortOrder: 0 },
          { label: "Appearance", content: "A man of medium height, reddish-fair complexion, with straight hair as if water drips from it though it is not wet. He will be wearing two light yellow garments.", sortOrder: 1 },
          { label: "First Act", content: "He will kill the Dajjal at the gate of Ludd. The Dajjal will dissolve like salt in water upon seeing him, but Isa will kill him to show the people.", sortOrder: 2 },
          { label: "Mission", content: "He will break the cross (abolish false claims of his crucifixion), kill the swine, and abolish the jizyah \u2014 there will be no religion accepted except Islam.", sortOrder: 3 },
          { label: "Rule of Justice", content: "During his time, wealth will be so abundant that no one will accept charity. A single prostration will be worth more than the world and everything in it.", sortOrder: 4 },
          { label: "Duration", content: "He will live on earth for 40 years after his descent, marry, have children, and then die. The Muslims will pray his funeral prayer and bury him.", sortOrder: 5 },
          { label: "Prayer", content: "Upon his descent, the Mahdi will offer to lead him in prayer, but Isa will pray behind the Mahdi as an honor to the ummah of Muhammad (SAW).", sortOrder: 6 },
        ],
      },
    },
  });

  // Sign 4: Yajuj and Majuj
  await prisma.majorSign.create({
    data: {
      slug: "yajuj-majuj",
      number: 4,
      title: "YAJUJ AND MAJUJ",
      arabicTitle: "Ya'juj wa Ma'juj",
      subtitle: "Gog and Magog",
      description: "Two vast tribes of humanity who will be released after the barrier built by Dhul-Qarnayn is broken. They will spread corruption across the earth, consuming everything in their path, until Allah destroys them.",
      sources: JSON.stringify(["Muslim 2937", "Quran 18:93-98", "Quran 21:96", "Bukhari 3346"]),
      sortOrder: 3,
      details: {
        create: [
          { label: "Origin", content: "They are from the descendants of Adam, a vast multitude of people. The Prophet (SAW) said that out of every 1,000 people sent to Hell, 999 will be from Yajuj and Majuj.", sortOrder: 0 },
          { label: "The Barrier", content: "Dhul-Qarnayn built a barrier of iron and copper between two mountains to contain them. Every day they dig through it, but each night Allah restores it \u2014 until He wills their release.", sortOrder: 1 },
          { label: "Release", content: "After Isa kills the Dajjal, Allah will inform him of the release of Yajuj and Majuj. No one will have the strength to fight them.", sortOrder: 2 },
          { label: "Destruction", content: "They will drink entire lakes dry and devour everything in their path. They will be so numerous that they will cover the land like a flood.", sortOrder: 3 },
          { label: "Isa's Response", content: "Isa will take the believers to Mount Tur (Sinai) and pray to Allah for their destruction. They will be beyond human ability to defeat.", sortOrder: 4 },
          { label: "Their End", content: "Allah will send a type of worm (naghaf) into their necks that will kill them overnight. Then birds will carry their bodies away, and rain will cleanse the earth.", sortOrder: 5 },
          { label: "Aftermath", content: "After their destruction, the earth will be washed clean and will bring forth its blessings. A pomegranate will feed a group, and its rind will provide shade.", sortOrder: 6 },
        ],
      },
    },
  });

  // Sign 5: The Smoke
  await prisma.majorSign.create({
    data: {
      slug: "dukhan",
      number: 5,
      title: "THE SMOKE",
      arabicTitle: "Al-Dukhan",
      subtitle: "The Great Smoke",
      description: "A great smoke (dukhan) will cover the entire earth for forty days, affecting believers like a cold and disbelievers as if they are intoxicated. It is one of the signs that the Hour is imminent.",
      sources: JSON.stringify(["Muslim 2901", "Quran 44:10-16", "Bukhari 4774"]),
      sortOrder: 4,
      details: {
        create: [
          { label: "Nature", content: "A vast smoke that will engulf the entire earth, covering everything. It will descend from the sky and spread across all lands.", sortOrder: 0 },
          { label: "Effect on Believers", content: "For the believers, it will be like a cold or mild illness \u2014 uncomfortable but bearable. Their faith will shield them from its worst effects.", sortOrder: 1 },
          { label: "Effect on Disbelievers", content: "For the disbelievers, it will be severe \u2014 they will be intoxicated by it, and smoke will pour from their ears and noses. They will suffer greatly.", sortOrder: 2 },
          { label: "Duration", content: "It will last for forty days, during which the entire world will be covered. People will cry out to Allah for relief.", sortOrder: 3 },
          { label: "Quranic Reference", content: "\"Then watch for the Day when the sky will bring a visible smoke, covering the people; this is a painful torment.\" (Quran 44:10-11)", sortOrder: 4 },
          { label: "Scholarly View", content: "Some scholars consider this a past event (the famine of Quraysh), while others hold it is a future sign. The majority of hadith scholars consider it a future major sign.", sortOrder: 5 },
        ],
      },
    },
  });

  // Sign 6: The Beast
  await prisma.majorSign.create({
    data: {
      slug: "dabba",
      number: 6,
      title: "THE BEAST",
      arabicTitle: "Al-Dabbat al-Ard",
      subtitle: "The Creature",
      description: "A great beast will emerge from the earth and speak to humanity, marking the believers and disbelievers. Its emergence signals that the time for repentance has ended.",
      sources: JSON.stringify(["Muslim 2901", "Quran 27:82", "Tirmidhi 3187"]),
      sortOrder: 5,
      details: {
        create: [
          { label: "Emergence", content: "It will emerge from the earth \u2014 some narrations say from near the Ka'bah, others from different locations. Its emergence will be sudden and unexpected.", sortOrder: 0 },
          { label: "Appearance", content: "Its exact appearance is not fully described, but it is unlike any creature known. It will be massive and terrifying to behold.", sortOrder: 1 },
          { label: "Speech", content: "It will speak to people in a clear, human language, informing them that humanity did not believe in Allah's signs with certainty.", sortOrder: 2 },
          { label: "Marking", content: "It will mark the believers on their faces, making them bright, and mark the disbelievers, making them darkened. People will be known by these marks.", sortOrder: 3 },
          { label: "Carries", content: "Some narrations mention it will carry the staff of Musa (Moses) and the ring of Sulayman (Solomon), using them to mark people.", sortOrder: 4 },
          { label: "Quranic Reference", content: "\"And when the Word is fulfilled against them, We will produce for them a creature from the earth, speaking to them that the people were not certain of Our signs.\" (Quran 27:82)", sortOrder: 5 },
        ],
      },
    },
  });

  // Sign 7: Sun Rising from the West
  await prisma.majorSign.create({
    data: {
      slug: "sun-west",
      number: 7,
      title: "SUN RISING FROM THE WEST",
      arabicTitle: "Tulu al-Shams min al-Maghrib",
      subtitle: "Reversal of the Sun",
      description: "The sun will rise from the west instead of the east, a cosmic sign after which the door of repentance will be permanently closed. No new faith or repentance will be accepted.",
      sources: JSON.stringify(["Muslim 157", "Bukhari 4635", "Muslim 2901"]),
      sortOrder: 6,
      details: {
        create: [
          { label: "Event", content: "The sun will rise from the west (its setting place) instead of the east. This reversal of the natural order will be witnessed by all of humanity.", sortOrder: 0 },
          { label: "Significance", content: "This is the point of no return \u2014 after this event, the door of repentance (tawbah) is permanently closed. No new faith will be accepted from those who did not believe before.", sortOrder: 1 },
          { label: "Quranic Basis", content: "\"The Day that some of the signs of your Lord will come, no soul will benefit from its faith if it had not believed before or earned good through its faith.\" (Quran 6:158)", sortOrder: 2 },
          { label: "Timing", content: "It occurs after the emergence of the Beast (or close to it). Some scholars say it is the first sign after which no repentance is accepted.", sortOrder: 3 },
          { label: "Universal Witness", content: "Every person on earth will witness this event. It will not be localized \u2014 the entire world will see the sun rise from the west.", sortOrder: 4 },
          { label: "Scholarly Note", content: "The Prophet (SAW) said the Hour will not come until the sun rises from the west, and when people see it, they will all believe \u2014 but it will be too late.", sortOrder: 5 },
        ],
      },
    },
  });

  // Sign 8: Three Major Landslides (East)
  await prisma.majorSign.create({
    data: {
      slug: "khusuf-east",
      number: 8,
      title: "THREE MAJOR LANDSLIDES",
      arabicTitle: "Al-Khusuf",
      subtitle: "The Earth Swallows (East)",
      description: "Three massive landslides (khusuf) will occur \u2014 one in the East, one in the West, and one in the Arabian Peninsula. The earth will swallow entire communities as a divine punishment.",
      sources: JSON.stringify(["Muslim 2901", "Abu Dawud 4311"]),
      sortOrder: 7,
      details: {
        create: [
          { label: "Location", content: "The first major landslide will occur in the East (al-Mashriq). The exact location is not specified but refers to the eastern lands of the Muslim world.", sortOrder: 0 },
          { label: "Nature", content: "The earth will swallow an entire community or army \u2014 a catastrophic event where the ground opens and consumes those upon it.", sortOrder: 1 },
          { label: "Scale", content: "These are not ordinary earthquakes but divine signs \u2014 the earth literally swallowing people and structures as a punishment and warning.", sortOrder: 2 },
          { label: "Context", content: "They occur in the sequence of major signs, alongside the smoke, the beast, and the sun rising from the west.", sortOrder: 3 },
          { label: "Warning", content: "The Prophet (SAW) mentioned these among the ten major signs of the Hour, indicating their severity and certainty.", sortOrder: 4 },
        ],
      },
    },
  });

  // Sign 9: Three Major Landslides (West)
  await prisma.majorSign.create({
    data: {
      slug: "khusuf-west",
      number: 9,
      title: "THREE MAJOR LANDSLIDES",
      arabicTitle: "Al-Khusuf",
      subtitle: "The Earth Swallows (West)",
      description: "The second and third of three massive landslides \u2014 one in the West and one in the Arabian Peninsula. These cataclysmic events are among the final signs before the Hour.",
      sources: JSON.stringify(["Muslim 2901", "Abu Dawud 4311"]),
      sortOrder: 8,
      details: {
        create: [
          { label: "Location", content: "The second landslide will occur in the West (al-Maghrib), referring to the western lands. The third will be in the Arabian Peninsula (Jazirat al-Arab).", sortOrder: 0 },
          { label: "Nature", content: "Like the first, the earth will open and swallow entire communities \u2014 sudden, devastating, and inescapable divine events.", sortOrder: 1 },
          { label: "Scale", content: "Each landslide will be massive in scale, affecting large populations and serving as unmistakable signs from Allah.", sortOrder: 2 },
          { label: "Third Landslide", content: "The landslide in the Arabian Peninsula holds particular significance, as it occurs in the heartland of Islam and the land of the two Holy Mosques.", sortOrder: 3 },
          { label: "Scholarly Note", content: "Some scholars have debated whether certain historical events (earthquakes, sinkholes) could be partial fulfillments, but the consensus is that the three khusuf are major, future events of unprecedented scale.", sortOrder: 4 },
        ],
      },
    },
  });

  // Sign 10: The Fire from Yemen
  await prisma.majorSign.create({
    data: {
      slug: "fire-yemen",
      number: 10,
      title: "THE FIRE FROM YEMEN",
      arabicTitle: "Al-Nar",
      subtitle: "The Gathering Fire",
      description: "A great fire will emerge from Yemen (from the direction of Aden) that will drive people to their place of gathering (al-Mahshar). This is the last of the major signs before the Day of Judgment.",
      sources: JSON.stringify(["Muslim 2901", "Bukhari 7118", "Tirmidhi 2187"]),
      sortOrder: 9,
      details: {
        create: [
          { label: "Origin", content: "The fire will emerge from Yemen, specifically from the area of Aden or the depth of Aden's sea. It will be a massive, unstoppable fire.", sortOrder: 0 },
          { label: "Purpose", content: "Its purpose is to drive all of humanity toward the land of gathering (Sham/Greater Syria), where they will be assembled for the Day of Judgment.", sortOrder: 1 },
          { label: "Behavior", content: "It will follow people wherever they go, resting when they rest and moving when they move. It will drive them like a shepherd drives his flock.", sortOrder: 2 },
          { label: "Direction", content: "It will drive people from the south and east toward the Levant (Sham), the land of the final gathering before the Day of Judgment.", sortOrder: 3 },
          { label: "Finality", content: "This is the last of the ten major signs. After this fire gathers humanity, the trumpet will be blown and the Day of Judgment will commence.", sortOrder: 4 },
          { label: "The Gathering", content: "People will be gathered in Sham (Greater Syria), specifically in the land of al-Mahshar. This gathering is the prelude to the final reckoning.", sortOrder: 5 },
        ],
      },
    },
  });

  // ─── Glossary Terms (12 items) ───────────────────────────────
  console.log("Seeding glossary terms...");
  const glossaryTerms = [
    { term: "Al-Sa'a", arabic: "\u0627\u0644\u0633\u0627\u0639\u0629", definition: "The Hour (Day of Judgment)", sortOrder: 0 },
    { term: "Ashrat", arabic: "\u0623\u0634\u0631\u0627\u0637", definition: "Signs/indications of the Hour", sortOrder: 1 },
    { term: "Fitna", arabic: "\u0641\u062a\u0646\u0629", definition: "Trial/tribulation", sortOrder: 2 },
    { term: "Mahdi", arabic: "\u0627\u0644\u0645\u0647\u062f\u064a", definition: "The rightly guided one who will fill the earth with justice", sortOrder: 3 },
    { term: "Dajjal", arabic: "\u0627\u0644\u062f\u062c\u0651\u0627\u0644", definition: "The great deceiver; the false messiah", sortOrder: 4 },
    { term: "Ya'juj wa Ma'juj", arabic: "\u064a\u0623\u062c\u0648\u062c \u0648\u0645\u0623\u062c\u0648\u062c", definition: "Gog and Magog \u2014 two tribes of corrupting power", sortOrder: 5 },
    { term: "Al-Dabba", arabic: "\u0627\u0644\u062f\u0627\u0628\u0629", definition: "The Beast that will emerge from the earth", sortOrder: 6 },
    { term: "Al-Dukhan", arabic: "\u0627\u0644\u062f\u062e\u0627\u0646", definition: "The Smoke that will cover the earth", sortOrder: 7 },
    { term: "Isa", arabic: "\u0639\u064a\u0633\u0649", definition: "Jesus (peace be upon him) \u2014 a prophet in Islam", sortOrder: 8 },
    { term: "Al-Nar", arabic: "\u0627\u0644\u0646\u0627\u0631", definition: "The Fire from Yemen that drives people to the gathering", sortOrder: 9 },
    { term: "Nafkhat al-Sur", arabic: "\u0646\u0641\u062e\u0629 \u0627\u0644\u0635\u0648\u0631", definition: "The blowing of the Trumpet signaling the end", sortOrder: 10 },
    { term: "Ilm al-Akhira", arabic: "\u0639\u0644\u0645 \u0627\u0644\u0622\u062e\u0631\u0629", definition: "The knowledge of the Hereafter / eschatology", sortOrder: 11 },
  ];

  for (const term of glossaryTerms) {
    await prisma.glossaryTerm.create({ data: term });
  }

  // ─── Quranic Verses (6 items) ────────────────────────────────
  console.log("Seeding quranic verses...");
  const verses = [
    { reference: "47:18", text: "Are they only waiting for the Hour to take them by surprise? Yet some of its signs have already come. Once it actually befalls them, will it not be too late to be mindful?", context: "Warning about the approaching Hour", sortOrder: 0 },
    { reference: "33:63", text: "People ask you about the Hour. Say, 'Its knowledge is only with Allah.' And what may make you perceive? Perhaps the Hour is near.", context: "Knowledge of the Hour belongs to Allah alone", sortOrder: 1 },
    { reference: "43:61", text: "And indeed, he (Isa/Jesus) is a sign for the Hour. So have no doubt about it and follow me. This is the straight path.", context: "Isa (Jesus) as a sign of the Hour", sortOrder: 2 },
    { reference: "54:1", text: "The Hour has drawn near and the moon was split.", context: "The splitting of the moon as a sign", sortOrder: 3 },
    { reference: "44:10-11", text: "Then watch for the Day when the sky will bring a visible smoke, covering the people; this is a painful torment.", context: "The great smoke that will cover the earth", sortOrder: 4 },
    { reference: "27:82", text: "And when the Word is fulfilled against them, We will produce for them a creature from the earth, speaking to them that the people were not certain of Our signs.", context: "The emergence of the Beast", sortOrder: 5 },
  ];

  for (const verse of verses) {
    await prisma.quranicVerse.create({ data: verse });
  }

  // ─── Scholarly Works (3 items) ────────────────────────────────
  console.log("Seeding scholarly works...");
  const scholarlyWorks = [
    { title: "Al-Tadhkira fi Ahwal al-Mawta wa Umur al-Akhira", author: "Imam al-Qurtubi", deathDate: "d. 671 AH", sortOrder: 0 },
    { title: "Al-Nihaya fil-Fitan wal-Malahim", author: "Imam Ibn Kathir", deathDate: "d. 774 AH", sortOrder: 1 },
    { title: "Al-Isha'a li Ashrat al-Sa'a", author: "Imam al-Barzanji", deathDate: "d. 1103 AH", sortOrder: 2 },
  ];

  for (const work of scholarlyWorks) {
    await prisma.scholarlyWork.create({ data: work });
  }

  // ─── Timeline Events (12 items) ──────────────────────────────
  console.log("Seeding timeline events...");
  const timelineEvents = [
    { slug: "minor-signs", title: "Minor Signs", status: "unfolding", description: "The lesser signs that precede the major events. Many have already been fulfilled, and others continue to unfold in our time.", sortOrder: 0 },
    { slug: "mahdi", title: "Emergence of the Mahdi", status: "future", description: "A righteous leader from the Prophet's lineage who will emerge during great tribulation and unite the Muslim ummah.", sortOrder: 1 },
    { slug: "dajjal", title: "Emergence of the Dajjal", status: "future", description: "The greatest trial for humanity \u2014 a one-eyed deceiver who will claim divinity and spread corruption across the earth.", sortOrder: 2 },
    { slug: "isa", title: "Descent of Isa (AS)", status: "future", description: "Jesus will descend from the heavens, kill the Dajjal, and establish justice on earth.", sortOrder: 3 },
    { slug: "yajuj-majuj", title: "Release of Yajuj and Majuj", status: "future", description: "The barrier will break and Gog and Magog will pour forth, spreading corruption until Allah destroys them.", sortOrder: 4 },
    { slug: "smoke", title: "The Great Smoke", status: "future", description: "A smoke will cover the earth for forty days, affecting believers mildly and disbelievers severely.", sortOrder: 5 },
    { slug: "sun-west", title: "Sun Rises from the West", status: "future", description: "The sun will rise from the west, after which the door of repentance is permanently closed.", sortOrder: 6 },
    { slug: "beast", title: "Emergence of the Beast", status: "future", description: "A creature will emerge from the earth, speaking to humanity and marking believers and disbelievers.", sortOrder: 7 },
    { slug: "landslides", title: "Three Major Landslides", status: "future", description: "Three devastating landslides will occur \u2014 in the East, the West, and the Arabian Peninsula.", sortOrder: 8 },
    { slug: "fire-yemen", title: "Fire from Yemen", status: "future", description: "A great fire will emerge from Yemen, driving all people toward the land of gathering in Sham.", sortOrder: 9 },
    { slug: "trumpet", title: "The Trumpet is Blown", status: "future", description: "The angel Israfil will blow the Trumpet. The first blow causes all creation to perish; the second resurrects all for judgment.", sortOrder: 10 },
    { slug: "resurrection", title: "The Resurrection", status: "future", description: "All of humanity, from the first to the last, will be resurrected and gathered for the final reckoning before Allah.", sortOrder: 11 },
  ];

  for (const event of timelineEvents) {
    await prisma.timelineEvent.create({ data: event });
  }

  // ─── Interpretations (5 items) ───────────────────────────────
  console.log("Seeding interpretations...");
  const interpretations = [
    {
      prophecy: "Barefoot shepherds competing in tall buildings",
      modernInterpretation: "The Gulf states' transformation from Bedouin desert communities to global centers of luxury and architectural ambition \u2014 the Burj Khalifa, Jeddah Tower, and the race for ever-taller skyscrapers.",
      scholarlyCaution: "While the correlation is striking, scholars remind us that the hadith may encompass broader patterns of materialism and social upheaval, not just one region.",
      sortOrder: 0,
    },
    {
      prophecy: "Time will pass quickly",
      modernInterpretation: "The modern experience of time acceleration \u2014 social media, instant communication, and information overload create a subjective feeling that years pass like months and months like weeks.",
      scholarlyCaution: "Classical scholars like Ibn Hajar interpreted this literally (actual shortening of time before the Hour) and metaphorically (removal of barakah from time).",
      sortOrder: 1,
    },
    {
      prophecy: "A slave woman gives birth to her master",
      modernInterpretation: "Children treating parents like servants \u2014 demanding, commanding, and disrespecting those who raised them. The inversion of the parent-child relationship in modern societies.",
      scholarlyCaution: "Scholars offer multiple interpretations: literal slavery dynamics, children of concubines becoming rulers, or the broader collapse of family hierarchies.",
      sortOrder: 2,
    },
    {
      prophecy: "Markets will come close together",
      modernInterpretation: "E-commerce and global trade \u2014 Amazon, Alibaba, and digital marketplaces have made every market in the world accessible from a single device in your pocket.",
      scholarlyCaution: "This can also be interpreted as physical market proximity (urban expansion) or the convergence of prices and goods across distant regions.",
      sortOrder: 3,
    },
    {
      prophecy: "Knowledge will be taken away and ignorance will prevail",
      modernInterpretation: "Despite unprecedented access to information through the internet, true sacred knowledge declines as scholars pass away. Social media creates an illusion of knowledge while spreading misinformation.",
      scholarlyCaution: "The Prophet (SAW) clarified that knowledge is not taken by being snatched from hearts, but by the death of scholars \u2014 until only ignorant leaders remain who give rulings without knowledge.",
      sortOrder: 4,
    },
  ];

  for (const interp of interpretations) {
    await prisma.interpretation.create({ data: interp });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
