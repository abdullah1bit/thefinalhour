import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ChevronDown, AlertCircle } from "lucide-react";
import type { Interpretation } from "@/lib/types";

interface Props {
  interpretations: Interpretation[];
}

export default function InterpretationsSection({ interpretations }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <motion.section
      id="interpretations"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="py-12"
    >
      <div className="flex items-center gap-3 mb-2">
        <Lightbulb className="h-5 w-5 text-unfolding" />
        <h2 className="font-heading text-2xl font-semibold tracking-wide text-foreground md:text-3xl">
          Modern Interpretations
        </h2>
      </div>

      {/* Disclaimer */}
      <div className="mb-6 ml-8 rounded-md border border-approaching/20 bg-approaching/5 px-4 py-3">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-approaching mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            These are modern scholarly interpretations and theories. They are{" "}
            <strong className="text-foreground">NOT</strong> confirmed prophecy
            fulfillments.
          </p>
        </div>
      </div>

      {/* Toggle button to show/hide */}
      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className="flex items-center gap-2 ml-8 mb-4 text-sm text-primary hover:text-primary/80 transition-colors"
      >
        <span>
          {isVisible ? "Hide" : "View"} Interpretations ({interpretations.length})
        </span>
        <motion.div
          animate={{ rotate: isVisible ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isVisible ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 ml-8">
              {interpretations.map((interp) => (
                <div
                  key={interp.id}
                  className="rounded-lg border border-border/50 bg-card/60 p-4"
                >
                  <p className="text-sm font-medium text-foreground mb-1">
                    "{interp.prophecy}"
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {interp.modernInterpretation}
                  </p>
                  <p className="text-xs text-approaching/70 italic">
                    {interp.scholarlyCaution}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.section>
  );
}
