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
  DateFieldDuboSettingsDemo,
  DateFieldFilledDemo,
  DateFieldOutlineDemo,
} from "./demo";

const entry = getComponentDoc("date-field");

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
};

const styleRows = [
  {
    item: "Typed date entry",
    details: "Users type only digits and the field inserts separators automatically according to the active format.",
  },
  {
    item: "Calendar fallback",
    details: "The calendar icon opens the same day-picker surface for users who prefer choosing the date visually.",
  },
  {
    item: "Floating field only",
    details: "This component is intentionally aligned with the scheduling modal direction, where labels live inside the field.",
  },
];

const propRows = [
  {
    prop: "value / onChange",
    type: "Date | undefined / setter",
    default: "optional",
    description: "Keeps the canonical selected date while the input handles formatting and typing affordances.",
  },
  {
    prop: "dateFormat",
    type: "\"dd/MM/yyyy\" | \"MM/dd/yyyy\" | \"yyyy-MM-dd\"",
    default: "\"dd/MM/yyyy\"",
    description: "Controls both the typed mask and the formatted selected value.",
  },
  {
    prop: "calendarProps.weekStartsOn",
    type: "0 | 1 | 6",
    default: "1",
    description: "Lets product adapters respect Dubo week-start settings without forking the field.",
  },
  {
    prop: "clearable",
    type: "boolean",
    default: "false",
    description: "Shows the clear action when the field already has a value.",
  },
  {
    prop: "portalContainer",
    type: "HTMLElement | null",
    default: "body",
    description: "Use inside dialogs and sheets so the calendar popup stays in the same overlay layer.",
  },
];

const integrationRows = [
  {
    item: "Dubo settings",
    details: "Keep the core component generic. In product, wrap it in a thin adapter that maps Dubo settings into dateFormat and weekStartsOn.",
  },
  {
    item: "Storage strategy",
    details: "Display follows user locale/settings, but persistence should stay in ISO strings or a canonical backend format.",
  },
  {
    item: "Modal safety",
    details: "Pass the dialog content ref as portalContainer when the field is rendered inside desktop modals.",
  },
];

export default function DateFieldPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="DateField is for flows where typing the date should be just as first-class as opening the calendar."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <ShowcaseCard title="Filled" description="Matches the scheduling modal field language.">
              <DateFieldFilledDemo />
            </ShowcaseCard>
            <ShowcaseCard title="Outline" description="Available when the surrounding form still uses outline surfaces.">
              <DateFieldOutlineDemo />
            </ShowcaseCard>
            <ShowcaseCard
              title="Dubo settings adapter"
              description="Same field, but driven by the active date format and week-start preference."
            >
              <DateFieldDuboSettingsDemo />
            </ShowcaseCard>
          </div>
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="The component should feel like a floating input first and a date picker second."
        >
          <NotesTable rows={styleRows} />
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="Keep locale/display concerns close to the product adapter while reusing the same field primitive everywhere."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs["date-field"].tokens} />
          </div>
        </DocsSection>

        <DocsSection
          id="integration"
          title="Integration"
          description="Most real product needs come from formatting and overlay layering, not from changing the field itself."
        >
          <NotesTable rows={integrationRows} />
        </DocsSection>
      </div>
    </div>
  );
}
