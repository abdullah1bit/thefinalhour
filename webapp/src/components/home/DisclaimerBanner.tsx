import { motion } from "framer-motion";
import { Info } from "lucide-react";

const DisclaimerBanner = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="px-6 py-12"
    >
      <div className="mx-auto max-w-2xl rounded-lg border border-border/50 bg-card/60 px-6 py-5 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/70" />
          <p className="text-center text-sm leading-relaxed text-muted-foreground">
            Only Allah knows the unseen (33:63). This is an educational
            compilation of traditional Islamic texts and scholarly works. No
            date predictions are made.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default DisclaimerBanner;
