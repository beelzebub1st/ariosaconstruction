/**
 * Public site content layer.
 *
 * Uses Postgres when DATABASE_URL is set (unless USE_DATABASE=false).
 * Falls back to hardcoded seed data when the DB is unavailable.
 */
import {
  DEFAULT_SETTINGS,
  FALLBACK_PROJECTS,
  FALLBACK_SERVICES,
  FALLBACK_TESTIMONIALS,
  HERO_SUPPORT,
  type PublicProject,
  type PublicService,
  type PublicServiceArea,
  type PublicTestimonial,
} from "@/lib/seed-data";
import { getDbOrNull } from "@/lib/db";
import { SERVICE_AREA_LOCATIONS } from "@/lib/service-areas";
import type { SiteSettings } from "@prisma/client";

export async function getSettings(): Promise<SiteSettings> {
  const prisma = await getDbOrNull();
  if (!prisma) return DEFAULT_SETTINGS;
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "default" },
    });
    if (!settings) return DEFAULT_SETTINGS;
    return {
      ...DEFAULT_SETTINGS,
      ...settings,
      heroSupport: settings.heroSupport || HERO_SUPPORT,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function getServices(): Promise<PublicService[]> {
  const prisma = await getDbOrNull();
  if (!prisma) return FALLBACK_SERVICES;
  try {
    const services = await prisma.service.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    if (!services.length) return FALLBACK_SERVICES;
    return services.map((s) => ({
      id: s.id,
      title: s.title,
      slug: s.slug,
      summary: s.summary,
      body: s.body,
      icon: s.icon,
      imageUrl: s.imageUrl ?? null,
      order: s.order,
      published: s.published,
    }));
  } catch {
    return FALLBACK_SERVICES;
  }
}

export async function getServiceBySlug(slug: string): Promise<PublicService | null> {
  const all = await getServices();
  return all.find((s) => s.slug === slug) ?? null;
}

export async function getProjects(opts?: {
  featuredOnly?: boolean;
  category?: string;
}): Promise<PublicProject[]> {
  const prisma = await getDbOrNull();

  if (!prisma) {
    let list = FALLBACK_PROJECTS;
    if (opts?.featuredOnly) list = list.filter((p) => p.featured);
    if (opts?.category && opts.category !== "all") {
      list = list.filter((p) => p.category === opts.category);
    }
    return list;
  }

  try {
    const projects = await prisma.project.findMany({
      where: {
        published: true,
        ...(opts?.featuredOnly ? { featured: true } : {}),
        ...(opts?.category && opts.category !== "all"
          ? { category: opts.category }
          : {}),
      },
      include: { images: { orderBy: { order: "asc" } } },
      orderBy: { updatedAt: "desc" },
    });

    if (!projects.length) {
      let list = FALLBACK_PROJECTS;
      if (opts?.featuredOnly) list = list.filter((p) => p.featured);
      return list;
    }

    return projects.map((project) => {
      const before = project.images.find((i) => i.type === "before");
      const after = project.images.find((i) => i.type === "after");
      return {
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
        beforeUrl: before?.url ?? null,
        afterUrl: after?.url ?? null,
        videoUrl: project.videoUrl ?? null,
        images: project.images,
      };
    });
  } catch {
    return FALLBACK_PROJECTS;
  }
}

export async function getProjectBySlug(slug: string): Promise<PublicProject | null> {
  const list = await getProjects();
  return list.find((p) => p.slug === slug) ?? null;
}

export async function getProjectCategories(): Promise<string[]> {
  const projects = await getProjects();
  return Array.from(new Set(projects.map((p) => p.category)));
}

export async function getTestimonials(): Promise<PublicTestimonial[]> {
  const prisma = await getDbOrNull();
  if (!prisma) return FALLBACK_TESTIMONIALS;
  try {
    const items = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return items;
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}

export async function getServiceAreas(): Promise<PublicServiceArea[]> {
  const prisma = await getDbOrNull();
  const fallback: PublicServiceArea[] = SERVICE_AREA_LOCATIONS.map((c, i) => ({
    id: `seed-area-${i}`,
    name: c.name,
    lat: c.lat,
    lng: c.lng,
    hub: Boolean("hub" in c && c.hub),
    order: i,
  }));

  if (!prisma) return fallback;
  try {
    const rows = await prisma.serviceArea.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    if (!rows.length) return fallback;
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      lat: r.lat,
      lng: r.lng,
      hub: r.hub,
      order: r.order,
    }));
  } catch {
    return fallback;
  }
}
