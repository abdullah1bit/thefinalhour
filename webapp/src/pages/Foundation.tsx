import { motion } from "framer-motion";
import { CheckCircle2, Clock, AlertTriangle, BookOpen, Quote, Shield } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import SectionDivider from "@/components/layout/SectionDivider";
import CategoryCard from "@/components/foundation/CategoryCard";

const categories = [
  {
    icon: <CheckCircle2 className="h-8 w-8" />,
    title: "Minor Signs",
    arabicTitle: "Ashrat al-Sughra",
    description:
      "Everyday societal trends and historical events that mark a gradual departure from righteousness. These signs span centuries and many have already come to pass.",
    points: [
      "Societal trends and historical events",
      "Many have been fulfilled over centuries",
      "Some continue to unfold today",
    ],
    colorClass: "text-fulfilled",
    borderColorClass: "border-fulfilled",
    bgAccentClass: "bg-fulfilled/10",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Middle Signs",
    arabicTitle: "Ashrat al-Wusta",
    description:
      "Transitional events that bridge between the gradual minor signs and the cataclysmic major signs. These represent an escalation in severity and frequency.",
    points: [
      "Transitional events between minor and major",
      "Bridge between everyday signs and cataclysmic events",
      "Mark an escalation in scale and impact",
    ],
    colorClass: "text-unfolding",
    borderColorClass: "border-unfolding",
    bgAccentClass: "bg-unfolding/10",
  },
  {
    icon: <AlertTriangle className="h-8 w-8" />,
    title: "Major Signs",
    arabicTitle: "Ashrat al-Kubra",
    description:
      "The final 10 cataclysmic events that signal the immediate end of the world. Once the first major sign occurs, the rest follow in rapid, unstoppable succession.",
    points: [
      "The final 10 cataclysmic events",
      "Signal the immediate end of the world",
      "Occur in rapid sequence once they begin",
    ],
    colorClass: "text-approaching",
    borderColorClass: "border-approaching",
    bgAccentClass: "bg-approaching/10",
  },
];

const scholars = [
  "Ibn Kathir (d. 1373 CE)",
  "Al-Qurtubi (d. 1273 CE)",
  "Ibn Hajar al-Asqalani (d. 1449 CE)",
  "Al-Suyuti (d. 1505 CE)",
  "Nu'aym ibn Hammad (d. 843 CE)",
];

