import { createFileRoute } from "@tanstack/react-router";
import { PageBreadcrumb } from "@/components/layout/PageBreadcrumb";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { SocialLinks } from "@/components/contact/SocialLinks";
import { StudioMap } from "@/components/contact/StudioMap";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Begin a Conversation with YOUR BRAND" },
      { name: "description", content: "Book a private design consultation with our Antwerp atelier. Residential, commercial and hospitality commissions worldwide." },
      { property: "og:title", content: "Contact — YOUR BRAND" },
      { property: "og:description", content: "Tell us about your space — we reply within two business days." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main>
      <ContactHero />
      <div className="mx-auto max-w-7xl px-6 pt-10 md:px-10">
        <PageBreadcrumb items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
      </div>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Enquiry</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-warm-white md:text-4xl">
              Three short steps,<br />
              <span className="font-serif italic text-gold-gradient">one conversation.</span>
            </h2>
            <p className="mt-4 max-w-lg text-warm-white/65">
              Share a little about your project. We'll reply personally within two business days
              to arrange an introductory call.
            </p>
            <div className="mt-10">
              <ContactForm />
            </div>
          </ScrollReveal>

          <ScrollReveal as="section" delay={0.15} className="space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Studio</p>
              <h3 className="mt-3 font-display text-2xl text-warm-white">Antwerp atelier</h3>
            </div>
            <ContactInfo />
            <StudioMap />
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-warm-white/50">Follow</p>
              <SocialLinks />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
