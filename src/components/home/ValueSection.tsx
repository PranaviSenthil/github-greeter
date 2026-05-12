import { Compass, Gem, Layers, Sparkle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ScrollReveal, ScrollStagger } from "@/components/animation/ScrollReveal";

const values = [
  {
    icon: Compass,
    title: "Considered Direction",
    body: "Every project begins with weeks of listening — to you, the site, the light, the rhythm of how you live.",
    accent: "from-blue-500/10 to-transparent",
  },
  {
    icon: Layers,
    title: "Material Honesty",
    body: "We work with stone, oak, lime, brass and linen — surfaces that age into character rather than out of fashion.",
    accent: "from-amber-500/10 to-transparent",
  },
  {
    icon: Gem,
    title: "Bespoke Detail",
    body: "From cast hardware to commissioned art, the smallest objects carry the same intent as the architecture itself.",
    accent: "from-emerald-500/10 to-transparent",
  },
  {
    icon: Sparkle,
    title: "Cinematic Atmosphere",
    body: "Lighting designed scene by scene — morning, afternoon, dusk — so a space performs through the day.",
    accent: "from-purple-500/10 to-transparent",
  },
];

export function ValueSection() {
  const reduce = useReducedMotion();
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-12">
          <ScrollReveal className="lg:col-span-5">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              The Studio Philosophy
            </p>
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-warm-white md:text-5xl">
              Why every decision matters — from{" "}
              <span className="font-serif italic text-gold-gradient">first sketch</span> to final detail.
            </h2>
            <p className="mt-6 max-w-md text-warm-white/60 leading-relaxed">
              Ultra-premium design is not about excess. It is about restraint applied with absolute
              intention — where every surface, every joint, every shadow is deliberate.
            </p>

            <div className="mt-10 h-px w-16 bg-gold/50" />

            <p className="mt-6 text-sm text-warm-white/45 italic">
              "We design for how you feel, not just how it looks."
            </p>
          </ScrollReveal>

          <ScrollStagger className="grid gap-5 sm:grid-cols-2 lg:col-span-7" stagger={0.1}>
            {values.map(({ icon: Icon, title, body, accent }) => (
              <motion.div
                key={title}
                variants={{
                  hidden: { opacity: 0, y: reduce ? 0 : 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
                  },
                }}
                className="group relative overflow-hidden rounded-2xl border border-warm-white/8 bg-card/40 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:bg-card/70"
              >
                {/* top shimmer on hover */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {/* corner glow */}
                <div className={`absolute -right-8 -top-8 size-28 rounded-full bg-gradient-to-br ${accent} blur-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100`} />

                <div className="grid size-11 place-items-center rounded-xl border border-gold/20 bg-gold/8 text-gold transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:border-gold/40 group-hover:bg-gold/15">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 font-display text-lg text-warm-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-warm-white/60">{body}</p>
              </motion.div>
            ))}
          </ScrollStagger>
        </div>
      </div>
    </section>
  );
}
