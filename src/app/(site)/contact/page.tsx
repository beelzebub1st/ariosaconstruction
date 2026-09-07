import type { Metadata } from "next";
import { ArrowUpRight, MapPin, MessageSquareText } from "lucide-react";
import { ContactDirect } from "@/components/site/ContactDirect";
import { EstimateButton } from "@/components/estimate/EstimateButton";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, AnimatedLine } from "@/components/site/Motion";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Ariosa & Constructions LLC or request a free estimate. Call or text (786) 786-5837.",
};

export default async function ContactPage() {
  const settings = await getSettings();
  const mapSrc =
    settings.mapEmbedUrl ||
    `https://maps.google.com/maps?q=${encodeURIComponent(settings.address || settings.serviceArea)}&t=&z=11&ie=UTF8&iwloc=&output=embed`;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Two ways in. Zero waiting around."
        description={`Call or text for the fastest reply—or open the estimate wizard and walk us through your project. Serving ${settings.serviceArea}.`}
      />

      <section className="bg-white section-pad">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-6">
          <Reveal>
            <div className="flex h-full flex-col border border-navy/10 bg-stone p-8 sm:p-10">
              <MessageSquareText className="h-8 w-8 text-brick" />
              <h2 className="mt-6 font-display text-3xl font-extrabold text-navy">
                Guided estimate
              </h2>
              <AnimatedLine className="mt-5 w-24" />
              <p className="mt-5 flex-1 text-sm leading-relaxed text-muted sm:text-[15px]">
                A short multi-step flow: who you are, which services you need,
                project details, and how to reach you. Usually under a minute.
              </p>
              <EstimateButton className="mt-8 w-full sm:w-auto" size="lg">
                Open estimate wizard
                <ArrowUpRight className="h-4 w-4" />
              </EstimateButton>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col border border-navy/10 bg-navy-dark p-8 text-white sm:p-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
                Direct line
              </p>
              <h2 className="mt-4 font-display text-3xl font-extrabold">
                Prefer to talk now?
              </h2>
              <p className="mt-4 text-sm text-white/65">
                Call or text {settings.phone}. Email works too.
              </p>
              <div className="mt-8 flex-1">
                <ContactDirect phone={settings.phone} email={settings.email} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="texture-stone pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Service area</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-navy">
                Find us on the map
              </h2>
            </div>
            <p className="inline-flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4 text-brick" />
              {settings.address} · {settings.serviceArea}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="overflow-hidden border border-navy/10 bg-white shadow-[0_30px_60px_-40px_rgba(12,24,41,0.45)]">
              <iframe
                title="Ariosa & Constructions service area map"
                src={mapSrc}
                className="h-[360px] w-full border-0 sm:h-[440px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
