import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Thank You",
};

export default async function ThankYouPage() {
  const settings = await getSettings();

  return (
    <section className="texture-stone section-pad pt-32 sm:pt-36">
      <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center border border-gold/50 bg-white">
          <CheckCircle2 className="h-8 w-8 text-gold" />
        </div>
        <h1 className="mt-8 font-display text-4xl font-extrabold text-navy sm:text-5xl">
          Request received
        </h1>
        <div className="gold-rule-center mx-auto mt-6 max-w-[10rem]" />
        <p className="mt-6 text-muted">
          Thank you for contacting {settings.companyName}. We&apos;ll follow up
          shortly. For a faster response, call or text{" "}
          <a
            href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`}
            className="font-semibold text-navy underline decoration-gold underline-offset-4"
          >
            {settings.phone}
          </a>
          .
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Back to Home</ButtonLink>
          <ButtonLink href="/projects" variant="outlineDark">
            View Projects
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
