"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { SERVICE_AREA_LOCATIONS } from "@/lib/service-areas";
import { ServiceAreaMap } from "@/components/site/ServiceAreaMap";
import {
  Reveal,
  SectionHeading,
  Stagger,
  StaggerItem,
} from "@/components/site/Motion";
import { cn } from "@/lib/utils";

export function ServiceAreas({
  serviceArea,
  variant = "light",
}: {
  serviceArea?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  const [activeCity, setActiveCity] = useState<string | null>("Fort Myers");

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
              ? `Based around ${serviceArea.split("·")[0]?.trim() || "Fort Myers"}—tap a city below or on the map to explore our coverage.`
              : "Tap a city below or on the map to explore our coverage."
          }
          light={isDark}
        />

        <Reveal className="mt-10">
          <ServiceAreaMap activeCity={activeCity} onSelectCity={setActiveCity} />
        </Reveal>

        <Stagger className="mt-10 grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-5">
          {SERVICE_AREA_LOCATIONS.map((city, i) => {
            const active = activeCity === city.name;
            return (
              <StaggerItem key={city.name}>
                <button
                  type="button"
                  onClick={() => setActiveCity(city.name)}
                  className={cn(
                    "flex w-full items-baseline gap-3 border-t py-4 text-left transition",
                    isDark ? "border-white/10" : "border-navy/10",
                    active && (isDark ? "bg-white/5" : "bg-white/70")
                  )}
                >
                  <span
                    className={cn(
                      "font-display text-xs font-bold tabular-nums",
                      active ? "text-brick" : isDark ? "text-gold/70" : "text-gold"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "font-display text-lg font-bold sm:text-xl",
                      active
                        ? isDark
                          ? "text-gold-soft"
                          : "text-brick"
                        : isDark
                          ? "text-white"
                          : "text-navy"
                    )}
                  >
                    {city.name}
                    {"hub" in city && city.hub ? (
                      <span className="ml-2 text-[10px] font-bold uppercase tracking-[0.14em] text-gold">
                        Hub
                      </span>
                    ) : null}
                  </span>
                </button>
              </StaggerItem>
            );
          })}
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
