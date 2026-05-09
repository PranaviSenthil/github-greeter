import { Compass, Home, Building2, Sparkles, Sofa, Palette } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal, ScrollStagger } from "@/components/animation/ScrollReveal";

const services = [
  { icon: Compass, title: "Concept & Direction", body: "Strategic art direction translating your vision into a coherent design language.", from: "Discovery" },
  { icon: Home, title: "Residential Design", body: "Private homes, penthouses, villas — interiors crafted around how you live.", from: "Per project" },
  { icon: Building2, title: "Commercial & Hospitality", body: "Hotels, restaurants and offices that perform aesthetically and operationally.", from: "On request" },
  { icon: Sofa, title: "Furniture & Joinery", body: "Bespoke pieces designed and manufactured by our atelier partners.", from: "Bespoke" },
  { icon: Palette, title: "Art & Material Curation", body: "Sourcing one-of-a-kind objects, art and finishes that anchor each room.", from: "Curated" },
  { icon: Sparkles, title: "Final Styling", body: "The last 5% — lighting tune, fragrance, soft goods — the things you feel.", from: "Included" },
];

export function ServiceCards() {
  const reduce = useReducedMotion();
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
      <ScrollReveal className="mb-14 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">What we do</p>
        <h2 className="mt-3 font-display text-4xl tracking-tight text-warm-white md:text-5xl">
          A complete design <span className="font-serif italic text-gold-gradient">practice</span>
        </h2>
      </ScrollReveal>
      <ScrollStagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <motion.article
            key={s.title}
            variants={{
              hidden: { opacity: 0, y: reduce ? 0 : 24, filter: reduce ? "none" : "blur(6px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } },
            }}
            whileHover={reduce ? {} : { y: -6 }}
            className="glass group relative overflow-hidden rounded-2xl p-8 transition-colors duration-500 hover:border-gold/30"
          >
            <div className="absolute -right-12 -top-12 size-40 rounded-full bg-gold/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
            <s.icon className="size-7 text-gold" strokeWidth={1.4} />
            <h3 className="mt-6 font-display text-xl text-warm-white">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-warm-white/70">{s.body}</p>
            <div className="mt-8 flex items-center justify-between border-t border-warm-white/5 pt-5 text-xs uppercase tracking-[0.2em]">
              <span className="text-warm-white/50">{s.from}</span>
              <span className="text-gold transition-transform duration-300 group-hover:translate-x-1">→</span>
            </div>
          </motion.article>
        ))}
      </ScrollStagger>
    </section>
  );
}
