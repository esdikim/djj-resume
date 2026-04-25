interface Props {
  eyebrow: string;
  title: string;
  description?: string;
}
export function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <div className="mb-10 max-w-3xl">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-soft px-3 py-1 text-xs font-mono uppercase tracking-widest text-brand">
        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
        {eyebrow}
      </div>
      <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
