import { useEffect, useRef, useState } from "react";

const steps = [
  { n: "01", title: "Discovery", body: "We listen. Site visits, lifestyle interviews, mood references — building the brief together." },
  { n: "02", title: "Concept", body: "Spatial planning, material palettes and a singular art direction your project will live by." },
  { n: "03", title: "Design Development", body: "Drawings, joinery details, lighting plans and FF&E schedules refined to millimetre precision." },
  { n: "04", title: "Procurement", body: "Trusted ateliers and artisans worldwide. We manage every order, lead time and logistics nuance." },
  { n: "05", title: "Build & Install", body: "On-site coordination with contractors, weekly reviews, and a calm, organised handover." },
  { n: "06", title: "Reveal", body: "Final styling, photography and a private unveiling — your space, ready to be lived in." },
];

export function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setVisible(true), io.disconnect()),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-charcoal to-charcoal/80 py-24 md:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Our process</p>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-warm-white md:text-5xl">
            Six steps,<br />
            <span className="font-serif italic text-gold-gradient">one rhythm.</span>
          </h2>
        </div>

        <ol className="relative grid gap-px md:grid-cols-2">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="group relative border-b border-warm-white/5 py-10 transition-colors hover:bg-warm-white/[0.02] md:px-10"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(20px)",
                transition: `opacity .8s ${i * 100}ms, transform .8s ${i * 100}ms`,
              }}
            >
              <div className="flex items-baseline gap-6">
                <span className="font-serif text-3xl italic text-gold/60 transition-colors group-hover:text-gold">{s.n}</span>
                <div>
                  <h3 className="font-display text-2xl text-warm-white">{s.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-warm-white/65">{s.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
