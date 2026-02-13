import { motion } from "framer-motion";

export default function TimelineEndMarker() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col items-center gap-3 pt-4"
    >
      {/* Decorative diamond */}
      <div className="relative">
        <div className="h-6 w-6 rotate-45 border-2 border-primary/50 bg-primary/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-2 w-2 rotate-45 bg-primary/60" />
        </div>
      </div>

      <p className="font-heading text-sm italic text-muted-foreground">
        And only Allah knows the Hour
      </p>

      {/* Small ornamental dots */}
      <div className="flex items-center gap-1.5">
        <div className="h-1 w-1 rounded-full bg-primary/30" />
        <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
        <div className="h-1 w-1 rounded-full bg-primary/30" />
      </div>
    </motion.div>
  );
}
