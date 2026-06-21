import { internshipProjects, projectCardCopy, projects } from "@/content/portfolio";

export function SignalMap() {
  const internshipSet = new Set(internshipProjects);
  const nodes = projects.filter((project) => !internshipSet.has(project)).slice(0, 7);

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-signal-cyan">Signal map</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Current portfolio weight</h3>
        </div>
        <span className="rounded border border-signal-green/30 bg-signal-green/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-signal-green">
          active
        </span>
      </div>
      <div className="space-y-3">
        {nodes.map((project, index) => (
          <div key={project.slug} className="grid grid-cols-[32px_1fr_auto] items-center gap-3">
            <span className="font-mono text-xs text-slate-500">{String(index + 1).padStart(2, "0")}</span>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-signal-cyan"
                style={{ width: `${Math.max(38, 100 - index * 9)}%` }}
              />
            </div>
            <span className="max-w-[170px] truncate text-right text-sm text-slate-300">
              {projectCardCopy[project.slug]?.title ?? project.shortTitle}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
