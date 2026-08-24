import Link from "next/link";
import { EmptyState } from "@/components/docs/empty-state";
import { productComponentDocEntries } from "@/lib/content-registry";

export default function ProductComponentsIndexPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-[960px] flex-col gap-12">
      <section className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-8 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-body-md font-medium text-subtext-color">Product Components</p>
          <h1 className="mt-4 text-hero font-medium tracking-[0em] text-default-font lg:text-hero">
            Workflow-specific components will live here.
          </h1>
          <p className="mt-4 max-w-3xl text-body-lg text-subtext-color">
            This section is reserved for panels, overlays and workflow surfaces that belong to the
            Dubo product itself, not to the shared primitive library.
          </p>
        </div>
      </section>

      {productComponentDocEntries.length ? (
        <section className="grid gap-4 md:grid-cols-2">
          {productComponentDocEntries.map((entry) => (
            <Link
              key={entry.slug}
              href={`/product-components/${entry.slug}`}
              className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5 transition-colors hover:border-[var(--color-border-strong)]"
            >
              <p className="text-heading-4 font-medium text-default-font">{entry.title}</p>
              <p className="mt-2 text-body-md text-subtext-color">{entry.description}</p>
            </Link>
          ))}
        </section>
      ) : (
        <EmptyState
          title="No product component docs are authored yet."
          description="This shell is ready for surfaces like member panels, notes panels and workflow drawers, but we are intentionally waiting to document them with you one at a time."
        />
      )}
    </div>
  );
}
