import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.redirect(new URL("/admin/login", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
  }
  // middleware handles most redirects; this is a helper endpoint if needed
  return NextResponse.json({ ok: true, user: session.user.email });
}
