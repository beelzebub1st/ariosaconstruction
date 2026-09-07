import { AdminShell } from "@/components/admin/AdminShell";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  let media: { id: string; url: string; filename: string | null; createdAt: Date }[] = [];
  try {
    media = await prisma.media.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  } catch {
    media = [];
  }

  return (
    <AdminShell title="Media">
      <div className="mb-8 max-w-xl bg-white p-5 ring-1 ring-navy/10">
        <h2 className="font-display text-lg font-semibold text-navy">Upload image</h2>
        <p className="mt-1 text-sm text-muted">
          Requires BLOB_READ_WRITE_TOKEN on Vercel. You can also paste image URLs in project forms.
        </p>
        <div className="mt-4">
          <ImageUploadField name="unused" label="Upload" />
        </div>
      </div>

      {media.length === 0 ? (
        <p className="text-sm text-muted">No media indexed yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {media.map((m) => (
            <div key={m.id} className="bg-white p-3 ring-1 ring-navy/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.url} alt={m.filename || ""} className="h-40 w-full object-cover" />
              <p className="mt-2 break-all text-xs text-muted">{m.url}</p>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
