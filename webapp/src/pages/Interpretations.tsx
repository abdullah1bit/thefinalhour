import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
import SectionDivider from "@/components/layout/SectionDivider";
import { interpretations, scholarlyWorks } from "@/data/glossary";
import InterpretationCard from "@/components/interpretations/InterpretationCard";
import ScholarlyWorkCard from "@/components/glossary/ScholarlyWorkCard";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Interpretations() {
  return (
    <PageWrapper
      title="Modern Interpretations"
      subtitle="Contemporary connections -- presented as theories, not facts"
    >
        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 rounded-lg border border-approaching/30 bg-approaching/5 p-5"
        >
          <div className="flex gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-approaching" />
            <div>
              <h3 className="font-heading text-base font-semibold text-approaching mb-1">
                Important Disclaimer
              </h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                The following are modern scholarly interpretations and theories. They are{" "}
                <span className="font-semibold text-approaching">NOT</span> confirmed prophecy
                fulfillments. Critical thinking and consulting qualified scholars is advised.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Interpretation Cards */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-heading text-2xl font-bold gold-text mb-6"
          >
            Prophecies & Modern Connections
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid gap-5"
          >
            {interpretations.map((interp, index) => (
              <motion.div key={index} variants={staggerItem}>
                <InterpretationCard interpretation={interp} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        <SectionDivider label="For Deeper Study" />

        {/* Scholarly Works */}
        <section>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-heading text-2xl font-bold gold-text mb-6"
          >
            Key Scholarly Works
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid gap-4 sm:grid-cols-3"
          >
            {scholarlyWorks.map((work) => (
              <motion.div key={work.title} variants={staggerItem}>
                <ScholarlyWorkCard work={work} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        <SectionDivider label="Methodology" />

        {/* Methodology Note */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-2xl font-bold gold-text mb-4">
            Approaching Interpretations Responsibly
          </h2>

          <div className="space-y-4 rounded-lg border border-border/60 bg-card/50 p-6">
            <MethodologyPoint
              number="01"
              title="Textual Priority"
              text="Always begin with the Quran and authentic Sunnah. Modern parallels should never override primary texts."
            />
            <MethodologyPoint
              number="02"
              title="Scholarly Consensus"
              text="Consult classical tafsir and hadith commentaries before entertaining modern theories. The scholars of the past had deep insight."
            />
            <MethodologyPoint
              number="03"
              title="Avoid Certainty in Speculation"
              text="Use language like 'possibly,' 'some scholars suggest,' or 'one interpretation is.' Never declare a modern event to be a definitive fulfillment."
            />
            <MethodologyPoint
              number="04"
              title="Intention Matters"
              text="Study eschatology to strengthen faith and increase God-consciousness, not to spread fear or sensationalism."
            />
          </div>
        </motion.section>
    </PageWrapper>
  );
}

function MethodologyPoint({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <span className="font-body text-xs font-semibold tabular-nums text-primary/60">
        {number}
      </span>
      <div>
        <h4 className="font-heading text-base font-semibold text-foreground">
          {title}
        </h4>
        <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">
          {text}
        </p>
      </div>
    </div>
  );
}
