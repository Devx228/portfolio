import { Project } from "@/content/portfolio";
import { cn } from "@/lib/utils";

const accentClass: Record<Project["accent"], string> = {
  cyan: "border-signal-cyan/40 bg-signal-cyan/10 text-signal-cyan",
  blue: "border-signal-blue/40 bg-signal-blue/10 text-signal-blue",
  green: "border-signal-green/40 bg-signal-green/10 text-signal-green",
  amber: "border-signal-amber/40 bg-signal-amber/10 text-signal-amber",
  red: "border-signal-red/40 bg-signal-red/10 text-signal-red",
};

export function StatusBadge({
  children,
  accent = "cyan",
}: {
  children: React.ReactNode;
  accent?: Project["accent"];
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em]",
        accentClass[accent],
      )}
    >
      {children}
    </span>
  );
}
