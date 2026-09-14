import type { Metadata } from "next";
import { CtaBand } from "@/components/site/CtaBand";
import { EstimateButton } from "@/components/estimate/EstimateButton";
import { PageHero } from "@/components/site/PageHero";
import { ServicesExplorer } from "@/components/site/ServicesExplorer";
import { Reveal } from "@/components/site/Motion";
import { getServices, getSettings } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Construction and subcontracting services across Southwest Florida—framing, drywall, remodeling, flooring, painting, trim, and more.",
};

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSettings()]);

  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Construction & subcontracting scopes"
        description="Skilled crews for homeowners, contractors, and general contractors—focused trades executed with accountability."
      />

      <section className="bg-white section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <p className="max-w-xl text-muted">
              From framing and drywall to remodeling, flooring, painting, and
              finish work—Ariosa provides reliable construction support across
              Southwest Florida. Choose a service to learn more—or jump
              straight into an estimate with that scope already selected.
            </p>
            <EstimateButton>
              Build custom estimate
              <ArrowUpRight className="h-4 w-4" />
            </EstimateButton>
          </Reveal>
          <ServicesExplorer services={services} />
        </div>
      </section>

      <CtaBand phone={settings.phone} title="Not sure which service fits?" />
    </>
  );
}
