const milestones = [
  { year: "2011", title: "Founded in Antwerp", body: "A two-person studio above a bookbinder's atelier. First commission: a 60m² apartment for a poet." },
  { year: "2014", title: "First international project", body: "A Mallorca finca renovation marked our move into Mediterranean residential work." },
  { year: "2017", title: "Joinery workshop opens", body: "We began producing bespoke pieces in-house with a four-person carpentry team." },
  { year: "2020", title: "Hospitality practice", body: "Our first hotel — a 24-room boutique in Lisbon — wins Wallpaper* Design Award." },
  { year: "2023", title: "Twelve countries", body: "240+ projects delivered across Europe, the Middle East and the Americas." },
  { year: "2026", title: "The studio today", body: "An atelier of twelve, working on twenty active commissions in any given quarter." },
];

export function StoryTimeline() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 md:px-10 md:py-32">
      <div className="mb-16 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Our story</p>
        <h2 className="mt-3 font-display text-4xl tracking-tight text-warm-white md:text-5xl">
          Fifteen years, <span className="font-serif italic text-gold-gradient">one obsession.</span>
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-[7.5rem] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent md:block" />
        {milestones.map((m, i) => (
          <article
            key={m.year}
            className="group relative grid grid-cols-1 gap-6 py-8 md:grid-cols-[8rem_1fr] md:gap-12"
            style={{ animation: `fadeInLeft .9s ${i * 100}ms both` }}
          >
            <div className="font-serif text-3xl italic text-gold-gradient md:text-right">{m.year}</div>
            <div className="relative md:pl-12">
              <span className="absolute -left-1 top-3 hidden size-2.5 rounded-full bg-gold ring-4 ring-charcoal md:block" />
              <h3 className="font-display text-2xl text-warm-white">{m.title}</h3>
              <p className="mt-2 max-w-xl text-warm-white/65">{m.body}</p>
            </div>
          </article>
        ))}
      </div>
      <style>{`@keyframes fadeInLeft{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
