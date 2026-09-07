"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BeforeAfterSlider } from "@/components/site/BeforeAfterSlider";
import { EstimateButton } from "@/components/estimate/EstimateButton";
import { Reveal } from "@/components/site/Motion";
import type { PublicProject } from "@/lib/seed-data";

export function ProjectsGallery({
  projects,
  categories,
  active,
}: {
  projects: PublicProject[];
  categories: string[];
  active: string;
}) {
  const filters = ["all", ...categories];

  return (
    <div>
      <Reveal className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const href =
            f === "all" ? "/projects" : `/projects?category=${encodeURIComponent(f)}`;
          const isActive = f === active;
          return (
            <Link
              key={f}
              href={href}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition ${
                isActive
                  ? "bg-navy text-white"
                  : "border border-navy/15 bg-white text-navy hover:border-navy"
              }`}
            >
              {f === "all" ? "All" : f}
            </Link>
          );
        })}
      </Reveal>

      <div className="mt-14 space-y-20">
        {projects.map((project, i) => {
          const reverse = i % 2 === 1;
          return (
            <Reveal key={project.id} delay={0.04}>
              <article
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {project.beforeUrl && project.afterUrl ? (
                  <BeforeAfterSlider
                    beforeSrc={project.beforeUrl}
                    afterSrc={project.afterUrl}
                    beforeAlt={`${project.title} before`}
                    afterAlt={`${project.title} after`}
                    className="aspect-[5/4]"
                  />
                ) : (
                  <div className="aspect-[5/4] bg-navy/10" />
                )}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brick">
                    {String(i + 1).padStart(2, "0")} · {project.category}
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-extrabold text-navy sm:text-4xl">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted">
                    {project.location}
                  </p>
                  <p className="mt-5 text-[15px] leading-relaxed text-muted">
                    {project.summary}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 border border-navy/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-navy transition hover:bg-navy hover:text-white"
                    >
                      Case study
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                    <EstimateButton prefill={{ projectRef: project.title }}>
                      Similar estimate
                    </EstimateButton>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
