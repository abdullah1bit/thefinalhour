import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  icon: ReactNode;
  title: string;
  arabicTitle: string;
  description: string;
  points: string[];
  colorClass: string;
  borderColorClass: string;
  bgAccentClass: string;
  index: number;
}

export default function CategoryCard({
  icon,
  title,
  arabicTitle,
  description,
  points,
  colorClass,
  borderColorClass,
  bgAccentClass,
  index,
}: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 md:p-8",
        "hover:-translate-y-1 hover:shadow-lg",
        borderColorClass,
        "border-opacity-30 hover:border-opacity-60"
      )}
    >
      {/* Subtle glow on hover */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          bgAccentClass
        )}
      />

      <div className="relative z-10">
        {/* Icon */}
        <div className={cn("mb-4", colorClass)}>{icon}</div>

        {/* Arabic subtitle */}
        <p className={cn("mb-1 font-arabic text-sm opacity-70", colorClass)}>
          {arabicTitle}
        </p>

        {/* Title */}
        <h3
          className={cn(
            "font-heading text-xl font-semibold tracking-wide md:text-2xl",
            colorClass
          )}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* Bullet points */}
        <ul className="mt-4 space-y-2">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className={cn("mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full", colorClass.replace("text-", "bg-"))} />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
