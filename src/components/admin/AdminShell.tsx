import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/site-settings", label: "Site Settings" },
  { href: "/admin/media", label: "Media" },
];

export async function AdminShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_1fr]">
      <aside className="border-b border-navy/10 bg-navy-dark text-white md:min-h-screen md:border-b-0 md:border-r md:border-white/10">
        <div className="px-5 py-5">
          <div className="font-display text-lg font-bold">Ariosa Admin</div>
          <div className="mt-1 truncate text-xs text-white/60">
            {session.user.email}
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-4 md:flex-col">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/"
            className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-gold hover:bg-white/10"
          >
            View site
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white"
            >
              Sign out
            </button>
          </form>
        </nav>
      </aside>
      <div className="p-5 sm:p-8">
        <h1 className="font-display text-3xl font-bold text-navy">{title}</h1>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
