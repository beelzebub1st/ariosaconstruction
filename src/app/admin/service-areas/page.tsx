import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { deleteServiceArea, saveServiceArea } from "@/lib/actions/admin";
import { prisma } from "@/lib/prisma";
import { SERVICE_AREA_LOCATIONS } from "@/lib/service-areas";

export const dynamic = "force-dynamic";

export default async function AdminServiceAreasPage() {
  let items: {
    id: string;
    name: string;
    lat: number;
    lng: number;
    hub: boolean;
    order: number;
    published: boolean;
  }[] = [];
  let dbOk = true;

  try {
    items = await prisma.serviceArea.findMany({ orderBy: { order: "asc" } });
  } catch {
    items = [];
    dbOk = false;
  }

  return (
    <AdminShell title="Service Areas">
      <p className="mb-6 max-w-2xl text-sm text-muted">
        Cities shown on the map and footer. Latitude/longitude control map pins.
      </p>
      {!dbOk && (
        <p className="mb-4 rounded border border-brick/30 bg-brick/5 px-4 py-3 text-sm text-brick">
          Database not connected. Seed defaults are used on the public site until Neon is
          configured. After connecting, click &quot;Import defaults&quot; or add cities below.
        </p>
      )}

      {dbOk && items.length === 0 && (
        <form
          action={async () => {
            "use server";
            const { prisma } = await import("@/lib/prisma");
            await prisma.serviceArea.createMany({
              data: SERVICE_AREA_LOCATIONS.map((city, i) => ({
                name: city.name,
                lat: city.lat,
                lng: city.lng,
                hub: Boolean("hub" in city && city.hub),
                order: i,
                published: true,
              })),
              skipDuplicates: true,
            });
            redirect("/admin/service-areas");
          }}
          className="mb-6"
        >
          <button
            type="submit"
            className="rounded bg-navy px-4 py-2 text-sm font-semibold text-white"
          >
            Import default SWFL cities
          </button>
        </form>
      )}

      <form
        action={async (fd) => {
          "use server";
          await saveServiceArea(fd);
          redirect("/admin/service-areas");
        }}
        className="mb-8 max-w-2xl space-y-3 bg-white p-5 ring-1 ring-navy/10"
      >
        <h2 className="font-display text-lg font-semibold text-navy">Add city</h2>
        <input
          name="name"
          required
          placeholder="City name"
          className="w-full rounded border border-navy/15 px-3 py-2"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            name="lat"
            required
            type="number"
            step="any"
            placeholder="Latitude"
            className="w-full rounded border border-navy/15 px-3 py-2"
          />
          <input
            name="lng"
            required
            type="number"
            step="any"
            placeholder="Longitude"
            className="w-full rounded border border-navy/15 px-3 py-2"
          />
        </div>
        <input
          name="order"
          type="number"
          defaultValue={items.length}
          className="w-24 rounded border border-navy/15 px-3 py-2"
        />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="hub" /> Hub city
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="published" defaultChecked /> Published
        </label>
        <button
          type="submit"
          className="rounded bg-brick px-4 py-2 text-sm font-semibold text-white"
        >
          Add city
        </button>
      </form>

      <div className="space-y-3">
        {items.map((city) => (
          <div
            key={city.id}
            className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 ring-1 ring-navy/10"
          >
            <div>
              <div className="font-semibold text-navy">
                {city.name}
                {city.hub ? (
                  <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-gold">
                    Hub
                  </span>
                ) : null}
              </div>
              <div className="text-xs text-muted">
                {city.lat}, {city.lng} · order {city.order}
                {!city.published ? " · unpublished" : ""}
              </div>
            </div>
            <form
              action={async () => {
                "use server";
                await deleteServiceArea(city.id);
              }}
            >
              <button type="submit" className="text-sm font-semibold text-brick">
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
