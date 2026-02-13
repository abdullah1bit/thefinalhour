import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  arabicName: string;
  englishName: string;
  description: string;
  index: number;
}

const CategoryCard = ({
  arabicName,
  englishName,
  description,
  index,
}: CategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="rounded-lg border border-border/40 bg-card/50 p-6 backdrop-blur-sm"
    >
      <p className="font-arabic text-lg text-primary/80" dir="rtl">
        {arabicName}
      </p>
      <h4 className="mt-1 font-heading text-lg font-semibold tracking-wide text-foreground">
        {englishName}
      </h4>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
};

const categories = [
  {
    arabicName: "الصغرى",
    englishName: "Minor Signs (Sughra)",
    description:
      "The lesser signs that occur over extended periods. Many have already come to pass, and others continue to unfold. These serve as gentle reminders to the believing community.",
  },
  {
    arabicName: "الوسطى",
    englishName: "Middle Signs (Wusta)",
    description:
      "Intermediate signs that bridge the minor and major. These indicate a transition period when the world approaches its final chapter, visible to those who reflect.",
  },
  {
    arabicName: "الكبرى",
    englishName: "Major Signs (Kubra)",
    description:
      "The great, unmistakable signs that will occur in rapid succession near the end. Once the first major sign appears, the others follow like beads falling from a broken string.",
  },
];

const QuickOverview = () => {
  return (
    <section className="relative px-6 py-16 md:py-24">
      {/* Subtle star pattern */}
      <div className="star-pattern pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-4xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-3xl font-light tracking-wide text-foreground md:text-4xl">
            The Three Categories
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-sm leading-relaxed text-muted-foreground">
            Islamic scholars traditionally classify the signs of the Hour into
            three categories, each with distinct characteristics and levels of
            magnitude.
          </p>
        </motion.div>

        {/* Category cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((cat, index) => (
            <CategoryCard key={cat.englishName} {...cat} index={index} />
          ))}
        </div>

        {/* Source reference */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-center text-xs tracking-wide text-muted-foreground/60"
        >
          Based on authentic hadith from Bukhari, Muslim, and other collections
        </motion.p>
      </div>
    </section>
  );
};

export default QuickOverview;
