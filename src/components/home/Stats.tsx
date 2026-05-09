import { useEffect, useRef, useState } from "react";
import { Award, Building2, Globe2, Sparkles } from "lucide-react";

const stats = [
  { icon: Building2, value: 240, suffix: "+", label: "Projects delivered" },
  { icon: Award, value: 18, suffix: "", label: "Design awards" },
  { icon: Globe2, value: 12, suffix: "", label: "Countries served" },
  { icon: Sparkles, value: 98, suffix: "%", label: "Client retention" },
] as const;

function Counter({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);
  return (
    <span>
      {n}
      {suffix}
    </span>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setActive(true),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            By the Numbers
          </p>
          <h2 className="font-display text-4xl tracking-tight text-warm-white md:text-5xl">
            Twelve years of <span className="font-serif italic text-gold-gradient">quiet impact</span>.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, suffix, label }, i) => (
            <div
              key={label}
              className="glass group relative overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40"
              style={{ animation: active ? `fadeUp .8s ${i * 120}ms both` : undefined }}
            >
              <div className="absolute -right-6 -top-6 size-24 rounded-full bg-gold/10 blur-2xl transition-opacity group-hover:opacity-100" />
              <Icon className="size-7 text-gold" />
              <div className="mt-6 font-display text-5xl text-warm-white">
                <Counter value={value} suffix={suffix} active={active} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.22em] text-warm-white/55">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
