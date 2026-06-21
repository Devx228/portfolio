import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/content/portfolio";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-graphite-950/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-slate-400 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <p>
          {profile.name}. Dark technical portfolio. No copyrighted superhero assets.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 hover:border-signal-cyan/50 hover:text-white" href={`mailto:${profile.email}`}>
            <Mail className="h-4 w-4" />
            Email
          </Link>
          <Link className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 hover:border-signal-cyan/50 hover:text-white" href={profile.github}>
            <Github className="h-4 w-4" />
            GitHub
          </Link>
          <Link className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 hover:border-signal-cyan/50 hover:text-white" href={profile.linkedin}>
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  );
}
