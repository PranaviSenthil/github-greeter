import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { categories, projects, type ProjectCategory } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { MagneticButton } from "@/components/animation/MagneticButton";

const PAGE = 6;

export function PortfolioGrid() {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const [visible, setVisible] = useState(PAGE);
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const items = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisible((v) => v + PAGE);
      setLoading(false);
    }, 600);
  };

  return (
    <div>
      <div className="mt-12 flex flex-wrap items-center gap-2">
        {categories.map((c) => {
          const active = c.id === filter;
          return (
            <button
              key={c.id}
              onClick={() => {
                setFilter(c.id);
                setVisible(PAGE);
              }}
              className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.22em] transition-all duration-300 ${
                active
                  ? "border-gold bg-gold text-charcoal"
                  : "border-warm-white/15 text-warm-white/70 hover:border-gold/60 hover:text-gold"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <PortfolioItems items={items} filter={filter} />

      {hasMore && (
        <div className="mt-16 flex justify-center">
          <MagneticButton strength={0.3}>
            <button
              onClick={loadMore}
              disabled={loading}
              className="group inline-flex items-center gap-3 rounded-full border border-gold/40 bg-warm-white/5 px-8 py-3 text-xs uppercase tracking-[0.28em] text-gold transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-charcoal disabled:opacity-60"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : null}
              {loading ? "Loading" : "View more works"}
            </button>
          </MagneticButton>
        </div>
      )}
    </div>
  );
}

function PortfolioItems({ items, filter }: { items: typeof projects; filter: string }) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={filter}
        initial={{ opacity: 0, y: reduce ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reduce ? 0 : -8 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className="mt-10 grid grid-flow-row-dense auto-rows-auto grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: reduce ? 0 : 24, filter: reduce ? "none" : "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
            className={i % 5 === 0 && p.weight === 2 ? "lg:row-span-2" : ""}
          >
            <ProjectCard project={p} tall={i % 5 === 0 && p.weight === 2} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
