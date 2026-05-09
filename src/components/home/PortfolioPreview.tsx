import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/portfolio/ProjectCard";

export function PortfolioPreview() {
  const featured = projects.slice(0, 6);
  return (
    <section className="relative bg-charcoal py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
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
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
