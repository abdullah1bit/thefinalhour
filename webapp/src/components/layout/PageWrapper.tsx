import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { SignStatus } from "@/data/types";
import StatusBadge from "@/components/layout/StatusBadge";

interface PageWrapperProps {
  title: string;
  subtitle: string;
  status?: SignStatus;
  children: ReactNode;
}

export default function PageWrapper({ title, subtitle, status, children }: PageWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Hero section */}
      <section className="relative overflow-hidden border-b border-border/50 py-16 md:py-24">
        {/* Geometric pattern overlay */}
        <div className="pointer-events-none absolute inset-0 star-pattern" />

        {/* Glow accent */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 text-center lg:px-8">
          {status ? (
            <div className="mb-6 flex justify-center">
              <StatusBadge status={status} />
            </div>
          ) : null}

          <h1
            className={cn(
              "font-heading text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl",
              "gold-text"
            )}
          >
            {title}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-4 py-12 lg:px-8 lg:py-16">
        {children}
      </section>
    </motion.div>
  );
}
