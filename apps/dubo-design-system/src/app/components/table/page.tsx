import type { Metadata } from "next";
import {
  DesignTokensDocTable,
  NotesTable,
  PropsTable,
  ShowcaseCard,
} from "@/components/docs/component-doc-helpers";
import { ComponentHero } from "@/components/docs/component-hero";
import { DocsSection } from "@/components/docs/section";
import { getComponentDoc } from "@/lib/content-registry";
import { componentTokenDocs } from "@/lib/component-token-docs";
import {
  TableCardDemo,
  TableSortableDemo,
  TableStripedDemo,
} from "../_missing-component-demos";

const entry = getComponentDoc("table");

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
};

const variantRows = [
  {
    item: "default",
    details: "Clean rows with bottom borders only. Good for simple administrative tables.",
  },
  {
    item: "outline",
    details: "Dense bordered grid for settings and compact informational displays.",
  },
  {
    item: "striped",
    details: "Primary Dubo table style with row cards, gaps and hover emphasis.",
  },
  {
    item: "card",
    details: "Transforms each row into a standalone card for mobile-first or content-heavy views.",
  },
];

const propRows = [
  {
    prop: "variant",
    type: `"default" | "outline" | "striped" | "card"`,
    default: `"default"`,
    description: "Sets the row treatment and cascades the appropriate context to sub-components.",
  },
  {
    prop: "sortable",
    type: "boolean",
    default: "false",
    description: "Enables interactive sort affordance on TableHead.",
  },
  {
    prop: "sortDirection",
    type: `"asc" | "desc" | null`,
    default: "null",
    description: "Communicates the current sort state to the header icon treatment.",
  },
  {
    prop: "onSort",
    type: "() => void",
    default: "—",
    description: "Receives click intent so the parent can cycle sorting logic.",
  },
];

const accessibilityRows = [
  {
    item: "Semantic structure",
    details: "Prefer Table when the content should remain a real HTML table with clear header associations.",
  },
  {
    item: "Sortable state",
    details: "Whenever sorting is enabled, the current direction should stay visible and predictable.",
  },
  {
    item: "Card variant",
    details: "Use labeled cell pairs in card mode so the loss of the header row does not reduce clarity.",
  },
];

export default function TablePage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="Table is the presentation-first data primitive. Use it when semantics and layout clarity matter more than data tooling."
        >
          <div className="grid gap-6">
            <ShowcaseCard
              title="Striped rows"
              description="This is the primary Dubo table treatment for operational overviews."
            >
              <TableStripedDemo />
            </ShowcaseCard>
            <div className="grid gap-6 lg:grid-cols-2">
              <ShowcaseCard
                title="Card variant"
                description="Useful for denser rows that need label-value grouping."
              >
                <TableCardDemo />
              </ShowcaseCard>
              <ShowcaseCard
                title="Sortable headers"
                description="Table can stay lightweight while still supporting simple sort affordances."
              >
                <TableSortableDemo />
              </ShowcaseCard>
            </div>
          </div>
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="Variants let the same semantic structure adapt from compact administrative grids to more expressive list views while staying on shared spacing, radius, surface, and typography roles."
        >
          <NotesTable rows={variantRows} />
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="Compose Table with header, body and cell primitives. Keep advanced data behavior in DataTable, not in this layer."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs["table"].tokens} />
          </div>
        </DocsSection>

        <DocsSection
          id="accessibility"
          title="Accessibility"
          description="Table should preserve structural meaning even when visual variants become more expressive."
        >
          <NotesTable rows={accessibilityRows} />
        </DocsSection>
      </div>
    </div>
  );
}
