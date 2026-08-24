import type { Metadata } from "next";
import {
  DesignTokensDocTable,
  NotesTable,
  PropsTable,
  ShowcaseCard,
} from "@/components/docs/component-doc-helpers";
import {
  WeekdayPickerSimpleDemo,
  WeekdayPickerWithNavigationDemo,
} from "@/app/components/weekday-picker/demo";
import { ComponentHero } from "@/components/docs/component-hero";
import { DocsSection } from "@/components/docs/section";
import { getComponentDoc } from "@/lib/content-registry";
import { componentTokenDocs } from "@/lib/component-token-docs";

const entry = getComponentDoc("weekday-picker");

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
};

const usageRows = [
  {
    item: "Weekly navigation",
    details:
      "Best for compact scheduling moments where people are moving through a single week and need high tap confidence.",
  },
  {
    item: "Selected day emphasis",
    details:
      "The animated pill keeps the active day visible without introducing a second highlight style.",
  },
  {
    item: "Avoid overflow",
    details:
      "Keep day labels short and predictable so all seven options remain balanced inside the container.",
  },
];

const propRows = [
  {
    prop: "items",
    type: "WeekdayPickerItem[]",
    default: "required",
    description: "Seven day items with number, short day label, and optional today/disabled state.",
  },
  {
    prop: "selectedId / onSelect",
    type: "string / setter",
    default: "required",
    description: "Controls which day is active and updates the animated pill position.",
  },
  {
    prop: "onPrevious / onNext",
    type: "() => void",
    default: "—",
    description: "Optional week navigation actions for the leading and trailing chevrons.",
  },
];

const accessibilityRows = [
  {
    item: "Today vs selected",
    details:
      "Today should never replace selection. The user still needs to know which day is currently active in the workflow.",
  },
  {
    item: "Short labels",
    details:
      "Use stable three-letter abbreviations or equivalent short labels so the control stays scannable.",
  },
  {
    item: "Chevron labels",
    details:
      "When navigation is present, the previous and next buttons need explicit aria labels for screen readers.",
  },
];

export default function WeekdayPickerPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="WeekdayPicker turns the weekly selector from the product into a reusable core control so teams stop rebuilding the same interaction with hardcoded spacing and colors."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ShowcaseCard
              title="With navigation"
              description="Closest to the calendar block pattern used in the product."
            >
              <WeekdayPickerWithNavigationDemo />
            </ShowcaseCard>
            <ShowcaseCard
              title="Without navigation"
              description="Works when the surrounding layout already handles the broader date jump."
            >
              <WeekdayPickerSimpleDemo />
            </ShowcaseCard>
          </div>
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="The picker reuses shared input surface, pill radius, control heights, typography roles, hover colors, and shadow tokens. That keeps it consistent with the rest of the scheduling UI instead of creating a bespoke mini-system."
        >
          <NotesTable rows={usageRows} />
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="Supply seven structured items and control the selected id. The component handles pill motion, today styling, and optional chevrons."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs["weekday-picker"].tokens} />
          </div>
        </DocsSection>

        <DocsSection
          id="accessibility"
          title="Accessibility"
          description="Compact day navigation should still clearly communicate both the current day and the selected day."
        >
          <NotesTable rows={accessibilityRows} />
        </DocsSection>
      </div>
    </div>
  );
}
