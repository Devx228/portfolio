import Link from "next/link";
import { ArrowRight, Download, TerminalSquare } from "lucide-react";
import { heroBootLines, profile } from "@/content/portfolio";

export function TerminalHero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden border-b border-white/10">
      <div className="hero-ambient absolute inset-0" aria-hidden="true" />
      <div className="hero-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="hero-spotlight absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,25rem)] lg:gap-12 lg:py-16">
        <div className="max-w-5xl">
          <div className="hero-reveal hero-reveal-kicker mb-5 inline-flex items-center gap-2 rounded-md border border-signal-cyan/30 bg-signal-cyan/10 px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-signal-cyan">
            <TerminalSquare className="h-4 w-4" />
            Portfolio online
          </div>
          <p className="hero-reveal hero-reveal-meta font-mono text-xs uppercase tracking-[0.24em] text-slate-500">
            Computer Science Engineering, IIT Kanpur
          </p>
          <h1 className="hero-name-reveal mt-3 max-w-5xl whitespace-nowrap text-[clamp(1.65rem,5vw,4.7rem)] font-semibold leading-[0.95] tracking-normal text-white">
            {profile.name}
          </h1>
          <p className="hero-reveal hero-reveal-copy mt-5 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            {profile.headline}
          </p>
          <div className="hero-reveal hero-reveal-actions mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="focus-ring inline-flex items-center gap-2 rounded-md bg-signal-cyan px-4 py-3 text-sm font-semibold text-graphite-950 transition hover:-translate-y-0.5 hover:bg-white"
            >
              My work
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/resume"
              className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-signal-cyan/50 hover:text-white"
            >
              Resume
              <Download className="h-4 w-4" />
            </Link>
          </div>

          <div className="hero-quiet-rail mt-12 max-w-3xl" aria-hidden="true">
            <span />
          </div>
        </div>

        <div className="hero-boot-panel scanline overflow-hidden rounded-lg border border-white/10 bg-graphite-900/75 shadow-panel backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="hero-status-dot hero-status-dot-one h-2 w-2 rounded-full bg-signal-red/80" />
              <span className="hero-status-dot hero-status-dot-two h-2 w-2 rounded-full bg-signal-amber/80" />
              <span className="hero-status-dot hero-status-dot-three h-2 w-2 rounded-full bg-signal-green/80" />
            </div>
            <span className="font-mono text-xs text-slate-500">~/portfolio</span>
          </div>
          <div className="space-y-2.5 p-4 font-mono text-[13px] leading-6">
            {heroBootLines.map((line, index) => (
              <p key={line} className={`hero-boot-line hero-boot-line-${index + 1} text-slate-300`}>
                <span className="mr-2 text-slate-600">$</span>
                {line}
              </p>
            ))}
            <p className="hero-boot-ready text-signal-green">
              ready
              <span className="hero-cursor ml-2 inline-block h-4 w-2 translate-y-0.5 bg-signal-cyan" aria-hidden="true" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
