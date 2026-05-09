import { ProjectCard } from "./ProjectCard";
import { getRelated } from "@/data/projects";

export function RelatedProjects({ slug }: { slug: string }) {
  const related = getRelated(slug, 3);
  if (related.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-6 pb-32 md:px-10">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-3xl tracking-tight text-warm-white md:text-4xl">
          Related <span className="font-serif italic text-gold-gradient">works</span>
        </h2>
        <p className="hidden text-sm text-warm-white/60 md:block">More from the studio</p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {related.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
