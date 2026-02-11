import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({
  title,
  description,
  imageSrc,
  imageAlt,
  icon,
  className = "",
  onClick,
}: CardProps) {
  const Tag = onClick ? "button" : "div";

  return (
    <Tag
      className={`group bg-blanc rounded-sm overflow-hidden transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] ${
        onClick ? "cursor-pointer text-left w-full" : ""
      } ${className}`}
      onClick={onClick}
    >
      {imageSrc && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      )}
      <div className="p-6 md:p-8">
        {icon && (
          <div className="mb-4 text-or">{icon}</div>
        )}
        <h3 className="text-[17px] font-bold text-noir mb-2 leading-snug">
          {title}
        </h3>
        <p className="text-[14px] text-texte/60 leading-relaxed">
          {description}
        </p>
      </div>
    </Tag>
  );
}
