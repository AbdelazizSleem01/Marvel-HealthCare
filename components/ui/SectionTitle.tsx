interface SectionTitleProps {
  tag?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionTitle({ tag, title, description, centered = true, light = false }: SectionTitleProps) {
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      {tag && (
        <div className={`inline-flex items-center gap-2 mb-4 ${centered ? "" : ""}`}>
          <span className="w-6 h-px bg-primary-500" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary-400">{tag}</span>
          <span className="w-6 h-px bg-primary-500" />
        </div>
      )}
      <h2 className={`font-display font-bold text-3xl md:text-5xl leading-tight mb-4 ${light ? "text-text-dark" : "text-text-light dark:text-text-dark"}`}>
        {title}
      </h2>
      {description && (
        <p className="text-base md:text-lg text-muted-light dark:text-muted-dark leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
