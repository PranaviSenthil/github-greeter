import { ScrollReveal } from "@/components/animation/ScrollReveal";

export function MissionVision() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <div className="grid gap-px bg-warm-white/5 md:grid-cols-2">
        <ScrollReveal className="bg-charcoal p-10 md:p-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Mission</p>
          <p className="mt-8 font-serif text-3xl leading-[1.15] tracking-tight text-warm-white md:text-4xl">
            To craft interiors that <em className="text-gold-gradient">outlast trend</em> — rooms whose
            beauty deepens with use, season, and time.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.15} className="bg-charcoal p-10 md:p-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Vision</p>
          <p className="mt-8 font-serif text-3xl leading-[1.15] tracking-tight text-warm-white md:text-4xl">
            To be the studio our clients return to <em className="text-gold-gradient">a second time</em> —
            for the next home, the next chapter.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
