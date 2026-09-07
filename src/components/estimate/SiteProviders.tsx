"use client";

import { EstimateProvider } from "@/components/estimate/EstimateContext";
import { EstimateModal } from "@/components/estimate/EstimateModal";
import type { PublicService } from "@/lib/seed-data";

export function SiteProviders({
  children,
  services,
  phone,
}: {
  children: React.ReactNode;
  services: PublicService[];
  phone: string;
}) {
  return (
    <EstimateProvider>
      {children}
      <EstimateModal services={services} phone={phone} />
    </EstimateProvider>
  );
}
