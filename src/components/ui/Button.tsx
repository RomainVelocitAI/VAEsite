import { Link } from "@/i18n/navigation";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

const variants = {
  primary:
    "bg-chamois text-marron-pourpre hover:bg-chamois-dark hover:shadow-[0_4px_20px_rgba(170,125,88,0.3)]",
  secondary:
    "border border-marron-pourpre text-marron-pourpre hover:bg-marron-pourpre hover:text-blanc",
  ghost:
    "text-taupe/70 hover:text-marron-pourpre underline underline-offset-4 decoration-taupe/20 hover:decoration-marron-pourpre",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  onClick,
}: ButtonProps) {
  const baseClasses = `inline-flex items-center justify-center px-6 sm:px-7 py-4 sm:py-3.5 text-[14px] font-bold uppercase tracking-[0.15em] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href as "/"} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`${baseClasses} cursor-pointer`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
