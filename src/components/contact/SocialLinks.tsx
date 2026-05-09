import { Instagram, Linkedin, Facebook, Youtube } from "lucide-react";

const links = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
];

export function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={l.label}
          className="group relative flex size-11 items-center justify-center rounded-full border border-warm-white/10 transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:bg-gold/10"
        >
          <l.icon className="size-4 text-warm-white/70 transition-colors group-hover:text-gold" strokeWidth={1.5} />
        </a>
      ))}
    </div>
  );
}
