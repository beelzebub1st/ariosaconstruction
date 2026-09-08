import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/site/CtaBand";
import { EstimateButton } from "@/components/estimate/EstimateButton";
import { ServiceAreas } from "@/components/site/ServiceAreas";
import { Reveal, Stagger, StaggerItem, AnimatedLine } from "@/components/site/Motion";
import { getSettings } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Ariosa & Constructions LLC—quality construction for homeowners, contractors, and GCs across Fort Myers, Cape Coral, Naples, and Southwest Florida.",
};

export default async function AboutPage() {
  const settings = await getSettings();

  const values = [
    { n: "01", t: "Clarity", d: "Estimates you can plan around—not vague ranges that shift mid-job." },
    { n: "02", t: "Craft", d: "Clean workmanship, proper detailing, and finishes built for Florida conditions." },
    { n: "03", t: "Pace", d: "A schedule we protect—because your timeline is part of the product." },
  ];

  const steps = [
    { t: "Consult", d: "Listen, walk the site, lock scope." },
    { t: "Estimate", d: "Transparent assumptions. Clear numbers." },
    { t: "Build", d: "Quality control and proactive updates." },
    { t: "Handover", d: "Walkthrough, punch list, done right." },
  ];

  return (
    <>
      {/* Split cinematic about hero */}
      <section className="relative min-h-[85vh] overflow-hidden bg-navy-dark">
        <div className="absolute inset-0 lg:left-[42%]">
          <Image
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=80"
            alt="Construction site craftsmanship"
            fill
            priority
            className="object-cover opacity-60"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/80 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-navy-dark/40 lg:to-navy-dark/20" />
        </div>

        <div className="relative mx-auto grid min-h-[85vh] max-w-6xl lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-end px-4 pb-16 pt-36 sm:px-6 sm:pb-20">
            <Reveal>
              <p className="eyebrow text-gold-soft">About</p>
              <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.02] text-white sm:text-5xl md:text-6xl">
                Not another
                <br />
                <span className="text-brick">generic builder.</span>
              </h1>
              <AnimatedLine className="mt-6 w-28" />
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
                {settings.tagline} Serving {settings.serviceArea} with disciplined
                project delivery for homeowners, contractors, and GCs.
              </p>
              <div className="mt-8">
                <EstimateButton size="lg">
                  Start an estimate
                  <ArrowUpRight className="h-4 w-4" />
                </EstimateButton>
              </div>
            </Reveal>
          </div>
          <div className="hidden lg:block" />
        </div>
      </section>

      {/* Story with oversized number */}
      <section className="bg-white section-pad">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.35fr_1fr]">
          <Reveal>
            <div className="font-display text-[7rem] font-extrabold leading-none text-stone-dark sm:text-[9rem]">
              {settings.yearsExperience}
            </div>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-brick">
              Years of building trust
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
              Our story is simple: show up prepared, communicate clearly, finish clean.
            </h2>
            <p className="mt-6 leading-relaxed text-muted">{settings.aboutLong}</p>
            <p className="mt-4 leading-relaxed text-muted">{settings.aboutShort}</p>
          </Reveal>
        </div>
      </section>

      {/* Values as full-bleed bands */}
      <section>
        {values.map((v, i) => (
          <div
            key={v.n}
            className={i % 2 === 0 ? "bg-navy-dark text-white" : "bg-stone text-navy"}
          >
            <Reveal className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-14">
              <div className="flex items-baseline gap-6">
                <span
                  className={`font-display text-5xl font-extrabold ${i % 2 === 0 ? "text-gold/50" : "text-gold"}`}
                >
                  {v.n}
                </span>
                <h3 className="font-display text-3xl font-bold">{v.t}</h3>
              </div>
              <p
                className={`max-w-md text-sm leading-relaxed sm:text-base ${i % 2 === 0 ? "text-white/65" : "text-muted"}`}
              >
                {v.d}
              </p>
            </Reveal>
          </div>
        ))}
      </section>

      {/* Process vertical spine */}
      <section className="texture-stone section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="eyebrow">How we work</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-navy sm:text-4xl">
              Four beats. Zero chaos.
            </h2>
          </Reveal>
          <div className="relative mt-14">
            <div className="absolute bottom-0 left-[1.15rem] top-0 w-px bg-navy/15 sm:left-1/2" />
            <Stagger className="space-y-10">
              {steps.map((s, i) => (
                <StaggerItem key={s.t}>
                  <div
                    className={`relative grid gap-4 sm:grid-cols-2 sm:gap-10 ${i % 2 === 1 ? "sm:text-right" : ""}`}
                  >
                    <div className={i % 2 === 1 ? "sm:order-2" : ""}>
                      <div
                        className={`flex items-center gap-4 ${i % 2 === 1 ? "sm:justify-end" : ""}`}
                      >
                        <span className="relative z-10 flex h-9 w-9 items-center justify-center bg-brick font-display text-xs font-bold text-white">
                          0{i + 1}
                        </span>
                        <h3 className="font-display text-2xl font-bold text-navy">{s.t}</h3>
                      </div>
                      <p className={`mt-3 max-w-sm text-sm text-muted ${i % 2 === 1 ? "sm:ml-auto" : "sm:ml-12"}`}>{s.d}</p>
                    </div>
                    <div className="hidden sm:block" />
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <ServiceAreas serviceArea={settings.serviceArea} variant="dark" />

      <CtaBand
        phone={settings.phone}
        title="Ready when you are."
        subtitle="Tell us who you are and what you need—takes about a minute."
      />
    </>
  );
}
