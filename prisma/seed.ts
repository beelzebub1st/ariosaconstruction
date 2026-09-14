import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  DEFAULT_SETTINGS,
  SEED_PROJECTS,
  SEED_SERVICES,
  SEED_TESTIMONIALS,
} from "../src/lib/seed-data";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@ariosaconstructions.com";
  const password = process.env.ADMIN_PASSWORD || "ariosa-admin-change-me";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name: "Admin" },
    create: { email, passwordHash, name: "Admin" },
  });

  const { id: _id, ...settingsData } = DEFAULT_SETTINGS;
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: settingsData,
    create: { id: "default", ...settingsData },
  });

  for (const service of SEED_SERVICES) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: { ...service, published: true },
      create: { ...service, published: true },
    });
  }

  for (const project of SEED_PROJECTS) {
    const { beforeUrl, afterUrl, coverUrl, gallery, videoUrl: _videoUrl, ...rest } =
      project;
    const saved = await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        ...rest,
        coverUrl,
        published: true,
      },
      create: {
        ...rest,
        coverUrl,
        published: true,
      },
    });

    await prisma.projectImage.deleteMany({ where: { projectId: saved.id } });
    const imageRows: {
      projectId: string;
      url: string;
      type: "before" | "after" | "gallery";
      alt: string;
      order: number;
    }[] = [
      ...(beforeUrl
        ? [
            {
              projectId: saved.id,
              url: beforeUrl,
              type: "before" as const,
              alt: `${project.title} before`,
              order: 0,
            },
          ]
        : []),
      ...(afterUrl
        ? [
            {
              projectId: saved.id,
              url: afterUrl,
              type: "after" as const,
              alt: `${project.title} after`,
              order: 1,
            },
          ]
        : []),
      ...(gallery ?? []).map((url, i) => ({
        projectId: saved.id,
        url,
        type: "gallery" as const,
        alt: `${project.title} gallery ${i + 1}`,
        order: 2 + i,
      })),
    ];

    if (imageRows.length) {
      await prisma.projectImage.createMany({ data: imageRows });
    }
  }

  const existingTestimonials = await prisma.testimonial.count();
  if (existingTestimonials === 0) {
    await prisma.testimonial.createMany({
      data: SEED_TESTIMONIALS.map((t) => ({ ...t, published: true })),
    });
  }

  console.log("Seed complete.");
  console.log(`Admin login: ${email} / ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
