import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Geometric pattern overlay */}
      <div className="geometric-pattern pointer-events-none absolute inset-0" />

      {/* Radial gradient glow behind title */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 md:h-[36rem] md:w-[36rem]"
        style={{
          background:
            "radial-gradient(circle, hsl(160 30% 12%) 0%, transparent 70%)",
        }}
      />

      {/* Secondary subtle glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 md:h-96 md:w-96"
        style={{
          background:
            "radial-gradient(circle, hsl(43 80% 55% / 0.15) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Decorative line above */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8 h-px w-24 origin-center bg-primary/40 md:w-32"
        />

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="gold-text font-heading text-5xl font-light tracking-wide sm:text-6xl md:text-7xl lg:text-8xl"
        >
          The Final Hour
        </motion.h1>

        {/* Arabic text */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-4 font-arabic text-2xl text-primary/70 sm:text-3xl md:text-4xl"
          dir="rtl"
        >
          علم الآخرة
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-6 max-w-md font-body text-base tracking-widest text-muted-foreground sm:text-lg md:mt-8"
        >
          A Journey Through Islamic Prophecies
        </motion.p>

        {/* Decorative line below */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.1, ease: "easeOut" }}
          className="mt-8 h-px w-24 origin-center bg-primary/40 md:w-32"
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-muted-foreground/60">
            Explore
          </span>
          <ChevronDown className="h-5 w-5 text-primary/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
