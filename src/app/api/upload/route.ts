import { put } from "@vercel/blob";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
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

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const key = `ariosa/${Date.now()}-${safeName}`;
  let url: string;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(key, file, { access: "public" });
    url = blob.url;
  } else {
    // Local / non-Blob fallback — files land in public/uploads
    const bytes = Buffer.from(await file.arrayBuffer());
    const dir = path.join(process.cwd(), "public", "uploads");
    await mkdir(dir, { recursive: true });
    const filename = `${Date.now()}-${safeName}`;
    await writeFile(path.join(dir, filename), bytes);
    url = `/uploads/${filename}`;
  }

  try {
    await prisma.media.create({
      data: {
        url,
        filename: file.name,
        alt: file.name,
      },
    });
  } catch {
    // Media index is optional if DB is unavailable
  }

  return NextResponse.json({ url });
}
