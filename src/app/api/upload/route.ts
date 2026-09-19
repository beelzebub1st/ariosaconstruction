import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/** Max size for Neon-stored uploads (Hobby-safe). Blob can be larger. */
const MAX_NEON_BYTES = 2.5 * 1024 * 1024;

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

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const key = `ariosa/${Date.now()}-${safeName}`;
  const mimeType = file.type || "application/octet-stream";
  const buffer = Buffer.from(await file.arrayBuffer());

  // Prefer Vercel Blob when configured
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(key, buffer, {
      access: "public",
      contentType: mimeType,
    });
    try {
      await prisma.media.create({
        data: {
          url: blob.url,
          filename: file.name,
          alt: file.name,
          mimeType,
        },
      });
    } catch {
      // index optional
    }
    return NextResponse.json({ url: blob.url });
  }

  // Neon fallback — image bytes live in Postgres, served via /api/media/[id]
  if (buffer.length > MAX_NEON_BYTES) {
    return NextResponse.json(
      {
        error:
          "File too large for database storage (max ~2.5MB). Create a Vercel Blob store (Storage → Blob) or upload a smaller image.",
      },
      { status: 413 }
    );
  }

  try {
    const media = await prisma.media.create({
      data: {
        url: "", // filled after we know the id
        filename: file.name,
        alt: file.name,
        mimeType,
        bytes: buffer,
      },
    });
    const url = `/api/media/${media.id}`;
    await prisma.media.update({
      where: { id: media.id },
      data: { url },
    });
    return NextResponse.json({ url });
  } catch (err) {
    console.error("[upload:neon]", err);
    return NextResponse.json(
      {
        error:
          "Could not store file. Connect DATABASE_URL or create a Vercel Blob store.",
      },
      { status: 503 }
    );
  }
}
