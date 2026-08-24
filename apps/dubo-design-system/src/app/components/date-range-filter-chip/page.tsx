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
  DateRangeFilterChipDemo,
  DateRangeFilterChipToolbarDemo,
} from "./demo";

const entry = getComponentDoc("date-range-filter-chip");

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
};

const notesRows = [
  {
    item: "Approved composition",
    details:
      "Use this component when the product expects the same date-range interaction already approved in task history: chip trigger, two date pickers, and preset actions.",
  },
  {
    item: "Prefer over local rebuilds",
    details:
      "Do not rebuild this with ad-hoc Popover or date inputs in each page. Reuse the component so spacing, presets, and hierarchy stay identical.",
  },
  {
    item: "Preset ownership",
    details:
      "The visual shell is shared, but each product flow still owns its preset list and date application logic.",
  },
];

const propRows = [
  {
    prop: "label / activeLabel / active",
    type: "string / string / boolean",
    default: "required",
    description: "Match the FilterChip trigger copy and active-state summary.",
  },
  {
    prop: "fromLabel / toLabel",
    type: "string",
    default: "required",
    description: "Lets each flow use its preferred wording like De/Até or From/To.",
  },
  {
    prop: "fromValue / toValue",
    type: "Date",
    default: "optional",
    description: "Values passed into the left-side date pickers.",
  },
  {
    prop: "presets / activePreset / onPresetSelect",
    type: "preset array / key / handler",
    default: "required",
    description: "Defines the right-side preset list and active highlight.",
  },
  {
    prop: "onClear",
    type: "() => void",
    default: "optional",
    description: "Usually clears the range or resets to the default preset.",
  },
  {
    prop: "open / onOpenChange",
    type: "boolean / handler",
    default: "optional",
    description: "Use when the parent flow wants controlled open state.",
  },
];

export default function DateRangeFilterChipPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="DateRangeFilterChip exists to lock one approved date-range pattern across pages and history panels."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ShowcaseCard
              title="History panel usage"
              description="The full approved composition with active dates."
            >
              <DateRangeFilterChipDemo />
            </ShowcaseCard>
            <ShowcaseCard
              title="Toolbar usage"
              description="Same component in a page filter row."
            >
              <DateRangeFilterChipToolbarDemo />
            </ShowcaseCard>
          </div>
        </DocsSection>

        <DocsSection
          id="guidelines"
          title="Guidelines"
          description="Keep the composition stable. Consumers should only decide labels, preset semantics, and how dates are applied."
        >
          <NotesTable rows={notesRows} />
        </DocsSection>

        <DocsSection
          id="api"
          title="API"
          description="DateRangeFilterChip is intentionally compositional: it exposes only the knobs needed by product flows while preserving the approved layout."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs["date-range-filter-chip"].tokens} />
          </div>
        </DocsSection>
      </div>
    </div>
  );
}
