import { redirect } from "next/navigation";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { saveService } from "@/lib/actions/admin";

export function ServiceAdminForm({
  defaults,
}: {
  defaults?: {
    id?: string;
    title?: string;
    slug?: string;
    summary?: string;
    body?: string;
    icon?: string;
    imageUrl?: string | null;
    order?: number;
    published?: boolean;
  };
}) {
  return (
    <form
      action={async (fd) => {
        "use server";
        if (defaults?.id) fd.set("id", defaults.id);
        await saveService(fd);
        redirect("/admin/services");
      }}
      className="max-w-2xl space-y-4 bg-white p-6 ring-1 ring-navy/10"
    >
      {defaults?.id && <input type="hidden" name="id" value={defaults.id} />}
      <Field name="title" label="Title" required defaultValue={defaults?.title} />
      <Field name="slug" label="Slug (optional)" defaultValue={defaults?.slug} />
      <Field name="summary" label="Summary" required defaultValue={defaults?.summary} />
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-navy">Body</span>
        <textarea
          name="body"
          required
          rows={6}
          defaultValue={defaults?.body}
          className="w-full rounded-md border border-navy/15 px-3 py-2.5"
        />
      </label>
      <ImageUploadField
        name="imageUrl"
        label="Service image"
        defaultValue={defaults?.imageUrl}
      />
      <Field name="icon" label="Icon key" defaultValue={defaults?.icon || "hammer"} />
      <Field
        name="order"
        label="Order"
        type="number"
        defaultValue={String(defaults?.order ?? 0)}
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="published"
          defaultChecked={defaults?.published ?? true}
        />
        Published
      </label>
      <button
        type="submit"
        className="rounded-md bg-brick px-4 py-2.5 text-sm font-semibold text-white"
      >
        {defaults?.id ? "Save changes" : "Create service"}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  required,
  type = "text",
  defaultValue,
}: {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-navy">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="w-full rounded-md border border-navy/15 px-3 py-2.5"
      />
    </label>
  );
}
