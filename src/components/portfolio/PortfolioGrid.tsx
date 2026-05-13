import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { categories, projects, type ProjectCategory } from "@/data/projects";
import { LazyImage } from "@/components/animation/LazyImage";
import { ProjectCard } from "./ProjectCard";

// ─── Golden glowing dot particles — identical to homepage (side areas only) ───
function SparkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = 0, H = 0;

    const MARQUEE_W = 960;
    const PARTICLE_COUNT = 90;

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
      alpha: number;
      alphaDir: number;
      alphaSpeed: number;
    };

    let particles: Particle[] = [];
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    // Spawn only in the left/right strips beside the centered 960px carousel
    const spawnX = (): number => {
      const sideW = Math.max(0, (W - MARQUEE_W) / 2);
      if (sideW < 20) return rand(0, W);
      return Math.random() < 0.5 ? rand(0, sideW) : rand(W - sideW, W);
    };

    const initParticle = (): Particle => ({
      x: spawnX(),
      y: rand(0, H),
      vx: rand(-0.18, 0.18),
      vy: rand(-0.35, -0.08),
      r: rand(0.8, 2.6),
      alpha: rand(0.1, 0.7),
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      alphaSpeed: rand(0.003, 0.009),
    });

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      particles = Array.from({ length: PARTICLE_COUNT }, initParticle);
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaDir * p.alphaSpeed;

        if (p.alpha <= 0.05) { p.alpha = 0.05; p.alphaDir = 1; }
        if (p.alpha >= 0.75) { p.alpha = 0.75; p.alphaDir = -1; }

        if (p.y < -10) { p.y = H + 5; p.x = spawnX(); }
        if (p.x < -10) { p.x = W + 5; }
        if (p.x > W + 10) { p.x = -5; }

        // glowing halo — identical to homepage
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        grd.addColorStop(0, `oklch(0.78 0.13 85 / ${p.alpha})`);
        grd.addColorStop(0.4, `oklch(0.78 0.13 85 / ${p.alpha * 0.5})`);
        grd.addColorStop(1, `oklch(0.78 0.13 85 / 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // solid core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.88 0.10 85 / ${p.alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

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
    <div className="mx-auto w-full max-w-[960px] overflow-hidden rounded-2xl relative group z-10">
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
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-charcoal to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-charcoal to-transparent z-10" />
    </div>
  );
}

// ─── Two-row marquee + side sparks ────────────────────────────────────────────
function MarqueeSection({ items }: { items: typeof projects }) {
  const row2 = useMemo(() => [...items].reverse(), [items]);
  const duration = Math.max(25, items.length * 4);
  const reduce = useReducedMotion();

  return (
    <div className="relative mt-10 flex flex-col gap-5 py-4">
      {/* sparks live behind everything, filling the full section width */}
      {!reduce && <SparkCanvas />}

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

      {filter === "all" ? (
        <MarqueeSection items={filtered} />
      ) : (
        <StaticGrid items={filtered} />
      )}
    </div>
  );
}