const Foundation = () => {
  return (
    <PageWrapper
        title="The Foundation"
        subtitle="Understanding Islamic Eschatology"
      >
        {/* Section 1: What is Islamic Eschatology? */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <h2 className="gold-text font-heading text-2xl font-semibold tracking-wide md:text-3xl">
              What is Islamic Eschatology?
            </h2>
          </div>

          <div className="rounded-lg border border-border/50 bg-card/60 p-6 md:p-8">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              Islamic eschatology, known as <span className="font-arabic text-foreground">'Ilm al-Akhira</span> (the
              knowledge of the Hereafter), is the branch of Islamic theology concerned with the
              events leading up to the Day of Judgment (<span className="font-arabic text-foreground">Yawm al-Qiyama</span>).
              It draws from the Quran and the authentic traditions (hadith) of the Prophet Muhammad
              (peace be upon him) to describe what will unfold before the end of this world.
            </p>

            <div className="mt-6 rounded-md border border-primary/20 bg-primary/5 p-4">
              <p className="text-sm leading-relaxed text-foreground">
                <span className="font-semibold text-primary">Key concept:</span> Allah has hidden the
                exact timing of the Hour (<span className="font-arabic">al-Sa'a</span>), but revealed signs
                (<span className="font-arabic">ashrat</span>) as warnings and guideposts for the believers.
                No one knows when it will come -- only that it will come suddenly, and that the signs
                preceding it will intensify over time.
              </p>
            </div>
          </div>
        </motion.section>

        <SectionDivider label="The Three Categories" />

        {/* Section 2: The Three Categories */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">
              The scholars of Islam have organized the signs of the Hour into three broad
              categories based on their severity, timing, and nature.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {categories.map((cat, index) => (
              <CategoryCard key={cat.title} {...cat} index={index} />
            ))}
          </div>
        </section>

        <SectionDivider label="The Purpose" />

        {/* Section 3: The Purpose */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <h2 className="gold-text font-heading text-2xl font-semibold tracking-wide md:text-3xl">
              The Purpose
            </h2>
          </div>

          <div className="rounded-lg border border-border/50 bg-card/60 p-6 md:p-8">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              The signs of the Last Day were not revealed to cause panic or despair. Rather,
              they serve as a call to spiritual preparedness. The Prophet (peace be upon him) shared
              these prophecies so that believers would recognize the reality of the unseen, strengthen
              their faith, and turn toward repentance before the door of repentance closes.
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-md border border-border/30 bg-secondary/30 p-4">
                <h4 className="mb-2 font-heading text-sm font-semibold uppercase tracking-widest text-primary">
                  Spiritual Preparation
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Knowing what is to come allows believers to prepare their hearts, correct their
                  actions, and draw closer to Allah before the opportunity passes.
                </p>
              </div>

              <div className="rounded-md border border-border/30 bg-secondary/30 p-4">
                <h4 className="mb-2 font-heading text-sm font-semibold uppercase tracking-widest text-primary">
                  Strengthening Faith
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  When believers witness prophecies being fulfilled in their own lifetime, it
                  reinforces the truthfulness of the Prophet and the divine origin of the message.
                </p>
              </div>

              <div className="rounded-md border border-border/30 bg-secondary/30 p-4">
                <h4 className="mb-2 font-heading text-sm font-semibold uppercase tracking-widest text-primary">
                  Not Fear-Mongering
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  The goal is not to terrify but to inspire reflection. Islam teaches that the
                  believer should live between hope in Allah's mercy and awareness of His justice.
                </p>
              </div>
            </div>

            {/* Hadith Quote */}
            <div className="mt-8 flex gap-3 rounded-md border border-primary/20 bg-primary/5 p-5">
              <Quote className="h-6 w-6 flex-shrink-0 text-primary opacity-60" />
              <div>
                <p className="font-heading text-base italic leading-relaxed text-foreground">
                  "If the Hour comes while one of you has a seedling in his hand and is able to
                  plant it before the Hour comes, let him plant it."
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  -- Musnad Ahmad 12981
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <SectionDivider label="Sources & Methodology" />

        {/* Section 4: Sources & Methodology */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="pb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <h2 className="gold-text font-heading text-2xl font-semibold tracking-wide md:text-3xl">
              Sources & Methodology
            </h2>
          </div>

          <div className="rounded-lg border border-border/50 bg-card/60 p-6 md:p-8">
            {/* Hadith Authentication */}
            <div className="mb-6">
              <h4 className="mb-3 font-heading text-lg font-semibold text-foreground">
                Hadith Authentication
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                This resource primarily draws from narrations graded as <span className="text-foreground font-medium">sahih</span> (authentic)
                or <span className="text-foreground font-medium">hasan</span> (good) by recognized hadith scholars. The two most authoritative
                collections, <span className="text-foreground font-medium">Sahih al-Bukhari</span> and <span className="text-foreground font-medium">Sahih Muslim</span>, form the
                backbone of the material, supplemented by Sunan Abu Dawud, Sunan al-Tirmidhi, Sunan al-Nasa'i,
                Sunan Ibn Majah, and Musnad Ahmad.
              </p>
            </div>

            {/* Scholars Referenced */}
            <div className="mb-6">
              <h4 className="mb-3 font-heading text-lg font-semibold text-foreground">
                Scholars Referenced
              </h4>
              <div className="flex flex-wrap gap-2">
                {scholars.map((scholar) => (
                  <span
                    key={scholar}
                    className="rounded-full border border-border/50 bg-secondary/50 px-3 py-1 text-xs text-muted-foreground"
                  >
                    {scholar}
                  </span>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="rounded-md border border-unfolding/20 bg-unfolding/5 p-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-unfolding">Important note:</span> Interpretations
                of eschatological hadith vary among scholars. Some signs are debated as to whether they
                have been fulfilled or are yet to come. Where scholarly disagreement exists, we have noted
                it. This resource is intended for education, not religious ruling (fatwa). Readers are
                encouraged to consult qualified scholars for personal guidance.
              </p>
            </div>
          </div>
        </motion.section>
      </PageWrapper>
  );
};

export default Foundation;
