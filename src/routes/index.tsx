import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";
import { ValueSection } from "@/components/home/ValueSection";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YOUR BRAND — Cinematic Interior Design Studio" },
      {
        name: "description",
        content:
          "An ultra-premium interior design studio crafting cinematic, transformative spaces for discerning clients.",
      },
      { property: "og:title", content: "YOUR BRAND — Cinematic Interior Design Studio" },
      {
        property: "og:description",
        content: "Cinematic interiors crafted by an award-winning luxury design studio.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <BeforeAfter />
      <PortfolioPreview />
      <Stats />
      <Testimonials />
      <ValueSection />
    </>
  );
}
