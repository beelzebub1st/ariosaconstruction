"use client";

import { ArrowUpRight, Building2, HardHat, Home } from "lucide-react";
import { useEstimate } from "@/components/estimate/EstimateContext";
import { Stagger, StaggerItem } from "@/components/site/Motion";

const audiences = [
  {
    role: "homeowner" as const,
    icon: Home,
    label: "Homeowners",
    text: "Remodels, kitchens, baths & additions—clear estimates, clean job sites.",
  },
  {
    role: "contractor" as const,
    icon: HardHat,
    label: "Contractors",
    text: "Reliable build support that protects your schedule and reputation.",
  },
  {
    role: "gc" as const,
    icon: Building2,
    label: "General Contractors",
    text: "Inspection-ready workmanship. We show up prepared and finish strong.",
  },
];

export function AudiencePaths() {
  const { openEstimate } = useEstimate();

  return (
    <Stagger className="mt-12 grid gap-4 lg:grid-cols-3">
      {audiences.map((a) => (
        <StaggerItem key={a.label}>
          <button
            type="button"
            onClick={() => openEstimate({ role: a.role })}
            className="group relative flex h-full w-full flex-col overflow-hidden border border-navy/10 bg-white p-7 text-left transition duration-500 hover:border-navy hover:bg-navy"
          >
            <div className="absolute left-0 top-0 h-full w-1 bg-gold opacity-0 transition group-hover:opacity-100" />
            <a.icon className="h-7 w-7 text-brick transition group-hover:text-gold" />
            <h3 className="mt-6 font-display text-2xl font-bold text-navy transition group-hover:text-white">
              {a.label}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted transition group-hover:text-white/70">
              {a.text}
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-navy transition group-hover:text-gold-soft">
              Request estimate
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </button>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
