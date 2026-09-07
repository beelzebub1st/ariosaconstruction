"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { submitLead } from "@/lib/actions/leads";
import type { LeadFormDefaults } from "@/lib/seed-data";

const inputClass =
  "w-full border border-navy/15 bg-stone/40 px-3.5 py-3 outline-none transition focus:border-navy focus:bg-white";

export function ContactForm({
  defaults,
  sourcePage = "/contact",
}: {
  defaults?: LeadFormDefaults;
  sourcePage?: string;
}) {
  const router = useRouter();
  const [intent, setIntent] = useState<"estimate" | "contact">(
    defaults?.intent === "contact" ? "contact" : "estimate"
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const title = useMemo(
    () =>
      intent === "estimate" ? "Request a Free Estimate" : "Send a Quick Message",
    [intent]
  );

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      role: String(form.get("role") || "homeowner") as
        | "homeowner"
        | "contractor"
        | "gc"
        | "other",
      intent,
      serviceInterest: String(form.get("serviceInterest") || "") || undefined,
      projectRef: String(form.get("projectRef") || "") || undefined,
      addressArea: String(form.get("addressArea") || "") || undefined,
      budgetRange: String(form.get("budgetRange") || "") || undefined,
      message: String(form.get("message") || "") || undefined,
      sourcePage,
    };

    startTransition(async () => {
      const result = await submitLead(payload);
      if (!result.ok) {
        setError(result.error || "Something went wrong");
        return;
      }
      router.push("/contact/thank-you");
    });
  }

  return (
    <div className="border border-navy/10 bg-white p-6 shadow-[0_30px_70px_-45px_rgba(12,24,41,0.55)] sm:p-8">
      <div className="grid grid-cols-2 gap-1 bg-stone p-1">
        <button
          type="button"
          onClick={() => setIntent("estimate")}
          className={`px-3 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition ${
            intent === "estimate" ? "bg-brick text-white" : "text-navy hover:bg-white"
          }`}
        >
          Estimate
        </button>
        <button
          type="button"
          onClick={() => setIntent("contact")}
          className={`px-3 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition ${
            intent === "contact" ? "bg-navy text-white" : "text-navy hover:bg-white"
          }`}
        >
          Contact
        </button>
      </div>

      <h2 className="mt-6 font-display text-2xl font-bold text-navy sm:text-3xl">{title}</h2>
      <p className="mt-2 text-sm text-muted">
        Tell us about your project. We typically respond the same business day.
      </p>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Phone" name="phone" type="tel" required />
        <Field label="Email" name="email" type="email" required className="sm:col-span-2" />

        <label className="block text-sm">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-navy">
            I am a…
          </span>
          <select
            name="role"
            defaultValue={defaults?.role || "homeowner"}
            className={inputClass}
          >
            <option value="homeowner">Homeowner</option>
            <option value="contractor">Contractor</option>
            <option value="gc">General Contractor</option>
            <option value="other">Other</option>
          </select>
        </label>

        <Field
          label="Service interest"
          name="serviceInterest"
          defaultValue={defaults?.serviceInterest}
          placeholder="e.g. Kitchen remodel"
        />

        {intent === "estimate" && (
          <>
            <Field
              label="Project / reference"
              name="projectRef"
              defaultValue={defaults?.projectRef}
              placeholder="Optional"
            />
            <Field
              label="Project area / address"
              name="addressArea"
              placeholder="City or neighborhood"
            />
            <label className="block text-sm sm:col-span-2">
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-navy">
                Budget range (optional)
              </span>
              <select name="budgetRange" defaultValue="" className={inputClass}>
                <option value="">Prefer not to say</option>
                <option value="Under $10k">Under $10k</option>
                <option value="$10k–$25k">$10k–$25k</option>
                <option value="$25k–$50k">$25k–$50k</option>
                <option value="$50k–$100k">$50k–$100k</option>
                <option value="$100k+">$100k+</option>
              </select>
            </label>
          </>
        )}

        <label className="block text-sm sm:col-span-2">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-navy">
            Message
          </span>
          <textarea
            name="message"
            rows={4}
            className={inputClass}
            placeholder="Describe the work you need…"
          />
        </label>

        {error && (
          <p className="sm:col-span-2 text-sm font-medium text-brick">{error}</p>
        )}

        <div className="sm:col-span-2">
          <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
            {pending
              ? "Sending…"
              : intent === "estimate"
                ? "Request Estimate"
                : "Send Message"}
            {!pending && <ArrowUpRight className="h-4 w-4" />}
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  placeholder,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`block text-sm ${className || ""}`}>
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-navy">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={inputClass}
      />
    </label>
  );
}
