"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { cn } from "@/lib/utils";

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

export function AdminNav({
  email,
  signOutAction,
}: {
  email?: string | null;
  signOutAction: () => Promise<void>;
}) {
  const pathname = usePathname();

  return (
    <>
      <div className="relative border-b border-white/10 px-5 py-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
          Content CMS
        </p>
        <div className="mt-2 font-display text-xl font-bold tracking-tight">
          Ariosa Admin
        </div>
        {email ? (
          <div className="mt-2 truncate text-xs text-white/55">{email}</div>
        ) : null}
      </div>

      <nav className="relative flex gap-1 overflow-x-auto px-3 py-4 md:flex-col md:overflow-visible">
        {links.map((link) => {
          const Icon = link.icon;
          const active =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-white/12 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                  : "text-white/70 hover:bg-white/8 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4 shrink-0 opacity-80" />
              {link.label}
            </Link>
          );
        })}

        <div className="mt-2 hidden border-t border-white/10 pt-3 md:block" />

        <Link
          href="/"
          className="flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium text-gold hover:bg-white/8"
        >
          <ExternalLink className="h-4 w-4" />
          View live site
        </Link>
        <form action={signOutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white/50 hover:bg-white/8 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </form>
      </nav>
    </>
  );
}
