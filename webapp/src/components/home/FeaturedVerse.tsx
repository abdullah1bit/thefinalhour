import { motion } from "framer-motion";

const FeaturedVerse = () => {
  return (
    <section className="px-6 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-3xl text-center"
      >
        {/* Decorative opening quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <span className="gold-text font-heading text-5xl leading-none md:text-6xl">
            &ldquo;
          </span>
        </motion.div>

        {/* Verse text */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-heading text-xl font-light italic leading-relaxed tracking-wide text-foreground/90 md:text-2xl lg:text-3xl"
        >
          Are they only waiting for the Hour to take them by surprise? Yet some
          of its signs have already come...
        </motion.blockquote>

        {/* Decorative closing quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6"
        >
          <span className="gold-text font-heading text-5xl leading-none md:text-6xl">
            &rdquo;
          </span>
        </motion.div>

        {/* Decorative gold line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-6 h-px w-16 origin-center bg-primary/40"
        />

        {/* Reference */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-4 text-sm tracking-widest text-primary/60"
        >
          &mdash; Surah Muhammad, 47:18
        </motion.p>
      </motion.div>
    </section>
  );
};

export default FeaturedVerse;
