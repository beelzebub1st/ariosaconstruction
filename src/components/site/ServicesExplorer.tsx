"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EstimateButton } from "@/components/estimate/EstimateButton";
import { Stagger, StaggerItem } from "@/components/site/Motion";
import type { PublicService } from "@/lib/seed-data";

export function ServicesExplorer({ services }: { services: PublicService[] }) {
  return (
    <Stagger className="mt-8 grid gap-6 sm:grid-cols-2">
      {services.map((service, i) => (
        <StaggerItem key={service.id}>
          <article className="group flex h-full flex-col overflow-hidden border border-navy/10 bg-white transition hover:border-navy/30">
            <Link href={`/services/${service.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-navy/5">
              {service.imageUrl ? (
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-transparent to-transparent" />
              <span className="absolute left-4 top-4 bg-white/95 px-2.5 py-1 font-display text-sm font-bold text-navy">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="absolute bottom-4 left-4 right-4 font-display text-2xl font-bold text-white">
                {service.title}
              </h2>
            </Link>
            <div className="flex flex-1 flex-col p-5">
              <p className="flex-1 text-sm leading-relaxed text-muted">{service.summary}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-navy transition hover:text-brick"
                >
                  Details
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <EstimateButton
                  size="sm"
                  variant="outlineDark"
                  prefill={{ services: [service.title] }}
                >
                  Estimate
                </EstimateButton>
              </div>
            </div>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
