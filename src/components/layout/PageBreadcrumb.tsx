import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  to?: string;
}

export function PageBreadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-warm-white/50">
      {items.map((c, i) => (
        <span key={i} className="flex items-center gap-2">
          {c.to ? (
            <Link to={c.to} className="transition-colors hover:text-gold">{c.label}</Link>
          ) : (
            <span className="text-warm-white/80">{c.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight className="size-3 text-warm-white/30" />}
        </span>
      ))}
    </nav>
  );
}
