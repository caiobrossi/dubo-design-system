import type { Metadata } from "next";
import {
  DesignTokensDocTable,
  NotesTable,
  PropsTable,
  ShowcaseCard,
} from "@/components/docs/component-doc-helpers";
import { ComponentHero } from "@/components/docs/component-hero";
import { DocsSection } from "@/components/docs/section";
import { DataDisplay, DataDisplayItem } from "@/components/ui/data-display";
import { getComponentDoc } from "@/lib/content-registry";
import { componentTokenDocs } from "@/lib/component-token-docs";

const entry = getComponentDoc("data-display");

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
};

const usageRows = [
  {
    item: "Metadata lists",
    details:
      "Use it for patient details, invoice metadata, appointment summaries, and any repeated label/value information block.",
  },
  {
    item: "Quiet footer pattern",
    details:
      "It works especially well near card footers and detail panels because the divider gives structure without adding heavy chrome.",
  },
  {
    item: "Consistent rhythm",
    details:
      "Prefer one row height per block. Mixing 40px and 48px rows in the same list should be the exception, not the default.",
  },
];

const propRows = [
  {
    prop: "label / value",
    type: "ReactNode / ReactNode",
    default: "required",
    description: "Defines the left label and right-aligned content for each row.",
  },
  {
    prop: "size",
    type: '"md" | "lg"',
    default: '"md"',
    description: "Maps to the shared 40px and 48px control heights.",
  },
  {
    prop: "align",
    type: '"center" | "start"',
    default: '"center"',
    description: "Use `start` when the row contains multiline content instead of a single line.",
  },
];

const accessibilityRows = [
  {
    item: "Label clarity",
    details:
      "Labels should be short and explicit so the right-hand value can be scanned quickly without extra context.",
  },
  {
    item: "Multiline values",
    details:
      "When the value wraps, use the start alignment so the row still feels stable and readable.",
  },
  {
    item: "Do not overload",
    details:
      "If a row needs actions, chips, multiple columns, or editable fields, move to a richer pattern instead of stretching this one too far.",
  },
];

export default function DataDisplayPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="DataDisplay gives product teams a consistent label/value pattern for small information groups instead of rebuilding the same row layout over and over."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ShowcaseCard
              title="Default rows"
              description="Balanced 40px rows for most metadata lists."
            >
              <DataDisplay>
                <DataDisplayItem label="Patient" value="Ana Martins" />
                <DataDisplayItem label="Phone" value="+351 910 000 000" />
                <DataDisplayItem label="Next appointment" value="14 Mar 2026, 10:30" />
                <DataDisplayItem label="Balance" value="€120.00" />
              </DataDisplay>
            </ShowcaseCard>
            <ShowcaseCard
              title="Mixed density"
              description="Use larger rows when the context needs more breathing room."
            >
              <DataDisplay>
                <DataDisplayItem size="lg" label="Treatment plan" value="Orthodontic follow-up" />
                <DataDisplayItem size="lg" label="Responsible doctor" value="Dr. Miguel Costa" />
                <DataDisplayItem align="start" label="Notes" value="Patient requested revised estimate by email." />
              </DataDisplay>
            </ShowcaseCard>
          </div>
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="The component is intentionally quiet: shared surface, shared divider color, shared control heights, and 16px base typography roles. That makes it easy to drop into many contexts without creating visual noise."
        >
          <NotesTable rows={usageRows} />
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="Compose one wrapper with repeated items. The wrapper owns the border and divider rhythm so each row stays lightweight."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs["data-display"].tokens} />
          </div>
        </DocsSection>

        <DocsSection
          id="accessibility"
          title="Accessibility"
          description="Simple information patterns are only useful when people can parse them quickly and reliably."
        >
          <NotesTable rows={accessibilityRows} />
        </DocsSection>
      </div>
    </div>
  );
}
