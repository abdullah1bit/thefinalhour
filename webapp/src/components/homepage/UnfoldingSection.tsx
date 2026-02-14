import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Sign } from "@/lib/types";
import ExpandableSignCard from "./ExpandableSignCard";

interface Props {
  signs: Sign[];
}

export default function UnfoldingSection({ signs }: Props) {
  const categories = useMemo(() => {
    const cats = new Map<string, Sign[]>();
    signs.forEach((s) => {
      const cat = s.category || "Other";
      if (!cats.has(cat)) cats.set(cat, []);
      cats.get(cat)!.push(s);
    });
    return cats;
  }, [signs]);

  const categoryNames = Array.from(categories.keys());
  const [activeTab, setActiveTab] = useState(categoryNames[0] || "All");

  const filtered =
    activeTab === "All" ? signs : categories.get(activeTab) || [];

  return (
    <motion.section
      id="unfolding"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="py-12"
    >
      <div className="flex items-center gap-3 mb-2">
        <TrendingUp className="h-5 w-5 text-unfolding" />
        <h2 className="font-heading text-2xl font-semibold tracking-wide text-foreground md:text-3xl">
          Signs Unfolding Now
        </h2>
      </div>
      <p className="text-muted-foreground text-sm mb-6 ml-8">
        {signs.length} signs manifesting in the current era
      </p>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categoryNames.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveTab(cat)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-body transition-all duration-200",
              activeTab === cat
                ? "bg-unfolding/20 text-unfolding border border-unfolding/40"
                : "bg-secondary/50 text-muted-foreground border border-border/50 hover:border-unfolding/30"
            )}
          >
            {cat} ({categories.get(cat)?.length || 0})
          </button>
        ))}
      </div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 gap-2 md:grid-cols-2"
        >
          {filtered.map((sign) => (
            <ExpandableSignCard key={sign.id} sign={sign} />
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}
