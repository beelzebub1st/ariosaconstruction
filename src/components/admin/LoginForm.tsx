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
    <div className="w-full max-w-md">
      <div className="mb-6 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
          Ariosa & Constructions
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-navy">Admin Login</h1>
        <p className="mt-2 text-sm text-muted">
          Manage leads, projects, photos, and site content.
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="rounded-2xl bg-white p-8 shadow-[0_30px_60px_-40px_rgba(12,24,41,0.55)] ring-1 ring-navy/10"
      >
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-navy">
            Email or username
          </span>
          <input
            name="email"
            type="text"
            required
            autoComplete="username"
            defaultValue="admin@ariosaconstructionsllc.com"
            placeholder="admin@… or ariosaconstructions"
            className="w-full rounded-lg border border-navy/15 px-3 py-2.5 outline-none focus:border-navy"
          />
        </label>
        <label className="mt-4 block text-sm">
          <span className="mb-1.5 block font-medium text-navy">Password</span>
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full rounded-lg border border-navy/15 px-3 py-2.5 outline-none focus:border-navy"
          />
        </label>
        {error && <p className="mt-3 text-sm text-brick">{error}</p>}
        <Button type="submit" className="mt-6 w-full" disabled={pending}>
          {pending ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
