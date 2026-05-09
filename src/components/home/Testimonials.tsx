import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import c1 from "@/assets/client-1.jpg";
import c2 from "@/assets/client-2.jpg";
import c3 from "@/assets/client-3.jpg";

const items = [
  {
    quote:
      "They translated a feeling we couldn't articulate into a home that finally feels like ours. Every material choice has intention.",
    name: "Eloise Marchetti",
    role: "Private Residence, Tribeca",
    photo: c1,
  },
  {
    quote:
      "The studio approached our hotel as a piece of cinema. Guests don't just stay — they remember.",
    name: "Henrik Lauridsen",
    role: "Hospitality Group, Copenhagen",
    photo: c2,
  },
  {
    quote:
      "Restrained, considered and quietly confident. The result is a home that ages beautifully with us.",
    name: "Sienna Park",
    role: "Family Residence, Los Angeles",
    photo: c3,
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  

  return (
    <section
      className="relative py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          Voices of our Clients
        </p>
        <h2 className="font-display text-4xl tracking-tight text-warm-white md:text-5xl">
          Trusted by those who <span className="font-serif italic text-gold-gradient">notice</span>.
        </h2>

        <div className="relative mt-16 min-h-[360px]">
          {items.map((it, idx) => (
            <article
              key={it.name}
              className={`absolute inset-0 flex flex-col items-center transition-all duration-1000 ease-out ${
                idx === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
              }`}
            >
              <Quote className="size-8 text-gold/60" />
              <p className="mt-6 max-w-3xl font-serif text-2xl leading-relaxed text-warm-white md:text-3xl">
                &ldquo;{it.quote}&rdquo;
              </p>
              <div className="mt-10 flex flex-col items-center gap-3">
                <img
                  src={it.photo}
                  alt={it.name}
                  width={64}
                  height={64}
                  loading="lazy"
                  className="size-16 rounded-full border border-gold/30 object-cover"
                />
                <div className="font-display text-base text-warm-white">{it.name}</div>
                <div className="text-xs uppercase tracking-[0.22em] text-warm-white/50">
                  {it.role}
                </div>
              </div>
              
            </article>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            aria-label="Previous"
            onClick={() => setI((v) => (v - 1 + items.length) % items.length)}
            className="grid size-11 place-items-center rounded-full border border-warm-white/20 text-warm-white/70 transition-all hover:border-gold hover:text-gold"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex items-center gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Show testimonial ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-px transition-all duration-500 ${
                  idx === i ? "w-12 bg-gold" : "w-6 bg-warm-white/25"
                }`}
              />
            ))}
          </div>
          <button
            aria-label="Next"
            onClick={() => setI((v) => (v + 1) % items.length)}
            className="grid size-11 place-items-center rounded-full border border-warm-white/20 text-warm-white/70 transition-all hover:border-gold hover:text-gold"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
