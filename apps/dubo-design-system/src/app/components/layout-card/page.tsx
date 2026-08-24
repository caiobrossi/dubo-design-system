import type { Metadata } from "next";

import {
  DesignTokensDocTable,
  NotesTable,
  PropsTable,
  ShowcaseCard,
} from "@/components/docs/component-doc-helpers";
import { ComponentHero } from "@/components/docs/component-hero";
import { DocsSection } from "@/components/docs/section";
import { LayoutCard } from "@/components/ui/layout-card";
import { getComponentDoc } from "@/lib/content-registry";
import { componentTokenDocs } from "@/lib/component-token-docs";

const entry = getComponentDoc("layout-card");

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
};

const usageRows = [
  {
    item: "Panel wrapper",
    details:
      "Use LayoutCard when a content region needs its own quiet surface and spacing. It is the visual companion to structural layouts like PageLayout.",
  },
  {
    item: "Not a page grid",
    details:
      "LayoutCard does not decide ratios or column structure. Keep that responsibility in PageLayout or another structural primitive.",
  },
];

const propRows = [
  {
    prop: "children",
    type: "ReactNode",
    default: "required",
    description: "Render the content that lives inside the panel.",
  },
  {
    prop: "className",
    type: "string",
    default: "—",
    description:
      "Use it for page-specific size or layout adjustments without overriding the base panel recipe.",
  },
];

export default function LayoutCardPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="LayoutCard gives teams a reusable panel shell so visual treatment stays separate from structural page layout."
        >
          <ShowcaseCard
            title="Panel shell"
            description="Use inside PageLayout or other page structures when a region needs a surface, border, radius, and padding."
          >
            <div className="bg-[var(--color-bg-page)] p-4">
              <LayoutCard>
                <div className="flex flex-col gap-4">
                  <div className="text-heading-3 [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
                    Panel title
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="h-3 w-40 rounded-full bg-[var(--color-hover)]" />
                    <div className="h-3 w-full rounded-full bg-[var(--color-hover)]" />
                    <div className="h-3 w-[72%] rounded-full bg-[var(--color-hover)]" />
                  </div>
                </div>
              </LayoutCard>
            </div>
          </ShowcaseCard>
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="LayoutCard owns the quiet content-surface treatment that should not live inside structural primitives like PageLayout."
        >
          <NotesTable rows={usageRows} />
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="Use LayoutCard directly, or compose a page-specific shell on top of it when a feature needs a local header or action row."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs["layout-card"].tokens} />
          </div>
        </DocsSection>
      </div>
    </div>
  );
}
