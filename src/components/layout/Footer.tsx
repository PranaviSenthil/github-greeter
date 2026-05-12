import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Facebook, Twitter, Mail, MapPin, Phone, ArrowRight } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="relative border-t border-warm-white/5 bg-[oklch(0.12_0.004_60)]">
      {/* top glow accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">

          {/* Brand + Newsletter */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block">
              <div className="font-serif text-3xl tracking-wide text-warm-white">
                YOUR<span className="text-gold-gradient italic"> BRAND</span>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-warm-white/55">
              An ultra-premium interior design studio crafting cinematic spaces where architecture,
              light, and material meet quiet luxury.
            </p>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold mb-3">
                Studio Journal
              </p>
              <p className="text-xs text-warm-white/45 mb-4">
                Quiet updates on new work, material discoveries, and studio notes.
              </p>
              {submitted ? (
                <p className="text-sm text-gold animate-[fadeIn_.5s_forwards]">
                  Thank you — we'll be in touch quietly.
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 rounded-full border border-warm-white/15 bg-warm-white/5 px-5 py-3 text-xs text-warm-white placeholder:text-warm-white/30 outline-none focus:border-gold/50 transition-colors"
                  />
                  <button
                    type="submit"
                    className="grid size-11 shrink-0 place-items-center rounded-full bg-gold text-charcoal transition-all hover:scale-105 hover:shadow-[0_8px_30px_-8px_oklch(0.78_0.13_85/0.5)]"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="size-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Socials */}
            <div className="mt-8 flex gap-3">
              {[Instagram, Linkedin, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid size-10 place-items-center rounded-full border border-warm-white/10 text-warm-white/60 transition-all hover:border-gold hover:text-gold hover:scale-105"
                  aria-label="social"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Studio Nav */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Studio</h4>
            <ul className="mt-5 space-y-3 text-sm text-warm-white/60">
              {[
                { to: "/portfolio", label: "Portfolio" },
                { to: "/services", label: "Services" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="group inline-flex items-center gap-1.5 hover:text-warm-white transition-colors">
                    <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-4" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Nav */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Services</h4>
            <ul className="mt-5 space-y-3 text-sm text-warm-white/60">
              {["Residential", "Hospitality", "Commercial", "Bespoke Objects"].map((s) => (
                <li key={s}>
                  <Link to="/services" className="group inline-flex items-center gap-1.5 hover:text-warm-white transition-colors">
                    <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-4" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Visit Us</h4>
            <ul className="mt-5 space-y-4 text-sm text-warm-white/60">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold/60" />
                <span>128 Maison Avenue<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-gold/60" />
                <a href="tel:+12125550140" className="hover:text-warm-white transition-colors">+1 (212) 555 0140</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-gold/60" />
                <a href="mailto:studio@yourbrand.com" className="hover:text-warm-white transition-colors">studio@yourbrand.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-warm-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-warm-white/35 md:flex-row md:px-10">
          <p>© {new Date().getFullYear()} YOUR BRAND. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-warm-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-warm-white/60 transition-colors">Terms</a>
            <a href="#" className="hover:text-warm-white/60 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
