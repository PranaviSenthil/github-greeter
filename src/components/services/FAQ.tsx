import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

const faqs = [
  { q: "What is the typical project timeline?", a: "Residential projects span 9–18 months from brief to install. Commercial and hospitality work typically runs 12–24 months. We provide a detailed schedule after the discovery phase." },
  { q: "Do you take on projects internationally?", a: "Yes. We work across Europe, the Middle East and the Americas, with a network of trusted contractors and ateliers in each region." },
  { q: "How do fees work?", a: "We propose a fixed design fee for full-service projects, plus a transparent procurement model. Fees are tailored to scope and disclosed in writing before engagement." },
  { q: "Can you work with my architect?", a: "Absolutely. We collaborate frequently with leading architecture studios, integrating into the design team early for the strongest result." },
  { q: "What happens after the install?", a: "Every project includes a snag period and a one-year aftercare review — we want the space to live as well in year five as it does on day one." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 md:px-10 md:py-32">
      <ScrollReveal className="mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">FAQ</p>
        <h2 className="mt-3 font-display text-4xl tracking-tight text-warm-white md:text-5xl">
          Questions, <span className="font-serif italic text-gold-gradient">answered.</span>
        </h2>
      </ScrollReveal>
      <div className="divide-y divide-warm-white/5 border-y border-warm-white/5">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-gold"
                aria-expanded={isOpen}
              >
                <span className="font-display text-lg text-warm-white md:text-xl">{f.q}</span>
                <Plus
                  className={cn(
                    "size-5 shrink-0 text-gold transition-transform duration-500",
                    isOpen && "rotate-45",
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid overflow-hidden transition-all duration-500",
                  isOpen ? "grid-rows-[1fr] pb-8" : "grid-rows-[0fr]",
                )}
              >
                <div className="min-h-0">
                  <p className="max-w-2xl pr-12 text-warm-white/65">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
