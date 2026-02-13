import { motion } from "framer-motion";
import PageWrapper from "@/components/layout/PageWrapper";
import SectionDivider from "@/components/layout/SectionDivider";
import MajorSignCard from "@/components/signs/MajorSignCard";
import { majorSigns } from "@/data/major-signs";

export default function MajorSigns() {
  return (
    <PageWrapper
        title="The Major Signs"
        subtitle="The final events before the Day of Judgment"
        status="approaching"
      >
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl rounded-lg border border-border/40 bg-secondary/30 px-5 py-5 md:px-6"
        >
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            The ten major signs (<span className="font-arabic text-foreground/80">al-&lsquo;Alamat al-Kubra</span>)
            are the final, unmistakable events that precede the Day of Judgment.
            Unlike the minor signs, which unfold gradually over centuries, the major
            signs occur in rapid succession -- once the first appears, the rest follow
            like beads falling from a broken necklace. They represent a fundamental
            transformation of the world as we know it.
          </p>
        </motion.div>

        <SectionDivider label="The Ten Signs" />

        {/* Major Sign Cards */}
        <div className="space-y-4">
          {majorSigns.map((sign) => (
            <MajorSignCard key={sign.id} sign={sign} />
          ))}
        </div>

        <SectionDivider className="mt-12" />

        {/* Important Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl rounded-lg border border-approaching/20 bg-approaching/5 px-5 py-4 text-center"
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            The exact sequence and timing of these events is known only to Allah.
            Scholarly opinions vary on specific ordering.
          </p>
        </motion.div>
      </PageWrapper>
  );
}
