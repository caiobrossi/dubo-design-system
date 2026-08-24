import type { Metadata } from "next";
import { designTokensDoc } from "@/lib/content-registry";

export const metadata: Metadata = {
  title: designTokensDoc.title,
  description: designTokensDoc.description,
};

export default function DesignTokensPage() {
  const Content = designTokensDoc.component;

  return (
    <div id="content" className="mx-auto flex w-full max-w-[960px] flex-col gap-12">
      <section className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-8 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-body-md font-medium text-subtext-color">Design Tokens</p>
          <h1 className="mt-4 text-hero font-medium tracking-[0em] text-default-font lg:text-hero">
            {designTokensDoc.title}
          </h1>
          <p className="mt-4 max-w-3xl text-body-lg text-subtext-color">
            {designTokensDoc.description}
          </p>
        </div>
      </section>

      <article className="docs-prose">
        <Content />
      </article>
    </div>
  );
}
