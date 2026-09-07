"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { loginAction } from "@/lib/actions/auth";

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const result = await loginAction(form);
    setPending(false);
    if (!result.ok) {
      setError(result.error || "Login failed");
      return;
    }
    router.push(searchParams.get("callbackUrl") || "/admin");
    router.refresh();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md bg-white p-8 shadow-sm ring-1 ring-navy/10"
    >
      <h1 className="font-display text-2xl font-bold text-navy">Admin Login</h1>
      <p className="mt-2 text-sm text-muted">
        Sign in to manage leads, projects, and site content.
      </p>
      <label className="mt-6 block text-sm">
        <span className="mb-1.5 block font-medium text-navy">Email</span>
        <input
          name="email"
          type="email"
          required
          defaultValue="admin@ariosaconstructions.com"
          className="w-full rounded-md border border-navy/15 px-3 py-2.5"
        />
      </label>
      <label className="mt-4 block text-sm">
        <span className="mb-1.5 block font-medium text-navy">Password</span>
        <input
          name="password"
          type="password"
          required
          className="w-full rounded-md border border-navy/15 px-3 py-2.5"
        />
      </label>
      {error && <p className="mt-3 text-sm text-brick">{error}</p>}
      <Button type="submit" className="mt-6 w-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
