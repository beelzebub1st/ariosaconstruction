import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { deleteService } from "@/lib/actions/admin";
import { prisma } from "@/lib/prisma";
import { FALLBACK_SERVICES } from "@/lib/seed-data";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  let services: {
    id: string;
    title: string;
    slug: string;
    published: boolean;
    order: number;
    imageUrl?: string | null;
  }[] = [];

  try {
    services = await prisma.service.findMany({ orderBy: { order: "asc" } });
  } catch {
    services = FALLBACK_SERVICES;
  }

  return (
    <AdminShell title="Services">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          Add services, upload images, reorder, and publish to the site.
        </p>
        <Link
          href="/admin/services/new"
          className="inline-flex rounded-md bg-brick px-4 py-2 text-sm font-semibold text-white"
        >
          Add service
        </Link>
      </div>
      <div className="overflow-x-auto bg-white ring-1 ring-navy/10">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-stone-dark bg-stone/50">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-b border-stone-dark/60">
                <td className="px-4 py-3">
                  {s.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={s.imageUrl}
                      alt=""
                      className="h-12 w-16 object-cover"
                    />
                  ) : (
                    <span className="text-xs text-muted">No image</span>
                  )}
                </td>
                <td className="px-4 py-3 font-medium text-navy">{s.title}</td>
                <td className="px-4 py-3 text-muted">{s.slug}</td>
                <td className="px-4 py-3">{s.order}</td>
                <td className="px-4 py-3">
                  {s.published ? "Published" : "Draft"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/services/${s.id}`}
                      className="font-semibold text-navy"
                    >
                      Edit
                    </Link>
                    {!s.id.startsWith("seed-") && (
                      <form
                        action={async () => {
                          "use server";
                          await deleteService(s.id);
                        }}
                      >
                        <button type="submit" className="font-semibold text-brick">
                          Delete
                        </button>
                      </form>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
