import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { HeartCrack, BookOpen, TrendingUp, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import PageWrapper from "@/components/layout/PageWrapper";
import SectionDivider from "@/components/layout/SectionDivider";
import SignCard from "@/components/signs/SignCard";
import CategoryOverviewCard from "@/components/signs/CategoryOverviewCard";
import { unfoldingSigns } from "@/data/unfolding-signs";

type Category =
  | "All"
  | "Social & Moral Decay"
  | "Knowledge & Religion"
  | "Economic & Environmental"
  | "Political & Global";

const categories: Category[] = [
  "All",
  "Social & Moral Decay",
  "Knowledge & Religion",
  "Economic & Environmental",
  "Political & Global",
];

interface CategoryMeta {
  icon: LucideIcon;
  description: string;
}

const categoryMeta: Record<Exclude<Category, "All">, CategoryMeta> = {
  "Social & Moral Decay": {
    icon: HeartCrack,
    description: "Moral deterioration and breakdown of social structures",
  },
  "Knowledge & Religion": {
    icon: BookOpen,
    description: "Loss of sacred knowledge and religious understanding",
  },
  "Economic & Environmental": {
    icon: TrendingUp,
    description: "Economic upheaval and environmental transformations",
  },
  "Political & Global": {
    icon: Globe,
    description: "Geopolitical shifts and global conflicts",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function Unfolding() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filteredSigns = useMemo(() => {
    if (selectedCategory === "All") return unfoldingSigns;
    return unfoldingSigns.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of categories) {
      if (cat === "All") {
        counts[cat] = unfoldingSigns.length;
      } else {
        counts[cat] = unfoldingSigns.filter((s) => s.category === cat).length;
      }
    }
    return counts;
  }, []);

  return (
    <PageWrapper
        title="Signs Unfolding Now"
        subtitle="Present trends that continue to intensify"
        status="unfolding"
      >
        {/* Category Overview Cards */}
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground md:text-xl">
            Categories
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {(Object.keys(categoryMeta) as Exclude<Category, "All">[]).map(
              (cat) => {
                const meta = categoryMeta[cat];
                return (
                  <CategoryOverviewCard
                    key={cat}
                    name={cat}
                    count={categoryCounts[cat] ?? 0}
                    icon={meta.icon}
                    description={meta.description}
                    isActive={selectedCategory === cat}
                    onClick={() =>
                      setSelectedCategory((prev) =>
                        prev === cat ? "All" : cat
                      )
                    }
                  />
                );
              }
            )}
          </div>
        </section>

        <SectionDivider label="Filter by Category" />

        {/* Tab bar / pill navigation */}
        <div className="overflow-x-auto pb-2">
          <div className="flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "flex-shrink-0 rounded-full border px-4 py-2 text-sm font-body font-medium transition-all duration-200",
                  selectedCategory === cat
                    ? "border-unfolding/50 bg-unfolding/15 text-unfolding shadow-sm"
                    : "border-border/50 bg-card text-muted-foreground hover:border-border hover:text-foreground"
                )}
              >
                {cat}
                <span
                  className={cn(
                    "ml-1.5 text-xs tabular-nums",
                    selectedCategory === cat
                      ? "text-unfolding/70"
                      : "text-muted-foreground/50"
                  )}
                >
                  {categoryCounts[cat]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Signs Grid */}
        <motion.div
          key={selectedCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 grid gap-4 md:grid-cols-2"
        >
          {filteredSigns.map((sign) => (
            <motion.div key={sign.id} variants={itemVariants}>
              <SignCard sign={sign} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state */}
        {filteredSigns.length === 0 ? (
          <div className="mt-12 text-center text-muted-foreground">
            <p>No signs found in this category.</p>
          </div>
        ) : null}

        <SectionDivider className="mt-12" />

        {/* Context Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl rounded-lg border border-border/40 bg-secondary/30 px-5 py-4 text-center"
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            These signs represent ongoing trends, not one-time events. Their
            intensity is expected to increase as the Hour approaches.
          </p>
        </motion.div>
      </PageWrapper>
  );
}
