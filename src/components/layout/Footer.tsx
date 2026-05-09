import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-warm-white/5 bg-[var(--gradient-luxe)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <div className="font-serif text-3xl tracking-wide text-warm-white">
            YOUR<span className="text-gold-gradient italic"> BRAND</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-warm-white/60">
            An ultra-premium interior design studio crafting cinematic spaces where architecture,
            light, and material meet quiet luxury.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Linkedin, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid size-10 place-items-center rounded-full border border-warm-white/10 text-warm-white/70 transition-all hover:border-gold hover:text-gold"
                aria-label="social"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Studio</h4>
          <ul className="mt-5 space-y-3 text-sm text-warm-white/70">
            <li><Link to="/portfolio" className="hover:text-warm-white">Portfolio</Link></li>
            <li><Link to="/services" className="hover:text-warm-white">Services</Link></li>
            <li><Link to="/about" className="hover:text-warm-white">About</Link></li>
            <li><Link to="/contact" className="hover:text-warm-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Contact</h4>
          <ul className="mt-5 space-y-3 text-sm text-warm-white/70">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 text-gold/70" />128 Maison Avenue, NY</li>
            <li className="flex items-start gap-2"><Phone className="mt-0.5 size-4 text-gold/70" />+1 (212) 555 0140</li>
            <li className="flex items-start gap-2"><Mail className="mt-0.5 size-4 text-gold/70" />studio@yourbrand.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-warm-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-warm-white/40 md:flex-row md:px-10">
          <p>© {new Date().getFullYear()} YOUR BRAND. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-warm-white/70">Privacy</a>
            <a href="#" className="hover:text-warm-white/70">Terms</a>
            <a href="#" className="hover:text-warm-white/70">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
