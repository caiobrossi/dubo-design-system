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
import { StepperHorizontalDemo, StepperVerticalDemo } from "../_missing-component-demos";

const entry = getComponentDoc("stepper");

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
};

const stateRows = [
  {
    item: "Default",
    details: "Future steps use muted tokens and numeric indicators to reduce emphasis until they are reached.",
  },
  {
    item: "Active",
    details: "Current step uses brand color and ring treatment to anchor the user in the flow.",
  },
  {
    item: "Completed",
    details: "Finished steps switch to a solid brand state with a check icon.",
  },
];

const propRows = [
  {
    prop: "activeStep",
    type: "number",
    default: "0",
    description: "Zero-based active step index used to derive default, active and completed states.",
  },
  {
    prop: "orientation",
    type: `"horizontal" | "vertical"`,
    default: `"horizontal"`,
    description: "Switches between a top-of-flow overview and a detailed stacked flow with descriptions.",
  },
  {
    prop: "label",
    type: "ReactNode",
    default: "required",
    description: "Primary step label displayed next to or below the indicator.",
  },
  {
    prop: "description / children",
    type: "ReactNode",
    default: "—",
    description: "Optional text and inline content for vertical flows where the active step needs more context.",
  },
];

const accessibilityRows = [
  {
    item: "Sequencing language",
    details: "Step labels should read as a clear ordered journey, not disconnected feature names.",
  },
  {
    item: "Current state",
    details: "The active step needs a clear visual emphasis so users always know where they are in the process.",
  },
  {
    item: "Vertical detail",
    details: "Only expand content where it helps progress. Avoid overwhelming the user with every step at once.",
  },
];

export default function StepperPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="Stepper works best for linear flows where the user benefits from seeing both progress and remaining stages."
        >
          <div className="grid gap-6">
            <ShowcaseCard
              title="Horizontal workflow"
              description="Best for top-level wizard navigation across a few clear phases."
            >
              <StepperHorizontalDemo />
            </ShowcaseCard>
            <ShowcaseCard
              title="Vertical workflow"
              description="Use when each step needs supportive copy or inline content."
            >
              <StepperVerticalDemo />
            </ShowcaseCard>
          </div>
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="The visual system is intentionally minimal: one indicator size, one connector language and semantic state changes driven by shared tokens."
        >
          <NotesTable rows={stateRows} />
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="Compose Stepper with StepperItem children. The root owns orientation and active state; items derive their visual status from context."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs["stepper"].tokens} />
          </div>
        </DocsSection>

        <DocsSection
          id="accessibility"
          title="Accessibility"
          description="A stepper is a progress aid, so naming and current-state clarity matter more than decorative styling."
        >
          <NotesTable rows={accessibilityRows} />
        </DocsSection>
      </div>
    </div>
  );
}
