import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { BeforeAfterSlider } from "@/components/site/BeforeAfterSlider";
import { CtaBand } from "@/components/site/CtaBand";
import { EstimateButton } from "@/components/estimate/EstimateButton";
import { PageHero } from "@/components/site/PageHero";
import { Reveal, AnimatedLine } from "@/components/site/Motion";
import { getProjectBySlug, getProjects, getSettings } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  return { title: project.title, description: project.summary };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const [project, settings] = await Promise.all([
    getProjectBySlug(slug),
    getSettings(),
  ]);
  if (!project) notFound();

  const gallery = project.images.filter((i) => i.type === "gallery");

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.title}
        description={project.location}
      />

      <section className="bg-white section-pad">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal>
            {project.beforeUrl && project.afterUrl && (
              <BeforeAfterSlider
                beforeSrc={project.beforeUrl}
                afterSrc={project.afterUrl}
                className="aspect-[16/10]"
              />
            )}
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal delay={0.08}>
              <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
                Case notes
              </h2>
              <AnimatedLine className="mt-4 w-24" />
              <p className="mt-6 leading-relaxed text-muted">{project.description}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="border border-navy/10 bg-stone p-7">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brick">
                  Inspired?
                </p>
                <p className="mt-3 font-display text-xl font-bold text-navy">
                  Request a similar estimate
                </p>
                <p className="mt-2 text-sm text-muted">
                  We&apos;ll prefill this project as a reference in your request.
                </p>
                <EstimateButton
                  className="mt-6 w-full"
                  size="lg"
                  prefill={{ projectRef: project.title }}
                >
                  Start estimate
                  <ArrowUpRight className="h-4 w-4" />
                </EstimateButton>
              </div>
            </Reveal>
          </div>

          {gallery.length > 0 && (
            <div className="mt-14 grid gap-4 sm:grid-cols-2">
              {gallery.map((img) => (
                <div key={img.id} className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={img.url}
                    alt={img.alt || project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand
        phone={settings.phone}
        title="Inspired by this project?"
        prefill={{ projectRef: project.title }}
      />
    </>
  );
}
