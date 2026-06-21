import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { internshipProjects, Project, projectCardCopy, projects } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Projects",
  description: "Project dossiers for speech recognition, medical imaging, learning agents, document question-answering, systems, and full-stack work.",
};

export default function ProjectsPage() {
  const productCategories = new Set(["Full-Stack Systems", "Full-Stack Product"]);

  const internshipSet = new Set(internshipProjects);
  const projectTracks = projects.filter((project) => !internshipSet.has(project));
  const projectBySlug = new Map(projectTracks.map((project) => [project.slug, project]));
  const researchProjects = orderProjects(projectBySlug, [
    "progressive-cosine-distillation-asr",
    "adaptive-diverse-sampling-cxr",
    "reinforcement-learning-systems",
  ]);
  const otherTechnicalProjects = orderProjects(projectBySlug, [
    "iitk-mini-mips",
    "hybrid-semantic-rag",
    "sanskrit-whisper-finetuning",
    "surge-sanskrit-asr",
    "yeast-protein-localization",
  ]);
  const fullStackProjects = projectTracks.filter((project) => productCategories.has(project.category));

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
      <SectionHeading
        eyebrow="Project dossiers"
        title="Portfolio tracks"
        description="Internships are separated from projects, then the remaining work is grouped by research, systems, AI search, and product tracks."
      />

      <div className="space-y-12">
        {internshipProjects.length > 0 ? (
          <section>
            <div className="mb-5 flex items-center justify-between border-b border-signal-green/30 pb-3">
              <h2 className="font-mono text-sm uppercase tracking-[0.22em] text-signal-green">Internships</h2>
              <span className="font-mono text-xs text-slate-500">{internshipProjects.length} items</span>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {internshipProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        ) : null}

        <ProjectSection title="Research Projects" items={researchProjects}>
          <div className="grid gap-5 lg:grid-cols-3">
            {researchProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </ProjectSection>

        <ProjectSection title="Other Technical Projects" items={otherTechnicalProjects}>
          <ProjectStrip projects={otherTechnicalProjects} />
        </ProjectSection>

        <ProjectSection title="Full-Stack Platforms" items={fullStackProjects}>
          <div className="grid gap-5 md:grid-cols-2">
            {fullStackProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </ProjectSection>
      </div>
    </div>
  );
}

function orderProjects(projectBySlug: Map<string, Project>, slugs: string[]) {
  return slugs.flatMap((slug) => {
    const project = projectBySlug.get(slug);
    return project ? [project] : [];
  });
}

function ProjectSection({
  title,
  items,
  children,
}: {
  title: string;
  items: Project[];
  children: React.ReactNode;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3">
        <h2 className="font-mono text-sm uppercase tracking-[0.22em] text-signal-cyan">{title}</h2>
        <span className="font-mono text-xs text-slate-500">{items.length} items</span>
      </div>
      {children}
    </section>
  );
}

function ProjectStrip({ projects: stripProjects }: { projects: Project[] }) {
  return (
    <div className="overflow-x-auto py-2">
      <div className="grid min-w-[1060px] grid-cols-5 gap-3 px-1 xl:min-w-0">
        {stripProjects.map((project) => {
          const copy = projectCardCopy[project.slug];
          const title = copy?.title ?? project.title;
          const category = copy?.category ?? project.category;
          const summary = copy?.summary ?? project.summary;
          const tags = copy?.tags ?? project.stack;

          return (
            <article
              key={project.slug}
              className="group/card relative z-0 flex min-h-[330px] flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-4 shadow-panel transition duration-200 hover:z-10 hover:scale-[1.015] hover:border-signal-cyan/50 hover:shadow-glow"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal-cyan/45 to-transparent" />
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">{category}</p>
              <h3 className="mt-3 text-lg font-semibold leading-tight text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="rounded border border-white/10 bg-black/20 px-2 py-1 font-mono text-[10px] text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-5">
                <Link
                  href={`/projects/${project.slug}`}
                  className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-md border border-signal-cyan/30 bg-signal-cyan/10 px-3 py-2 text-sm font-medium text-signal-cyan transition group-hover/card:bg-signal-cyan group-hover/card:text-graphite-950"
                >
                  More details
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
