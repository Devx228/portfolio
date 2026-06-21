import type { Metadata } from "next";
import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { achievements, internshipProjects, profile, projectCardCopy, projects, skills } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume and selected work for Devansh Abhay Dhok.",
};

export default function ResumePage() {
  const internshipSet = new Set(internshipProjects);
  const selected = projects.filter((project) => (project.priority === "P0" || project.priority === "P1") && !internshipSet.has(project));
  const hasResumePdf = existsSync(join(process.cwd(), "public/files/resume.pdf"));

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 lg:py-20">
      <SectionHeading
        eyebrow="Resume"
        title={profile.name}
        description="Computer Science undergraduate at IIT Kanpur, focused on applied AI, machine learning, and systems work."
      />

      <div className="mb-10 flex flex-wrap gap-3">
        <Link className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300 transition hover:border-signal-cyan/50 hover:text-white" href={`mailto:${profile.email}`}>
          <Mail className="h-4 w-4" />
          {profile.email}
        </Link>
        <Link className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300 transition hover:border-signal-cyan/50 hover:text-white" href={profile.github}>
          <Github className="h-4 w-4" />
          GitHub
        </Link>
        <Link className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300 transition hover:border-signal-cyan/50 hover:text-white" href={profile.linkedin}>
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </Link>
        {hasResumePdf ? (
          <Link className="focus-ring inline-flex items-center gap-2 rounded-md bg-signal-cyan px-3 py-2 text-sm font-semibold text-graphite-950 transition hover:bg-white" href="/files/resume.pdf">
            <Download className="h-4 w-4" />
            Download PDF
          </Link>
        ) : null}
      </div>

      <div className="space-y-6">
        <ResumeSection title="Education">
          <p className="leading-7 text-slate-300">B.Tech in Computer Science and Engineering, Indian Institute of Technology Kanpur, 2023-present. CPI 8.5/10.0.</p>
        </ResumeSection>

        {internshipProjects.length > 0 ? (
          <ResumeSection title="Internships">
            <div className="grid gap-4 md:grid-cols-2">
              {internshipProjects.map((project) => (
                <article key={project.slug} className="rounded-md border border-signal-green/20 bg-signal-green/[0.04] p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="font-semibold text-white">{projectCardCopy[project.slug]?.title ?? project.title}</h3>
                    <span className="rounded border border-signal-green/25 bg-signal-green/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-signal-green">{project.status}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{projectCardCopy[project.slug]?.summary ?? project.summary}</p>
                </article>
              ))}
            </div>
          </ResumeSection>
        ) : null}

        <ResumeSection title="Selected Projects">
          <div className="space-y-4">
            {selected.map((project) => (
              <article key={project.slug} className="rounded-md border border-white/10 bg-black/20 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-semibold text-white">{projectCardCopy[project.slug]?.title ?? project.title}</h3>
                  <span className="rounded border border-signal-cyan/25 bg-signal-cyan/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-signal-cyan">{project.status}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-400">{projectCardCopy[project.slug]?.summary ?? project.summary}</p>
              </article>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection title="Skills">
          <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
            {skills.map((skill) => (
              <div key={skill.title}>
                <h3 className="font-semibold text-white">{skill.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{skill.items.join(", ")}</p>
              </div>
            ))}
          </div>
        </ResumeSection>

        <ResumeSection title="Scholastic Achievements">
          <ul className="space-y-3 text-slate-300">
            {achievements.map((achievement) => (
              <li key={achievement} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-cyan" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </ResumeSection>
      </div>
    </div>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.03] p-5 shadow-panel sm:p-6">
      <h2 className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-signal-cyan">{title}</h2>
      {children}
    </section>
  );
}
