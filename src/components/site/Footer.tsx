"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { EstimateButton } from "@/components/estimate/EstimateButton";
import { SERVICE_AREAS } from "@/lib/service-areas";
import { mailtoHref, phoneHref } from "@/lib/utils";

export function Footer({
  companyName,
  tagline,
  phone,
  email,
  serviceArea,
}: {
  companyName: string;
  tagline: string;
  phone: string;
  email: string;
  serviceArea: string;
}) {
  return (
    <footer className="mt-auto bg-navy-dark text-white">
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-2xl font-bold sm:text-3xl">
              Let&apos;s start your project.
            </p>
            <p className="mt-2 text-sm text-white/65">
              Same-day response on most estimate requests.
            </p>
          </div>
          <EstimateButton size="lg">
            Request Estimate
            <ArrowUpRight className="h-4 w-4" />
          </EstimateButton>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_0.8fr_1fr_1.1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo.png"
              alt={companyName}
              width={56}
              height={56}
              className="h-14 w-14 bg-white/95 object-contain p-1"
            />
            <div>
              <div className="font-display text-xl font-extrabold uppercase tracking-[0.12em]">
                Ariosa
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brick">
                & Constructions LLC
              </div>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">{tagline}</p>
          <div className="gold-rule mt-6 max-w-[10rem]" />
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
            Explore
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            {[
              ["/", "Home"],
              ["/about", "About Us"],
              ["/services", "Services"],
              ["/projects", "Projects"],
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="transition hover:text-gold-soft">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
            Contact
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-white/85">
            <li>
              <a
                href={phoneHref(phone)}
                className="inline-flex items-center gap-3 transition hover:text-gold-soft"
              >
                <Phone className="h-4 w-4 text-gold" />
                {phone}
              </a>
            </li>
            <li>
              <a
                href={mailtoHref(email)}
                className="inline-flex items-center gap-3 transition hover:text-gold-soft"
              >
                <Mail className="h-4 w-4 text-gold" />
                {email}
              </a>
            </li>
            <li className="inline-flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{serviceArea}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
            Service areas
          </h3>
          <ul className="mt-5 columns-2 gap-x-6 space-y-2 text-sm text-white/70">
            {SERVICE_AREAS.map((city) => (
              <li key={city} className="break-inside-avoid">
                {city}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white/80">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white/80">
              Terms
            </Link>
            <Link href="/admin/login" className="hover:text-white/80">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
