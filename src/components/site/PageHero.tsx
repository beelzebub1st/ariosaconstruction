"use client";

import { Reveal } from "@/components/site/Motion";
import { AnimatedLine } from "@/components/site/Motion";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="texture-ink relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-8 top-8 bottom-8 border border-white/10 sm:inset-x-12" />
      <div className="pointer-events-none absolute left-8 top-8 h-12 w-12 border-l border-t border-gold/70 sm:left-12 sm:top-12" />
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-32 sm:px-6 sm:pb-24 sm:pt-36">
        <Reveal>
          <p className="eyebrow text-gold-soft">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {description}
            </p>
          ) : null}
          <AnimatedLine className="mt-8 w-36" />
        </Reveal>
      </div>
    </section>
  );
}
