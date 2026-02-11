interface SectionTitleProps {
  title: string;
  subtitle?: string;
  accent?: boolean;
  center?: boolean;
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  accent = true,
  center = true,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={`mb-12 md:mb-16 ${center ? "text-center" : ""} ${className}`}>
      <h2 className="text-[30px] md:text-[38px] font-bold tracking-tight text-noir leading-tight">
        {title}
      </h2>
      {accent && (
        <div
          className={`mt-4 h-[2px] w-12 bg-or ${
            center ? "mx-auto" : ""
          }`}
        />
      )}
      {subtitle && (
        <p className="mt-4 text-[17px] md:text-lg text-texte/60 max-w-2xl leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
