import type { ReactNode } from "react";

interface DocsSectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export function DocsSection({ id, title, description, children }: DocsSectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-[var(--color-border)] pt-12 first:border-0 first:pt-0"
    >
      <div className="mb-7 flex flex-col gap-2">
        <h2 className="text-hero font-medium tracking-[0em] text-default-font">{title}</h2>
        {description ? (
          <p className="max-w-3xl text-body-lg text-subtext-color">{description}</p>
        ) : null}
      </div>
      <div className="flex flex-col gap-6 lg:gap-8">{children}</div>
    </section>
  );
}
