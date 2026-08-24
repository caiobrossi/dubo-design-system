import type { Metadata } from "next";
import { Callout } from "@/components/docs/callout";
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
import { DataTableBasicDemo, DataTableEmptyDemo } from "../_missing-component-demos";

const entry = getComponentDoc("data-table");

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
};

const comparisonRows = [
  {
    item: "DataTable",
    details: "Use for interactive datasets with sorting, row click handling, selection or future server-side control.",
  },
  {
    item: "Table",
    details: "Use for static or lightly interactive layouts where full HTML table semantics are more important than data tooling.",
  },
];

const propRows = [
  {
    prop: "columns",
    type: "ColumnDef<TData>[]",
    default: "required",
    description: "TanStack column definition array that drives rendering and interaction.",
  },
  {
    prop: "data",
    type: "TData[]",
    default: "required",
    description: "Source records rendered into rows.",
  },
  {
    prop: "enableSorting",
    type: "boolean",
    default: "true",
    description: "Turns on built-in client sorting for sortable columns.",
  },
  {
    prop: "onRowClick",
    type: "(row) => void",
    default: "—",
    description: "Adds pointer affordance and lets rows open detail drawers or pages.",
  },
  {
    prop: "emptyMessage / loading",
    type: "string / boolean",
    default: "No results. / false",
    description: "Controls operational empty and loading states without changing layout structure.",
  },
];

const accessibilityRows = [
  {
    item: "Header clarity",
    details: "Keep column titles short and sortable headers visibly interactive.",
  },
  {
    item: "Empty state",
    details: "Always provide a meaningful empty message so the component never collapses into silence.",
  },
  {
    item: "Row actions",
    details: "If rows open details, ensure the same action is available through a clear focusable control elsewhere in the row.",
  },
];

export default function DataTablePage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="Data Table is the operational dataset surface. Reach for it when the UI needs sorting and richer row behavior rather than simple presentation."
        >
          <div className="grid gap-6">
            <ShowcaseCard
              title="Operational dataset"
              description="Default configuration already gives you sortable headers and the core Dubo row styling."
            >
              <DataTableBasicDemo />
            </ShowcaseCard>
            <ShowcaseCard
              title="Empty state"
              description="Keep the same visual shell even when no records are available."
            >
              <DataTableEmptyDemo />
            </ShowcaseCard>
          </div>
          <div className="mt-6">
            <Callout title="Choosing between Table and Data Table">
              Use static <code>Table</code> for compact informational layouts. Use <code>DataTable</code> when interaction
              is part of the job, not an afterthought.
            </Callout>
          </div>
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="Rows are rendered as structured cards with generous spacing to support scanning, sorting and clickability in product flows."
        >
          <NotesTable rows={comparisonRows} />
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="The API stays close to TanStack so advanced behavior can scale up without rewriting the surrounding page."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs["data-table"].tokens} />
          </div>
        </DocsSection>

        <DocsSection
          id="accessibility"
          title="Accessibility"
          description="Tables with interaction need especially clear focus, sorting and empty-state language."
        >
          <NotesTable rows={accessibilityRows} />
        </DocsSection>
      </div>
    </div>
  );
}
