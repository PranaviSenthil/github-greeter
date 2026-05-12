const items = [
  "Award-Winning Studio",
  "Est. MMXII",
  "240+ Projects Delivered",
  "18 Design Awards",
  "12 Countries",
  "98% Client Retention",
  "Residential · Commercial · Luxury",
  "Cinematic Interiors",
];

export function Marquee() {
  const repeated = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-warm-white/8 bg-charcoal py-5">
      <div
        className="flex w-max gap-0"
        style={{ animation: "marquee 32s linear infinite" }}
      >
        {repeated.map((text, i) => (
          <span key={i} className="flex items-center gap-0">
            <span className="whitespace-nowrap px-8 text-[11px] font-semibold uppercase tracking-[0.35em] text-warm-white/50">
              {text}
            </span>
            <span className="text-gold/50 text-lg leading-none">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
