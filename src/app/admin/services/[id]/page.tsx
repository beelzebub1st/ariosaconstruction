import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { ServiceAdminForm } from "@/components/admin/ServiceForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let service = null;
  try {
    service = await prisma.service.findUnique({ where: { id } });
  } catch {
    notFound();
  }
  if (!service) notFound();

  return (
    <AdminShell title={`Edit: ${service.title}`}>
      <ServiceAdminForm
        defaults={{
          id: service.id,
          title: service.title,
          slug: service.slug,
          summary: service.summary,
          body: service.body,
          icon: service.icon,
          imageUrl: service.imageUrl,
          order: service.order,
          published: service.published,
        }}
      />
    </AdminShell>
  );
}
