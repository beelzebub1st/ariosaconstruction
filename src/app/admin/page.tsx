import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  FolderKanban,
  Headphones,
  ImageIcon,
  MapPin,
  MessageSquareQuote,
  Settings,
  TriangleAlert,
  Wrench,
} from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { isBlobConfigured, isDatabaseConfigured } from "@/lib/db";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let newLeads = 0;
  let totalLeads = 0;
  let projects = 0;
  let services = 0;
  let testimonials = 0;
  let areas = 0;
  let media = 0;
  let recent: Awaited<ReturnType<typeof prisma.lead.findMany>> = [];
  let dbOk = false;

  try {
    [newLeads, totalLeads, projects, services, testimonials, areas, media, recent] =
      await Promise.all([
        prisma.lead.count({ where: { status: "new" } }),
        prisma.lead.count(),
        prisma.project.count(),
        prisma.service.count(),
        prisma.testimonial.count(),
        prisma.serviceArea.count(),
        prisma.media.count(),
        prisma.lead.findMany({
          orderBy: { createdAt: "desc" },
          take: 8,
        }),
      ]);
    dbOk = true;
  } catch {
    dbOk = false;
  }

  const dbConfigured = isDatabaseConfigured();
  const blobOk = isBlobConfigured();

  const cards = [
    {
      label: "New leads",
      value: newLeads,
      href: "/admin/leads",
      hint: "Waiting for reply",
      icon: Headphones,
      accent: "bg-brick/10 text-brick",
    },
    {
      label: "Projects",
      value: projects,
      href: "/admin/projects",
      hint: "Gallery & before/after",
      icon: FolderKanban,
      accent: "bg-navy/8 text-navy",
    },
    {
      label: "Services",
      value: services,
      href: "/admin/services",
      hint: "Public service pages",
      icon: Wrench,
      accent: "bg-gold/15 text-navy",
    },
    {
      label: "Total leads",
      value: totalLeads,
      href: "/admin/leads",
      hint: "All inquiries",
      icon: Headphones,
      accent: "bg-stone text-navy",
    },
  ];

  const guides = [
    {
      href: "/admin/site-settings",
      title: "Site Settings",
      body: "Phone, email, hero, about, map, trust badges, social links.",
      icon: Settings,
      count: null as number | null,
    },
    {
      href: "/admin/projects",
      title: "Projects",
      body: "Photos, gallery, walkthrough video, featured & publish.",
      icon: FolderKanban,
      count: projects,
    },
    {
      href: "/admin/services",
      title: "Services",
      body: "Add or edit scopes shown on the public site.",
      icon: Wrench,
      count: services,
    },
    {
      href: "/admin/testimonials",
      title: "Testimonials",
      body: "Customer quotes on the homepage.",
      icon: MessageSquareQuote,
      count: testimonials,
    },
    {
      href: "/admin/service-areas",
      title: "Service Areas",
      body: "Cities on the map and footer.",
      icon: MapPin,
      count: areas,
    },
    {
      href: "/admin/media",
      title: "Media library",
      body: "Upload photos for projects and services.",
      icon: ImageIcon,
      count: media,
    },
  ];

  return (
    <AdminShell
      title="Dashboard"
      description="Edit everything on ariosaconstructionsllc.com from here."
    >
      <div className="mb-8 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-[0_20px_50px_-40px_rgba(12,24,41,0.5)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
                System status
              </p>
              <h2 className="mt-2 font-display text-xl font-bold text-navy">
                Website control center
              </h2>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brick"
            >
              View site <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            <StatusRow
              ok={dbOk}
              warn={dbConfigured && !dbOk}
              title="Database"
              okText="Connected — saves update the live site"
              warnText="Configured but unreachable — check Neon"
              badText="Not connected — set DATABASE_URL in Vercel"
            />
            <StatusRow
              ok={blobOk}
              title="Photo uploads"
              okText="Vercel Blob ready"
              badText="Add BLOB_READ_WRITE_TOKEN for durable uploads on Vercel"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-navy/10 bg-navy-dark p-6 text-white shadow-[0_20px_50px_-40px_rgba(12,24,41,0.7)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
            Quick login
          </p>
          <p className="mt-3 text-sm text-white/70">
            Use either email or username at{" "}
            <span className="text-white">/admin/login</span>
          </p>
          <dl className="mt-5 space-y-3 text-sm">
            <div>
              <dt className="text-white/45">Email</dt>
              <dd className="font-medium text-white">
                admin@ariosaconstructionsllc.com
              </dd>
            </div>
            <div>
              <dt className="text-white/45">Username</dt>
              <dd className="font-medium text-white">ariosaconstructions</dd>
            </div>
            <div>
              <dt className="text-white/45">Password</dt>
              <dd className="font-medium text-white">Your admin password</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group rounded-2xl border border-navy/10 bg-white p-5 shadow-[0_16px_40px_-36px_rgba(12,24,41,0.55)] transition hover:-translate-y-0.5 hover:border-navy/25"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${card.accent}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted opacity-0 transition group-hover:opacity-100" />
              </div>
              <div className="mt-4 text-xs font-bold uppercase tracking-wider text-muted">
                {card.label}
              </div>
              <div className="mt-1 font-display text-3xl font-bold text-navy">
                {card.value}
              </div>
              <div className="mt-1 text-xs text-muted">{card.hint}</div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8">
        <h2 className="font-display text-lg font-bold text-navy">Manage content</h2>
        <p className="mt-1 text-sm text-muted">
          Everything below edits the public website when the database is connected.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => {
            const Icon = g.icon;
            return (
              <Link
                key={g.href}
                href={g.href}
                className="group rounded-2xl border border-navy/10 bg-white p-5 transition hover:border-navy/25 hover:shadow-[0_18px_40px_-34px_rgba(12,24,41,0.5)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-stone text-navy">
                    <Icon className="h-4 w-4" />
                  </div>
                  {g.count !== null ? (
                    <span className="rounded-full bg-stone px-2.5 py-1 text-xs font-bold text-navy">
                      {g.count}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-navy group-hover:text-brick">
                  {g.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted">{g.body}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-navy/10 bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-xl font-semibold text-navy">Recent leads</h2>
          <Link href="/admin/leads" className="text-sm font-semibold text-brick">
            View all
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            No leads yet. Estimate requests from the site appear here.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-stone-dark">
            {recent.map((lead) => (
              <li
                key={lead.id}
                className="flex flex-wrap items-center justify-between gap-2 py-3.5 text-sm"
              >
                <div>
                  <div className="font-semibold text-navy">{lead.name}</div>
                  <div className="text-muted">
                    {lead.intent} · {lead.phone} · {lead.email}
                  </div>
                  <div className="mt-0.5 text-xs text-muted">
                    {format(lead.createdAt, "MMM d, yyyy · h:mm a")}
                  </div>
                </div>
                <span className="rounded-full bg-stone px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-navy">
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

function StatusRow({
  ok,
  warn,
  title,
  okText,
  warnText,
  badText,
}: {
  ok: boolean;
  warn?: boolean;
  title: string;
  okText: string;
  warnText?: string;
  badText: string;
}) {
  const state = ok ? "ok" : warn ? "warn" : "bad";
  return (
    <div className="flex items-start gap-3 rounded-xl border border-navy/8 bg-stone/60 px-4 py-3">
      {state === "ok" ? (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
      ) : (
        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-brick" />
      )}
      <div>
        <div className="text-sm font-semibold text-navy">{title}</div>
        <div className="text-sm text-muted">
          {state === "ok" ? okText : state === "warn" ? warnText : badText}
        </div>
      </div>
    </div>
  );
}
