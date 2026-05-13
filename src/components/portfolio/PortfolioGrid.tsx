import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { categories, projects, type ProjectCategory } from "@/data/projects";
import { LazyImage } from "@/components/animation/LazyImage";
import { ProjectCard } from "./ProjectCard";

// ─── Card used inside marquee rows ────────────────────────────────────────────
function MarqueeCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <Link
      to="/portfolio/$projectId"
      params={{ projectId: project.slug }}
      className="group relative block shrink-0 w-[300px] aspect-[4/3] overflow-hidden rounded-2xl border border-warm-white/10 bg-charcoal"
    >
      <LazyImage
        src={project.cover}
        alt={project.title}
        width={600}
        height={450}
        wrapperClassName="absolute inset-0"
        className="size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/30 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
          <p className="text-[9px] uppercase tracking-[0.28em] text-gold">
            {project.category} · {project.year}
          </p>
          <h3 className="mt-1 font-display text-lg tracking-tight text-warm-white">
            {project.title}
          </h3>
          <p className="mt-0.5 text-xs text-warm-white/60">{project.location}</p>
        </div>
      </div>
      <div className="absolute top-4 right-4 grid size-9 place-items-center rounded-full border border-warm-white/20 bg-warm-white/5 text-warm-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:border-gold group-hover:bg-gold group-hover:text-charcoal">
        <ArrowUpRight className="size-3.5" />
      </div>
    </Link>
  );
}

// ─── Single infinite marquee row ──────────────────────────────────────────────
// Container is exactly 3 cards wide (3×300 + 2×20 = 940px) with overflow-hidden
function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: typeof projects;
  direction: "right" | "left";
  duration: number;
}) {
  const doubled = [...items, ...items];

  return (
    // outer: clips to ~3 cards wide, centered
    <div className="mx-auto w-full max-w-[960px] overflow-hidden rounded-2xl relative group">
      {/* scrolling track */}
      <div
        className="flex gap-5 w-max group-hover:[animation-play-state:paused]"
        style={{
          animation: `${direction === "right" ? "portfolioRight" : "portfolioLeft"} ${duration}s linear infinite`,
        }}
      >
        {doubled.map((project, i) => (
          <MarqueeCard key={`${project.slug}-${i}`} project={project} />
        ))}
      </div>

      {/* soft edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-charcoal to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-charcoal to-transparent z-10" />
    </div>
  );
}

// ─── Two-row marquee section (All Works only) ─────────────────────────────────
function MarqueeSection({ items }: { items: typeof projects }) {
  const row2 = useMemo(() => [...items].reverse(), [items]);
  const duration = Math.max(25, items.length * 4);

  return (
    <div className="mt-10 flex flex-col gap-5">
      <MarqueeRow items={items} direction="right" duration={duration} />
      <MarqueeRow items={row2} direction="left" duration={duration} />
    </div>
  );
}

// ─── Static grid section (Residential / Commercial / Luxury) ──────────────────
function StaticGrid({ items }: { items: typeof projects }) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={items.map((p) => p.slug).join(",")}
        initial={{ opacity: 0, y: reduce ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function PortfolioGrid() {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <div className="mt-12">
      {/* Filter tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((c) => {
          const active = c.id === filter;
          return (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
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

      {/* Marquee for "All Works", static grid for category filters */}
      {filter === "all" ? (
        <MarqueeSection items={filtered} />
      ) : (
        <StaticGrid items={filtered} />
      )}
    </div>
  );
}
