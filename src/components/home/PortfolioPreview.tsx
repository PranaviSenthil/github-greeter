import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ScrollReveal, ScrollStagger } from "@/components/animation/ScrollReveal";
import { motion, useReducedMotion } from "framer-motion";

export function PortfolioPreview() {
  const featured = projects.slice(0, 6);
  const reduce = useReducedMotion();
  return (
    <section className="relative bg-charcoal py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <ScrollReveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-gold">Selected Works</p>
            <h2 className="mt-4 font-display text-4xl tracking-tight text-warm-white md:text-5xl">
              Spaces with a <span className="font-serif italic text-gold-gradient">point of view</span>
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-warm-white/80 transition-colors hover:text-gold"
          >
            All projects
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </ScrollReveal>

        <ScrollStagger className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {featured.map((p) => (
            <motion.div
              key={p.slug}
              variants={{
                hidden: { opacity: 0, y: reduce ? 0 : 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } },
              }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}

