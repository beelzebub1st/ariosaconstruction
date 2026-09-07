import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let newLeads = 0;
  let totalLeads = 0;
  let projects = 0;
  let services = 0;
  let recent: Awaited<ReturnType<typeof prisma.lead.findMany>> = [];
  let dbOk = false;

  try {
    [newLeads, totalLeads, projects, services, recent] = await Promise.all([
      prisma.lead.count({ where: { status: "new" } }),
      prisma.lead.count(),
      prisma.project.count(),
      prisma.service.count(),
      prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
      }),
    ]);
    dbOk = true;
  } catch {
    dbOk = false;
  }

  const cards = [
    { label: "New leads", value: newLeads, href: "/admin/leads", hint: "Estimate requests" },
    { label: "Total leads", value: totalLeads, href: "/admin/leads", hint: "All inquiries" },
    { label: "Projects", value: projects, href: "/admin/projects", hint: "Gallery / before-after" },
    { label: "Services", value: services, href: "/admin/services", hint: "Service pages" },
  ];

  const guides = [
    {
      href: "/admin/site-settings",
      title: "Site Settings",
      body: "Phone, email, address, map embed, hero headline, about copy, trust badges.",
    },
    {
      href: "/admin/projects",
      title: "Projects",
      body: "Add/edit projects, before & after photos, featured flag, publish/unpublish.",
    },
    {
      href: "/admin/services",
      title: "Services",
      body: "Add/edit services with images, descriptions, order, and publish status.",
    },
    {
      href: "/admin/testimonials",
      title: "Testimonials",
      body: "Customer quotes shown on the homepage.",
    },
    {
      href: "/admin/leads",
      title: "Leads inbox",
      body: "Estimate and contact requests from the website popup and forms.",
    },
    {
      href: "/admin/media",
      title: "Media",
      body: "Upload images to Vercel Blob (needs BLOB_READ_WRITE_TOKEN).",
    },
  ];

  return (
    <AdminShell title="Dashboard">
      <div className="mb-8 border border-navy/10 bg-white p-5">
        <h2 className="font-display text-lg font-bold text-navy">
          How to manage this website
        </h2>
        <p className="mt-2 text-sm text-muted">
          Login:{" "}
          <code className="bg-stone px-1.5 py-0.5 text-navy">
            /admin/login
          </code>{" "}
          · Default:{" "}
          <code className="bg-stone px-1.5 py-0.5 text-navy">
            admin@ariosaconstructions.com
          </code>{" "}
          /{" "}
          <code className="bg-stone px-1.5 py-0.5 text-navy">
            ariosa-admin-change-me
          </code>
        </p>
        <p className="mt-2 text-sm text-muted">
          Database status:{" "}
          <span className={dbOk ? "font-semibold text-navy" : "font-semibold text-brick"}>
            {dbOk
              ? "Connected — CMS saves will update the live site."
              : "Hardcoded mode — public site uses src/lib/seed-data.ts. Set USE_DATABASE=true, DATABASE_URL, then db:push + db:seed to enable CMS."}
          </span>
        </p>
        <Link href="/" className="mt-3 inline-block text-sm font-semibold text-brick">
          ← View public website
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white p-5 ring-1 ring-navy/10 transition hover:ring-navy/25"
          >
            <div className="text-xs font-bold uppercase tracking-wider text-muted">
              {card.label}
            </div>
            <div className="mt-2 font-display text-3xl font-bold text-navy">
              {card.value}
            </div>
            <div className="mt-1 text-xs text-muted">{card.hint}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((g) => (
          <Link
            key={g.href}
            href={g.href}
            className="border border-navy/10 bg-white p-5 transition hover:border-navy/30"
          >
            <h3 className="font-display text-lg font-bold text-navy">{g.title}</h3>
            <p className="mt-2 text-sm text-muted">{g.body}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-white p-5 ring-1 ring-navy/10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-navy">
            Recent leads
          </h2>
          <Link href="/admin/leads" className="text-sm font-semibold text-brick">
            View all
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            No leads yet. When visitors submit the estimate popup, they show up here.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-stone-dark">
            {recent.map((lead) => (
              <li
                key={lead.id}
                className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"
              >
                <div>
                  <div className="font-semibold text-navy">{lead.name}</div>
                  <div className="text-muted">
                    {lead.intent} · {lead.phone} · {lead.email}
                  </div>
                </div>
                <span className="rounded bg-stone px-2 py-1 text-xs font-semibold uppercase">
                  {lead.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminShell>
  );
}
