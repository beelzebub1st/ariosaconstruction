"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Phone } from "lucide-react";
import { EstimateButton } from "@/components/estimate/EstimateButton";
import { ButtonLink } from "@/components/ui/Button";
import { phoneHref } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export function HomeHero({
  headline,
  subheadline,
  supportText,
  phone,
  heroImageUrl,
}: {
  companyName?: string;
  headline: string;
  subheadline: string;
  supportText?: string;
  phone: string;
  heroImageUrl?: string | null;
}) {
  const bg =
    heroImageUrl ||
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2400&q=80";

  const lines = headline.includes(".")
    ? headline.split(".").filter(Boolean).map((p) => `${p.trim()}.`)
    : [headline];

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.14 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease }}
      >
        <Image
          src={bg}
          alt="Construction craftsmanship"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(8,16,28,0.94)_0%,rgba(8,16,28,0.72)_48%,rgba(8,16,28,0.35)_72%,rgba(176,58,58,0.22)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,16,28,0.9)_0%,transparent_45%)]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-[8%] top-[22%] hidden h-40 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent lg:block" />
        <div className="absolute right-[12%] top-[18%] hidden h-px w-32 bg-gradient-to-r from-transparent to-gold/40 lg:block" />
        <div className="absolute bottom-[28%] right-[8%] hidden h-24 w-24 border border-white/10 lg:block" />
      </motion.div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-28 pt-36 sm:px-6 sm:pb-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease }}
          >
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.32em] text-gold-soft sm:text-xs">
              Ariosa & Constructions LLC
            </p>
            <div className="mt-3 h-px w-16 origin-left bg-gold animate-draw" />
          </motion.div>

          <div className="mt-9 space-y-0">
            {lines.map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.95, delay: 0.28 + i * 0.14, ease }}
                  className={
                    i === 0
                      ? "font-display text-[clamp(2.75rem,8vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-white"
                      : "font-display text-[clamp(2.75rem,8vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-brick"
                  }
                >
                  {line}
                </motion.h1>
              </div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62, ease }}
            className="mt-7 max-w-xl text-lg font-semibold leading-snug text-gold-soft sm:text-xl"
          >
            {subheadline}
          </motion.p>

          {supportText ? (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease }}
              className="mt-4 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg"
            >
              {supportText}
            </motion.p>
          ) : null}

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.74, ease }}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <EstimateButton size="lg" className="min-w-[220px]">
              Get Free Estimate
              <ArrowUpRight className="h-4 w-4" />
            </EstimateButton>
            <ButtonLink href={phoneHref(phone)} variant="outline" size="lg">
              <Phone className="h-4 w-4" />
              {phone}
            </ButtonLink>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.6 }}
            className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45"
          >
            Free · No obligation · Same-day response
          </motion.p>
        </div>
      </div>

      <motion.a
        href="#start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/50 transition hover:text-gold-soft"
      >
        Explore
        <ArrowDown className="h-4 w-4 animate-float" />
      </motion.a>
    </section>
  );
}
