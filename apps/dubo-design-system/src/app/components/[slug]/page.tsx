import type { Metadata } from "next";
import { Callout } from "@/components/docs/callout";
import { ComponentHero } from "@/components/docs/component-hero";
import { DocsSection } from "@/components/docs/section";
import { getComponentDoc, componentDocEntries } from "@/lib/content-registry";
import fs from "fs";
import path from "path";

interface ComponentPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Only generate pages for slugs that do NOT have their own dedicated page.tsx folder.
 * This avoids conflicts between [slug] and fixed routes like /components/button/.
 */
export function generateStaticParams() {
  const componentsDir = path.join(process.cwd(), "src/app/components");
  const fixedDirs = fs
    .readdirSync(componentsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== "[slug]")
    .map((d) => d.name);

  return componentDocEntries
    .filter((entry) => !fixedDirs.includes(entry.slug))
    .map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: ComponentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getComponentDoc(slug);

  return {
    title: entry.title,
    description: entry.description,
  };
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params;
  const entry = getComponentDoc(slug);

  return (
    <div id="content" className="mx-auto flex w-full max-w-[1120px] flex-col gap-12">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="This section is ready to capture when to use the component, when not to use it, and what role it plays in the Dubo UI."
        >
          <Callout title="Planned content">
            Usage guidance will be written with real product examples from the system instead of
            generic library guidance.
          </Callout>
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="This section will document the Dubo-specific look and feel layered on top of the shadcn foundation."
        >
          <Callout title="Planned content">
            Visual rules here will cover variants, spacing, icon treatment, density, radius and any
            glass or border language used by the final component.
          </Callout>
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="This section reserves space for implementation notes, API shape, props and Storybook references."
        >
          <Callout tone="brand" title="Storybook connection">
            The page already supports linking directly to the matching Storybook entry so the public
            docs and technical playground stay connected.
          </Callout>
        </DocsSection>

        <DocsSection
          id="accessibility"
          title="Accessibility"
          description="This section will define expected keyboard support, semantics, labeling and state announcements."
        >
          <Callout tone="warning" title="To be documented">
            Accessibility guidance will be completed alongside each component implementation so the
            docs reflect the real behavior instead of assumptions.
          </Callout>
        </DocsSection>
      </div>
    </div>
  );
}
