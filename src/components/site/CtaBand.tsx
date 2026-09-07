"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";
import { EstimateButton } from "@/components/estimate/EstimateButton";
import { ButtonLink } from "@/components/ui/Button";
import { AnimatedLine } from "@/components/site/Motion";

export function CtaBand({
  title = "Ready to build with confidence?",
  subtitle = "Tell us about your project. Homeowners, contractors, and GCs welcome.",
  phone,
  prefill,
}: {
  title?: string;
  subtitle?: string;
  phone?: string;
  prefill?: {
    role?: "homeowner" | "contractor" | "gc" | "other";
    services?: string[];
    projectRef?: string;
  };
}) {
  return (
    <section className="texture-ink relative overflow-hidden">
      <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-brick/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-20 sm:px-6 sm:py-24 md:flex-row md:items-end md:justify-between"
      >
        <div className="max-w-2xl">
          <p className="eyebrow text-gold-soft">Next step</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.08] text-white sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-base text-white/70 sm:text-lg">{subtitle}</p>
          <AnimatedLine className="mt-6 w-32" />
          {phone ? (
            <a
              href={`tel:${phone.replace(/[^\d+]/g, "")}`}
              className="mt-8 inline-flex items-center gap-3 font-display text-2xl font-bold text-gold-soft transition hover:text-gold sm:text-3xl"
            >
              <Phone className="h-6 w-6" />
              {phone}
            </a>
          ) : null}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <EstimateButton size="lg" className="min-w-[200px]" prefill={prefill}>
            Get Free Estimate
            <ArrowUpRight className="h-4 w-4" />
          </EstimateButton>
          {phone ? (
            <ButtonLink
              href={`sms:${phone.replace(/[^\d+]/g, "")}`}
              variant="outline"
              size="lg"
            >
              Text Us
            </ButtonLink>
          ) : (
            <ButtonLink href="/projects" variant="outline" size="lg">
              View Projects
            </ButtonLink>
          )}
        </div>
      </motion.div>
    </section>
  );
}
