import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TerminalHero } from "@/components/terminal-hero";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { SkillGrid } from "@/components/skill-grid";
import { Timeline } from "@/components/timeline";
import { Reveal } from "@/components/reveal";
import { featuredProjects, internshipProjects, projects } from "@/content/portfolio";

export default function HomePage() {
  const supporting = projects.filter((project) => !project.featured && !internshipProjects.includes(project)).slice(0, 5);

  return (
    <>
      <TerminalHero />

      {internshipProjects.length > 0 ? (
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Internships"
              title="Industry work, real systems"
              description="Two active lanes: medical imaging AI and database infrastructure for stateful AI agents."
            />
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-2">
            {internshipProjects.map((project, index) => (
              <Reveal key={project.slug} delay={0.04 + index * 0.04}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Portfolio tracks"
            title="Research projects and systems"
            description="Focused work across speech, medical-image generation, learning agents, search, and low-level systems."
          />
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.04}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-graphite-900/35">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Technical arsenal"
              title="Tools grouped by the problems they solve"
              description="The stack is presented by domain instead of one giant keyword wall, so recruiters and engineers can scan the actual technical shape quickly."
            />
          </Reveal>
          <Reveal delay={0.04}>
            <SkillGrid />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Experience trace"
            title="Current arc"
            description="Scores to IITK, then research and internships: the path is getting more technical, more applied, and more serious."
          />
          <Timeline />
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:pb-24">
        <Reveal>
          <div className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-signal-cyan">More dossiers</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Side quests that still matter</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                  Sanskrit speech research, processor design, Lecture Hall Booking, and document question-answering round out the
                  research-heavy story with systems, architecture, and full-stack evidence.
                </p>
              </div>
              <Link
                href="/projects"
                className="focus-ring inline-flex w-fit items-center gap-2 rounded-md border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-signal-cyan/50 hover:text-white"
              >
                Open all projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {supporting.map((project) => (
                <ProjectCard key={project.slug} project={project} compact />
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
