import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { categories, projects, type ProjectCategory } from "@/data/projects";
import { LazyImage } from "@/components/animation/LazyImage";

function MarqueeCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <Link
      to="/portfolio/$projectId"
      params={{ projectId: project.slug }}
      className="group relative block w-80 shrink-0 aspect-[4/3] overflow-hidden rounded-2xl border border-warm-white/10 bg-charcoal"
    >
      <LazyImage
        src={project.cover}
        alt={project.title}
        width={640}
        height={480}
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

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: (typeof projects);
  direction: "right" | "left";
  duration: number;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="group relative w-full overflow-hidden">
      <div
        className="flex gap-5 w-max"
        style={{
          animation: `${direction === "right" ? "portfolioRight" : "portfolioLeft"} ${duration}s linear infinite`,
        }}
      >
        {doubled.map((project, i) => (
          <div
            key={`${project.slug}-${i}`}
            className="group-hover:[animation-play-state:paused]"
            style={{ animationPlayState: "inherit" }}
          >
            <MarqueeCard project={project} />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-charcoal to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-charcoal to-transparent z-10" />
    </div>
  );
}

export function PortfolioGrid() {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const row2 = useMemo(() => [...filtered].reverse(), [filtered]);

  const duration = Math.max(20, filtered.length * 4);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 md:px-10 mt-12 flex flex-wrap items-center gap-2">
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

      <div className="mt-8 flex flex-col gap-5">
        <MarqueeRow items={filtered} direction="right" duration={duration} />
        <MarqueeRow items={row2} direction="left" duration={duration} />
      </div>
    </div>
  );
}
