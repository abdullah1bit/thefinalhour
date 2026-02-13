import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface GateCardProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  count: string;
  description: string;
  colorClass: string;
  borderClass: string;
  bgClass: string;
  index: number;
}

const GateCard = ({
  to,
  icon,
  title,
  count,
  description,
  colorClass,
  borderClass,
  bgClass,
  index,
}: GateCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <Link
        to={to}
        className={cn(
          "group relative block overflow-hidden rounded-lg border bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 md:p-8",
          "hover:-translate-y-1 hover:shadow-lg",
          borderClass,
          "border-opacity-30 hover:border-opacity-60"
        )}
      >
        {/* Subtle background glow on hover */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            bgClass
          )}
        />

        <div className="relative z-10">
          {/* Icon */}
          <div className={cn("mb-4", colorClass)}>{icon}</div>

          {/* Title */}
          <h3
            className={cn(
              "font-heading text-xl font-semibold tracking-wide md:text-2xl",
              colorClass
            )}
          >
            {title}
          </h3>

          {/* Count */}
          <p
            className={cn(
              "mt-2 text-sm font-medium uppercase tracking-widest opacity-80",
              colorClass
            )}
          >
            {count}
          </p>

          {/* Description */}
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>

          {/* Arrow indicator */}
          <div
            className={cn(
              "mt-4 text-sm font-medium tracking-wide opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100",
              colorClass
            )}
          >
            Explore &rarr;
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const gates = [
  {
    to: "/fulfilled",
    icon: <CheckCircle2 className="h-7 w-7" />,
    title: "What Came True",
    count: "11 Signs Fulfilled",
    description:
      "Prophecies from the Prophet Muhammad (peace be upon him) that have already come to pass throughout history, confirmed by scholars across generations.",
    colorClass: "text-fulfilled",
    borderClass: "border-fulfilled",
    bgClass: "bg-fulfilled/10",
  },
  {
    to: "/unfolding",
    icon: <Clock className="h-7 w-7" />,
    title: "What's Happening Now",
    count: "24 Signs Unfolding",
    description:
      "Signs of the Last Day that scholars recognize as manifesting in our current era. Witness how ancient prophecies speak to modern times.",
    colorClass: "text-unfolding",
    borderClass: "border-unfolding",
    bgClass: "bg-unfolding/10",
  },
  {
    to: "/major-signs",
    icon: <AlertTriangle className="h-7 w-7" />,
    title: "What's Coming",
    count: "10 Major Signs",
    description:
      "The great signs that will precede the Day of Judgment — from the appearance of the Mahdi to the descent of Isa (AS) and beyond.",
    colorClass: "text-approaching",
    borderClass: "border-approaching",
    bgClass: "bg-approaching/10",
  },
];

const NavigationGates = () => {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <h2 className="gold-text font-heading text-3xl font-light tracking-wide md:text-4xl">
            Begin Your Journey
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Choose a path to explore the signs of the Final Hour
          </p>
        </motion.div>

        {/* Gate cards */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {gates.map((gate, index) => (
            <GateCard key={gate.to} {...gate} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NavigationGates;
