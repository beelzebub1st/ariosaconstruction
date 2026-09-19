import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let project = null;
  try {
    project = await prisma.project.findUnique({
      where: { id },
      include: { images: true },
    });
  } catch {
    notFound();
  }
  if (!project) notFound();

  const beforeUrl = project.images.find((i) => i.type === "before")?.url;
  const afterUrl = project.images.find((i) => i.type === "after")?.url;
  const galleryUrls = project.images
    .filter((i) => i.type === "gallery")
    .sort((a, b) => a.order - b.order)
    .map((i) => i.url)
    .join("\n");

  return (
    <AdminShell title={`Edit: ${project.title}`}>
      <ProjectForm
        defaults={{
          id: project.id,
          title: project.title,
          slug: project.slug,
          summary: project.summary,
          description: project.description,
          location: project.location,
          category: project.category,
          featured: project.featured,
          published: project.published,
          coverUrl: project.coverUrl,
          beforeUrl,
          afterUrl,
          videoUrl: project.videoUrl,
          galleryUrls,
        }}
      />
    </AdminShell>
  );
}
