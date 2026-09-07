"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  projectSchema,
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

export async function updateLeadStatus(id: string, status: LeadStatus, notes?: string) {
  await requireAdmin();
  await prisma.lead.update({
    where: { id },
    data: { status, ...(notes !== undefined ? { notes } : {}) },
  });
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

  if (id) {
    await prisma.service.update({ where: { id }, data });
  } else {
    await prisma.service.create({ data });
  }
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}

export async function deleteService(id: string) {
  await requireAdmin();
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
  revalidatePath("/services");
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
  };
  const data = projectSchema.parse(raw);

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
  };

  let projectId = id;
  if (id) {
    await prisma.project.update({ where: { id }, data: projectData });
  } else {
    const created = await prisma.project.create({ data: projectData });
    projectId = created.id;
  }

  if (data.beforeUrl || data.afterUrl) {
    await prisma.projectImage.deleteMany({
      where: {
        projectId,
        type: { in: ["before", "after"] },
      },
    });
    if (data.beforeUrl) {
      await prisma.projectImage.create({
        data: {
          projectId,
          url: data.beforeUrl,
          type: "before",
          alt: `${data.title} before`,
          order: 0,
        },
      });
    }
    if (data.afterUrl) {
      await prisma.projectImage.create({
        data: {
          projectId,
          url: data.afterUrl,
          type: "after",
          alt: `${data.title} after`,
          order: 1,
        },
      });
    }
  }

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
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
  if (id) {
    await prisma.testimonial.update({ where: { id }, data });
  } else {
    await prisma.testimonial.create({ data });
  }
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
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
    heroImageUrl: String(formData.get("heroImageUrl") || "") || null,
    trustBadges: String(formData.get("trustBadges") || ""),
    yearsExperience: String(formData.get("yearsExperience") || ""),
    facebookUrl: String(formData.get("facebookUrl") || "") || null,
    instagramUrl: String(formData.get("instagramUrl") || "") || null,
    googleUrl: String(formData.get("googleUrl") || "") || null,
  };
  const data = siteSettingsSchema.parse(raw);
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    create: { id: "default", ...data },
    update: data,
  });
  revalidatePath("/admin/site-settings");
  revalidatePath("/");
}
