import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import c1 from "@/assets/client-1.jpg";
import c2 from "@/assets/client-2.jpg";
import c3 from "@/assets/client-3.jpg";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

const items = [
  {
    quote:
      "They translated a feeling we couldn't articulate into a home that finally feels like ours. Every material choice has intention.",
    name: "Eloise Marchetti",
    role: "Private Residence",
    location: "Tribeca, NY",
    photo: c1,
    stars: 5,
  },
  {
    quote:
      "The studio approached our hotel as a piece of cinema. Guests don't just stay — they remember.",
    name: "Henrik Lauridsen",
    role: "Hospitality Group",
    location: "Copenhagen, DK",
    photo: c2,
    stars: 5,
  },
  {
    quote:
      "Restrained, considered and quietly confident. The result is a home that ages beautifully with us.",
    name: "Sienna Park",
    role: "Family Residence",
    location: "Los Angeles, CA",
    photo: c3,
    stars: 5,
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setDir(1);
      setI((v) => (v + 1) % items.length);
    }, 6000);
    return () => clearInterval(id);
  }, [paused]);

  const go = (next: number) => {
    setDir(next > i || (i === items.length - 1 && next === 0) ? 1 : -1);
    setI(next);
  };

  const it = items[i];

  return (
    <section
      className="relative py-32 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[600px] rounded-full bg-gold/4 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
        <ScrollReveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Voices of our Clients
          </p>
          <h2 className="font-display text-4xl tracking-tight text-warm-white md:text-5xl">
            Trusted by those who <span className="font-serif italic text-gold-gradient">notice</span>.
          </h2>
        </ScrollReveal>

        <div className="relative mt-16 min-h-[340px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.article
              key={i}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="flex flex-col items-center"
            >
              {/* stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: it.stars }).map((_, s) => (
                  <Star key={s} className="size-4 fill-gold text-gold" />
                ))}
              </div>

              <Quote className="size-8 text-gold/50" />

              <p className="mt-6 max-w-3xl font-serif text-2xl leading-relaxed text-warm-white md:text-3xl">
                &ldquo;{it.quote}&rdquo;
              </p>

              <div className="mt-10 flex flex-col items-center gap-3">
                <div className="relative">
                  <img
                    src={it.photo}
                    alt={it.name}
                    width={72}
                    height={72}
                    loading="lazy"
                    className="size-18 rounded-full border-2 border-gold/30 object-cover"
                  />
                  <div className="absolute inset-0 rounded-full ring-1 ring-gold/20 ring-offset-2 ring-offset-background" />
                </div>
                <div className="font-display text-base text-warm-white mt-1">{it.name}</div>
                <div className="text-xs text-warm-white/45 uppercase tracking-[0.22em]">
                  {it.role} · {it.location}
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        {/* controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            aria-label="Previous"
            onClick={() => go((i - 1 + items.length) % items.length)}
            className="grid size-11 place-items-center rounded-full border border-warm-white/15 text-warm-white/60 transition-all hover:border-gold hover:text-gold hover:scale-105"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex items-center gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Show testimonial ${idx + 1}`}
                onClick={() => go(idx)}
                className={`rounded-full transition-all duration-500 ${
                  idx === i ? "w-8 h-1.5 bg-gold" : "w-1.5 h-1.5 bg-warm-white/25 hover:bg-warm-white/50"
                }`}
              />
            ))}
          </div>

          <button
            aria-label="Next"
            onClick={() => go((i + 1) % items.length)}
            className="grid size-11 place-items-center rounded-full border border-warm-white/15 text-warm-white/60 transition-all hover:border-gold hover:text-gold hover:scale-105"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
