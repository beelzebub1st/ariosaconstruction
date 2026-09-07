import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "BLOB_READ_WRITE_TOKEN is not configured. Add it in Vercel project settings.",
      },
      { status: 503 }
    );
  }

  const blob = await put(`ariosa/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  try {
    await prisma.media.create({
      data: {
        url: blob.url,
        filename: file.name,
        alt: file.name,
      },
    });
  } catch {
    // Media index is optional if DB is unavailable
  }

  return NextResponse.json({ url: blob.url });
}
