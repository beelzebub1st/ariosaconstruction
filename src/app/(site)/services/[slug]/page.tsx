import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { CtaBand } from "@/components/site/CtaBand";
import { EstimateButton } from "@/components/estimate/EstimateButton";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, AnimatedLine } from "@/components/site/Motion";
import { getServiceBySlug, getServices, getSettings } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service" };
  return { title: service.title, description: service.summary };
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const [service, settings] = await Promise.all([
    getServiceBySlug(slug),
    getSettings(),
  ]);
  if (!service) notFound();

  return (
    <>
      <PageHero eyebrow="Service" title={service.title} description={service.summary} />

      <section className="bg-white section-pad">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            {service.imageUrl ? (
              <div className="relative mb-8 aspect-[16/10] overflow-hidden">
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            ) : null}
            <h2 className="font-display text-2xl font-bold text-navy">The brief</h2>
            <AnimatedLine className="mt-4 w-24" />
            <p className="mt-6 whitespace-pre-line text-[15px] leading-relaxed text-muted">
              {service.body}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sticky top-28 border border-navy/10 bg-stone p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brick">
                Ready to scope this?
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-navy">
                {service.title}
              </h3>
              <p className="mt-3 text-sm text-muted">
                Opens the estimate flow with this service pre-selected.
              </p>
              <EstimateButton
                className="mt-6 w-full"
                size="lg"
                prefill={{ services: [service.title] }}
              >
                Get estimate
                <ArrowUpRight className="h-4 w-4" />
              </EstimateButton>
              <ul className="mt-8 space-y-3 border-t border-navy/10 pt-6 text-sm text-muted">
                {[
                  "Homeowners planning renovations",
                  "Contractors needing a build partner",
                  "GCs needing inspection-ready work",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        phone={settings.phone}
        title={`Talk ${service.title.toLowerCase()}`}
        prefill={{ services: [service.title] }}
      />
    </>
  );
}
