import { useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import SectionDivider from "@/components/layout/SectionDivider";
import SignCard from "@/components/signs/SignCard";
import { fulfilledSigns } from "@/data/fulfilled-signs";
import type { Sign } from "@/data/types";

interface PeriodGroup {
  period: string;
  label: string;
  signs: Sign[];
}

const periodLabels: Record<string, string> = {
  "7th Century CE": "Prophetic Era \u2014 7th Century CE",
  "7th-8th Century": "Early Islamic Period \u2014 7th\u20138th Century",
  Medieval: "Medieval Period",
};

const Fulfilled = () => {
  const periodGroups = useMemo<PeriodGroup[]>(() => {
    const groupMap = new Map<string, Sign[]>();

    fulfilledSigns.forEach((sign) => {
      const period = sign.period ?? "Other";
      const existing = groupMap.get(period);
      if (existing) {
        existing.push(sign);
      } else {
        groupMap.set(period, [sign]);
      }
    });

    const groups: PeriodGroup[] = [];
    groupMap.forEach((signs, period) => {
      groups.push({
        period,
        label: periodLabels[period] ?? period,
        signs,
      });
    });

    return groups;
  }, []);

  return (
    <PageWrapper
        title="Signs That Have Come True"
        subtitle="Historical events prophesied centuries in advance"
        status="fulfilled"
      >
        {/* Period Sections */}
        {periodGroups.map((group, groupIndex) => (
          <section key={group.period}>
            {groupIndex > 0 ? (
              <SectionDivider label={group.label} />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h2 className="gold-text font-heading text-2xl font-semibold tracking-wide md:text-3xl">
                  {group.label}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {group.signs.length} prophetic signs from this period
                </p>
              </motion.div>
            )}

            {groupIndex > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4 }}
                className="mb-6"
              >
                <p className="text-sm text-muted-foreground">
                  {group.signs.length} prophetic signs from this period
                </p>
              </motion.div>
            ) : null}

            <div className="grid gap-4">
              {group.signs.map((sign, signIndex) => (
                <SignCard key={sign.id} sign={sign} index={signIndex} />
              ))}
            </div>
          </section>
        ))}

        <SectionDivider label="Reflection" />

        {/* Summary Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="pb-8"
        >
          <div className="rounded-lg border border-fulfilled/20 bg-fulfilled/5 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="mt-1 h-8 w-8 flex-shrink-0 text-fulfilled" />
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground md:text-2xl">
                  {fulfilledSigns.length} Prophecies Fulfilled
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  Over the course of more than 1,400 years, these prophetic signs have come to
                  pass exactly as described. From the death of the Prophet (peace be upon him)
                  to the fall of Constantinople, each fulfillment reinforces the truthfulness
                  of the message and the reality of what is yet to come.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  The purpose of reflecting on fulfilled prophecies is not to boast but to
                  strengthen faith, inspire gratitude, and prepare the heart for the signs that
                  remain. As Allah says in the Quran:
                </p>
                <blockquote className="mt-4 border-l-2 border-primary/30 pl-4 font-heading italic text-foreground/90">
                  "Are they only waiting for the Hour to take them by surprise? Yet some of its
                  signs have already come..."
                  <span className="mt-1 block text-xs font-normal not-italic tracking-widest uppercase text-muted-foreground">
                    -- Quran 47:18
                  </span>
                </blockquote>
              </div>
            </div>
          </div>
        </motion.section>
      </PageWrapper>
  );
};

export default Fulfilled;
