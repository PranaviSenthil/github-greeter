import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { Compare } from "@/components/portfolio/Compare";
import { Lightbox } from "@/components/portfolio/Lightbox";
import { RelatedProjects } from "@/components/portfolio/RelatedProjects";
import { LazyImage } from "@/components/animation/LazyImage";
import { ScrollReveal, ScrollStagger } from "@/components/animation/ScrollReveal";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { getProject, projects } from "@/data/projects";

export const Route = createFileRoute("/portfolio/$projectId")({
  head: ({ params }) => {
    const p = getProject(params.projectId);
    const title = p ? `${p.title} — YOUR BRAND` : `Project — YOUR BRAND`;
    const desc = p?.description ?? "An in-depth look at one of our luxury interior design projects.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(p ? [{ property: "og:image", content: p.cover }, { property: "twitter:image", content: p.cover }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    if (!getProject(params.projectId)) throw notFound();
    return { slug: params.projectId };
  },
  notFoundComponent: () => (
    <section className="mx-auto max-w-3xl px-6 pt-40 pb-32 text-center">
      <h1 className="font-display text-5xl text-warm-white">Project not found</h1>
      <p className="mt-4 text-warm-white/60">The project you're looking for doesn't exist.</p>
      <Link to="/portfolio" className="mt-10 inline-block text-xs uppercase tracking-[0.22em] text-gold hover:underline">
        ← Back to portfolio
      </Link>
    </section>
  ),
  errorComponent: ({ error }) => (
    <section className="mx-auto max-w-3xl px-6 pt-40 pb-32 text-center">
      <h1 className="font-display text-3xl text-warm-white">Something went wrong</h1>
      <p className="mt-4 text-warm-white/60">{error.message}</p>
    </section>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { projectId } = Route.useParams();
  const project = getProject(projectId)!;
  const [lightbox, setLightbox] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const { prev, next } = useMemo(() => {
    const idx = projects.findIndex((p) => p.slug === project.slug);
    return {
      prev: projects[(idx - 1 + projects.length) % projects.length],
      next: projects[(idx + 1) % projects.length],
    };
  }, [project.slug]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative h-[88vh] min-h-[620px] w-full overflow-hidden">
        <motion.img
          src={project.cover}
          alt={project.title}
          width={1536}
          height={1024}
          className="absolute inset-0 size-full object-cover"
          style={reduce ? undefined : { y: heroY, scale: heroScale }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/30" />
        <motion.div className="absolute inset-x-0 bottom-0" style={reduce ? undefined : { opacity: heroOpacity }}>
          <div className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
            <PageBreadcrumb
              items={[
                { label: "Home", to: "/" },
                { label: "Portfolio", to: "/portfolio" },
                { label: project.title },
              ]}
            />
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="mt-6 text-xs uppercase tracking-[0.32em] text-gold"
            >
              {project.category} · {project.location} · {project.year}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.25, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
              className="mt-4 max-w-4xl font-display text-5xl tracking-tight text-warm-white md:text-7xl"
            >
              {project.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.9 }}
              className="mt-5 max-w-2xl text-lg text-warm-white/75"
            >
              {project.subtitle}
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* STORY + SPECS */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          <ScrollReveal className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.32em] text-gold">The Story</p>
            <p className="mt-6 font-serif text-2xl leading-relaxed text-warm-white/85 md:text-3xl">
              {project.story}
            </p>
            <p className="mt-8 max-w-xl text-warm-white/65">{project.description}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.15} className="md:col-span-5">
            <div className="glass rounded-2xl p-8">
              <p className="text-xs uppercase tracking-[0.32em] text-gold">Specifications</p>
              <dl className="mt-6 space-y-4">
                {project.specs.map((s) => (
                  <div key={s.label} className="flex items-baseline justify-between border-b border-warm-white/10 pb-3 last:border-0">
                    <dt className="text-xs uppercase tracking-[0.22em] text-warm-white/55">{s.label}</dt>
                    <dd className="font-serif text-lg text-warm-white">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.32em] text-gold">Gallery</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-warm-white md:text-4xl">
            Walk the <span className="font-serif italic text-gold-gradient">space</span>
          </h2>
        </ScrollReveal>
        <ScrollStagger className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3" stagger={0.08}>
          {project.gallery.map((src, i) => (
            <motion.button
              key={i}
              variants={{
                hidden: { opacity: 0, y: reduce ? 0 : 24, filter: reduce ? "none" : "blur(6px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } },
              }}
              onClick={() => setLightbox(i)}
              className={`group relative overflow-hidden rounded-xl border border-warm-white/10 ${
                i === 0 ? "md:col-span-2 md:row-span-2 aspect-[4/3]" : "aspect-[4/3]"
              }`}
            >
              <LazyImage
                src={src}
                alt={`${project.title} ${i + 1}`}
                wrapperClassName="absolute inset-0 size-full"
                className="absolute inset-0 size-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/30" />
              <div className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-warm-white/20 bg-charcoal/50 text-warm-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                <Expand className="size-4" />
              </div>
            </motion.button>
          ))}
        </ScrollStagger>
      </section>

      {/* COMPARE */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <ScrollReveal className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-gold">Transformation</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-warm-white md:text-4xl">
              Before. <span className="font-serif italic text-gold-gradient">After.</span>
            </h2>
          </div>
          <p className="max-w-md text-warm-white/65">Drag to reveal the journey from original space to final reveal.</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <Compare before={project.beforeAfter.before} after={project.beforeAfter.after} />
        </ScrollReveal>
      </section>

      {/* TIMELINE */}
      <section className="mx-auto max-w-7xl px-6 pb-32 md:px-10">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.32em] text-gold">Process</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-warm-white md:text-4xl">
            From brief to <span className="font-serif italic text-gold-gradient">reveal</span>
          </h2>
        </ScrollReveal>
        <ScrollStagger as="ul" className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-warm-white/10 bg-warm-white/5 md:grid-cols-4" stagger={0.1}>
          {project.timeline.map((t, i) => (
            <motion.li
              key={t.phase}
              variants={{
                hidden: { opacity: 0, y: reduce ? 0 : 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
              }}
              className="bg-charcoal p-8"
            >
              <span className="font-serif text-4xl text-gold-gradient">0{i + 1}</span>
              <h3 className="mt-4 font-display text-xl text-warm-white">{t.phase}</h3>
              <p className="mt-2 text-sm text-warm-white/60">{t.detail}</p>
            </motion.li>
          ))}
        </ScrollStagger>
      </section>

      {/* PREV / NEXT */}
      <section className="border-t border-warm-white/10 bg-charcoal/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-warm-white/10">
          <Link
            to="/portfolio/$projectId"
            params={{ projectId: prev.slug }}
            className="group relative flex items-center gap-4 bg-charcoal p-8 transition-colors hover:bg-charcoal/40 md:p-12"
          >
            <ArrowLeft className="size-5 text-gold transition-transform group-hover:-translate-x-1" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-warm-white/50">Previous</p>
              <p className="mt-1 font-display text-lg text-warm-white md:text-xl">{prev.title}</p>
            </div>
          </Link>
          <Link
            to="/portfolio/$projectId"
            params={{ projectId: next.slug }}
            className="group relative flex items-center justify-end gap-4 bg-charcoal p-8 text-right transition-colors hover:bg-charcoal/40 md:p-12"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-warm-white/50">Next</p>
              <p className="mt-1 font-display text-lg text-warm-white md:text-xl">{next.title}</p>
            </div>
            <ArrowRight className="size-5 text-gold transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <RelatedProjects slug={project.slug} />

      {lightbox !== null && (
        <Lightbox
          images={project.gallery}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onPrev={() => setLightbox((i) => (i === null ? 0 : (i - 1 + project.gallery.length) % project.gallery.length))}
          onNext={() => setLightbox((i) => (i === null ? 0 : (i + 1) % project.gallery.length))}
        />
      )}
    </>
  );
}
