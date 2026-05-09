import { createFileRoute } from "@tanstack/react-router";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { AboutHero } from "@/components/about/AboutHero";
import { StoryTimeline } from "@/components/about/StoryTimeline";
import { MissionVision } from "@/components/about/MissionVision";
import { TeamGrid } from "@/components/about/TeamGrid";
import { Awards } from "@/components/about/Awards";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — YOUR BRAND Interior Design Atelier" },
      { name: "description", content: "An atelier of twelve designers crafting quiet luxury for discerning clients across twelve countries since 2011." },
      { property: "og:title", content: "About — YOUR BRAND" },
      { property: "og:description", content: "Fifteen years, one obsession. Meet the studio." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main>
      <AboutHero />
      <div className="mx-auto max-w-7xl px-6 pt-10 md:px-10">
        <PageBreadcrumb items={[{ label: "Home", to: "/" }, { label: "About" }]} />
      </div>
      <StoryTimeline />
      <MissionVision />
      <TeamGrid />
      <Awards />
    </main>
  );
}
