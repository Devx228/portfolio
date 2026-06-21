import type { Metadata } from "next";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { profile } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "Contact",
  description: "Public contact links for Devansh Abhay Dhok.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 lg:py-20">
      <SectionHeading
        eyebrow="Contact"
        title="Public channels"
        description="Email, GitHub, and LinkedIn are the public contact links for this profile."
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <ContactCard icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
        <ContactCard icon={Github} label="GitHub" value="Devx228" href={profile.github} />
        <ContactCard icon={Linkedin} label="LinkedIn" value="devansh-a-dhok" href={profile.linkedin} />
      </div>
    </div>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="focus-ring rounded-lg border border-white/10 bg-white/[0.035] p-5 hover:border-signal-cyan/50"
    >
      <Icon className="h-6 w-6 text-signal-cyan" />
      <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-2 break-words text-sm text-white">{value}</p>
    </Link>
  );
}
