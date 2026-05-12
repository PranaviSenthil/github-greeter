import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays } from "lucide-react";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-40">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[800px] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      {/* top border line */}
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-20" />
      </div>

      <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
        <ScrollReveal>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-gold">
            Begin Here
          </p>
          <h2 className="font-display text-5xl leading-[1.0] tracking-tight text-warm-white md:text-6xl lg:text-7xl">
            Every great space begins with{" "}
            <span className="font-serif italic text-gold-gradient">one conversation</span>.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-warm-white/60">
            Tell us what you're imagining. We'll show you what's possible. No obligation — just a
            quiet, considered dialogue about the space you deserve.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gold px-10 py-5 text-xs font-semibold uppercase tracking-[0.25em] text-charcoal transition-all duration-300 hover:shadow-[0_20px_60px_-20px_oklch(0.78_0.13_85/0.6)]"
            >
              <CalendarDays className="size-4" />
              <span>Book a Consultation</span>
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute inset-0 -translate-x-full bg-warm-white transition-transform duration-700 group-hover:translate-x-0" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-warm-white/20 px-10 py-5 text-xs font-semibold uppercase tracking-[0.25em] text-warm-white/80 transition-all duration-300 hover:border-gold/50 hover:text-gold"
            >
              View Our Services
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-10 text-warm-white/40">
            {[
              { value: "240+", label: "Projects" },
              { value: "18", label: "Awards" },
              { value: "12", label: "Countries" },
              { value: "98%", label: "Retention" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-display text-2xl text-gold">{value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.25em]">{label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent mt-20" />
      </div>
    </section>
  );
}
