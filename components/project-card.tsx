import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { Project, projectCardCopy } from "@/content/portfolio";
import { StatusBadge } from "@/components/status-badge";
import { cn } from "@/lib/utils";

const borderByAccent: Record<Project["accent"], string> = {
  cyan: "hover:border-signal-cyan/50",
  blue: "hover:border-signal-blue/50",
  green: "hover:border-signal-green/50",
  amber: "hover:border-signal-amber/50",
  red: "hover:border-signal-red/50",
};

export function ProjectCard({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const cardCopy = projectCardCopy[project.slug];
  const title = cardCopy?.title ?? project.title;
  const category = cardCopy?.category ?? project.category;
  const summary = cardCopy?.summary ?? project.summary;
  const highlights = cardCopy?.highlights ?? project.highlights;
  const tags = cardCopy?.tags ?? project.stack;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-5 shadow-panel transition duration-200",
        borderByAccent[project.accent],
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <StatusBadge accent={project.accent}>{project.status}</StatusBadge>
      </div>
      <div className="flex flex-1 flex-col">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-slate-500">{category}</p>
        <h3 className="text-xl font-semibold leading-tight text-white">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-400">{summary}</p>

        {!compact ? (
          <ul className="mt-5 space-y-2 text-sm text-slate-300">
            {highlights.slice(0, 3).map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-cyan" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          {tags.slice(0, compact ? 4 : 6).map((item) => (
            <span key={item} className="rounded border border-white/10 bg-black/20 px-2 py-1 font-mono text-[11px] text-slate-400">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/projects/${project.slug}`}
          className="focus-ring inline-flex items-center gap-2 rounded-md bg-signal-cyan px-3 py-2 text-sm font-medium text-graphite-950 transition hover:bg-white"
        >
          Dossier
          <ArrowUpRight className="h-4 w-4" />
        </Link>
        {project.repo ? (
          <Link
            href={project.repo}
            className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:border-signal-cyan/50 hover:text-white"
          >
            <Github className="h-4 w-4" />
            Repo
          </Link>
        ) : null}
      </div>
    </article>
  );
}
