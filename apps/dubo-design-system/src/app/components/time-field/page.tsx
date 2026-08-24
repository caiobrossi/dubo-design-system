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
  TimeFieldFilledDemo,
  TimeFieldMinuteStepDemo,
  TimeFieldOutlineDemo,
} from "./demo";

const entry = getComponentDoc("time-field");

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
};

const styleRows = [
  {
    item: "Keyboard first",
    details: "Users can type only digits and the field inserts the colon, clamps invalid values, and completes the time on blur.",
  },
  {
    item: "Visual chooser",
    details: "The clock icon opens a dedicated hour/minute popover for users who prefer picking the time from a list.",
  },
  {
    item: "Shared floating rhythm",
    details: "Height, label motion, padding, and icons stay aligned with FloatingInput, Select, and DateField.",
  },
];

const propRows = [
  {
    prop: "value / onChange",
    type: "string / setter",
    default: "\"\"",
    description: "Time string in HH:mm format. The field normalizes user typing into that shape.",
  },
  {
    prop: "minuteStep",
    type: "number",
    default: "5",
    description: "Controls the minute options shown in the popup list.",
  },
  {
    prop: "clearable",
    type: "boolean",
    default: "false",
    description: "Shows the clear action when the field already has a time.",
  },
  {
    prop: "portalContainer",
    type: "HTMLElement | null",
    default: "body",
    description: "Pass the surrounding dialog container to keep popup scroll and clicks inside the same layer.",
  },
];

const integrationRows = [
  {
    item: "Scheduling workflows",
    details: "Use it for start/end times where the user may type fast but still wants a visual picker for precise adjustments.",
  },
  {
    item: "Invalid values",
    details: "Inputs such as 26 or 1265 are clamped into valid hours/minutes instead of leaving the field in a broken state.",
  },
  {
    item: "Modal safety",
    details: "Inside desktop modals, pass portalContainer so the popup scroll area does not leak events to the background.",
  },
];

export default function TimeFieldPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="TimeField is for appointment-like flows where typing 930 should be as fast as choosing 09:30 from a popup."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <ShowcaseCard title="Filled" description="Best fit for the scheduling modal field language.">
              <TimeFieldFilledDemo />
            </ShowcaseCard>
            <ShowcaseCard title="Outline" description="Available when a screen still uses outline floating fields.">
              <TimeFieldOutlineDemo />
            </ShowcaseCard>
            <ShowcaseCard
              title="Minute steps"
              description="Tune the popup rhythm to 5, 10, or 15 minute grids without changing the field itself."
            >
              <TimeFieldMinuteStepDemo />
            </ShowcaseCard>
          </div>
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="The popup is a helper, not a second component language. The field should still feel native to Dubo forms."
        >
          <NotesTable rows={styleRows} />
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="TimeField already owns normalization and correction, so product code usually just passes value, minute step, and modal container."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs["time-field"].tokens} />
          </div>
        </DocsSection>

        <DocsSection
          id="integration"
          title="Integration"
          description="Most bugs here come from overlay layering and invalid manual input, so those are the integration concerns to keep explicit."
        >
          <NotesTable rows={integrationRows} />
        </DocsSection>
      </div>
    </div>
  );
}
