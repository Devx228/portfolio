import { experience } from "@/content/portfolio";

export function Timeline() {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/10 bg-white/[0.035] p-5">
      <div className="grid min-w-[1120px] grid-cols-6 gap-3 xl:min-w-0">
        {experience.map((item, index) => (
          <article key={item.title} className="relative rounded-md border border-white/10 bg-black/20 p-4">
            {index < experience.length - 1 ? <span className="absolute -right-3 top-8 hidden h-px w-3 bg-signal-cyan/40 xl:block" /> : null}
            <span className="font-mono text-xs text-signal-cyan">{String(index + 1).padStart(2, "0")}</span>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
            <h3 className="mt-2 font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{item.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
