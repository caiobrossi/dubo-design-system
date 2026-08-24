import Link from "next/link";
import { ArrowRight } from "@/lib/icons";
import { ComponentCatalogPreview } from "@/components/docs/component-catalog-preview";
import { componentDocEntries } from "@/lib/content-registry";

export default function ComponentsIndexPage() {
  const sortedEntries = componentDocEntries.toSorted((a, b) => a.order - b.order);

  return (
    <div id="content" className="mx-auto flex w-full max-w-[1120px] flex-col gap-12">
      <section className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-8 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-body-md font-medium text-subtext-color">Components</p>
          <h1 className="mt-4 text-hero font-medium tracking-[0em] text-default-font lg:text-hero">
            A visual catalog of the core components in the Dubo system.
          </h1>
          <p className="mt-4 max-w-3xl text-body-lg text-subtext-color">
            Browse the building blocks we use across product surfaces. Every card links to a
            dedicated documentation page with usage guidance, tokens, code references, and
            accessibility notes.
          </p>
          <p className="mt-6 text-body-md text-subtext-color">
            {sortedEntries.length} components currently documented
          </p>
        </div>
      </section>

      {sortedEntries.length ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sortedEntries.map((entry) => (
            <Link
              key={entry.slug}
              href={`/components/${entry.slug}`}
              className="group overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] transition-colors hover:border-[var(--color-border-strong)]"
            >
              <ComponentCatalogPreview slug={entry.slug} />
              <div className="border-t border-[var(--color-border)] px-5 py-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="min-w-0 text-body-lg font-medium text-default-font">
                    {entry.title}
                  </p>
                  <ArrowRight className="mt-0.5 size-4 shrink-0 text-subtext-color transition-transform group-hover:translate-x-1 group-hover:text-default-font" />
                </div>
              </div>
            </Link>
          ))}
        </section>
      ) : null}
    </div>
  );
}
