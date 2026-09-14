import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { saveSiteSettings } from "@/lib/actions/admin";
import { getSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function SiteSettingsPage() {
  const settings = await getSettings();

  return (
    <AdminShell title="Site Settings">
      <p className="mb-6 max-w-2xl text-sm text-muted">
        Update phone, email, address, map, hero copy, and about text. Changes appear
        on the public site after save (requires database connection).
      </p>
      <form
        action={async (fd) => {
          "use server";
          await saveSiteSettings(fd);
          redirect("/admin/site-settings");
        }}
        className="max-w-2xl space-y-4 bg-white p-6 ring-1 ring-navy/10"
      >
        <Field name="companyName" label="Company name" defaultValue={settings.companyName} />
        <Field name="tagline" label="Tagline" defaultValue={settings.tagline} />
        <Field name="phone" label="Phone" defaultValue={settings.phone} />
        <Field name="email" label="Email" defaultValue={settings.email} />
        <Field name="serviceArea" label="Service area" defaultValue={settings.serviceArea} />
        <Field name="address" label="Address / city for map" defaultValue={settings.address} />
        <Field
          name="mapEmbedUrl"
          label="Google Maps embed URL"
          defaultValue={settings.mapEmbedUrl}
        />
        <p className="-mt-2 text-xs text-muted">
          Tip: open Google Maps → Share → Embed a map → copy the iframe src URL.
        </p>
        <Field name="yearsExperience" label="Experience label (shown on site)" defaultValue={settings.yearsExperience} />
        <Field name="trustBadges" label="Trust badges (pipe-separated)" defaultValue={settings.trustBadges} />
        <Field name="heroHeadline" label="Hero headline" defaultValue={settings.heroHeadline} />
        <Field name="heroSubheadline" label="Hero subheadline" defaultValue={settings.heroSubheadline} />
        <ImageUploadField name="heroImageUrl" label="Hero image" defaultValue={settings.heroImageUrl} />
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-navy">About short</span>
          <textarea name="aboutShort" rows={3} defaultValue={settings.aboutShort} className="w-full rounded-md border border-navy/15 px-3 py-2.5" />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-navy">About long</span>
          <textarea name="aboutLong" rows={5} defaultValue={settings.aboutLong} className="w-full rounded-md border border-navy/15 px-3 py-2.5" />
        </label>
        <Field name="facebookUrl" label="Facebook URL" defaultValue={settings.facebookUrl || ""} />
        <Field name="instagramUrl" label="Instagram URL" defaultValue={settings.instagramUrl || ""} />
        <Field name="googleUrl" label="Google Business URL" defaultValue={settings.googleUrl || ""} />
        <button type="submit" className="rounded-md bg-brick px-4 py-2.5 text-sm font-semibold text-white">
          Save settings
        </button>
      </form>
    </AdminShell>
  );
}

function Field({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-navy">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-md border border-navy/15 px-3 py-2.5"
      />
    </label>
  );
}
