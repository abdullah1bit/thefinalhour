import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, GitBranch, Lightbulb, Library } from "lucide-react";
import { cn } from "@/lib/utils";

interface LinkCardProps {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const LinkCard = ({ to, icon, title, description, index }: LinkCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        to={to}
        className={cn(
          "group flex items-start gap-4 rounded-lg border border-border/30 bg-card/40 p-5 backdrop-blur-sm transition-all duration-300",
          "hover:-translate-y-0.5 hover:border-primary/30 hover:bg-card/70"
        )}
      >
        <div className="mt-0.5 text-primary/60 transition-colors duration-300 group-hover:text-primary">
          {icon}
        </div>
        <div>
          <h4 className="font-heading text-base font-semibold tracking-wide text-foreground transition-colors duration-300 group-hover:text-primary">
            {title}
          </h4>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

const links = [
  {
    to: "/foundation",
    icon: <BookOpen className="h-5 w-5" />,
    title: "The Foundation",
    description: "Learn what Islamic eschatology is",
  },
  {
    to: "/timeline",
    icon: <GitBranch className="h-5 w-5" />,
    title: "The Sequence",
    description: "See the complete timeline of events",
  },
  {
    to: "/interpretations",
    icon: <Lightbulb className="h-5 w-5" />,
    title: "Modern Connections",
    description: "Contemporary scholarly analysis",
  },
  {
    to: "/glossary",
    icon: <Library className="h-5 w-5" />,
    title: "Glossary & References",
    description: "Key terms and scholarly works",
  },
];

const MoreLinks = () => {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="font-heading text-2xl font-light tracking-wide text-foreground md:text-3xl">
            Continue Learning
          </h2>
        </motion.div>

        {/* Link cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {links.map((link, index) => (
            <LinkCard key={link.to} {...link} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreLinks;
