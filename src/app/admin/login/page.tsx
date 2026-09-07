import { Suspense } from "react";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { auth } from "@/lib/auth";

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Suspense fallback={<div className="text-muted">Loading…</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
