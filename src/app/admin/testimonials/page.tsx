import { AdminShell } from "@/components/admin/AdminShell";
import { deleteTestimonial, saveTestimonial } from "@/lib/actions/admin";
import { prisma } from "@/lib/prisma";
import { FALLBACK_TESTIMONIALS } from "@/lib/seed-data";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  let items: {
    id: string;
    name: string;
    role: string;
    quote: string;
    rating: number;
    published: boolean;
    order: number;
  }[] = [];

  try {
    items = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  } catch {
    items = FALLBACK_TESTIMONIALS;
  }

  return (
    <AdminShell title="Testimonials">
      <form
        action={async (fd) => {
          "use server";
          await saveTestimonial(fd);
          redirect("/admin/testimonials");
        }}
        className="mb-8 max-w-2xl space-y-3 bg-white p-5 ring-1 ring-navy/10"
      >
        <h2 className="font-display text-lg font-semibold text-navy">Add testimonial</h2>
        <input name="name" required placeholder="Name" className="w-full rounded border border-navy/15 px-3 py-2" />
        <input name="role" required placeholder="Role / location" className="w-full rounded border border-navy/15 px-3 py-2" />
        <textarea name="quote" required rows={3} placeholder="Quote" className="w-full rounded border border-navy/15 px-3 py-2" />
        <input name="rating" type="number" min={1} max={5} defaultValue={5} className="w-24 rounded border border-navy/15 px-3 py-2" />
        <input name="order" type="number" defaultValue={0} className="w-24 rounded border border-navy/15 px-3 py-2" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" defaultChecked /> Published
        </label>
        <button type="submit" className="rounded bg-brick px-4 py-2 text-sm font-semibold text-white">
          Save
        </button>
      </form>

      <div className="space-y-3">
        {items.map((t) => (
          <div key={t.id} className="bg-white p-4 ring-1 ring-navy/10">
            <div className="font-semibold text-navy">{t.name}</div>
            <div className="text-xs text-muted">{t.role}</div>
            <p className="mt-2 text-sm">{t.quote}</p>
            {!t.id.startsWith("seed-") && (
              <form
                action={async () => {
                  "use server";
                  await deleteTestimonial(t.id);
                }}
                className="mt-2"
              >
                <button type="submit" className="text-sm font-semibold text-brick">
                  Delete
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
