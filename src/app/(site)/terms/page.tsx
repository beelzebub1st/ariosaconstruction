import type { Metadata } from "next";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Terms of Use" };

export default async function TermsPage() {
  const settings = await getSettings();
  return (
    <section className="texture-stone pb-16 pt-32 sm:pb-20 sm:pt-36">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="font-display text-4xl font-bold text-navy">Terms of Use</h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
          <p>
            This website is provided by {settings.companyName} for informational
            and marketing purposes. Project photos, descriptions, and estimates
            shared online are illustrative unless confirmed in a written
            agreement.
          </p>
          <p>
            Submitting a form does not create a contract. Any construction work
            is subject to a separate written estimate or agreement between you
            and {settings.companyName}.
          </p>
          <p>
            For questions, contact {settings.email} or call {settings.phone}.
          </p>
        </div>
      </div>
    </section>
  );
}
