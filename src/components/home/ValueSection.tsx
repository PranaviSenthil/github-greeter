import { useEffect, useRef, useState } from "react";
import { Compass, Gem, Layers, Sparkle } from "lucide-react";

const values = [
  {
    icon: Compass,
    title: "Considered Direction",
    body: "Every project begins with weeks of listening — to you, the site, the light, the rhythm of how you live.",
  },
  {
    icon: Layers,
    title: "Material Honesty",
    body: "We work with stone, oak, lime, brass and linen — surfaces that age into character rather than out of fashion.",
  },
  {
    icon: Gem,
    title: "Bespoke Detail",
    body: "From cast hardware to commissioned art, the smallest objects carry the same intent as the architecture itself.",
  },
  {
    icon: Sparkle,
    title: "Cinematic Atmosphere",
    body: "Lighting designed scene by scene — morning, afternoon, dusk — so a space performs through the day.",
  },
];

export function ValueSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setActive(true),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              The Studio Philosophy
            </p>
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-warm-white md:text-5xl">
              Why interior design firms choose a{" "}
              <span className="font-serif italic text-gold-gradient">cinematic</span> presence.
            </h2>
            <p className="mt-6 max-w-md text-warm-white/65">
              An ultra-premium digital presence positions your studio in the same conversation as
              the clients you want to attract. It is the first space you design for them.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {values.map(({ icon: Icon, title, body }, i) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-warm-white/10 bg-card/50 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:bg-card"
                style={{ animation: active ? `fadeUp .8s ${i * 120}ms both` : undefined }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="grid size-12 place-items-center rounded-xl bg-gold/10 text-gold transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-6 font-display text-xl text-warm-white">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-warm-white/65">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
