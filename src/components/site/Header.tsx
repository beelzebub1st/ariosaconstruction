"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { EstimateButton } from "@/components/estimate/EstimateButton";
import { cn, phoneHref } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Header({
  phone,
  companyName,
}: {
  phone: string;
  companyName: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overDarkHero =
    pathname === "/" ||
    pathname === "/about" ||
    pathname.startsWith("/services") ||
    pathname.startsWith("/projects") ||
    pathname.startsWith("/contact");
  const light = overDarkHero && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition duration-500",
        scrolled || open
          ? "border-b border-navy/10 bg-white/95 shadow-[0_12px_40px_-24px_rgba(12,24,41,0.5)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-4 sm:h-[5rem] sm:px-6">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span
            className={cn(
              "flex h-11 w-11 items-center justify-center transition sm:h-12 sm:w-12",
              light ? "bg-white/95" : "bg-transparent"
            )}
          >
            <Image
              src="/brand/logo.png"
              alt={companyName}
              width={48}
              height={48}
              className="h-10 w-10 object-contain sm:h-11 sm:w-11"
              priority
            />
          </span>
          <div className="leading-tight">
            <div
              className={cn(
                "font-display text-sm font-extrabold uppercase tracking-[0.14em] sm:text-[0.95rem]",
                light ? "text-white" : "text-navy"
              )}
            >
              Ariosa
            </div>
            <div
              className={cn(
                "text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-[11px]",
                light ? "text-gold-soft" : "text-brick"
              )}
            >
              & Constructions
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "nav-link px-3.5 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] transition",
                light
                  ? "text-white/80 hover:text-white after:bg-gold"
                  : "text-charcoal/70 hover:text-navy"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={phoneHref(phone)}
            className={cn(
              "inline-flex items-center gap-2 text-sm font-semibold transition",
              light ? "text-white hover:text-gold-soft" : "text-navy hover:text-brick"
            )}
          >
            <span
              className={cn(
                "flex h-8 w-8 items-center justify-center",
                light ? "bg-white/15 text-gold-soft" : "bg-stone text-brick"
              )}
            >
              <Phone className="h-3.5 w-3.5" />
            </span>
            {phone}
          </a>
          <EstimateButton size="sm">Free Estimate</EstimateButton>
        </div>

        <button
          type="button"
          className={cn("inline-flex p-2 lg:hidden", light ? "text-white" : "text-navy")}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t bg-white transition-[max-height] duration-400 lg:hidden",
          open ? "max-h-[420px] border-navy/10" : "max-h-0 border-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="px-3 py-3 text-base font-semibold uppercase tracking-[0.1em] text-charcoal hover:bg-stone"
            >
              {item.label}
            </Link>
          ))}
          <a href={phoneHref(phone)} className="px-3 py-3 text-base font-semibold text-navy">
            Call {phone}
          </a>
          <EstimateButton className="mt-2" onBeforeOpen={() => setOpen(false)}>
            Get Free Estimate
          </EstimateButton>
        </nav>
      </div>
    </header>
  );
}
