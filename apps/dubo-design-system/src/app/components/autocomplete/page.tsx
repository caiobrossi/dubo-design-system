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
  AutocompleteDenseDemo,
  AutocompleteFloatingDemo,
  AutocompleteStandardDemo,
} from "./demo";

const entry = getComponentDoc("autocomplete");

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
};

const styleRows = [
  {
    item: "Standard field",
    details: "Matches Input when the field should feel like a classic form control with a label above.",
  },
  {
    item: "Floating field",
    details: "Matches FloatingInput and FloatingSelect when the modal uses labels inside the field body.",
  },
  {
    item: "Search overlay",
    details: "Popup uses the same frosted dropdown surface as Select and the same row rhythm as Command.",
  },
];

const propRows = [
  {
    prop: "items",
    type: "T[]",
    default: "required",
    description: "Source list displayed and filtered as the user types.",
  },
  {
    prop: "value / onValueChange",
    type: "T | null / setter",
    default: "optional",
    description: "Keeps the selected entity, not just the visible input string.",
  },
  {
    prop: "onInputValueChange",
    type: "(text: string) => void",
    default: "—",
    description: "Use for async search, analytics, or loading remote suggestions.",
  },
  {
    prop: "AutocompleteInput",
    type: "field wrapper",
    default: "optional",
    description: "Standard label-above field matching Input.",
  },
  {
    prop: "FloatingAutocompleteInput",
    type: "field wrapper",
    default: "optional",
    description: "Floating-label field matching Select and FloatingInput.",
  },
];

const accessibilityRows = [
  {
    item: "Desktop first",
    details: "Current component is optimized for desktop suggestion flows. Mobile drawer behavior will be handled separately.",
  },
  {
    item: "Selection visibility",
    details: "The selected option remains visible in the field and inside the popup indicator when reopened.",
  },
  {
    item: "Search clarity",
    details: "Empty states and helper text should explain whether the field searches local items or remote results.",
  },
];

export default function AutocompletePage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="Autocomplete is the right fit when the user needs to type first, narrow a dense dataset, then commit a real entity such as a patient, procedure, or insurance plan."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <ShowcaseCard title="Standard" description="Label above, close to classic form layouts.">
              <AutocompleteStandardDemo />
            </ShowcaseCard>
            <ShowcaseCard title="Floating" description="Label inside the field, aligned with the new scheduling modal direction.">
              <AutocompleteFloatingDemo />
            </ShowcaseCard>
            <ShowcaseCard title="Dense content" description="Longer suggestion rows with helper text still stay readable and aligned.">
              <AutocompleteDenseDemo />
            </ShowcaseCard>
          </div>
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="The field should feel native to Dubo forms, not like a foreign command palette dropped into a form."
        >
          <NotesTable rows={styleRows} />
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="Compose the root, field, popup and row primitives according to the density of the suggestion content and whether the screen already uses floating labels."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs.autocomplete.tokens} />
          </div>
        </DocsSection>

        <DocsSection
          id="accessibility"
          title="Accessibility"
          description="Inline search fields have to stay understandable even when the popup opens, filters, and closes quickly."
        >
          <NotesTable rows={accessibilityRows} />
        </DocsSection>
      </div>
    </div>
  );
}
