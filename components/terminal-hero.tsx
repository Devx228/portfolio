import Link from "next/link";
import { ArrowRight, Download, TerminalSquare } from "lucide-react";
import { profile } from "@/content/portfolio";

const commands = [
  { prompt: "base", value: "Computer Science Engineering, IIT Kanpur" },
  { prompt: "build zone", value: "AI, medical technology, agent infrastructure, machine learning, systems" },
  { prompt: "research mode", value: "Pick one hard problem. Go deep. Break weak ideas. Keep the proof." },
  { prompt: "shipping mode", value: "Build systems that remember, recover, explain, and actually run." },
];

export function TerminalHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:py-12">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-signal-cyan/30 bg-signal-cyan/10 px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-signal-cyan">
            <TerminalSquare className="h-4 w-4" />
            Portfolio online
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500">Computer Science Engineering, IIT Kanpur</p>
          <h1 className="max-w-5xl whitespace-nowrap text-[clamp(2.2rem,7vw,5.8rem)] font-semibold tracking-normal text-white">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            {profile.headline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="focus-ring inline-flex items-center gap-2 rounded-md bg-signal-cyan px-4 py-3 text-sm font-semibold text-graphite-950 hover:bg-white"
            >
              View project dossiers
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/resume"
              className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-signal-cyan/50 hover:text-white"
            >
              Resume signal
              <Download className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="scanline overflow-hidden rounded-lg border border-signal-cyan/20 bg-graphite-900/80 shadow-glow">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-signal-red" />
              <span className="h-2.5 w-2.5 rounded-full bg-signal-amber" />
              <span className="h-2.5 w-2.5 rounded-full bg-signal-green" />
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">dossier.init</span>
          </div>
          <div className="space-y-4 p-5 font-mono text-sm">
            {commands.map((command) => (
              <div key={command.prompt}>
                <p className="text-signal-cyan">$ {command.prompt}</p>
                <p className="mt-1.5 leading-6 text-slate-300">{command.value}</p>
              </div>
            ))}
            <div className="grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-2">
              {["medtech x AI", "agents with memory", "research mindset", "systems taste"].map((item) => (
                <div key={item} className="rounded-md border border-white/10 bg-black/20 p-3 text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
