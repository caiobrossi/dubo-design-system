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
import { PageLayout } from "@/components/ui/page-layout";
import { getComponentDoc } from "@/lib/content-registry";
import { componentTokenDocs } from "@/lib/component-token-docs";

const entry = getComponentDoc("page-layout");

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
};

function DemoPane({ title, lines = 3 }: { title: string; lines?: number }) {
  return (
    <LayoutCard>
      <div className="flex flex-col gap-4">
        <div className="text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
          {title}
        </div>
        <div className="flex flex-col gap-2">
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className="h-3 rounded-full bg-[var(--color-hover)]"
              style={{ width: `${88 - index * 12}%` }}
            />
          ))}
        </div>
      </div>
    </LayoutCard>
  );
}

const usageRows = [
  {
    item: "Page-level composition",
    details:
      "Use it to define the main content structure of a page before you place cards, tables, panels, or widgets inside it.",
  },
  {
    item: "Preset ratios",
    details:
      "Prefer the provided ratios instead of arbitrary custom grids so page rhythm stays consistent across the product.",
  },
  {
    item: "Fixed sidebars",
    details:
      "Use fixed-sidebar-left or fixed-sidebar-right when one pane must stay at 420px while the opposite pane grows to fill the remaining width.",
  },
  {
    item: "Pane neutrality",
    details:
      "PageLayout is intentionally visual-neutral. Pair it with LayoutCard or another content wrapper when a pane needs its own surface treatment.",
  },
];

const propRows = [
  {
    prop: "layout",
    type: '"full" | "halves" | "sidebar-left" | "sidebar-right" | "two-thirds-left" | "two-thirds-right" | "fixed-sidebar-left" | "fixed-sidebar-right"',
    default: '"full"',
    description:
      "Controls the page structure: full width, proportional splits, or a 420px fixed sidebar paired with a fluid content pane.",
  },
  {
    prop: "children",
    type: "ReactNode",
    default: "required",
    description: "Render one pane for full layouts, or two panes for split layouts.",
  },
  {
    prop: "LayoutCard",
    type: "companion component",
    default: "—",
    description: "Use LayoutCard when a pane needs radius, border, background, and inner padding.",
  },
  {
    prop: "className",
    type: "string",
    default: "—",
    description:
      "Use it only for page-level width or additional layout context, not to turn the layout primitive into a visual panel.",
  },
];

const accessibilityRows = [
  {
    item: "Semantic content inside panes",
    details:
      "PageLayout is only structural. Headings, landmarks, forms, and interactive regions should come from the content placed inside each pane.",
  },
  {
    item: "Mobile stacking",
    details:
      "Split layouts collapse to a single column on smaller screens so reading order remains predictable.",
  },
  {
    item: "Avoid visual overload",
    details:
      "Because PageLayout is structural, decide panel surfaces intentionally instead of baking them into every layout root by default.",
  },
];

export default function PageLayoutPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="PageLayout gives teams a repeatable page structure primitive so split content areas stop being rebuilt ad hoc with one-off grid classes."
        >
          <div className="grid gap-6">
            <ShowcaseCard
              title="Full-width"
              description="Use for single-column editorial, table, or detail pages."
            >
              <PageLayout layout="full">
                <DemoPane title="Full-width content" lines={5} />
              </PageLayout>
            </ShowcaseCard>
            <ShowcaseCard
              title="Common split layouts"
              description="Use the provided presets for proportional splits and fixed-sidebar compositions."
            >
              <div className="flex flex-col gap-6">
                <PageLayout layout="halves">
                  <DemoPane title="50%" />
                  <DemoPane title="50%" />
                </PageLayout>
                <PageLayout layout="sidebar-left">
                  <DemoPane title="25%" lines={2} />
                  <DemoPane title="75%" lines={4} />
                </PageLayout>
                <PageLayout layout="sidebar-right">
                  <DemoPane title="75%" lines={4} />
                  <DemoPane title="25%" lines={2} />
                </PageLayout>
                <PageLayout layout="two-thirds-left">
                  <DemoPane title="66%" lines={5} />
                  <DemoPane title="33%" lines={2} />
                </PageLayout>
                <PageLayout layout="two-thirds-right">
                  <DemoPane title="33%" lines={2} />
                  <DemoPane title="66%" lines={5} />
                </PageLayout>
                <PageLayout layout="fixed-sidebar-right">
                  <DemoPane title="Fluid content" lines={5} />
                  <DemoPane title="Fixed 420px sidebar" lines={2} />
                </PageLayout>
              </div>
            </ShowcaseCard>
          </div>
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="The component is intentionally structural: it owns ratios and spacing only. Visual treatment belongs in companion wrappers like LayoutCard."
        >
          <NotesTable rows={usageRows} />
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="Compose the layout with one root and place LayoutCard or another panel wrapper inside each region only when the content actually needs that surface."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs["page-layout"].tokens} />
          </div>
        </DocsSection>

        <DocsSection
          id="accessibility"
          title="Accessibility"
          description="Because this is a structural primitive, accessibility depends on the semantic content that teams place inside it."
        >
          <NotesTable rows={accessibilityRows} />
        </DocsSection>
      </div>
    </div>
  );
}
