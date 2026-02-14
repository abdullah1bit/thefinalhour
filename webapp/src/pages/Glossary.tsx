import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import PageWrapper from "@/components/layout/PageWrapper";
import SectionDivider from "@/components/layout/SectionDivider";
import GlossaryTermCard from "@/components/glossary/GlossaryTermCard";
import VerseCard from "@/components/glossary/VerseCard";
import ScholarlyWorkCard from "@/components/glossary/ScholarlyWorkCard";
import {
  useGlossaryTerms,
  useQuranicVerses,
  useScholarlyWorks,
} from "@/hooks/use-content";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Glossary() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: glossaryTerms, isLoading: termsLoading } = useGlossaryTerms();
  const { data: quranicVerses, isLoading: versesLoading } = useQuranicVerses();
  const { data: scholarlyWorks, isLoading: worksLoading } =
    useScholarlyWorks();

  const isLoading = termsLoading || versesLoading || worksLoading;

  const filteredTerms = (glossaryTerms || []).filter((t) => {
    const q = searchQuery.toLowerCase();
    return (
      t.term.toLowerCase().includes(q) ||
      t.definition.toLowerCase().includes(q) ||
      (t.arabic?.includes(searchQuery) ?? false)
    );
  });

  return (
    <PageWrapper
      title="Glossary & References"
      subtitle="Key terms, Quranic verses, and scholarly works"
    >
      {isLoading ? (
        <div className="flex justify-center py-24">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : (
        <>
          {/* Section 1: Key Terms */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mb-6"
            >
              <h2 className="font-heading text-2xl font-bold gold-text mb-4">
                Key Terms
              </h2>
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search terms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card/50 border-border/60 focus-visible:border-primary/40"
                />
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredTerms.length > 0 ? (
                filteredTerms.map((term) => (
                  <motion.div key={term.id} variants={staggerItem}>
                    <GlossaryTermCard term={term} />
                  </motion.div>
                ))
              ) : (
                <motion.p
                  variants={staggerItem}
                  className="col-span-full py-8 text-center font-body text-muted-foreground"
                >
                  No terms match your search.
                </motion.p>
              )}
            </motion.div>
          </section>

          <SectionDivider label="Quranic Verses" />

          {/* Section 2: Quranic Verses */}
          <section>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="grid gap-4 md:grid-cols-2"
            >
              {(quranicVerses || []).map((verse) => (
                <motion.div key={verse.id} variants={staggerItem}>
                  <VerseCard verse={verse} />
                </motion.div>
              ))}
            </motion.div>
          </section>

          <SectionDivider label="Scholarly Works" />

          {/* Section 3: Scholarly Works */}
          <section>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="grid gap-4 sm:grid-cols-3"
            >
              {(scholarlyWorks || []).map((work) => (
                <motion.div key={work.id} variants={staggerItem}>
                  <ScholarlyWorkCard work={work} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        </>
      )}
    </PageWrapper>
  );
}
