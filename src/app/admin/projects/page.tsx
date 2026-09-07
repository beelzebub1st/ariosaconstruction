import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { deleteProject } from "@/lib/actions/admin";
import { prisma } from "@/lib/prisma";
import { FALLBACK_PROJECTS } from "@/lib/seed-data";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  let projects: {
    id: string;
    title: string;
    slug: string;
    category: string;
    featured: boolean;
    published: boolean;
  }[] = [];

  try {
    projects = await prisma.project.findMany({ orderBy: { updatedAt: "desc" } });
  } catch {
    projects = FALLBACK_PROJECTS;
  }

  return (
    <AdminShell title="Projects">
      <div className="mb-4">
        <Link
          href="/admin/projects/new"
          className="inline-flex rounded-md bg-brick px-4 py-2 text-sm font-semibold text-white"
        >
          Add project
        </Link>
      </div>
      <div className="overflow-x-auto bg-white ring-1 ring-navy/10">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-stone-dark bg-stone/50">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Flags</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-stone-dark/60">
                <td className="px-4 py-3 font-medium text-navy">{p.title}</td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3 text-muted">
                  {p.published ? "Published" : "Draft"}
                  {p.featured ? " · Featured" : ""}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/projects/${p.id}`}
                      className="font-semibold text-navy"
                    >
                      Edit
                    </Link>
                    {!p.id.startsWith("seed-") && (
                      <form
                        action={async () => {
                          "use server";
                          await deleteProject(p.id);
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
