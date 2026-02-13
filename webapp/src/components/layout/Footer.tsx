import { Link } from "react-router-dom";

const navigationLinks = [
  { to: "/", label: "Home" },
  { to: "/foundation", label: "What is Islamic Eschatology" },
  { to: "/fulfilled", label: "Signs That Have Come True" },
  { to: "/unfolding", label: "Signs Unfolding Now" },
  { to: "/major-signs", label: "Major Signs Approaching" },
  { to: "/timeline", label: "The Sequence" },
  { to: "/interpretations", label: "Modern Interpretations" },
  { to: "/glossary", label: "Glossary & References" },
];

const keyReferences = [
  "Sahih al-Bukhari",
  "Sahih Muslim",
  "Sunan Abu Dawud",
  "Kitab al-Fitan (Nu'aym ibn Hammad)",
  "Al-Nihaya fil Fitan wal Malahim (Ibn Kathir)",
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border/50">
      {/* Geometric pattern overlay */}
      <div className="pointer-events-none absolute inset-0 geometric-pattern opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 lg:px-8">
        {/* Disclaimer */}
        <div className="mb-10 rounded-lg border border-border/50 bg-secondary/30 px-6 py-4 text-center">
          <p className="font-arabic text-sm leading-relaxed text-muted-foreground">
            Only Allah knows the unseen. This is an educational compilation of traditional Islamic texts.
          </p>
        </div>

        {/* Three columns */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Navigation */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold text-foreground">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Key References */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold text-foreground">
              Key References
            </h3>
            <ul className="space-y-2">
              {keyReferences.map((ref) => (
                <li key={ref} className="text-sm text-muted-foreground">
                  {ref}
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold text-foreground">
              About
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              This resource compiles signs of the Last Day from authentic Islamic sources,
              including the Quran and Sunnah. It is intended for educational purposes and
              to encourage reflection. We encourage readers to consult qualified scholars
              for deeper understanding.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border/50 pt-6 text-center">
          <p className="gold-text font-heading text-sm font-medium">
            The Final Hour
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            An educational resource on Islamic eschatology
          </p>
        </div>
      </div>
    </footer>
  );
}
