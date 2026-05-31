import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = [
  {
    title: "Minor Signs",
    arabic: "Ashrat al-Sughra",
    desc: "Everyday societal trends and historical events spanning centuries, many already fulfilled.",
    color: "text-fulfilled",
    borderColor: "border-fulfilled/30",
  },
  {
    title: "Middle Signs",
    arabic: "Ashrat al-Wusta",
    desc: "Transitional events bridging minor and major signs, increasing in intensity.",
    color: "text-unfolding",
    borderColor: "border-unfolding/30",
  },
  {
    title: "Major Signs",
    arabic: "Ashrat al-Kubra",
    desc: "Final 10 cataclysmic events; once the first occurs, the rest follow in rapid succession.",
    color: "text-approaching",
    borderColor: "border-approaching/30",
  },
];

export default function FoundationSection() {
  return (
    <motion.section
      id="foundation"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="py-16"
    >
      <h2 className="gold-text font-heading text-3xl font-light tracking-wide text-center mb-4 md:text-4xl">
        What is Islamic Eschatology?
      </h2>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
        <span className="font-arabic text-primary/80">'Ilm al-Akhira</span> — the
        knowledge of the Hereafter. The Prophet Muhammad (SAW) described signs that
        would precede the Day of Judgment, categorized by scholars into three levels
        of severity.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={cn("rounded-lg border bg-card/60 p-5", cat.borderColor)}
          >
            <h3 className={cn("font-heading text-lg font-semibold mb-1", cat.color)}>
              {cat.title}
            </h3>
            <p className="text-xs text-muted-foreground/70 font-arabic mb-3">
              {cat.arabic}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">{cat.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
