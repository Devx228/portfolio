import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import { projects } from "@/content/portfolio";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDossierPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const showDate = project.date.length > 0 && project.date !== "TODO";

  return (
    <article className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <Link
        href="/projects"
        className="focus-ring mb-8 inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-slate-300 hover:border-signal-cyan/50 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      <header className="rounded-lg border border-white/10 bg-white/[0.035] p-6 shadow-panel sm:p-8">
        <div className="flex flex-wrap gap-2">
          <StatusBadge accent={project.accent}>{project.status}</StatusBadge>
        </div>
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-slate-500">{project.category}</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-normal text-white sm:text-5xl">{project.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{project.summary}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {project.repo ? (
            <Link
              href={project.repo}
              className="focus-ring inline-flex items-center gap-2 rounded-md bg-signal-cyan px-4 py-3 text-sm font-semibold text-graphite-950 hover:bg-white"
            >
              <Github className="h-4 w-4" />
              Open repository
            </Link>
          ) : null}
          {project.demo ? (
            <Link
              href={project.demo}
              className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-signal-cyan/50 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              Demo
            </Link>
          ) : null}
        </div>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.78fr_0.22fr]">
        <div className="space-y-6">
          <DossierSection title="Problem" body={project.problem} />
          <DossierSection title="Approach" body={project.approach} />
          {project.caseStudyDetails ? (
            <ProjectCaseStudy details={project.caseStudyDetails} />
          ) : (
            <>
              <DossierList title="Technical Highlights" items={project.highlights} />
              <DossierList title="Results / Metrics" items={project.metrics} />
            </>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
            <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-signal-cyan">Stack</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="rounded border border-white/10 bg-black/20 px-2 py-1 font-mono text-[11px] text-slate-400">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
            <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-signal-cyan">Role</h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">{project.role}</p>
            <dl className="mt-5 space-y-3 text-sm">
              {showDate ? (
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">Date</dt>
                  <dd className="mt-1 text-slate-300">{project.date}</dd>
                </div>
              ) : null}
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">Category</dt>
                <dd className="mt-1 text-slate-300">{project.category}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </article>
  );
}

function ProjectCaseStudy({ details }: { details: NonNullable<(typeof projects)[number]["caseStudyDetails"]> }) {
  if (details.variant === "oracleInfra") {
    return <OracleInfraCaseStudy details={details} />;
  }

  const labels = {
    headline: details.sectionLabels?.headline ?? "Headline Result",
    method: details.sectionLabels?.method ?? "Setup",
    researchIterations: details.sectionLabels?.researchIterations ?? "Methods Tried",
    limitations: details.sectionLabels?.limitations ?? "Limitations",
  };

  return (
    <>
      {details.headlineMetrics.length > 0 ? (
        <section className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-signal-cyan">{labels.headline}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {details.headlineMetrics.map((metric) => (
              <div key={metric.label} className="rounded-md border border-white/10 bg-black/20 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">{metric.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{metric.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{metric.detail}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <MethodGrid title={labels.method} items={details.method} />
      {details.featureSections?.map((section) => (
        <FeatureSection key={section.title} section={section} />
      ))}
      <MethodGrid title={labels.researchIterations} items={details.researchIterations} />

      <section className="space-y-6">
        {details.resultTables.map((table) => (
          <DossierTable key={table.title} table={table} />
        ))}
      </section>

      <DossierList title={labels.limitations} items={details.limitations} />
    </>
  );
}

function OracleInfraCaseStudy({ details }: { details: NonNullable<(typeof projects)[number]["caseStudyDetails"]> }) {
  type Feature = NonNullable<NonNullable<(typeof projects)[number]["caseStudyDetails"]>["featureSections"]>[number];
  const checkpointLayer = details.featureSections?.[0];
  const memoryLayer = details.featureSections?.[1];
  const demoLayer = details.featureSections?.[2];
  const infraLayers = [checkpointLayer, memoryLayer].filter((section): section is Feature => Boolean(section));

  return (
    <>
      <section className="overflow-hidden rounded-lg border border-signal-blue/25 bg-signal-blue/[0.035]">
        <div className="h-px bg-gradient-to-r from-transparent via-signal-blue/80 to-transparent" />
        <div className="p-6">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-signal-blue">Infrastructure package</p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {details.headlineMetrics.map((metric) => (
              <div key={metric.label} className="rounded-md border border-signal-blue/20 bg-black/25 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">{metric.label}</p>
                <p className="mt-2 text-xl font-semibold text-white">{metric.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{metric.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
        <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-signal-cyan">Agent State Flow</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {["Agent run", "Checkpoint saver", "Long-term memory", "Oracle Database"].map((item, index) => (
            <div key={item} className="relative rounded-md border border-white/10 bg-black/20 p-4">
              <span className="font-mono text-xs text-signal-blue">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-semibold text-white">{item}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {index === 0
                  ? "LangGraph agent produces state."
                  : index === 1
                    ? "Progress is durably saved."
                    : index === 2
                      ? "Reusable memory is stored and searched."
                      : "Tables, vectors, blobs, and transactions back the system."}
              </p>
              {index < 3 ? <div className="absolute -right-2 top-1/2 hidden h-px w-4 bg-signal-blue/60 md:block" /> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        {infraLayers.map((section) => (
          <article key={section.title} className="rounded-lg border border-signal-blue/20 bg-signal-blue/[0.035] p-6">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-signal-blue">{section.eyebrow}</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-normal text-white">{section.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{section.body}</p>
            <div className="mt-5 grid gap-3">
              {section.highlights.map((item) => (
                <div key={item} className="rounded-md border border-white/10 bg-black/20 p-3 text-sm leading-6 text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-lg border border-white/10 bg-black/20 p-6">
        <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-signal-cyan">Oracle Engineering Console</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {details.researchIterations.map((item) => (
            <article key={item.title} className="rounded-md border border-white/10 bg-white/[0.035] p-4">
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {demoLayer ? (
        <section className="overflow-hidden rounded-lg border border-signal-cyan/25 bg-signal-cyan/[0.035]">
          <div className="h-px bg-gradient-to-r from-transparent via-signal-cyan/80 to-transparent" />
          <div className="p-6">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-signal-cyan">{demoLayer.eyebrow}</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-normal text-white">{demoLayer.title}</h2>
            <p className="mt-4 leading-7 text-slate-300">{demoLayer.body}</p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {demoLayer.highlights.map((item) => (
                <div key={item} className="rounded-md border border-white/10 bg-black/20 p-3 text-sm leading-6 text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <DossierList title="Boundaries" items={details.limitations} />
    </>
  );
}

function FeatureSection({
  section,
}: {
  section: NonNullable<NonNullable<(typeof projects)[number]["caseStudyDetails"]>["featureSections"]>[number];
}) {
  return (
    <section className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.035]">
      <div className="h-px bg-gradient-to-r from-signal-green/0 via-signal-green/70 to-signal-cyan/0" />
      <div className="p-6">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-signal-green">{section.eyebrow}</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-normal text-white">{section.title}</h2>
        <p className="mt-4 leading-7 text-slate-300">{section.body}</p>
        {section.metrics ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {section.metrics.map((metric) => (
              <div key={metric.label} className="rounded-md border border-signal-green/20 bg-signal-green/[0.045] p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal-green">{metric.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{metric.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{metric.detail}</p>
              </div>
            ))}
          </div>
        ) : null}
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {section.highlights.map((item) => (
            <li key={item} className="flex gap-3 rounded-md border border-white/10 bg-black/20 p-3 text-sm text-slate-300">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-green" />
              <span className="leading-6">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function MethodGrid({
  title,
  items,
}: {
  title: string;
  items: { title: string; body: string }[];
}) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
      <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-signal-cyan">{title}</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {items.map((item, index) => (
          <article key={item.title} className="rounded-md border border-white/10 bg-black/20 p-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-signal-cyan">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="font-semibold text-white">{item.title}</h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DossierTable({
  table,
}: {
  table: NonNullable<(typeof projects)[number]["caseStudyDetails"]>["resultTables"][number];
}) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
      <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-signal-cyan">{table.title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-400">{table.note}</p>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-slate-400">
              {table.headers.map((header) => (
                <th key={header} className="px-3 py-3 font-mono text-[11px] uppercase tracking-[0.16em]">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.join("-")} className="border-b border-white/10 last:border-0">
                {row.map((cell, index) => (
                  <td key={`${cell}-${index}`} className="px-3 py-3 text-slate-300">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function DossierSection({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
      <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-signal-cyan">{title}</h2>
      <p className="mt-4 leading-7 text-slate-300">{body}</p>
    </section>
  );
}

function DossierList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
      <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-signal-cyan">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-slate-300">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal-cyan" />
            <span className="leading-7">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
