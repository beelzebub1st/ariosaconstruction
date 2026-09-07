import type { Metadata } from "next";
import { CtaBand } from "@/components/site/CtaBand";
import { PageHero } from "@/components/site/PageHero";
import { ProjectsGallery } from "@/components/site/ProjectsGallery";
import { getProjectCategories, getProjects, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse completed Ariosa & Constructions projects with before-and-after photos.",
};

type Props = { searchParams: Promise<{ category?: string }> };

export default async function ProjectsPage({ searchParams }: Props) {
  const { category = "all" } = await searchParams;
  const [projects, categories, settings] = await Promise.all([
    getProjects({ category }),
    getProjectCategories(),
    getSettings(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Proof"
        title="Work that holds up in person"
        description="Drag each before & after. Then request an estimate inspired by a project you like."
      />

      <section className="texture-stone section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ProjectsGallery
            projects={projects}
            categories={categories}
            active={category}
          />
        </div>
      </section>

      <CtaBand phone={settings.phone} title="Want results like these?" />
    </>
  );
}
