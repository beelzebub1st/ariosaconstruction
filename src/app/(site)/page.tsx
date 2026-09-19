import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AudiencePaths } from "@/components/site/AudiencePaths";
import { BeforeAfterSlider } from "@/components/site/BeforeAfterSlider";
import { CtaBand } from "@/components/site/CtaBand";
import { EstimateButton } from "@/components/estimate/EstimateButton";
import { HomeHero } from "@/components/site/HomeHero";
import {
  Reveal,
  SectionHeading,
  Stagger,
  StaggerItem,
  AnimatedLine,
} from "@/components/site/Motion";
import { ButtonLink } from "@/components/ui/Button";
import { ServiceAreas } from "@/components/site/ServiceAreas";
import {
  getProjects,
  getServiceAreas,
  getServices,
  getSettings,
  getTestimonials,
} from "@/lib/content";
import { phoneHref, smsHref, parseTrustBadges } from "@/lib/utils";

export default async function HomePage() {
  const [settings, services, projects, testimonials, areas] = await Promise.all([
    getSettings(),
    getServices(),
    getProjects({ featuredOnly: true }),
    getTestimonials(),
    getServiceAreas(),
  ]);

  const featured = projects[0];
  const moreProjects = projects.slice(1, 3);
  const trust = parseTrustBadges(settings.trustBadges);
  const featuredQuote = testimonials[0];

  const process = [
    { step: "01", title: "Consult", body: "Scope, site, and goals—aligned fast." },
    { step: "02", title: "Estimate", body: "Transparent pricing. No surprises." },
    { step: "03", title: "Build", body: "Disciplined schedule. Quality control." },
    { step: "04", title: "Handover", body: "Walkthrough. Punch list. Done right." },
  ];

  return (
    <>
      <HomeHero
        companyName={settings.companyName}
        headline={settings.heroHeadline}
        subheadline={settings.heroSubheadline}
        supportText={settings.heroSupport}
        phone={settings.phone}
        heroImageUrl={settings.heroImageUrl}
      />

      <section id="start" className="relative z-10 border-y border-navy/10 bg-white">
        <div className="mx-auto grid max-w-6xl md:grid-cols-3">
          <a
            href={phoneHref(settings.phone)}
            className="group flex items-center justify-between gap-4 border-b border-navy/10 px-5 py-5 transition hover:bg-stone md:border-b-0 md:border-r"
          >
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                Call now
              </div>
              <div className="mt-1 font-display text-lg font-bold text-navy group-hover:text-brick">
                {settings.phone}
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-gold" />
          </a>
          <a
            href={smsHref(settings.phone, "Hi Ariosa, I'd like a free estimate.")}
            className="group flex items-center justify-between gap-4 border-b border-navy/10 px-5 py-5 transition hover:bg-stone md:border-b-0 md:border-r"
          >
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                Text us
              </div>
              <div className="mt-1 font-display text-lg font-bold text-navy group-hover:text-brick">
                Instant SMS
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-gold" />
          </a>
          <EstimateButton className="group flex h-full w-full items-center justify-between gap-4 rounded-none bg-brick px-5 py-5 text-left text-white shadow-none hover:bg-brick-dark">
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                Online
              </span>
              <span className="mt-1 block font-display text-lg font-bold normal-case tracking-normal">
                Free estimate
              </span>
            </span>
            <ArrowUpRight className="h-4 w-4" />
          </EstimateButton>
        </div>
      </section>

      <section className="bg-navy-dark">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-4 sm:px-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
            {settings.yearsExperience}
          </span>
          {trust.map((t) => (
            <span
              key={t}
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="texture-stone section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Start here"
            title="Who are we building for?"
            description="Pick your path—we tailor the estimate conversation to how you work."
          />
          <AudiencePaths />
        </div>
      </section>

      {featured?.beforeUrl && featured?.afterUrl && (
        <section className="bg-white section-pad">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-end gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
              <Reveal>
                <p className="eyebrow">Featured work</p>
                <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.08] text-navy sm:text-4xl md:text-5xl">
                  Drag to see the difference
                </h2>
                <AnimatedLine className="mt-6 w-28" />
                <p className="mt-5 leading-relaxed text-muted">{featured.summary}</p>
                <div className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-brick">
                  {featured.location} · {featured.category}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={`/projects/${featured.slug}`} variant="secondary">
                    View project
                    <ArrowUpRight className="h-4 w-4" />
                  </ButtonLink>
                  <EstimateButton
                    variant="outlineDark"
                    prefill={{ projectRef: featured.title }}
                  >
                    Get similar estimate
                  </EstimateButton>
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <BeforeAfterSlider
                  beforeSrc={featured.beforeUrl}
                  afterSrc={featured.afterUrl}
                  beforeAlt={`${featured.title} before`}
                  afterAlt={`${featured.title} after`}
                  className="aspect-[5/4]"
                />
              </Reveal>
            </div>

            {moreProjects.length > 0 && (
              <div className="mt-16 grid gap-8 md:grid-cols-2">
                {moreProjects.map((project, i) =>
                  project.beforeUrl && project.afterUrl ? (
                    <Reveal key={project.id} delay={i * 0.08}>
                      <Link href={`/projects/${project.slug}`} className="group block">
                        <BeforeAfterSlider
                          beforeSrc={project.beforeUrl}
                          afterSrc={project.afterUrl}
                        />
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div>
                            <h3 className="font-display text-xl font-bold text-navy group-hover:text-brick">
                              {project.title}
                            </h3>
                            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
                              {project.location}
                            </p>
                          </div>
                          <ArrowUpRight className="h-5 w-5 text-gold" />
                        </div>
                      </Link>
                    </Reveal>
                  ) : null
                )}
              </div>
            )}

            <Reveal className="mt-10">
              <ButtonLink href="/projects" variant="ghost" className="hover:text-brick">
                See full gallery →
              </ButtonLink>
            </Reveal>
          </div>
        </section>
      )}

      <section className="texture-stone section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Capabilities"
              title="What we deliver"
              description="Focused scope. One accountable team from estimate to handover."
            />
            <Reveal delay={0.1}>
              <ButtonLink href="/services" variant="outlineDark">
                All services
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
            </Reveal>
          </div>

          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2">
            {services.slice(0, 6).map((service, i) => (
              <StaggerItem key={service.id}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block overflow-hidden border border-navy/10 bg-white transition hover:border-navy/30"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-navy/5">
                    {service.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/75 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 bg-white/95 px-2 py-1 font-display text-sm font-bold text-navy">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="absolute bottom-4 left-4 right-4 font-display text-xl font-bold text-white sm:text-2xl">
                      {service.title}
                    </h3>
                  </div>
                  <div className="flex items-start justify-between gap-3 p-5">
                    <p className="text-sm text-muted">{service.summary}</p>
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-navy/15 text-navy transition group-hover:border-brick group-hover:bg-brick group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-white section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Process"
            title="Simple. Transparent. On schedule."
          />
          <div className="relative mt-14">
            <div className="absolute left-0 right-0 top-5 hidden h-px bg-navy/10 lg:block" />
            <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((p) => (
                <StaggerItem key={p.step}>
                  <div className="relative">
                    <div className="mb-5 flex h-10 w-10 items-center justify-center bg-navy font-display text-xs font-bold text-gold">
                      {p.step}
                    </div>
                    <h3 className="font-display text-xl font-bold text-navy">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted">{p.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="texture-ink section-pad overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <Reveal>
            <p className="eyebrow text-gold-soft">Why Ariosa</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
              Built on craft.
              <br />
              <span className="text-brick">Driven by trust.</span>
            </h2>
            <AnimatedLine className="mt-6 w-28" />
            <ul className="mt-8 space-y-5">
              {[
                "Insured crews with clean, professional job sites",
                "Clear estimates homeowners, contractors, and GCs can plan around",
                "Reliable subcontracting that protects schedules and finishes strong",
              ].map((item) => (
                <li key={item} className="flex gap-4 text-sm text-white/75 sm:text-[15px]">
                  <span className="mt-2 h-px w-8 shrink-0 bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonLink href="/about" variant="outline">
                Our story
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </Reveal>

          {featuredQuote && (
            <Reveal delay={0.15}>
              <blockquote className="relative border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm sm:p-10">
                <div className="pointer-events-none absolute left-6 top-6 h-10 w-10 border-l border-t border-gold/60" />
                <div className="pointer-events-none absolute bottom-6 right-6 h-10 w-10 border-b border-r border-gold/60" />
                <p className="font-display text-2xl font-medium leading-snug text-white sm:text-3xl">
                  “{featuredQuote.quote}”
                </p>
                <footer className="mt-8 border-t border-white/10 pt-5">
                  <div className="font-semibold text-gold-soft">{featuredQuote.name}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.16em] text-white/45">
                    {featuredQuote.role}
                  </div>
                </footer>
              </blockquote>
            </Reveal>
          )}
        </div>
      </section>

      <ServiceAreas serviceArea={settings.serviceArea} locations={areas} />

      <CtaBand
        phone={settings.phone}
        title="Your project starts with one conversation."
        subtitle="Free estimate. Direct line to Ariosa. Homeowners, contractors, and general contractors welcome."
      />
    </>
  );
}
