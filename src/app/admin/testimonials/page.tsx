import { AdminShell } from "@/components/admin/AdminShell";
import { deleteTestimonial, saveTestimonial } from "@/lib/actions/admin";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  let items: {
    id: string;
    name: string;
    role: string;
    quote: string;
    rating: number;
    published: boolean;
    order: number;
  }[] = [];
  let dbOk = true;

  try {
    items = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  } catch {
    items = [];
    dbOk = false;
  }

  const editing = edit ? items.find((t) => t.id === edit) : null;

  return (
    <AdminShell title="Testimonials">
      {!dbOk && (
        <p className="mb-4 rounded border border-brick/30 bg-brick/5 px-4 py-3 text-sm text-brick">
          Database not connected — connect Neon (DATABASE_URL) to add and edit testimonials.
        </p>
      )}
      <form
        action={async (fd) => {
          "use server";
          if (editing?.id) fd.set("id", editing.id);
          await saveTestimonial(fd);
          redirect("/admin/testimonials");
        }}
        className="mb-8 max-w-2xl space-y-3 bg-white p-5 ring-1 ring-navy/10"
      >
        <h2 className="font-display text-lg font-semibold text-navy">
          {editing ? "Edit testimonial" : "Add testimonial"}
        </h2>
        {editing && <input type="hidden" name="id" value={editing.id} />}
        <input
          name="name"
          required
          placeholder="Name"
          defaultValue={editing?.name}
          className="w-full rounded border border-navy/15 px-3 py-2"
        />
        <input
          name="role"
          required
          placeholder="Role / location"
          defaultValue={editing?.role}
          className="w-full rounded border border-navy/15 px-3 py-2"
        />
        <textarea
          name="quote"
          required
          rows={3}
          placeholder="Quote"
          defaultValue={editing?.quote}
          className="w-full rounded border border-navy/15 px-3 py-2"
        />
        <div className="flex flex-wrap gap-3">
          <input
            name="rating"
            type="number"
            min={1}
            max={5}
            defaultValue={editing?.rating ?? 5}
            className="w-24 rounded border border-navy/15 px-3 py-2"
          />
          <input
            name="order"
            type="number"
            defaultValue={editing?.order ?? 0}
            className="w-24 rounded border border-navy/15 px-3 py-2"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="published"
            defaultChecked={editing?.published ?? true}
          />{" "}
          Published
        </label>
        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded bg-brick px-4 py-2 text-sm font-semibold text-white"
          >
            {editing ? "Save changes" : "Add testimonial"}
          </button>
          {editing && (
            <a href="/admin/testimonials" className="text-sm font-semibold text-muted underline">
              Cancel
            </a>
          )}
        </div>
      </form>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-muted">No testimonials yet.</p>
        ) : (
          items.map((t) => (
            <div key={t.id} className="bg-white p-4 ring-1 ring-navy/10">
              <div className="font-semibold text-navy">{t.name}</div>
              <div className="text-xs text-muted">{t.role}</div>
              <p className="mt-2 text-sm">{t.quote}</p>
              <div className="mt-2 flex gap-4">
                <a
                  href={`/admin/testimonials?edit=${t.id}`}
                  className="text-sm font-semibold text-navy underline"
                >
                  Edit
                </a>
                <form
                  action={async () => {
                    "use server";
                    await deleteTestimonial(t.id);
                  }}
                >
                  <button type="submit" className="text-sm font-semibold text-brick">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminShell>
  );
}
