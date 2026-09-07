import type { Metadata } from "next";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Privacy Policy" };

export default async function PrivacyPage() {
  const settings = await getSettings();
  return (
    <section className="texture-stone pb-16 pt-32 sm:pb-20 sm:pt-36">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="font-display text-4xl font-bold text-navy">Privacy Policy</h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
          <p>
            {settings.companyName} (“we”) respects your privacy. Information you
            submit through our contact or estimate forms—such as name, phone,
            email, and project details—is used to respond to your inquiry and
            provide construction-related services.
          </p>
          <p>
            We do not sell your personal information. We may share details with
            service providers who help us operate this website (for example,
            email delivery or hosting), solely as needed to respond to you.
          </p>
          <p>
            Questions? Contact us at {settings.email} or {settings.phone}.
          </p>
        </div>
      </div>
    </section>
  );
}
