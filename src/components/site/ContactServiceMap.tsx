"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { AnimatedLine, Reveal, Stagger, StaggerItem } from "@/components/site/Motion";
import { ServiceAreaMap } from "@/components/site/ServiceAreaMap";
import { SERVICE_AREA_LOCATIONS } from "@/lib/service-areas";
import { cn } from "@/lib/utils";

export function ContactServiceMap({
  address,
  serviceArea,
}: {
  address: string;
  serviceArea: string;
}) {
  const [activeCity, setActiveCity] = useState<string | null>("Fort Myers");

  return (
    <>
      <section className="texture-stone section-pad !pt-0">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="eyebrow">Service areas</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">
              Cities we serve
            </h2>
            <AnimatedLine className="mt-5 w-24" />
          </Reveal>
          <Stagger className="mt-10 grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-5">
            {SERVICE_AREA_LOCATIONS.map((city, i) => {
              const active = activeCity === city.name;
              return (
                <StaggerItem key={city.name}>
                  <button
                    type="button"
                    onClick={() => setActiveCity(city.name)}
                    className={cn(
                      "flex w-full items-baseline gap-3 border-t border-navy/10 py-4 text-left transition hover:bg-white/60",
                      active && "bg-white"
                    )}
                  >
                    <span
                      className={cn(
                        "font-display text-xs font-bold tabular-nums",
                        active ? "text-brick" : "text-gold"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-display text-lg font-bold",
                        active ? "text-brick" : "text-navy"
                      )}
                    >
                      {city.name}
                    </span>
                  </button>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="bg-white pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Coverage map</p>
              <h2 className="mt-3 font-display text-3xl font-extrabold text-navy">
                Every city we serve, on one map
              </h2>
            </div>
            <p className="inline-flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4 text-brick" />
              {address} · {serviceArea}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ServiceAreaMap activeCity={activeCity} onSelectCity={setActiveCity} />
          </Reveal>
          <p className="mt-4 text-sm text-muted">
            Tap a pin or city name to zoom in. Fort Myers is our hub—surrounding
            communities across Lee, Collier, Charlotte, and Sarasota counties.
          </p>
        </div>
      </section>
    </>
  );
}
