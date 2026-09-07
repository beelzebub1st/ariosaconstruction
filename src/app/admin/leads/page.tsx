import { AdminShell } from "@/components/admin/AdminShell";
import { updateLeadStatus } from "@/lib/actions/admin";
import { prisma } from "@/lib/prisma";
import type { LeadStatus } from "@prisma/client";

export const dynamic = "force-dynamic";

const statuses: LeadStatus[] = ["new", "contacted", "quoted", "won", "lost"];

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  let leads: Awaited<ReturnType<typeof prisma.lead.findMany>> = [];

  try {
    leads = await prisma.lead.findMany({
      where:
        status && statuses.includes(status as LeadStatus)
          ? { status: status as LeadStatus }
          : undefined,
      orderBy: { createdAt: "desc" },
    });
  } catch {
    leads = [];
  }

  return (
    <AdminShell title="Leads">
      <div className="mb-4 flex flex-wrap gap-2">
        <a
          href="/admin/leads"
          className="rounded bg-white px-3 py-1.5 text-sm font-semibold ring-1 ring-navy/15"
        >
          All
        </a>
        {statuses.map((s) => (
          <a
            key={s}
            href={`/admin/leads?status=${s}`}
            className="rounded bg-white px-3 py-1.5 text-sm font-semibold capitalize ring-1 ring-navy/15"
          >
            {s}
          </a>
        ))}
      </div>

      {leads.length === 0 ? (
        <p className="text-sm text-muted">No leads found.</p>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <article
              key={lead.id}
              className="bg-white p-5 ring-1 ring-navy/10"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-semibold text-navy">
                    {lead.name}
                  </h2>
                  <p className="text-sm text-muted">
                    {lead.intent} · {lead.role} ·{" "}
                    {lead.createdAt.toLocaleString()}
                  </p>
                  <p className="mt-2 text-sm">
                    <a className="text-navy underline" href={`tel:${lead.phone}`}>
                      {lead.phone}
                    </a>{" "}
                    ·{" "}
                    <a className="text-navy underline" href={`mailto:${lead.email}`}>
                      {lead.email}
                    </a>
                  </p>
                  {(lead.serviceInterest || lead.projectRef || lead.addressArea) && (
                    <p className="mt-2 text-sm text-muted">
                      {[lead.serviceInterest, lead.projectRef, lead.addressArea]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  )}
                  {lead.message && (
                    <p className="mt-2 text-sm text-charcoal">{lead.message}</p>
                  )}
                </div>
                <form
                  action={async (fd) => {
                    "use server";
                    await updateLeadStatus(
                      lead.id,
                      String(fd.get("status")) as LeadStatus,
                      String(fd.get("notes") || "") || undefined
                    );
                  }}
                  className="min-w-[200px] space-y-2"
                >
                  <select
                    name="status"
                    defaultValue={lead.status}
                    className="w-full rounded border border-navy/15 px-2 py-2 text-sm"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <textarea
                    name="notes"
                    defaultValue={lead.notes || ""}
                    placeholder="Notes"
                    rows={2}
                    className="w-full rounded border border-navy/15 px-2 py-2 text-sm"
                  />
                  <button
                    type="submit"
                    className="rounded bg-navy px-3 py-2 text-sm font-semibold text-white"
                  >
                    Update
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
