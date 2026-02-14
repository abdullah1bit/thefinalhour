import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import type { MajorSign } from "@/lib/types";
import MajorSignCard from "@/components/signs/MajorSignCard";

interface Props {
  signs: MajorSign[];
}

export default function MajorSignsSection({ signs }: Props) {
  return (
    <motion.section
      id="major-signs"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="py-12"
    >
      <div className="flex items-center gap-3 mb-2">
        <AlertTriangle className="h-5 w-5 text-approaching" />
        <h2 className="font-heading text-2xl font-semibold tracking-wide text-foreground md:text-3xl">
          The Major Signs
        </h2>
      </div>
      <p className="text-muted-foreground text-sm mb-8 ml-8">
        The 10 cataclysmic events before the Day of Judgment — once the first
        occurs, the rest follow like beads from a broken necklace.
      </p>

      <div className="space-y-4">
        {signs.map((sign) => (
          <MajorSignCard key={sign.id} sign={sign} />
        ))}
      </div>
    </motion.section>
  );
}
