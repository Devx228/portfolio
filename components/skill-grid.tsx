import { skills } from "@/content/portfolio";

export function SkillGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {skills.map((skill) => (
        <section key={skill.title} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-md border border-signal-cyan/20 bg-signal-cyan/10 text-signal-cyan">
              <skill.icon className="h-5 w-5" />
            </span>
            <h3 className="font-semibold text-white">{skill.title}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {skill.items.map((item) => (
              <span key={item} className="rounded border border-white/10 bg-black/20 px-2 py-1 font-mono text-[11px] text-slate-400">
                {item}
              </span>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
