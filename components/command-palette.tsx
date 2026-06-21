"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, X } from "lucide-react";
import { commandGroups, profile } from "@/content/portfolio";
import { cn } from "@/lib/utils";

export function CommandPalette({
  buttonClassName,
}: {
  buttonClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const run = (href: string) => {
    setOpen(false);
    if (href.startsWith("mailto:") || href.startsWith("http")) {
      window.location.href = href;
      return;
    }
    router.push(href);
  };

  return (
    <>
      <button
        type="button"
        className={cn(
          "focus-ring inline-flex h-10 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 text-sm text-slate-300 hover:border-signal-cyan/50 hover:text-white",
          buttonClassName,
        )}
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Command</span>
        <kbd className="hidden rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-slate-500 sm:inline">
          Cmd K
        </kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command palette"
        className="fixed left-1/2 top-24 z-50 w-[min(92vw,680px)] -translate-x-1/2 overflow-hidden rounded-lg border border-signal-cyan/30 bg-graphite-900/95 shadow-panel backdrop-blur-xl"
      >
        <div className="flex items-center border-b border-white/10 px-4">
          <Search className="mr-3 h-5 w-5 text-signal-cyan" />
          <Command.Input
            className="h-14 flex-1 bg-transparent font-mono text-sm text-white outline-none placeholder:text-slate-500"
            placeholder="Search routes, projects, links..."
          />
          <button
            type="button"
            className="focus-ring rounded p-2 text-slate-500 hover:text-white"
            onClick={() => setOpen(false)}
            aria-label="Close command palette"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <Command.List className="max-h-[420px] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-8 text-center text-sm text-slate-500">
            No matching result.
          </Command.Empty>
          {commandGroups.map((group) => (
            <Command.Group
              key={group.heading}
              heading={group.heading}
              className="py-2 text-xs uppercase tracking-[0.2em] text-slate-500 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2"
            >
              {group.items.map((item) => (
                <Command.Item
                  key={item.href}
                  value={`${group.heading} ${item.label}`}
                  onSelect={() => run(item.href)}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-3 text-sm normal-case tracking-normal text-slate-200 data-[selected=true]:bg-signal-cyan/12 data-[selected=true]:text-white"
                >
                  <item.icon className="h-4 w-4 text-signal-cyan" />
                  <span>{item.label}</span>
                </Command.Item>
              ))}
            </Command.Group>
          ))}
          <Command.Group
            heading="Links"
            className="py-2 text-xs uppercase tracking-[0.2em] text-slate-500 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2"
          >
            <Command.Item
              value="Email"
              onSelect={() => run(`mailto:${profile.email}`)}
              className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-3 text-sm normal-case tracking-normal text-slate-200 data-[selected=true]:bg-signal-cyan/12 data-[selected=true]:text-white"
            >
              Email
            </Command.Item>
            <Command.Item
              value="GitHub"
              onSelect={() => run(profile.github)}
              className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-3 text-sm normal-case tracking-normal text-slate-200 data-[selected=true]:bg-signal-cyan/12 data-[selected=true]:text-white"
            >
              GitHub
            </Command.Item>
            <Command.Item
              value="LinkedIn"
              onSelect={() => run(profile.linkedin)}
              className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-3 text-sm normal-case tracking-normal text-slate-200 data-[selected=true]:bg-signal-cyan/12 data-[selected=true]:text-white"
            >
              LinkedIn
            </Command.Item>
          </Command.Group>
        </Command.List>
        <div className="border-t border-white/10 px-4 py-3 font-mono text-[11px] text-slate-500">
          Press Escape to close.
        </div>
      </Command.Dialog>

      {open ? <div className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm" aria-hidden="true" /> : null}
    </>
  );
}
