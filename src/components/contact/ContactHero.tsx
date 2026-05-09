import contactImg from "@/assets/contact-hero.jpg";

export function ContactHero() {
  return (
    <section className="relative h-[60vh] min-h-[480px] w-full overflow-hidden">
      <img
        src={contactImg}
        alt="Studio reception with floor-to-ceiling windows at dusk"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ animation: "heroPan 24s ease-in-out infinite alternate" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/40 to-charcoal" />
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-7xl px-6 pb-16 md:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold" style={{ animation: "reveal .9s .1s both" }}>
            Begin a conversation
          </p>
          <h1
            className="font-display text-5xl tracking-tight text-warm-white md:text-7xl"
            style={{ animation: "reveal 1s .25s both" }}
          >
            Tell us about<br />
            <span className="font-serif italic text-gold-gradient">your space.</span>
          </h1>
        </div>
      </div>
      <style>{`
        @keyframes heroPan { 0%{transform:scale(1.05)} 100%{transform:scale(1.12) translate3d(-1.5%,1%,0)} }
        @keyframes reveal { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
      `}</style>
    </section>
  );
}
