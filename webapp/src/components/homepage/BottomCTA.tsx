import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, BookOpen } from "lucide-react";

export default function BottomCTA() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-5xl px-4 py-16 lg:px-8"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link
          to="/timeline"
          className="group rounded-lg border border-border/50 bg-card/60 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-card"
        >
          <Clock className="h-6 w-6 text-primary mb-3 transition-transform group-hover:scale-110" />
          <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
            The Sequence
          </h3>
          <p className="text-sm text-muted-foreground">
            Explore the prophesied timeline from past to future.
          </p>
        </Link>
        <Link
          to="/glossary"
          className="group rounded-lg border border-border/50 bg-card/60 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-card"
        >
          <BookOpen className="h-6 w-6 text-primary mb-3 transition-transform group-hover:scale-110" />
          <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
            Glossary & References
          </h3>
          <p className="text-sm text-muted-foreground">
            Key terms, Quranic verses, and scholarly works.
          </p>
        </Link>
      </div>
    </motion.section>
  );
}
