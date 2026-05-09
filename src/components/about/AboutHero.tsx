import teamImg from "@/assets/about-team.jpg";

export function AboutHero() {
  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
      <img
        src={teamImg}
        alt="The studio team reviewing plans at a large oak table"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ animation: "heroPan 24s ease-in-out infinite alternate" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/40 to-charcoal" />
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-7xl px-6 pb-20 md:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold" style={{ animation: "reveal .9s .1s both" }}>
            The Atelier
          </p>
          <h1
            className="font-display text-5xl tracking-tight text-warm-white md:text-7xl"
            style={{ animation: "reveal 1s .25s both" }}
          >
            A small studio,<br />
            <span className="font-serif italic text-gold-gradient">large in conviction.</span>
          </h1>
          <p
            className="mt-6 max-w-2xl text-lg text-warm-white/70"
            style={{ animation: "reveal 1s .45s both" }}
          >
            Twelve designers, one workshop, fourteen years of restraint. We design
            interiors that feel quietly inevitable.
          </p>
        </div>
      </div>
      <style>{`
        @keyframes heroPan { 0%{transform:scale(1.05)} 100%{transform:scale(1.12) translate3d(-1.5%,1%,0)} }
        @keyframes reveal { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
      `}</style>
    </section>
  );
}
