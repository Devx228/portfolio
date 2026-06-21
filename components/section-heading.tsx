export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-signal-cyan">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-normal text-white sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-slate-400">{description}</p> : null}
    </div>
  );
}
