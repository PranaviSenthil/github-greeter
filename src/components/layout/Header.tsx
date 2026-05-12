import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(100, (y / h) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass-strong shadow-[0_1px_0_oklch(1_0_0/5%)]" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
        <Link to="/" className="group flex items-center gap-2">
          <span className="font-serif text-2xl tracking-wide text-warm-white transition-opacity group-hover:opacity-80">
            YOUR<span className="text-gold-gradient italic"> BRAND</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="group relative text-[13px] font-medium uppercase tracking-[0.18em] text-warm-white/70 transition-colors hover:text-warm-white"
              activeProps={{ className: "text-warm-white" }}
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full data-[status=active]:w-full" />
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden rounded-full border border-gold/40 bg-gold/10 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold hover:text-charcoal hover:shadow-[0_8px_30px_-8px_oklch(0.78_0.13_85/0.4)] md:inline-block"
        >
          Book Consultation
        </Link>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-warm-white"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* scroll progress bar */}
      <div className="h-px w-full bg-warm-white/5">
        <div
          className="h-full bg-gradient-to-r from-gold/60 via-gold to-gold/60 transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* mobile menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-[81px] origin-top overflow-hidden transition-all duration-500 md:hidden",
          open ? "max-h-[80vh]" : "max-h-0",
        )}
      >
        <div className="glass-strong border-t border-warm-white/5 px-6 py-8">
          <nav className="flex flex-col gap-1">
            {navLinks.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="border-b border-warm-white/5 py-4 font-display text-2xl tracking-wide text-warm-white/90 transition-colors hover:text-gold"
                activeProps={{ className: "text-gold" }}
                style={open ? { animation: `fadeUp .5s ${i * 60}ms both` } : { opacity: 0 }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/contact"
            className="mt-8 inline-block rounded-full bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition-all hover:shadow-[0_8px_30px_-8px_oklch(0.78_0.13_85/0.5)]"
          >
            Book Consultation
          </Link>
        </div>
      </div>
    </header>
  );
}
