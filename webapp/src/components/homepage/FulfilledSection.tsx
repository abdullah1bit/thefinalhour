import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import type { Sign } from "@/lib/types";
import ExpandableSignCard from "./ExpandableSignCard";

interface Props {
  signs: Sign[];
}

export default function FulfilledSection({ signs }: Props) {
  // Group by period
  const groups = signs.reduce<Record<string, Sign[]>>((acc, sign) => {
    const period = sign.period || "Other";
    if (!acc[period]) acc[period] = [];
    acc[period].push(sign);
    return acc;
  }, {});

  const periodOrder = Object.keys(groups);
  const [openPeriods, setOpenPeriods] = useState<Set<string>>(
    new Set(periodOrder.length > 0 ? [periodOrder[0]] : [])
  );

  const toggle = (period: string) => {
    setOpenPeriods((prev) => {
      const next = new Set(prev);
      if (next.has(period)) next.delete(period);
      else next.add(period);
      return next;
    });
  };

  return (
    <motion.section
      id="fulfilled"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="py-12"
    >
      <div className="flex items-center gap-3 mb-2">
        <CheckCircle2 className="h-5 w-5 text-fulfilled" />
        <h2 className="font-heading text-2xl font-semibold tracking-wide text-foreground md:text-3xl">
          Signs That Came True
        </h2>
      </div>
      <p className="text-muted-foreground text-sm mb-8 ml-8">
        {signs.length} prophecies fulfilled throughout Islamic history
      </p>

      <div className="space-y-4">
        {periodOrder.map((period) => {
          const isOpen = openPeriods.has(period);
          return (
            <div
              key={period}
              className="rounded-lg border border-border/50 bg-card/30 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggle(period)}
                className="flex w-full items-center justify-between p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="font-heading text-base font-medium text-foreground">
                    {period}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({groups[period].length})
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2 px-4 pb-4">
                      {groups[period].map((sign) => (
                        <ExpandableSignCard key={sign.id} sign={sign} />
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
