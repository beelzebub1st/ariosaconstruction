"use client";

import { useState } from "react";

/** Multi-line gallery URLs with multi-file upload support */
export function GalleryUrlsField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  const [text, setText] = useState(defaultValue || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setError(null);
    const urls: string[] = [];
    try {
      for (const file of Array.from(files)) {
        const body = new FormData();
        body.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        urls.push(data.url as string);
      }
      setText((prev) => {
        const existing = prev.trim();
        const added = urls.join("\n");
        return existing ? `${existing}\n${added}` : added;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  const previewUrls = text
    .split(/[\n,]+/)
    .map((u) => u.trim())
    .filter(Boolean);

  return (
    <div className="block text-sm">
      <span className="mb-1.5 block font-medium text-navy">{label}</span>
      <textarea
        name={name}
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={"One image URL per line\n/projects/…\nhttps://…"}
        className="w-full rounded-md border border-navy/15 px-3 py-2.5 font-mono text-xs"
      />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => onFiles(e.target.files)}
          className="text-xs"
        />
        {uploading && <span className="text-xs text-muted">Uploading…</span>}
      </div>
      {error && <p className="mt-1 text-xs text-brick">{error}</p>}
      {previewUrls.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {previewUrls.map((url) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={url}
              src={url}
              alt=""
              className="h-16 w-16 rounded object-cover ring-1 ring-navy/10"
            />
          ))}
        </div>
      )}
    </div>
  );
}
