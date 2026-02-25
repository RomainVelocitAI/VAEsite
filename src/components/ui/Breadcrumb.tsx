import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getBreadcrumbItems, getBreadcrumbJsonLd } from "@/lib/seo";

interface BreadcrumbProps {
  internalPath: string;
  locale: string;
}

export function Breadcrumb({ internalPath, locale }: BreadcrumbProps) {
  const items = getBreadcrumbItems(internalPath, locale);
  const jsonLd = getBreadcrumbJsonLd(internalPath, locale);

  if (internalPath === "/") return null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label={locale === "fr" ? "Fil d'Ariane" : "Breadcrumb"}
        className="bg-creme/80 border-b border-noir/5"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ol className="flex items-center gap-1.5 py-3 text-[13px]">
            {items.map((item, i) => (
              <li key={i} className="flex items-center gap-1.5">
                {i > 0 && (
                  <ChevronRight
                    size={12}
                    strokeWidth={1.5}
                    className="text-texte/30"
                    aria-hidden="true"
                  />
                )}
                {item.href ? (
                  <Link
                    href={"/" as "/"}
                    className="text-texte/50 hover:text-or transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-noir font-medium" aria-current="page">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
