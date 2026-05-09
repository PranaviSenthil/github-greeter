import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowDown } from "lucide-react";
import heroImg from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Cinematic luxury living room at golden hour"
          width={1920}
          height={1080}
          className="h-full w-full scale-110 object-cover animate-[heroPan_20s_ease-out_forwards]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/40" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_30%_40%,oklch(0.78_0.13_85/0.18),transparent_70%)]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 pt-40 pb-32 md:px-10">
        <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-gold opacity-0 animate-[fadeUp_.8s_.1s_forwards]">
          <span className="h-px w-10 bg-gold" />
          Est. MMXII · Interior Design Atelier
        </p>

        <h1 className="font-display text-5xl leading-[0.95] tracking-tight text-warm-white md:text-7xl lg:text-[6.5rem]">
          <span className="block overflow-hidden">
            <span className="block translate-y-full opacity-0 animate-[reveal_1.1s_.2s_cubic-bezier(.2,.8,.2,1)_forwards]">
              Spaces that
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="block translate-y-full opacity-0 animate-[reveal_1.1s_.45s_cubic-bezier(.2,.8,.2,1)_forwards]">
              <span className="font-serif italic text-gold-gradient">whisper</span> luxury.
            </span>
          </span>
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-warm-white/70 opacity-0 animate-[fadeUp_.8s_.9s_forwards]">
          A cinematic interior design studio shaping residences, hospitality and bespoke
          environments for those who demand quiet, considered beauty.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4 opacity-0 animate-[fadeUp_.8s_1.1s_forwards]">
          <Link
            to="/portfolio"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-charcoal transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-20px_oklch(0.78_0.13_85/0.6)]"
          >
            <span className="relative z-10">Explore Portfolio</span>
            <ArrowRight className="relative z-10 size-4 transition-transform group-hover:translate-x-1" />
            <span className="absolute inset-0 -translate-x-full bg-warm-white transition-transform duration-700 group-hover:translate-x-0" />
          </Link>
          <Link
            to="/contact"
            className="rounded-full border border-warm-white/25 px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-warm-white/90 transition-colors hover:border-gold hover:text-gold"
          >
            Book Consultation
          </Link>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 opacity-0 animate-[fadeUp_.8s_1.4s_forwards]">
        <span className="text-[10px] uppercase tracking-[0.4em] text-warm-white/50">Scroll</span>
        <ArrowDown className="size-4 animate-bounce text-gold" />
      </div>

      <style>{`
        @keyframes heroPan {
          from { transform: scale(1.18) translateY(2%); }
          to { transform: scale(1.05) translateY(0); }
        }
        @keyframes reveal {
          from { transform: translateY(110%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: none; opacity: 1; }
        }
      `}</style>
    </section>
  );
}
