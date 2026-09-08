"use client";

import { MapPin } from "lucide-react";
import { SERVICE_AREAS } from "@/lib/service-areas";
import {
  Reveal,
  SectionHeading,
  Stagger,
  StaggerItem,
} from "@/components/site/Motion";

export function ServiceAreas({
  serviceArea,
  variant = "light",
}: {
  serviceArea?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";

  return (
    <section
      className={
        isDark
          ? "texture-ink section-pad overflow-hidden"
          : "texture-stone section-pad"
      }
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Where we work"
          title="Proudly serving Southwest Florida"
          description={
            serviceArea
              ? `Based around ${serviceArea.split("·")[0]?.trim() || "Fort Myers"}—ready for jobs across these communities and nearby.`
              : "Ready for jobs across these communities and nearby."
          }
          light={isDark}
        />

        <Stagger className="mt-12 grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-5">
          {SERVICE_AREAS.map((city, i) => (
            <StaggerItem key={city}>
              <div
                className={`flex items-baseline gap-3 border-t py-4 ${
                  isDark ? "border-white/10" : "border-navy/10"
                }`}
              >
                <span
                  className={`font-display text-xs font-bold tabular-nums ${
                    isDark ? "text-gold/70" : "text-gold"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-display text-lg font-bold sm:text-xl ${
                    isDark ? "text-white" : "text-navy"
                  }`}
                >
                  {city}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 flex items-start gap-3">
          <MapPin
            className={`mt-0.5 h-4 w-4 shrink-0 ${isDark ? "text-gold" : "text-brick"}`}
          />
          <p
            className={`max-w-2xl text-sm leading-relaxed ${
              isDark ? "text-white/60" : "text-muted"
            }`}
          >
            Don&apos;t see your city? Call or text—we regularly take projects
            throughout Lee, Collier, Charlotte, and Sarasota counties.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
