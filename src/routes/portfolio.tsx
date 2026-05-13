import { createFileRoute } from "@tanstack/react-router";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — YOUR BRAND" },
      { name: "description", content: "Selected works from our luxury interior design studio: residential, commercial, and hospitality projects." },
      { property: "og:title", content: "Portfolio — YOUR BRAND" },
      { property: "og:description", content: "A curated archive of our cinematic interior projects." },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <div className="overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-40 md:px-10">
        <PageBreadcrumb items={[{ label: "Home", to: "/" }, { label: "Portfolio" }]} />
        <h1 className="mt-8 max-w-3xl font-display text-5xl tracking-tight text-warm-white md:text-7xl">
          Selected <span className="font-serif italic text-gold-gradient">Works</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-warm-white/70">
          A growing archive of residences, retreats, and commercial environments designed with material restraint and cinematic atmosphere.
        </p>
      </div>

      <div className="pb-32">
        <PortfolioGrid />
      </div>
    </div>
  );
}
