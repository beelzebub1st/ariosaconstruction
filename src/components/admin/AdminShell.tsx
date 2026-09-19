import Link from "next/link";
import {
  ExternalLink,
  FolderKanban,
  Headphones,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  MapPin,
  MessageSquareQuote,
  Settings,
  Wrench,
} from "lucide-react";
import { AdminNavLink } from "@/components/admin/AdminNavLink";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Headphones },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/service-areas", label: "Service Areas", icon: MapPin },
  { href: "/admin/site-settings", label: "Site Settings", icon: Settings },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
];

export async function AdminShell({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[linear-gradient(160deg,#f7f4ef_0%,#eef2f6_45%,#f5f0ea_100%)] md:grid md:grid-cols-[260px_1fr]">
      <aside className="relative overflow-hidden border-b border-white/10 bg-[#0c1829] text-white md:min-h-screen md:border-b-0">
        <div className="pointer-events-none absolute -left-16 top-24 h-48 w-48 rounded-full bg-brick/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-20 h-40 w-40 rounded-full bg-gold/15 blur-3xl" />

        <div className="relative border-b border-white/10 px-5 py-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
            Content CMS
          </p>
          <div className="mt-2 font-display text-xl font-bold tracking-tight">
            Ariosa Admin
          </div>
          <div className="mt-2 truncate text-xs text-white/55">
            {session.user.email}
          </div>
        </div>

        <nav className="relative flex gap-1 overflow-x-auto px-3 py-4 md:flex-col md:overflow-visible">
          {links.map((link) => (
            <AdminNavLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
            />
          ))}

          <div className="mt-2 hidden border-t border-white/10 pt-3 md:block" />

          <Link
            href="/"
            className="flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium text-gold hover:bg-white/8"
          >
            <ExternalLink className="h-4 w-4" />
            View live site
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white/50 hover:bg-white/8 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </nav>
      </aside>

      <div className="relative">
        <header className="border-b border-navy/8 bg-white/70 px-5 py-5 backdrop-blur-md sm:px-8">
          <h1 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-1.5 max-w-2xl text-sm text-muted">{description}</p>
          ) : null}
        </header>
        <div className="p-5 sm:p-8">{children}</div>
      </div>
    </div>
  );
}
