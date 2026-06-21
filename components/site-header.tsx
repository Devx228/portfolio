"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin, Mail, Shield } from "lucide-react";
import { CommandPalette } from "@/components/command-palette";
import { profile } from "@/content/portfolio";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-graphite-950/78 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="focus-ring flex min-w-0 items-center gap-3 rounded-md">
          <span className="grid h-9 w-9 place-items-center rounded-md border border-signal-cyan/30 bg-signal-cyan/10 text-signal-cyan">
            <Shield className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-white">{profile.name}</span>
            <span className="hidden truncate font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500 sm:block">
              research systems portfolio
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-ring rounded-md px-3 py-2 text-sm text-slate-400 hover:bg-white/[0.04] hover:text-white",
                  active && "bg-white/[0.06] text-signal-cyan",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={`mailto:${profile.email}`}
            className="focus-ring hidden h-10 w-10 place-items-center rounded-md border border-white/10 text-slate-400 hover:border-signal-cyan/50 hover:text-white sm:grid"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </Link>
          <Link
            href={profile.github}
            className="focus-ring hidden h-10 w-10 place-items-center rounded-md border border-white/10 text-slate-400 hover:border-signal-cyan/50 hover:text-white sm:grid"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </Link>
          <Link
            href={profile.linkedin}
            className="focus-ring hidden h-10 w-10 place-items-center rounded-md border border-white/10 text-slate-400 hover:border-signal-cyan/50 hover:text-white sm:grid"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </Link>
          <CommandPalette />
        </div>
      </div>
    </header>
  );
}
