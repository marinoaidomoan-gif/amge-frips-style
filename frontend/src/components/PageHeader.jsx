export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="max-w-2xl mx-auto text-center px-6 pt-16 pb-20">
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.2em] text-gold-deep dark:text-gold mb-4">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-5xl md:text-6xl uppercase tracking-[0.12em]">{title}</h1>
      <div className="w-14 h-px bg-gold mx-auto my-8" />
      {subtitle && <p className="text-charcoal/65 dark:text-offwhite/65 leading-relaxed">{subtitle}</p>}
    </div>
  );
}