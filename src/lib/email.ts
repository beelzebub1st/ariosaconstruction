import { Resend } from "resend";
import type { LeadInput } from "@/lib/validations";

export async function sendLeadNotification(lead: LeadInput & { id?: string }) {
  const to = process.env.CONTACT_TO_EMAIL || "ariosaconstructions@gmail.com";
  const apiKey = process.env.RESEND_API_KEY;

  const subject = `[Ariosa] New ${lead.intent === "estimate" ? "Estimate" : "Contact"} Request — ${lead.name}`;
  const text = `
New lead received from the Ariosa & Constructions website.

Name: ${lead.name}
Phone: ${lead.phone}
Email: ${lead.email}
Role: ${lead.role}
Intent: ${lead.intent}
Service: ${lead.serviceInterest || "—"}
Project: ${lead.projectRef || "—"}
Area: ${lead.addressArea || "—"}
Budget: ${lead.budgetRange || "—"}
Source: ${lead.sourcePage || "—"}

Message:
${lead.message || "(none)"}

${lead.photoUrl ? `Photo: ${lead.photoUrl}` : ""}
`.trim();

  if (!apiKey) {
    console.log("[lead-email:dev]", subject, text);
    return { ok: true as const, skipped: true as const };
  }

  const resend = new Resend(apiKey);
  const from = process.env.CONTACT_FROM_EMAIL || "Ariosa Website <onboarding@resend.dev>";

  await resend.emails.send({
    from,
    to,
    replyTo: lead.email,
    subject,
    text,
  });

  return { ok: true as const, skipped: false as const };
}
