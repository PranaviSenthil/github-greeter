import { createFileRoute } from "@tanstack/react-router";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServiceCards } from "@/components/services/ServiceCards";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import { Pricing } from "@/components/services/Pricing";
import { FAQ } from "@/components/services/FAQ";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — YOUR BRAND Interior Design Studio" },
      { name: "description", content: "Full-service luxury interior design — concept, residential, commercial, bespoke joinery, art curation and final styling." },
      { property: "og:title", content: "Services — YOUR BRAND" },
      { property: "og:description", content: "Concept to install. Six-step design process trusted by clients in twelve countries." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <div className="mx-auto max-w-7xl px-6 pt-10 md:px-10">
        <PageBreadcrumb items={[{ label: "Home", to: "/" }, { label: "Services" }]} />
      </div>
      <ServiceCards />
      <ProcessTimeline />
      <Pricing />
      <FAQ />
    </main>
  );
}
