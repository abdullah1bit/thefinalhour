import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-active-section";

const sections = [
  { id: "foundation", label: "Foundation" },
  { id: "fulfilled", label: "Fulfilled" },
  { id: "unfolding", label: "Unfolding" },
  { id: "major-signs", label: "Major Signs" },
  { id: "interpretations", label: "Interpretations" },
];

export default function HomepageProgressNav() {
  const activeSection = useActiveSection();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 xl:flex flex-col gap-4">
      {sections.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => scrollTo(s.id)}
          className="group flex items-center gap-3"
        >
          <div
            className={cn(
              "h-2.5 w-2.5 rounded-full border transition-all duration-300",
              activeSection === s.id
                ? "border-primary bg-primary scale-125"
                : "border-muted-foreground/30 bg-transparent group-hover:border-primary/50"
            )}
          />
          <span
            className={cn(
              "text-xs font-body tracking-wide transition-all duration-300",
              activeSection === s.id
                ? "text-primary opacity-100"
                : "text-muted-foreground/50 opacity-0 group-hover:opacity-100"
            )}
          >
            {s.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
