import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";

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

  async function signOutAction() {
    "use server";
    await signOut({ redirectTo: "/admin/login" });
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(160deg,#f7f4ef_0%,#eef2f6_45%,#f5f0ea_100%)] md:grid md:grid-cols-[260px_1fr]">
      <aside className="relative overflow-hidden border-b border-white/10 bg-[#0c1829] text-white md:min-h-screen md:border-b-0">
        <div className="pointer-events-none absolute -left-16 top-24 h-48 w-48 rounded-full bg-brick/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-20 h-40 w-40 rounded-full bg-gold/15 blur-3xl" />
        <AdminNav email={session.user.email} signOutAction={signOutAction} />
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
