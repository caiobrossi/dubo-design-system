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
  ComboboxGroupedDemo,
  ComboboxMultiDemo,
  ComboboxSingleDemo,
} from "../_missing-component-demos";

const entry = getComponentDoc("combobox");

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
};

const modeRows = [
  {
    item: "Single select",
    details: "Use when one value must be chosen from a larger searchable list.",
  },
  {
    item: "Multi select",
    details: "Use when users need to build a filtered set and keep the menu open while selecting.",
  },
  {
    item: "Grouped options",
    details: "Cluster long lists into mental buckets such as procedure families or product categories.",
  },
];

const propRows = [
  {
    prop: "value / onValueChange",
    type: "string | string[] / setter",
    default: "required",
    description: "Supports single and multiple selection depending on the root mode.",
  },
  {
    prop: "multiple",
    type: "boolean",
    default: "false",
    description: "Switches item behavior from single-select checkmark to multi-select checkbox logic.",
  },
  {
    prop: "ComboboxField",
    type: "wrapper",
    default: "optional",
    description:
      "Composes the shared Label component, helper text, and trigger spacing when Combobox is used as a form field.",
  },
  {
    prop: "placeholder",
    type: "string",
    default: "—",
    description: "Displayed by ComboboxTrigger when nothing is selected.",
  },
  {
    prop: "labels",
    type: "Record<string, string>",
    default: "—",
    description: "Maps selected values back to human-readable labels inside the trigger.",
  },
];

const accessibilityRows = [
  {
    item: "Search first",
    details: "Provide concise placeholder and empty state copy so keyboard users understand how filtering behaves.",
  },
  {
    item: "Selection visibility",
    details: "Selected state must remain visible in the trigger after the popover closes.",
  },
  {
    item: "Long lists",
    details: "Prefer groups for large datasets so navigation and scanning stay predictable.",
  },
];

export default function ComboboxPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="Combobox is the right pattern when Select becomes too dense and users need search, grouping or multi-select behavior."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <ShowcaseCard title="Single select" description="Fast searchable replacement for long plain selects.">
              <ComboboxSingleDemo />
            </ShowcaseCard>
            <ShowcaseCard title="Multi select" description="Keep the panel open while collecting multiple filters or tags.">
              <ComboboxMultiDemo />
            </ShowcaseCard>
            <ShowcaseCard title="Grouped options" description="Break lists into meaningful families to reduce scanning cost.">
              <ComboboxGroupedDemo />
            </ShowcaseCard>
          </div>
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="Combobox now mirrors Select visually in the trigger, dropdown surface, spacing, and option rows, then layers search and richer list composition inside that same recipe."
        >
          <NotesTable rows={modeRows} />
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="Compose the trigger, content and list primitives based on the density of your dataset and whether the flow is single or multiple choice. When the combobox belongs to a form, wrap it with ComboboxField to reuse the shared Label component."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs["combobox"].tokens} />
          </div>
        </DocsSection>

        <DocsSection
          id="accessibility"
          title="Accessibility"
          description="The search input and result list should stay understandable even when the result set shrinks dynamically."
        >
          <NotesTable rows={accessibilityRows} />
        </DocsSection>
      </div>
    </div>
  );
}
