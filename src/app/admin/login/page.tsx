import { Suspense } from "react";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { auth } from "@/lib/auth";

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(160deg,#0c1829_0%,#16263a_42%,#3a1f1f_100%)] px-4 py-12">
      <Suspense fallback={<div className="text-white/70">Loading…</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
