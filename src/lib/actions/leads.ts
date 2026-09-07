"use server";

import { leadSchema } from "@/lib/validations";
import { sendLeadNotification } from "@/lib/email";
import { revalidatePath } from "next/cache";

export type ActionResult = {
  ok: boolean;
  error?: string;
  id?: string;
};

/**
 * Saves leads when USE_DATABASE=true + DATABASE_URL are set.
 * Otherwise notifies/logs only — site works fully without a database.
 */
export async function submitLead(raw: unknown): Promise<ActionResult> {
  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message || "Invalid form data",
    };
  }

  const data = parsed.data;
  let leadId = `local-${Date.now()}`;

  if (process.env.USE_DATABASE === "true" && process.env.DATABASE_URL) {
    try {
      const { prisma } = await import("@/lib/prisma");
      const lead = await prisma.lead.create({
        data: {
          name: data.name,
          phone: data.phone,
          email: data.email,
          role: data.role,
          intent: data.intent,
          serviceInterest: data.serviceInterest || null,
          projectRef: data.projectRef || null,
          addressArea: data.addressArea || null,
          budgetRange: data.budgetRange || null,
          message: data.message || null,
          photoUrl: data.photoUrl || null,
          sourcePage: data.sourcePage || null,
        },
      });
      leadId = lead.id;
      revalidatePath("/admin");
      revalidatePath("/admin/leads");
    } catch (err) {
      console.error("submitLead DB skipped/failed:", err);
    }
  }

  try {
    await sendLeadNotification({ ...data, id: leadId });
  } catch (emailErr) {
    console.error("submitLead email:", emailErr);
    // Still succeed — lead is logged; user can call/text
    console.log("[lead]", JSON.stringify({ ...data, id: leadId }, null, 2));
  }

  return { ok: true, id: leadId };
}
