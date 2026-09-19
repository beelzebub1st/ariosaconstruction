"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  try {
    const result = await signIn("credentials", {
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
      redirect: false,
    });

    if (result && typeof result === "object" && "error" in result && result.error) {
      return { ok: false as const, error: "Invalid email or password" };
    }

    return { ok: true as const };
  } catch (error) {
    if (error instanceof AuthError) {
      return { ok: false as const, error: "Invalid email or password" };
    }
    const digest =
      error && typeof error === "object" && "digest" in error
        ? String((error as { digest?: string }).digest)
        : "";
    if (digest.startsWith("NEXT_REDIRECT")) throw error;
    console.error("[loginAction]", error);
    return { ok: false as const, error: "Login failed. Please try again." };
  }
}
