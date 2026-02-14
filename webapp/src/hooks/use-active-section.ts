import { useState, useEffect } from "react";

const SECTION_IDS = [
  "foundation",
  "fulfilled",
  "unfolding",
  "major-signs",
  "interpretations",
];

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>("foundation");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.2, rootMargin: "-80px 0px -40% 0px" }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
