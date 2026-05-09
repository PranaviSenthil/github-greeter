import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { LazyImage } from "@/components/animation/LazyImage";

export function ProjectCard({ project, tall = false }: { project: Project; tall?: boolean }) {
  return (
    <Link
      to="/portfolio/$projectId"
      params={{ projectId: project.slug }}
      className={`group relative block overflow-hidden rounded-2xl border border-warm-white/10 bg-charcoal ${
        tall ? "row-span-2 aspect-[3/4]" : "aspect-[4/3]"
      }`}
    >
      <LazyImage
        src={project.cover}
        alt={project.title}
        width={1536}
        height={1024}
        wrapperClassName="absolute inset-0"
        className="size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/30 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <div className="flex items-end justify-between gap-4">
          <div className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
            <p className="text-[10px] uppercase tracking-[0.28em] text-gold">
              {project.category} · {project.year}
            </p>
            <h3 className="mt-2 font-display text-2xl tracking-tight text-warm-white md:text-3xl">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-warm-white/60">{project.location}</p>
          </div>
          <div className="grid size-11 shrink-0 place-items-center rounded-full border border-warm-white/20 bg-warm-white/5 text-warm-white transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-charcoal">
            <ArrowUpRight className="size-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
