import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollReveal, ScrollStagger } from "@/components/animation/ScrollReveal";
import { MagneticButton } from "@/components/animation/MagneticButton";

const tiers = [
  {
    name: "Consultation",
    from: "From €4,800",
    desc: "A focused engagement for direction, palettes and styling guidance.",
    features: ["Half-day site visit", "Material direction", "Concept moodboard", "Sourcing shortlist"],
    cta: "Book consultation",
    featured: false,
  },
  {
    name: "Signature",
    from: "From €85,000",
    desc: "Our flagship full-service offering — single residence or floor.",
    features: ["Full design development", "Joinery & lighting", "FF&E procurement", "On-site supervision", "Final styling & reveal"],
    cta: "Begin a project",
    featured: true,
  },
  {
    name: "Atelier",
    from: "On request",
    desc: "Multi-property, hospitality and large-scale commercial commissions.",
    features: ["Bespoke team allocation", "International logistics", "Architect collaboration", "Phased delivery", "Aftercare program"],
    cta: "Discuss scope",
    featured: false,
  },
];

export function Pricing() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-gradient-to-b from-charcoal/80 to-charcoal py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <ScrollReveal className="mb-14 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Engagement tiers</p>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-warm-white md:text-5xl">
            Three ways to <span className="font-serif italic text-gold-gradient">work together</span>
          </h2>
        </ScrollReveal>
        <ScrollStagger className="grid grid-cols-1 gap-6 lg:grid-cols-3" stagger={0.12}>
          {tiers.map((t) => (
            <motion.div
              key={t.name}
              variants={{
                hidden: { opacity: 0, y: reduce ? 0 : 28, filter: reduce ? "none" : "blur(6px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } },
              }}
              whileHover={reduce ? {} : { y: -6 }}
              className={cn(
                "glass group relative flex flex-col rounded-2xl p-8 transition-colors duration-500",
                t.featured && "border-gold/30 shadow-[0_30px_80px_-30px_oklch(0.78_0.13_85/0.25)]",
              )}
            >
              {t.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal">
                  Most chosen
                </span>
              )}
              <h3 className="font-display text-2xl text-warm-white">{t.name}</h3>
              <p className="mt-2 font-serif text-3xl italic text-gold-gradient">{t.from}</p>
              <p className="mt-4 text-sm text-warm-white/65">{t.desc}</p>
              <ul className="mt-8 flex-1 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-warm-white/80">
                    <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <MagneticButton className="mt-10 self-start" strength={0.25}>
                <Link
                  to="/contact"
                  className={cn(
                    "inline-flex items-center justify-center rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-colors",
                    t.featured
                      ? "bg-gold text-charcoal hover:bg-gold-soft"
                      : "border border-gold/40 text-gold hover:bg-gold hover:text-charcoal",
                  )}
                >
                  {t.cta}
                </Link>
              </MagneticButton>
            </motion.div>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}
