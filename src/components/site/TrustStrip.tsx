"use client";

import { parseTrustBadges } from "@/lib/utils";

export function TrustStrip({
  badges,
  yearsExperience,
}: {
  badges: string;
  yearsExperience: string;
}) {
  const items = [yearsExperience, ...parseTrustBadges(badges)];
  const loop = [...items, ...items];

  return (
    <section className="overflow-hidden border-y border-navy/10 bg-navy-dark">
      <div className="marquee-track py-4">
        {loop.map((badge, i) => (
          <div
            key={`${badge}-${i}`}
            className="flex items-center gap-8 px-8 text-xs font-bold uppercase tracking-[0.2em] text-white/80"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {badge}
          </div>
        ))}
      </div>
    </section>
  );
}
