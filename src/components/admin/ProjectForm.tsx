import { redirect } from "next/navigation";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { saveProject } from "@/lib/actions/admin";

export function ProjectForm({
  defaults,
}: {
  defaults?: {
    id?: string;
    title?: string;
    slug?: string;
    summary?: string;
    description?: string;
    location?: string;
    category?: string;
    featured?: boolean;
    published?: boolean;
    coverUrl?: string | null;
    beforeUrl?: string | null;
    afterUrl?: string | null;
  };
}) {
  return (
    <form
      action={async (fd) => {
        "use server";
        if (defaults?.id) fd.set("id", defaults.id);
        await saveProject(fd);
        redirect("/admin/projects");
      }}
      className="max-w-2xl space-y-4 bg-white p-6 ring-1 ring-navy/10"
    >
      {defaults?.id && <input type="hidden" name="id" value={defaults.id} />}
      <Field name="title" label="Title" required defaultValue={defaults?.title} />
      <Field name="slug" label="Slug (optional)" defaultValue={defaults?.slug} />
      <Field name="summary" label="Summary" required defaultValue={defaults?.summary} />
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-navy">Description</span>
        <textarea
          name="description"
          required
          rows={5}
          defaultValue={defaults?.description}
          className="w-full rounded-md border border-navy/15 px-3 py-2.5"
        />
      </label>
      <Field name="location" label="Location" required defaultValue={defaults?.location} />
      <Field name="category" label="Category" required defaultValue={defaults?.category} />
      <ImageUploadField
        name="beforeUrl"
        label="Before image URL"
        defaultValue={defaults?.beforeUrl}
      />
      <ImageUploadField
        name="afterUrl"
        label="After image URL"
        defaultValue={defaults?.afterUrl}
      />
      <ImageUploadField
        name="coverUrl"
        label="Cover image URL"
        defaultValue={defaults?.coverUrl}
      />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="featured" defaultChecked={defaults?.featured} />
        Featured on homepage
      </label>
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
        {defaults?.id ? "Save changes" : "Create project"}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  required,
  defaultValue,
}: {
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-navy">{label}</span>
      <input
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="w-full rounded-md border border-navy/15 px-3 py-2.5"
      />
    </label>
  );
}
