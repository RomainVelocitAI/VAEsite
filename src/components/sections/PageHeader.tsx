import { Container } from "@/components/ui/Container";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative bg-noir pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
      {/* Diagonal texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            rgba(197,165,114,1) 40px,
            rgba(197,165,114,1) 41px
          )`,
        }}
      />

      <Container className="relative z-10">
        <div className="text-center">
          <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-blanc tracking-tight">
            {title}
          </h1>
          <div className="mt-4 h-[2px] w-12 bg-or mx-auto" />
          {subtitle && (
            <p className="mt-4 text-[17px] md:text-lg font-accent italic text-or/70 max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
