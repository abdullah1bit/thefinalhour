import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/timeline", label: "The Sequence" },
  { to: "/glossary", label: "Glossary" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Brand */}
        <Link to="/" className="flex-shrink-0" onClick={() => setMobileOpen(false)}>
          <span className="gold-text font-heading text-xl font-semibold tracking-wide md:text-2xl">
            The Final Hour
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "relative px-3 py-2 text-sm font-body transition-colors duration-200",
                isActive(link.to)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
              {isActive(link.to) ? (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary" />
              ) : null}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-foreground transition-colors hover:text-primary lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={cn(
          "overflow-hidden border-b border-border/50 bg-background/95 backdrop-blur-md transition-all duration-300 lg:hidden",
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 border-b-0"
        )}
      >
        <div className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "rounded-md px-4 py-3 text-sm font-body transition-colors duration-200",
                isActive(link.to)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
