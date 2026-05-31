import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

const prisma = new PrismaClient();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required before seeding an admin user.`);
  }
  return value;
}

const adminEmail = requireEnv("ADMIN_EMAIL");
const adminPassword = requireEnv("ADMIN_PASSWORD");

const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
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
    body: { email: adminEmail, password: adminPassword, name: "Admin" },
  });
  await prisma.user.update({
    where: { email: adminEmail },
    data: { role: "admin" },
  });
  console.log(`Admin user created: ${adminEmail}`);

  // ─── Fulfilled Signs (23 items) ──────────────────────────────
  console.log("Seeding fulfilled signs...");
  const fulfilledSigns = [
    { slug: "prophethood", title: "Prophethood of Muhammad (SAW)", description: '"I and the Hour were sent like this" (holding two fingers together). The coming of the final Prophet is itself the greatest sign that the Hour has drawn near.', source: "Bukhari & Muslim", status: "fulfilled", category: "Prophetic Era", period: "7th Century CE", sortOrder: 0 },
    { slug: "moon-split", title: "Splitting of the Moon", description: "A Quranic miracle where the moon was split in two as a sign for the disbelievers of Makkah, as mentioned in Surah al-Qamar (54:1).", source: "Al-Qamar 54:1-2; Ibn Katheer", status: "fulfilled", category: "Prophetic Era", period: "7th Century CE", sortOrder: 1 },
    { slug: "prophet-death", title: "Death of the Prophet (SAW)", description: "The passing of the Messenger of Allah is considered the first sign that the Hour is approaching. His departure marked the end of direct prophetic guidance.", source: "Bukhari, 'Awf ibn Maalik", status: "fulfilled", category: "Prophetic Era", period: "7th Century CE", sortOrder: 2 },
    { slug: "caliph-martyrdom", title: "Martyrdom of Caliphs", description: "The murder of Umar ibn al-Khattab (644 CE) and Uthman ibn Affan (656 CE), two of the rightly guided caliphs, as foretold by the Prophet.", source: "Bukhari 3697", status: "fulfilled", category: "Prophetic Era", period: "7th Century CE", sortOrder: 3 },
    { slug: "caliphate-period", title: "Period of the Caliphate for 30 Years", description: "The Prophet foretold that the rightly guided Caliphate would last for thirty years, after which it would transition to kingship. This was fulfilled precisely with the era of the four Rightly Guided Caliphs.", source: "Ahmad and Abu Daawood, Safeenah", status: "fulfilled", category: "Prophetic Era", period: "7th Century CE", sortOrder: 4 },
    { slug: "hasan-peace", title: "Al-Hasan Making Peace Between Two Groups", description: "The Prophet (SAW) said about his grandson Al-Hasan: 'This son of mine is a Sayyid and perhaps Allah will make peace between two great groups of Muslims through him.' This was fulfilled when Al-Hasan abdicated the caliphate to Mu'awiyah.", source: "Bukhari, Abu Bakrah", status: "fulfilled", category: "Prophetic Era", period: "7th Century CE", sortOrder: 5 },
    { slug: "battle-siffeen", title: "The Battle of Siffeen", description: "A prophecy regarding a great battle between two major groups of Muslims following the same call. The battle of Siffeen (657 CE) between the forces of Ali and Mu'awiyah fulfilled this prophecy.", source: "Agreed upon, Abu Hurayrah", status: "fulfilled", category: "Early Islamic Period", period: "7th-8th Century", sortOrder: 6 },
    { slug: "khawaarij", title: "The Emergence of the Khawaarij", description: "The rise of extremist groups that deviate from the Prophet's way, declare other Muslims disbelievers, and rebel against rulers. The Khawaarij emerged during the caliphate of Ali as foretold.", source: "Agreed upon, Ibn Mas'ood", status: "fulfilled", category: "Early Islamic Period", period: "7th-8th Century", sortOrder: 7 },
    { slug: "companions-disappear", title: "Disappearance of the Noble Companions", description: "The loss of the Prophet's companions serves as a source of security leaving the Ummah, leading toward promised events. The last companion, Abu al-Tufayl, died around 110 AH.", source: "Muslim, Abu Moosa", status: "fulfilled", category: "Early Islamic Period", period: "7th-8th Century", sortOrder: 8 },
    { slug: "jerusalem-conquest", title: "Conquest of Jerusalem", description: "Umar ibn al-Khattab entered Jerusalem peacefully (638 CE), fulfilling the Prophet's prophecy about the Muslim conquest of the holy city.", source: "Bukhari, 'Awf ibn Maalik", status: "fulfilled", category: "Early Islamic Period", period: "7th-8th Century", sortOrder: 9 },
    { slug: "conquest-egypt", title: "Conquest of Egypt", description: "The Prophet Muhammad (SAW) foretold the Muslim conquest of Egypt and instructed the Muslims to treat its people well when they conquer it. Egypt was conquered during the caliphate of Umar.", source: "Maalik and Muslim, Ibn Ka'ab and Abu Dhar", status: "fulfilled", category: "Early Islamic Period", period: "7th-8th Century", sortOrder: 10 },
    { slug: "widespread-death", title: "Widespread Death like Murrain of Sheep", description: "Sudden, mass death from lethal epidemics, exemplified by the historic plague of 'Amwaas (639 CE) in Palestine which killed many companions including Abu Ubayda ibn al-Jarrah.", source: "Bukhari, 'Awf ibn Maalik", status: "fulfilled", category: "Early Islamic Period", period: "7th-8th Century", sortOrder: 11 },
    { slug: "security-prosperity", title: "Spread of Security and Prosperity", description: "A time when safety and wealth increased to the point that a woman could travel alone safely and wealth was abundant. This was fulfilled during the early Islamic golden age and the caliphate of Umar ibn Abd al-Aziz.", source: "Ahmad, Muslim, Bukhari", status: "fulfilled", category: "Early Islamic Period", period: "7th-8th Century", sortOrder: 12 },
    { slug: "persia-rome-fall", title: "End of Persian and Roman Empires", description: "The Prophet foretold that the treasures of Kisra (Persian Emperor) and Caesar (Roman Emperor) would be spent in the path of Allah. Both empires fell to the Muslim conquests within decades.", source: "Bukhari and Muslim", status: "fulfilled", category: "Early Islamic Period", period: "7th-8th Century", sortOrder: 13 },
    { slug: "expedition-sindh", title: "Expedition to Sindh and India", description: "The Prophet foretold military expeditions to Sindh and India. The conquest of Sindh occurred under Muhammad ibn Qasim in 711 CE, fulfilling this prophecy.", source: "Ahmad, Abu Hurairah", status: "fulfilled", category: "Early Islamic Period", period: "7th-8th Century", sortOrder: 14 },
    { slug: "fighting-turks", title: "Fighting the Turks (Mongolian Tatars)", description: "A foretold conflict with the Turks described as having small eyes, flat noses, and faces like hammered shields. The Mongol invasions of the 13th century devastated the Muslim world.", source: "Bukhari, Muslim, Abu Hurayrah", status: "fulfilled", category: "Medieval Period", period: "Medieval", sortOrder: 15 },
    { slug: "hijaz-fire", title: "Fire in the Hijaz", description: "A great fire emerging from the Hijaz near Madeenah which was historically recorded to have occurred in 654 AH (1256 CE), illuminating the night sky so brightly that camels in Busra could be seen by its light.", source: "Muslim, Abu Hurayrah", status: "fulfilled", category: "Medieval Period", period: "Medieval", sortOrder: 16 },
    { slug: "false-prophets", title: "Claims of Prophethood by Charlatans", description: "The appearance of approximately thirty impostors claiming to be messengers of Allah before the final Dajjaal. This includes Musaylima al-Kadhdhab, Sajah, and others throughout history.", source: "Bukhari, Ahmad, Abu Dawood", status: "fulfilled", category: "Medieval Period", period: "Medieval", sortOrder: 17 },
    { slug: "constantinople-conquest", title: "Conquest of Constantinople", description: "The fall of Constantinople to Ottoman Sultan Mehmed II (1453 CE), fulfilling the famous prophecy praising the army and commander who would conquer it.", source: "Muslim 2922", status: "fulfilled", category: "Medieval Period", period: "Medieval", sortOrder: 18 },
    { slug: "civil-wars", title: "Civil Wars Among Sahaba", description: "The First Fitna (656-661 CE) between the companions of the Prophet, and the Battle of al-Harrah in Madinah, fulfilling prophecies of internal conflict.", source: "Historical", status: "fulfilled", category: "Early Islamic Period", period: "7th-8th Century", sortOrder: 19 },
    { slug: "husayn-martyrdom", title: "Martyrdom of Husayn", description: "The grandson of the Prophet Muhammad (SAW) was killed at the Battle of Karbala (680 CE), a profound tragedy foretold in prophetic traditions.", source: "Historical", status: "fulfilled", category: "Early Islamic Period", period: "7th-8th Century", sortOrder: 20 },
    { slug: "whip-bearers", title: "Appearance of Unjust Men who Beat the People with Whips", description: "The rise of helpers of unjust rulers who flog people with instruments resembling the tails of cattle. This has been fulfilled through various oppressive regimes throughout Islamic history.", source: "Ahmad, Muslim, Abu Hurayrah", status: "fulfilled", category: "Medieval Period", period: "Medieval", sortOrder: 21 },
    { slug: "great-killing", title: "A Great Deal of Killing", description: "A state of chaos (Al-Harj) where killers do not know why they kill and the slain do not know why they were killed. History has witnessed mass killings fulfilling this prophecy.", source: "Muslim, Abu Hurayrah", status: "fulfilled", category: "Medieval Period", period: "Medieval", sortOrder: 22 },
  ];

  for (const sign of fulfilledSigns) {
    await prisma.sign.create({ data: sign });
  }

  // ─── Unfolding Signs (62 items) ──────────────────────────────
  console.log("Seeding unfolding signs...");
  const unfoldingSigns = [
    // ── Social & Moral Decay ──
    { slug: "tall-buildings", title: "Barefoot shepherds competing in tall buildings", description: "Once destitute desert-dwellers gaining massive wealth and competing to build the tallest and most elaborate structures. Gulf states' skyscraper boom exemplifies this prophecy.", source: "Muslim, Ahmad", status: "unfolding", category: "Social & Moral Decay", sortOrder: 0 },
    { slug: "slave-woman", title: "The Slave Woman Giving Birth to her Mistress", description: "A social inversion where a slave woman bears a child who becomes her master, or she gives birth to kings. Scholars also interpret this as children treating parents like servants.", source: "Muslim", status: "unfolding", category: "Social & Moral Decay", sortOrder: 1 },
    { slug: "widespread-zina", title: "Spread of fornication and indecency", description: "Growing comfort with immodest dress, foul speech, and bad language. Zina practiced openly in many societies without objection.", source: "Al-Haakim, Al-Tabaraani", status: "unfolding", category: "Social & Moral Decay", sortOrder: 2 },
    { slug: "alcohol-instruments", title: "Adultery, silk, alcohol and musical instruments regarded as permissible", description: "A group of the Ummah openly practicing or legalizing forbidden acts until they are no longer denounced.", source: "Bukhari, Abu Maalik Al-Ash'ari", status: "unfolding", category: "Social & Moral Decay", sortOrder: 3 },
    { slug: "clothed-naked-women", title: "Appearance of women who are clothed yet naked", description: "The spread of revealing, tight, or transparent clothing among women, leading away from righteousness.", source: "Muslim, Abu Hurayrah", status: "unfolding", category: "Social & Moral Decay", sortOrder: 4 },
    { slug: "men-decrease", title: "There will be a lot of women and few men", description: "A demographic shift where the number of women greatly exceeds men, possibly due to war or natural decree.", source: "Bukhari, Muslim, Anas", status: "unfolding", category: "Social & Moral Decay", sortOrder: 5 },
    { slug: "trust-lost", title: "Loss of Honesty and its Disappearance from Hearts", description: "A condition where authority is given to unqualified people and faith is removed from hearts leaving only a trace.", source: "Bukhari, Hudhayfah", status: "unfolding", category: "Social & Moral Decay", sortOrder: 6 },
    { slug: "greeting-known-only", title: "Greeting only those whom one knows", description: "A departure from the Sunnah of spreading peace to all, where people only offer greetings to acquaintances.", source: "Muslim, Ibn Khuzaymah", status: "unfolding", category: "Social & Moral Decay", sortOrder: 7 },
    { slug: "following-nations", title: "Following the Ways of Nations who Came before", description: "Muslims blindly imitating the customs, dress, and financial systems of Jews, Christians, and other disbelievers.", source: "Bukhari, Abu Hurayrah", status: "unfolding", category: "Social & Moral Decay", sortOrder: 8 },
    { slug: "wishing-death", title: "Wishing for death", description: "The rise of such intense turmoil and injustice that a person passing a grave wishes to be the one buried to escape reality.", source: "Agreed upon, Abu Hurayrah", status: "unfolding", category: "Social & Moral Decay", sortOrder: 9 },
    { slug: "belief-fluctuates", title: "Belief changing between morning and evening", description: "Rapid shifts in faith due to severe turmoil, desires, and worldly gain. A man will be a believer in the morning and a disbeliever by evening.", source: "Bukhari, Abu Hurayrah", status: "unfolding", category: "Social & Moral Decay", sortOrder: 10 },
    { slug: "obesity-widespread", title: "Obesity will become widespread", description: "Increased body mass across populations due to the availability of luxury foods and a sedentary lifestyle.", source: "Agreed upon, 'Imraan ibn Al-Husayn", status: "unfolding", category: "Social & Moral Decay", sortOrder: 11 },
    { slug: "strong-devours-weak", title: "The strong devouring the weak", description: "A state of great wrongdoing where powerful individuals oppress and consume the rights of those below them.", source: "Ahmad, 'Aa'ishah", status: "unfolding", category: "Social & Moral Decay", sortOrder: 12 },
    { slug: "false-testimony", title: "False testimony", description: "Lying in testimonies against others, which becomes widespread in personal and professional environments.", source: "Agreed upon, Ahmad", status: "unfolding", category: "Social & Moral Decay", sortOrder: 13 },
    { slug: "withholding-testimony", title: "Withholding true testimony", description: "People remaining quiet about the truth to protect personal interests, allowing rights to be consumed unlawfully.", source: "Al-Baqarah 2:283; Ahmad", status: "unfolding", category: "Social & Moral Decay", sortOrder: 14 },
    { slug: "honest-treacherous", title: "Honest people regarded as treacherous", description: "A complete moral inversion where truth-tellers are accused of lying and liars are placed in positions of trust.", source: "Muslim, Abu Hurayrah", status: "unfolding", category: "Social & Moral Decay", sortOrder: 15 },
    { slug: "stinginess-kinship", title: "Widespread stinginess and severing ties of kinship", description: "The spread of greed (Shuhh) that prevents people from giving and damages the fabric of society.", source: "Al-Tabaraani, Abu Hurayrah", status: "unfolding", category: "Social & Moral Decay", sortOrder: 16 },
    { slug: "respect-fear-evil", title: "Showing respect to a man for fear of his evil", description: "People honoring an aggressor or wrongdoer solely to avoid his harm and evil actions.", source: "Al-Tirmidhi", status: "unfolding", category: "Social & Moral Decay", sortOrder: 17 },
    { slug: "flaunting-immorality", title: "Prevalence and open flaunting of immorality", description: "Zina practiced openly in public spaces without objection from society.", source: "Al-Haakim, Abu Hurayrah", status: "unfolding", category: "Social & Moral Decay", sortOrder: 18 },
    { slug: "vows-unfulfilled", title: "People making vows and not fulfilling them", description: "A lack of piety and faith shown through making frequent promises to Allah that are never kept.", source: "Agreed upon, 'Imraan ibn Al-Husayn", status: "unfolding", category: "Social & Moral Decay", sortOrder: 19 },
    { slug: "discord-people", title: "Discord among the people", description: "Weakening of human relationships to the point where even relatives do not recognize or care for each other.", source: "Ahmad, Hudhayfah", status: "unfolding", category: "Social & Moral Decay", sortOrder: 20 },
    { slug: "adornment-houses", title: "Adornment of houses", description: "Extravagance in home decoration as a means of showing off and boasting about wealth.", source: "Bukhari, Abu Hurayrah", status: "unfolding", category: "Social & Moral Decay", sortOrder: 21 },
    // ── Family & Social Structure ──
    { slug: "obey-wife-disobey-mother", title: "Obedience to wives and disobedience to mothers", description: "Men favoring their wives' desires while neglecting or defying their parents.", source: "Al-Tirmidhi", status: "unfolding", category: "Family & Social Structure", sortOrder: 22 },
    { slug: "friends-over-fathers", title: "Bringing friends close and keeping fathers away", description: "Favoring friends' company and cheer while neglecting the rights and needs of one's father.", source: "Al-An'aam 6:151; Al-Tirmidhi", status: "unfolding", category: "Family & Social Structure", sortOrder: 23 },
    { slug: "noble-people-perish", title: "Death of prominent and noble people", description: "The passing of virtuous, knowledgeable, and noble individuals while ignoble, unqualified people rise to prominence in their place.", source: "Al-Haakim, Al-Tabaraani", status: "unfolding", category: "Family & Social Structure", sortOrder: 24 },
    // ── Knowledge & Religion ──
    { slug: "knowledge-disappears", title: "Prevalence of ignorance", description: "A time when religious knowledge is taken away and people lack understanding of basic Islamic practices.", source: "Ahmad, Ta-Ha 20:114", status: "unfolding", category: "Knowledge & Religion", sortOrder: 25 },
    { slug: "many-readers-few-scholars", title: "Many readers but few Fuqaha and scholars", description: "An abundance of people who can recite or read, but a critical shortage of those with true understanding and wisdom.", source: "Al-Haakim, Abu Hurayrah", status: "unfolding", category: "Knowledge & Religion", sortOrder: 26 },
    { slug: "knowledge-insignificant-people", title: "Seeking knowledge from people who are insignificant", description: "Turning to innovators or those with weak understanding for religious verdicts.", source: "Abu Umayyah Al-Jumahi", status: "unfolding", category: "Knowledge & Religion", sortOrder: 27 },
    { slug: "knowledge-wrong-reasons", title: "Knowledge sought for a reason other than for the sake of Allah", description: "Gaining religious education for status, fame, or worldly prominence rather than spiritual purposes.", source: "Al-Tirmidhi", status: "unfolding", category: "Knowledge & Religion", sortOrder: 28 },
    { slug: "decorated-mosques", title: "Adornment of mosques and competition therein", description: "People focusing on extravagant decorations and expensive fixtures in mosques to distract from worship.", source: "Abu Dawood, Al-Nasaa'i", status: "unfolding", category: "Knowledge & Religion", sortOrder: 29 },
    { slug: "voices-mosque", title: "Raising voices in the mosque", description: "The loss of tranquility in places of worship as they become sites for arguments and loud disputes.", source: "Al-Tirmidhi", status: "unfolding", category: "Knowledge & Religion", sortOrder: 30 },
    { slug: "mosques-thoroughfares", title: "Taking the mosques as thoroughfares", description: "People using mosques merely as shortcuts or walkways rather than places of worship and reverence.", source: "Al-Haakim, Ibn Mas'ood", status: "unfolding", category: "Knowledge & Religion", sortOrder: 31 },
    { slug: "quran-for-money", title: "Taking money for reading Qur'an", description: "People reciting the Qur'an with beautiful voices solely for the purpose of receiving payment.", source: "Ahmad, Abu Dawood, Jaabir", status: "unfolding", category: "Knowledge & Religion", sortOrder: 32 },
    { slug: "books-other-than-quran", title: "Spread of books other than the Qur'an", description: "High interest and marketing of various books that surpass interest in the Book of Allah.", source: "Al-Tabaraani", status: "unfolding", category: "Knowledge & Religion", sortOrder: 33 },
    { slug: "satellite-channels", title: "Prevalence of satellite channels", description: "The abundance of media platforms being beamed into homes, serving as a source of trial and promiscuity.", source: "Ibn Abi Shaybah, Hudayfah ibn Al-Yamaan", status: "unfolding", category: "Knowledge & Religion", sortOrder: 34 },
    // ── Political & Governance ──
    { slug: "evildoer-leaders", title: "Evildoers becoming leaders of their tribes", description: "Unqualified or rude people attaining leadership based on wealth or contacts rather than wisdom.", source: "Al-Tirmidhi", status: "unfolding", category: "Political & Governance", sortOrder: 35 },
    { slug: "vilest-leader", title: "The leader of the people will be the vilest of them", description: "Affairs falling under the control of leaders who do not follow the Qur'an or Sunnah and have little wisdom.", source: "Al-Tirmidhi", status: "unfolding", category: "Political & Governance", sortOrder: 36 },
    { slug: "rulership-foolish", title: "Rulership of the foolish", description: "Affairs falling under the control of leaders who do not follow the Qur'an or Sunnah and have little reason.", source: "Ahmad, Al-Bazzaar, Jaabir", status: "unfolding", category: "Political & Governance", sortOrder: 37 },
    { slug: "foolish-speak", title: "The foolish will speak", description: "The 'Ruwaybidah' (the fool) speaking publicly and representing people in important affairs.", source: "Al-Tabaraani, Abu Hurayrah", status: "unfolding", category: "Political & Governance", sortOrder: 38 },
    { slug: "not-ruling-allah", title: "Not ruling in accordance with what Allah revealed", description: "The undoing of the knots of Islam, beginning with the implementation of man-made laws instead of Shari'ah.", source: "Al-Maa'idah 5:44; Ahmad, Al-Tabaraani", status: "unfolding", category: "Political & Governance", sortOrder: 39 },
    { slug: "nations-against-ummah", title: "Nations calling together against the Muslim Ummah", description: "Disbelieving nations gathering to attack the Ummah, which will be numerous but weak like foam on a stream.", source: "Abu Dawood, Ahmad, Thawbaan", status: "unfolding", category: "Political & Governance", sortOrder: 40 },
    { slug: "large-romans-few-arabs", title: "Large numbers of Romans and small numbers of Arabs", description: "A time when the 'Romans' (Europeans/Americans) become the most numerous people and Arabs decrease.", source: "Muslim, Umm Shurayk", status: "unfolding", category: "Political & Governance", sortOrder: 41 },
    // ── Economic & Environmental ──
    { slug: "wealth-abundance", title: "Great abundance of wealth", description: "The global wealth explosion and pervasive materialism — people drowning in possessions yet spiritually impoverished.", source: "Agreed upon, Abu Hurayrah", status: "unfolding", category: "Economic & Environmental", sortOrder: 42 },
    { slug: "halal-income-ignored", title: "Not caring about halal or haraam income", description: "A general indifference to whether one's earnings come from permissible or forbidden sources.", source: "Bukhari, Abu Hurayrah", status: "unfolding", category: "Economic & Environmental", sortOrder: 43 },
    { slug: "fay-limited", title: "Fay' limited to some people", description: "Unlawful division of captured booty or state wealth among the rich and prominent instead of the needy.", source: "Al-Hashr 59:7; Al-Tirmidhi", status: "unfolding", category: "Economic & Environmental", sortOrder: 44 },
    { slug: "trust-as-booty", title: "Entrusted items regarded like booty", description: "Trusts (Amaanah) given to individuals are taken as personal possession rather than being returned to their owners.", source: "Al-Nisa' 4:58; Al-Tirmidhi", status: "unfolding", category: "Economic & Environmental", sortOrder: 45 },
    { slug: "zakaah-reluctant", title: "Zakaah will be regarded as a penalty", description: "Mandatory charity being viewed as a tax or penalty rather than an act of worship, leading to reluctant payment.", source: "Al-Tirmidhi", status: "unfolding", category: "Economic & Environmental", sortOrder: 46 },
    { slug: "widespread-trade", title: "Widespread trade and women in business", description: "The prevalence of business where even women assist their husbands in commerce. Prominent businessmen dominating markets.", source: "Ahmad, Shaykh Shu'ayb Al-Arna'oot", status: "unfolding", category: "Economic & Environmental", sortOrder: 47 },
    { slug: "markets-closer", title: "Markets becoming closer together", description: "Reduced travel time and rapid communication allowing global market monitoring and price fluctuations.", source: "Ahmad, Abu Hurayrah", status: "unfolding", category: "Economic & Environmental", sortOrder: 48 },
    { slug: "time-passes-quickly", title: "Time passing more quickly", description: "A sense that time lacks blessing or the physical/metaphorical shortening of intervals between events. Years pass like months, months like weeks.", source: "Agreed upon, Abu Hurayrah", status: "unfolding", category: "Economic & Environmental", sortOrder: 49 },
    { slug: "earthquakes-increase", title: "A lot of earthquakes", description: "Frequent seismic activity across the globe as an expiation for sins or punishment for corruption.", source: "Ahmad, Al-Haakim, Abu Hurayrah", status: "unfolding", category: "Economic & Environmental", sortOrder: 50 },
    { slug: "prevalence-lying", title: "Prevalence of lying", description: "Widespread dishonesty and fabrication of news, where false information spreads faster than truth.", source: "Muslim, Abu Hurayrah", status: "unfolding", category: "Economic & Environmental", sortOrder: 51 },
    { slug: "prevalence-literacy", title: "Prevalence of literacy", description: "The abundance of books, pens, and printed material, though religious ignorance remains widespread.", source: "Ahmad, Ibn Mas'ood", status: "unfolding", category: "Knowledge & Religion", sortOrder: 52 },
    { slug: "eloquence-boasting", title: "Earning money by eloquence and boasting", description: "People using their tongues to gain a livelihood through false praise or deceptive rhetoric.", source: "Ahmad, 'Umar ibn Sa'd", status: "unfolding", category: "Economic & Environmental", sortOrder: 53 },
    { slug: "sudden-death", title: "Sudden death", description: "An increase in instances where healthy people die instantly from accidents or sudden health failures.", source: "Al-Tabaraani, Anas ibn Maalik", status: "unfolding", category: "Economic & Environmental", sortOrder: 54 },
    { slug: "fortunate-evil", title: "Most fortunate in worldly matters will be evil persons", description: "The 'Luka ibn Luka' — evil, unscrupulous people becoming the most materially successful.", source: "Al-Tabaraani, Ahmad", status: "unfolding", category: "Economic & Environmental", sortOrder: 55 },
    { slug: "dowries-expensive", title: "Dowries and horses becoming expensive then cheap", description: "Economic fluctuations where the cost of commodities and marriages oscillate dramatically.", source: "Al-Haakim, Ibn Mas'ood", status: "unfolding", category: "Economic & Environmental", sortOrder: 56 },
    { slug: "makkah-buildings-high", title: "The buildings of Makkah becoming high", description: "Modern construction in the holy city where buildings rise above the surrounding mountains.", source: "Ibn Abi Shaybah, Al-Azraqi", status: "unfolding", category: "Economic & Environmental", sortOrder: 57 },
    { slug: "new-transportation", title: "New means of transportation", description: "A prophecy regarding people riding on 'comfortable saddles' that dismount them at the doors of mosques — interpreted as modern vehicles.", source: "Ibn Hibbaan, Al-Albaani", status: "unfolding", category: "Economic & Environmental", sortOrder: 58 },
    { slug: "fitnah-turmoil", title: "Prevalence of Turmoil (Fitnah) of all kinds", description: "The spread of trials including looking at forbidden things, usury, and a loss of piety where believers become strangers.", source: "Muslim, Abu Hurayrah", status: "unfolding", category: "Political & Governance", sortOrder: 59 },
    { slug: "ummah-cursing-first", title: "Last of this Ummah cursing the first", description: "Later generations denouncing and failing to recognize the virtue of the Prophet's companions.", source: "Not in source", status: "unfolding", category: "Knowledge & Religion", sortOrder: 60 },
    { slug: "incompetent-or-immoral", title: "Choosing between being incompetent or committing immorality", description: "Social pressure where those following religious standards are mocked as 'backward' or 'incompetent'.", source: "Ahmad, Abu Ya'la, Abu Hurayrah", status: "unfolding", category: "Social & Moral Decay", sortOrder: 61 },
  ];

  for (const sign of unfoldingSigns) {
    await prisma.sign.create({ data: sign });
  }

  // ─── Approaching Signs (32 items) ─────────────────────────────
  console.log("Seeding approaching signs...");
  const approachingSigns = [
    // ── Warfare & Geopolitics ──
    { slug: "battle-romans-constantinople", title: "A great battle with the Romans and the conquest of Constantinople", description: "A fierce future conflict (Al-Malhamah) where a third of the Muslim army will be martyred before victory. The final taking of Constantinople through takbeer and praise rather than physical weapons.", source: "Muslim, Abu Hurayrah", status: "approaching", category: "Warfare & Geopolitics", sortOrder: 0 },
    { slug: "muslims-fight-jews", title: "Muslims Fighting the Jews", description: "Inanimate objects identifying the location of enemies to aid the Muslims in battle. Trees and rocks will call out to the Muslims.", source: "Agreed upon, Ibn 'Umar", status: "approaching", category: "Warfare & Geopolitics", sortOrder: 1 },
    { slug: "trees-rocks-speak", title: "Trees and rocks speaking and supporting the Muslims", description: "Inanimate objects identifying the location of enemies to aid the Muslims in battle, except for the Gharqad tree.", source: "Muslim, Agreed upon, Abu Hurayrah, Ibn 'Umar", status: "approaching", category: "Warfare & Geopolitics", sortOrder: 2 },
    { slug: "tribulation-arabs", title: "Tribulation which will utterly destroy the Arabs", description: "Comprehensive turmoil where the harm caused by the tongue in inciting violence is worse than sword blows.", source: "Ahmad, Abu Dawood, 'Abd-Allah ibn 'Amr", status: "approaching", category: "Warfare & Geopolitics", sortOrder: 3 },
    { slug: "ancient-weapons", title: "People will go back to ancient weapons and mounts", description: "Final battles being fought with swords, spears, and horses after modern technology fails or is abandoned.", source: "Ahmad, Muslim", status: "approaching", category: "Warfare & Geopolitics", sortOrder: 4 },
    { slug: "no-inheritance-divided", title: "No inheritance will be divided and no rejoicing over booty", description: "A state of extreme war and devastation where normal social functions like inheritance and celebration of victory cease.", source: "Ibn Mas'ood", status: "approaching", category: "Warfare & Geopolitics", sortOrder: 5 },
    { slug: "man-qahtaan", title: "Appearance of a man from Qahtaan", description: "A righteous man from the Qahtaan tribe who will be obeyed by the people and rule them firmly.", source: "Agreed upon, Muslim, Abu Hurayrah", status: "approaching", category: "Warfare & Geopolitics", sortOrder: 6 },
    { slug: "man-jahjaah", title: "Appearance of a man called al-Jahjaah", description: "A man who is a freed slave who will gain significant power and control among the people.", source: "Muslim, Abu Hurayrah", status: "approaching", category: "Warfare & Geopolitics", sortOrder: 7 },
    { slug: "three-fitnah", title: "Fitnat al-Ahlaas, Fitnat al-Sarra, and Fitnat al-Duhayma", description: "A series of intense, lengthy tribulations involving fleeing, property loss, and religious confusion.", source: "Abu Dawood, 'Abd-Allah ibn 'Umar", status: "approaching", category: "Warfare & Geopolitics", sortOrder: 8 },
    // ── Natural & Cosmic ──
    { slug: "euphrates-gold", title: "The Euphrates will uncover a mountain of gold", description: "The river changing course to reveal massive gold treasure, causing a conflict where most participants are killed. The Prophet warned not to take from it.", source: "Muslim, Abu Hurayrah", status: "approaching", category: "Natural & Cosmic", sortOrder: 9 },
    { slug: "arabia-meadows", title: "Arabia becoming meadows and rivers once more", description: "A climatic change returning the dry deserts of the Arabian Peninsula to lush, fertile land.", source: "Ahmad, Abu Hurayrah", status: "approaching", category: "Natural & Cosmic", sortOrder: 10 },
    { slug: "storms-frequency", title: "Frequency of storms as the Hour draws nigh", description: "An increase in extreme weather events and violent storms preceding the end times.", source: "Ahmad, Abu Sa'eed Al-Khudri", status: "approaching", category: "Natural & Cosmic", sortOrder: 11 },
    { slug: "rain-no-growth", title: "Rain will fall but the earth will not bring forth anything", description: "A true famine where rain is present but the blessing (Barakah) of production is removed from the soil.", source: "Ahmad, Abu Ya'la, Anas", status: "approaching", category: "Natural & Cosmic", sortOrder: 12 },
    { slug: "rain-brick-no-protect", title: "Rain against which brick houses cannot offer protection", description: "Intense rain that destroys permanent structures, leaving only traditional camel-hair tents as protection.", source: "Ahmad, Abu Hurayrah", status: "approaching", category: "Natural & Cosmic", sortOrder: 13 },
    { slug: "transformation-landslides", title: "Transformation, landslides, and pelting with stones", description: "Divine punishments — ground swallowing tribes, people turned to animals — occurring when singing girls and alcohol are common.", source: "Al-Tirmidhi, 'Imraan ibn Husayn, 'Aa'ishah", status: "approaching", category: "Natural & Cosmic", sortOrder: 14 },
    { slug: "new-moon-bigger", title: "The new moon looking bigger than usual", description: "A celestial sign where the one-night-old crescent appears as large as if it were two nights old.", source: "Al-Tabaraani, Abu Hurayrah", status: "approaching", category: "Natural & Cosmic", sortOrder: 15 },
    { slug: "mountains-removal", title: "Removal of the mountains from their places", description: "The physical displacement of mountains from their foundations, either through natural disasters or divine means.", source: "Al-Tabaraani, Samurah", status: "approaching", category: "Natural & Cosmic", sortOrder: 16 },
    { slug: "animals-objects-speak", title: "Wild animals and inanimate objects will speak", description: "Predators and personal items (whip, shoelace) speaking to people to give news of their families. A man's thigh will give him news.", source: "Ahmad, Abu Sa'eed Al-Khudri", status: "approaching", category: "Natural & Cosmic", sortOrder: 17 },
    // ── Spiritual & Religious Decline ──
    { slug: "believer-dreams", title: "Fulfilment of the believer's dreams", description: "Dreams of righteous people becoming increasingly accurate and clear as a comfort in alienated times.", source: "Bukhari, Muslim, Abu Hurayrah", status: "approaching", category: "Spiritual & Religious Decline", sortOrder: 18 },
    { slug: "no-prayer-leader", title: "People not wanting to lead the prayer", description: "Widespread ignorance making it difficult to find an Imam capable or willing to lead others in prayer.", source: "Abu Dawood, Salaamah bint Al-Hurr", status: "approaching", category: "Spiritual & Religious Decline", sortOrder: 19 },
    { slug: "prostration-value", title: "A time when one prostration is equivalent to the whole world", description: "During the era of extreme tribulation, religious devotion will be valued above all material wealth.", source: "Bukhari, Muslim, Abu Hurayrah", status: "approaching", category: "Spiritual & Religious Decline", sortOrder: 20 },
    { slug: "quran-disappears", title: "Islam diminishes and the Qur'an disappears from hearts and Mus-hafs", description: "Teachings being erased from hearts and pages until even basic worship is forgotten.", source: "Ibn Maajah, Hudhayfah", status: "approaching", category: "Spiritual & Religious Decline", sortOrder: 21 },
    { slug: "idol-worship-returns", title: "Arab tribes returning to idol worship and Quraysh dying out", description: "A return to polytheism where tribes such as Daws will venerate pre-Islamic idols like Dhu'l-Khalasah. The tribe of Quraysh will decrease near extinction.", source: "Bukhari, Muslim, Ahmad, Abu Hurayrah", status: "approaching", category: "Spiritual & Religious Decline", sortOrder: 22 },
    { slug: "hajj-abandoned", title: "Hajj to the sacred House of Allah will be abandoned", description: "Pilgrimage to Makkah will cease for a period due to extreme turmoil and war.", source: "Abu Ya'la, Abu Sa'eed Al-Khudri", status: "approaching", category: "Spiritual & Religious Decline", sortOrder: 23 },
    // ── End Times Sequence ──
    { slug: "live-in-shaam", title: "People will go and live in al-Shaam (the Levant)", description: "The migration of believers to the Levant as it becomes a stronghold and camp for Muslims before the end.", source: "Al-Tirmidhi, Abu'l-Darda'", status: "approaching", category: "End Times Sequence", sortOrder: 24 },
    { slug: "jerusalem-flourish", title: "Jerusalem will flourish and Madeenah will be in ruins", description: "The development of Jerusalem as a major city while Madeenah is eventually abandoned and left to animals.", source: "Abu Dawood, Mu'aadh ibn Jabal", status: "approaching", category: "End Times Sequence", sortOrder: 25 },
    { slug: "madinah-cleansed", title: "Madeenah will be cleansed of its evil people", description: "The city of the Prophet will expel its impurities as a bellows expels the impurities of iron.", source: "Muslim, Abu Hurayrah", status: "approaching", category: "End Times Sequence", sortOrder: 26 },
    { slug: "army-swallowed-kaabah", title: "An army attacking the Ka'bah will be swallowed by the earth", description: "A force pursuing the Mahdi will be destroyed by the earth at Al-Bayda between Makkah and Madeenah.", source: "Muslim, Bukhari, 'Aa'ishah", status: "approaching", category: "End Times Sequence", sortOrder: 27 },
    { slug: "kaabah-destruction", title: "Destruction of the Ka'bah by a man from Abyssinia", description: "A thin-legged man (Dhu'l-Suwayqatayn) will dismantle the holy structure stone by stone and take its treasure.", source: "Bukhari, Muslim, Ahmad", status: "approaching", category: "End Times Sequence", sortOrder: 28 },
    { slug: "pleasant-wind", title: "Sending of a pleasant wind that takes the souls of believers", description: "A cool breeze from Syria/Yemen that mercifully takes the soul of every believer before the Hour begins.", source: "Muslim, Al-Nawwaas ibn Sam'aan", status: "approaching", category: "End Times Sequence", sortOrder: 29 },
    { slug: "earth-treasure", title: "The earth giving up its treasure", description: "The ground bringing forth columns of gold and silver which people will ignore despite its previous cause for crime.", source: "Muslim, Abu Hurayrah", status: "approaching", category: "End Times Sequence", sortOrder: 30 },
    { slug: "mahdi-approaching", title: "The appearance of the Mahdi", description: "A righteous man named Muhammad ibn 'Abd-Allah will emerge to establish justice across a world filled with oppression. His appearance bridges the minor and major signs.", source: "Al-Tirmidhi, Abu Dawood", status: "approaching", category: "End Times Sequence", sortOrder: 31 },
  ];

  for (const sign of approachingSigns) {
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
