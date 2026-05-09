import { Award } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal, ScrollStagger } from "@/components/animation/ScrollReveal";

const awards = [
  { year: "2025", title: "AD100", org: "Architectural Digest" },
  { year: "2024", title: "Wallpaper* Design Award", org: "Best Residential" },
  { year: "2024", title: "ELLE Decor A-List", org: "International Edition" },
  { year: "2023", title: "Dezeen Awards Shortlist", org: "Hotel Interior" },
  { year: "2022", title: "Frame Awards", org: "Hospitality Space" },
  { year: "2021", title: "House & Garden Top 100", org: "Designers" },
];

export function Awards() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-charcoal/80 py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <ScrollReveal className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Recognition</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-warm-white md:text-4xl">
              Awards & <span className="font-serif italic text-gold-gradient">press.</span>
            </h2>
          </div>
          <Award className="size-10 text-gold/40" strokeWidth={1.2} />
        </ScrollReveal>
        <ScrollStagger as="ul" className="grid grid-cols-1 gap-px bg-warm-white/5 md:grid-cols-3" stagger={0.06}>
          {awards.map((a) => (
            <motion.li
              key={a.year + a.title}
              variants={{
                hidden: { opacity: 0, y: reduce ? 0 : 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="group bg-charcoal p-8 transition-colors hover:bg-warm-white/[0.02]"
            >
              <p className="font-serif text-2xl italic text-gold-gradient">{a.year}</p>
              <p className="mt-2 font-display text-lg text-warm-white">{a.title}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-warm-white/55">{a.org}</p>
            </motion.li>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}
