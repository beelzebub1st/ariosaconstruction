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
    "General contracting, remodeling, kitchen & bath, additions, concrete, and commercial tenant improvements.",
};

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServices(), getSettings()]);

  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Services with a point of view"
        description="Not a menu of everything. A focused set of builds we execute with accountability."
      />

      <section className="bg-white section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <p className="max-w-xl text-muted">
              Choose a service to learn more—or jump straight into an estimate with
              that scope already selected.
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
