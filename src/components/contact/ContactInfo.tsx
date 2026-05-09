import { Mail, Phone, MapPin, Clock } from "lucide-react";

const cards = [
  { icon: Mail, label: "Email", value: "studio@yourbrand.com", href: "mailto:studio@yourbrand.com" },
  { icon: Phone, label: "Phone", value: "+32 3 555 01 84", href: "tel:+3235550184" },
  { icon: MapPin, label: "Studio", value: "Wolstraat 12, 2000 Antwerp, BE" },
  { icon: Clock, label: "Hours", value: "Mon — Fri · 09:00 — 18:00 CET" },
];

export function ContactInfo() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {cards.map((c) => {
        const inner = (
          <>
            <c.icon className="size-5 text-gold" strokeWidth={1.5} />
            <div className="mt-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-warm-white/50">{c.label}</p>
              <p className="mt-1 text-sm text-warm-white">{c.value}</p>
            </div>
          </>
        );
        const cls = "glass group block rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/30";
        return c.href ? (
          <a key={c.label} href={c.href} className={cls}>{inner}</a>
        ) : (
          <div key={c.label} className={cls}>{inner}</div>
        );
      })}
    </div>
  );
}
