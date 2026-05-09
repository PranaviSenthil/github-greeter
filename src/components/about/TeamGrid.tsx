const team = [
  { name: "Elena Marchetti", role: "Founder, Creative Director", initials: "EM" },
  { name: "Tomás Reverdy", role: "Principal Designer", initials: "TR" },
  { name: "Aiko Tanaka", role: "Head of Joinery", initials: "AT" },
  { name: "Idris Nouri", role: "Project Director", initials: "IN" },
  { name: "Margot Vance", role: "Materials & Curation", initials: "MV" },
  { name: "Lukas Bremer", role: "Lighting Design", initials: "LB" },
];

export function TeamGrid() {
  return (
    <section className="bg-gradient-to-b from-charcoal to-charcoal/80 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-14 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">The team</p>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-warm-white md:text-5xl">
            People behind <span className="font-serif italic text-gold-gradient">the work.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((t, i) => (
            <article
              key={t.name}
              className="glass group relative overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/30"
              style={{ animation: `fadeUp .8s ${i * 80}ms both` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex size-20 items-center justify-center rounded-full border border-gold/30 bg-gold/5 font-serif text-2xl italic text-gold-gradient transition-transform duration-500 group-hover:scale-110">
                {t.initials}
              </div>
              <h3 className="relative mt-6 font-display text-xl text-warm-white">{t.name}</h3>
              <p className="relative mt-1 text-sm uppercase tracking-[0.2em] text-warm-white/55">{t.role}</p>
            </article>
          ))}
        </div>
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
