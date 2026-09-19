"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { formatDbError } from "@/lib/db";
import { prisma } from "@/lib/prisma";
import {
  projectSchema,
  serviceAreaSchema,
  serviceSchema,
  siteSettingsSchema,
  testimonialSchema,
} from "@/lib/validations";
import { slugify } from "@/lib/utils";
import type { LeadStatus } from "@prisma/client";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  return session;
}

async function withDb<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    throw new Error(formatDbError(err));
  }
}

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/projects");
  revalidatePath("/about");
  revalidatePath("/contact");
}

export async function updateLeadStatus(id: string, status: LeadStatus, notes?: string) {
  await requireAdmin();
  await withDb(() =>
    prisma.lead.update({
      where: { id },
      data: { status, ...(notes !== undefined ? { notes } : {}) },
    })
  );
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function saveService(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const raw = {
    title: String(formData.get("title") || ""),
    slug: String(formData.get("slug") || "") || slugify(String(formData.get("title") || "")),
    summary: String(formData.get("summary") || ""),
    body: String(formData.get("body") || ""),
    icon: String(formData.get("icon") || "hammer"),
    imageUrl: String(formData.get("imageUrl") || "") || null,
    order: Number(formData.get("order") || 0),
    published: formData.get("published") === "on" || formData.get("published") === "true",
  };
  const data = serviceSchema.parse(raw);

  await withDb(async () => {
    if (id) {
      await prisma.service.update({ where: { id }, data });
    } else {
      await prisma.service.create({ data });
    }
  });
  revalidatePath("/admin/services");
  revalidatePublic();
}

export async function deleteService(id: string) {
  await requireAdmin();
  await withDb(() => prisma.service.delete({ where: { id } }));
  revalidatePath("/admin/services");
  revalidatePublic();
}

export async function saveProject(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const raw = {
    title: String(formData.get("title") || ""),
    slug: String(formData.get("slug") || "") || slugify(String(formData.get("title") || "")),
    summary: String(formData.get("summary") || ""),
    description: String(formData.get("description") || ""),
    location: String(formData.get("location") || ""),
    category: String(formData.get("category") || ""),
    featured: formData.get("featured") === "on" || formData.get("featured") === "true",
    published: formData.get("published") === "on" || formData.get("published") === "true",
    coverUrl: String(formData.get("coverUrl") || "") || undefined,
    beforeUrl: String(formData.get("beforeUrl") || "") || undefined,
    afterUrl: String(formData.get("afterUrl") || "") || undefined,
    videoUrl: String(formData.get("videoUrl") || "") || undefined,
    galleryUrls: String(formData.get("galleryUrls") || ""),
  };
  const data = projectSchema.parse(raw);

  const galleryUrls = (data.galleryUrls || "")
    .split(/[\n,]+/)
    .map((u) => u.trim())
    .filter(Boolean);

  const projectData = {
    title: data.title,
    slug: data.slug,
    summary: data.summary,
    description: data.description,
    location: data.location,
    category: data.category,
    featured: data.featured,
    published: data.published,
    coverUrl: data.coverUrl || data.afterUrl || null,
    videoUrl: data.videoUrl || null,
  };

  await withDb(async () => {
    let projectId = id;
    if (id) {
      await prisma.project.update({ where: { id }, data: projectData });
    } else {
      const created = await prisma.project.create({ data: projectData });
      projectId = created.id;
    }

    await prisma.projectImage.deleteMany({ where: { projectId } });

    const imageRows: {
      projectId: string;
      url: string;
      type: "before" | "after" | "gallery";
      alt: string;
      order: number;
    }[] = [];

    if (data.beforeUrl) {
      imageRows.push({
        projectId,
        url: data.beforeUrl,
        type: "before",
        alt: `${data.title} before`,
        order: 0,
      });
    }
    if (data.afterUrl) {
      imageRows.push({
        projectId,
        url: data.afterUrl,
        type: "after",
        alt: `${data.title} after`,
        order: 1,
      });
    }
    galleryUrls.forEach((url, i) => {
      imageRows.push({
        projectId,
        url,
        type: "gallery",
        alt: `${data.title} gallery ${i + 1}`,
        order: 2 + i,
      });
    });

    if (imageRows.length) {
      await prisma.projectImage.createMany({ data: imageRows });
    }
  });

  revalidatePath("/admin/projects");
  revalidatePublic();
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await withDb(() => prisma.project.delete({ where: { id } }));
  revalidatePath("/admin/projects");
  revalidatePublic();
}

export async function saveTestimonial(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const raw = {
    name: String(formData.get("name") || ""),
    role: String(formData.get("role") || ""),
    quote: String(formData.get("quote") || ""),
    rating: Number(formData.get("rating") || 5),
    order: Number(formData.get("order") || 0),
    published: formData.get("published") === "on" || formData.get("published") === "true",
  };
  const data = testimonialSchema.parse(raw);
  await withDb(async () => {
    if (id) {
      await prisma.testimonial.update({ where: { id }, data });
    } else {
      await prisma.testimonial.create({ data });
    }
  });
  revalidatePath("/admin/testimonials");
  revalidatePublic();
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await withDb(() => prisma.testimonial.delete({ where: { id } }));
  revalidatePath("/admin/testimonials");
  revalidatePublic();
}

export async function saveSiteSettings(formData: FormData) {
  await requireAdmin();
  const raw = {
    companyName: String(formData.get("companyName") || ""),
    tagline: String(formData.get("tagline") || ""),
    phone: String(formData.get("phone") || ""),
    email: String(formData.get("email") || ""),
    serviceArea: String(formData.get("serviceArea") || ""),
    address: String(formData.get("address") || ""),
    mapEmbedUrl: String(formData.get("mapEmbedUrl") || ""),
    aboutShort: String(formData.get("aboutShort") || ""),
    aboutLong: String(formData.get("aboutLong") || ""),
    heroHeadline: String(formData.get("heroHeadline") || ""),
    heroSubheadline: String(formData.get("heroSubheadline") || ""),
    heroSupport: String(formData.get("heroSupport") || ""),
    heroImageUrl: String(formData.get("heroImageUrl") || "") || null,
    trustBadges: String(formData.get("trustBadges") || ""),
    yearsExperience: String(formData.get("yearsExperience") || ""),
    facebookUrl: String(formData.get("facebookUrl") || "") || null,
    instagramUrl: String(formData.get("instagramUrl") || "") || null,
    googleUrl: String(formData.get("googleUrl") || "") || null,
  };
  const data = siteSettingsSchema.parse(raw);
  await withDb(() =>
    prisma.siteSettings.upsert({
      where: { id: "default" },
      create: { id: "default", ...data },
      update: data,
    })
  );
  revalidatePath("/admin/site-settings");
  revalidatePublic();
}

export async function saveServiceArea(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const raw = {
    name: String(formData.get("name") || ""),
    lat: Number(formData.get("lat") || 0),
    lng: Number(formData.get("lng") || 0),
    hub: formData.get("hub") === "on" || formData.get("hub") === "true",
    order: Number(formData.get("order") || 0),
    published: formData.get("published") === "on" || formData.get("published") === "true",
  };
  const data = serviceAreaSchema.parse(raw);
  await withDb(async () => {
    if (id) {
      await prisma.serviceArea.update({ where: { id }, data });
    } else {
      await prisma.serviceArea.create({ data });
    }
  });
  revalidatePath("/admin/service-areas");
  revalidatePublic();
}

export async function deleteServiceArea(id: string) {
  await requireAdmin();
  await withDb(() => prisma.serviceArea.delete({ where: { id } }));
  revalidatePath("/admin/service-areas");
  revalidatePublic();
}

export async function deleteMedia(id: string) {
  await requireAdmin();
  await withDb(() => prisma.media.delete({ where: { id } }));
  revalidatePath("/admin/media");
}
