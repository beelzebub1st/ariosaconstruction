"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  HardHat,
  Home,
  Phone,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useEstimate } from "@/components/estimate/EstimateContext";
import { submitLead } from "@/lib/actions/leads";
import { cn, phoneHref } from "@/lib/utils";
import type { PublicService } from "@/lib/seed-data";

const STEPS = ["You", "Services", "Project", "Contact"] as const;

const roles = [
  {
    id: "homeowner" as const,
    label: "Homeowner",
    blurb: "Remodel, addition, or renovation at home",
    icon: Home,
  },
  {
    id: "contractor" as const,
    label: "Contractor",
    blurb: "Need a reliable build partner on a job",
    icon: HardHat,
  },
  {
    id: "gc" as const,
    label: "General Contractor",
    blurb: "Schedule-aware crew for your project",
    icon: Building2,
  },
];

const budgets = [
  "Under $10k",
  "$10k–$25k",
  "$25k–$50k",
  "$50k–$100k",
  "$100k+",
  "Not sure yet",
];

type Props = {
  services: PublicService[];
  phone: string;
  serviceAreas: string[];
};

export function EstimateModal({ services, phone, serviceAreas }: Props) {
  const { open, closeEstimate, prefill } = useEstimate();
  const pathname = usePathname();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<"homeowner" | "contractor" | "gc" | "other">(
    "homeowner"
  );
  const [selected, setSelected] = useState<string[]>([]);
  const [area, setArea] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [projectRef, setProjectRef] = useState("");
  const [name, setName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    setStep(0);
    setDone(false);
    setError(null);
    setRole(prefill.role || "homeowner");
    setSelected(prefill.services || []);
    setProjectRef(prefill.projectRef || "");
    setArea("");
    setBudget("");
    setMessage("");
    setName("");
    setUserPhone("");
    setEmail("");
  }, [open, prefill]);

  const progress = useMemo(() => ((step + 1) / STEPS.length) * 100, [step]);

  function toggleService(title: string) {
    setSelected((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  }

  function canContinue() {
    if (step === 0) return !!role;
    if (step === 1) return selected.length > 0;
    if (step === 2) return message.trim().length >= 8;
    if (step === 3) return name.trim().length >= 2 && userPhone.trim().length >= 7 && email.includes("@");
    return false;
  }

  function next() {
    setError(null);
    if (!canContinue()) {
      if (step === 1) setError("Select at least one service.");
      else if (step === 2) setError("Tell us a bit more about the project.");
      else if (step === 3) setError("Please complete your contact details.");
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function back() {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  }

  function submit() {
    if (!canContinue()) {
      setError("Please complete your contact details.");
      return;
    }
    startTransition(async () => {
      const result = await submitLead({
        name,
        phone: userPhone,
        email,
        role,
        intent: "estimate",
        serviceInterest: selected.join(", "),
        projectRef: projectRef || undefined,
        addressArea: area || undefined,
        budgetRange: budget || undefined,
        message,
        sourcePage: prefill.sourcePage || pathname || "/",
      });
      if (!result.ok) {
        setError(result.error || "Something went wrong");
        return;
      }
      setDone(true);
    });
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label="Close estimate form"
            className="absolute inset-0 bg-navy-dark/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeEstimate}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="estimate-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden border border-white/10 bg-stone shadow-[0_40px_100px_-30px_rgba(0,0,0,0.65)] sm:max-h-[88vh]"
          >
            <div className="texture-ink relative px-5 pb-5 pt-5 sm:px-7 sm:pt-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-soft">
                    Free estimate
                  </p>
                  <h2
                    id="estimate-title"
                    className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl"
                  >
                    {done ? "Request received" : "Build your request"}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeEstimate}
                  className="flex h-10 w-10 items-center justify-center border border-white/20 text-white transition hover:border-gold hover:text-gold"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {!done && (
                <>
                  <div className="mt-5 flex gap-2">
                    {STEPS.map((label, i) => (
                      <div key={label} className="flex-1">
                        <div
                          className={cn(
                            "h-1 w-full transition",
                            i <= step ? "bg-gold" : "bg-white/15"
                          )}
                        />
                        <p
                          className={cn(
                            "mt-2 hidden text-[10px] font-bold uppercase tracking-[0.14em] sm:block",
                            i <= step ? "text-gold-soft" : "text-white/35"
                          )}
                        >
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 h-px w-full bg-white/10">
                    <div
                      className="h-px bg-gold transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7">
              {done ? (
                <div className="py-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center bg-navy text-gold">
                    <Check className="h-7 w-7" />
                  </div>
                  <p className="mt-6 text-muted">
                    Thanks {name.split(" ")[0] || ""}. We&apos;ll follow up shortly about{" "}
                    <span className="font-semibold text-navy">
                      {selected.slice(0, 2).join(", ")}
                      {selected.length > 2 ? "…" : ""}
                    </span>
                    .
                  </p>
                  <a
                    href={phoneHref(phone)}
                    className="mt-6 inline-flex items-center gap-2 font-display text-xl font-bold text-brick"
                  >
                    <Phone className="h-5 w-5" />
                    {phone}
                  </a>
                  <div className="mt-8">
                    <Button type="button" onClick={closeEstimate} className="w-full sm:w-auto">
                      Close
                    </Button>
                  </div>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -18 }}
                    transition={{ duration: 0.28 }}
                  >
                    {step === 0 && (
                      <div>
                        <h3 className="font-display text-xl font-bold text-navy">
                          Who is this estimate for?
                        </h3>
                        <p className="mt-2 text-sm text-muted">
                          We tailor the follow-up to how you work.
                        </p>
                        <div className="mt-6 grid gap-3">
                          {roles.map((r) => (
                            <button
                              key={r.id}
                              type="button"
                              onClick={() => setRole(r.id)}
                              className={cn(
                                "flex items-start gap-4 border px-4 py-4 text-left transition",
                                role === r.id
                                  ? "border-navy bg-navy text-white"
                                  : "border-navy/15 bg-white hover:border-navy/40"
                              )}
                            >
                              <r.icon
                                className={cn(
                                  "mt-0.5 h-5 w-5 shrink-0",
                                  role === r.id ? "text-gold" : "text-brick"
                                )}
                              />
                              <span>
                                <span className="block font-display text-lg font-bold">
                                  {r.label}
                                </span>
                                <span
                                  className={cn(
                                    "mt-1 block text-sm",
                                    role === r.id ? "text-white/70" : "text-muted"
                                  )}
                                >
                                  {r.blurb}
                                </span>
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div>
                        <h3 className="font-display text-xl font-bold text-navy">
                          What do you need?
                        </h3>
                        <p className="mt-2 text-sm text-muted">
                          Select all services that apply.
                        </p>
                        <div className="mt-6 grid gap-2 sm:grid-cols-2">
                          {services.map((s) => {
                            const on = selected.includes(s.title);
                            return (
                              <button
                                key={s.id}
                                type="button"
                                onClick={() => toggleService(s.title)}
                                className={cn(
                                  "flex items-center justify-between gap-3 border px-4 py-3.5 text-left transition",
                                  on
                                    ? "border-brick bg-brick text-white"
                                    : "border-navy/15 bg-white hover:border-navy/35"
                                )}
                              >
                                <span className="text-sm font-semibold leading-snug">
                                  {s.title}
                                </span>
                                <span
                                  className={cn(
                                    "flex h-5 w-5 shrink-0 items-center justify-center border",
                                    on
                                      ? "border-white bg-white text-brick"
                                      : "border-navy/25"
                                  )}
                                >
                                  {on && <Check className="h-3.5 w-3.5" />}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-display text-xl font-bold text-navy">
                            Describe the project
                          </h3>
                          <p className="mt-2 text-sm text-muted">
                            A few details help us respond with a clearer estimate.
                          </p>
                        </div>
                        <label className="block text-sm">
                          <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-navy">
                            Project area / city
                          </span>
                          <input
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            list="service-areas"
                            placeholder="e.g. Fort Myers, Cape Coral, Naples…"
                            className="w-full border border-navy/15 bg-white px-3.5 py-3 outline-none focus:border-navy"
                          />
                          <datalist id="service-areas">
                            {serviceAreas.map((city) => (
                              <option key={city} value={city} />
                            ))}
                          </datalist>
                        </label>
                        <div>
                          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-navy">
                            Budget range
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {budgets.map((b) => (
                              <button
                                key={b}
                                type="button"
                                onClick={() => setBudget(b)}
                                className={cn(
                                  "border px-3 py-2 text-xs font-bold uppercase tracking-[0.1em] transition",
                                  budget === b
                                    ? "border-navy bg-navy text-white"
                                    : "border-navy/15 bg-white text-navy hover:border-navy/40"
                                )}
                              >
                                {b}
                              </button>
                            ))}
                          </div>
                        </div>
                        {projectRef ? (
                          <label className="block text-sm">
                            <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-navy">
                              Inspired by project
                            </span>
                            <input
                              value={projectRef}
                              onChange={(e) => setProjectRef(e.target.value)}
                              className="w-full border border-navy/15 bg-white px-3.5 py-3 outline-none focus:border-navy"
                            />
                          </label>
                        ) : null}
                        <label className="block text-sm">
                          <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-navy">
                            What do you want done?
                          </span>
                          <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={4}
                            placeholder="Describe rooms, scope, timeline, anything important…"
                            className="w-full border border-navy/15 bg-white px-3.5 py-3 outline-none focus:border-navy"
                          />
                        </label>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-display text-xl font-bold text-navy">
                            How can we reach you?
                          </h3>
                          <p className="mt-2 text-sm text-muted">
                            We typically respond the same business day.
                          </p>
                        </div>
                        <div className="border border-navy/10 bg-white/70 p-4 text-sm text-muted">
                          <span className="font-semibold text-navy">Summary: </span>
                          {roles.find((r) => r.id === role)?.label}
                          {" · "}
                          {selected.join(", ")}
                          {budget ? ` · ${budget}` : ""}
                        </div>
                        <label className="block text-sm">
                          <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-navy">
                            Full name
                          </span>
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full border border-navy/15 bg-white px-3.5 py-3 outline-none focus:border-navy"
                          />
                        </label>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <label className="block text-sm">
                            <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-navy">
                              Phone
                            </span>
                            <input
                              value={userPhone}
                              onChange={(e) => setUserPhone(e.target.value)}
                              type="tel"
                              required
                              className="w-full border border-navy/15 bg-white px-3.5 py-3 outline-none focus:border-navy"
                            />
                          </label>
                          <label className="block text-sm">
                            <span className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-navy">
                              Email
                            </span>
                            <input
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              type="email"
                              required
                              className="w-full border border-navy/15 bg-white px-3.5 py-3 outline-none focus:border-navy"
                            />
                          </label>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}

              {error && !done && (
                <p className="mt-4 text-sm font-medium text-brick">{error}</p>
              )}
            </div>

            {!done && (
              <div className="flex items-center justify-between gap-3 border-t border-navy/10 bg-white px-5 py-4 sm:px-7">
                <button
                  type="button"
                  onClick={step === 0 ? closeEstimate : back}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-navy/70 transition hover:text-navy"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {step === 0 ? "Close" : "Back"}
                </button>
                {step < STEPS.length - 1 ? (
                  <Button type="button" onClick={next}>
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="button" onClick={submit} disabled={pending}>
                    {pending ? "Sending…" : "Submit estimate"}
                    {!pending && <Check className="h-4 w-4" />}
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
