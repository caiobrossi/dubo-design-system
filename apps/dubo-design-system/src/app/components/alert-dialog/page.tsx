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
import {
  AlertDialogBasicDemo,
  AlertDialogCustomDemo,
} from "../_missing-component-demos";

const entry = getComponentDoc("alert-dialog");

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
};

const structureRows = [
  {
    item: "AlertDialog",
    details: "Root that controls open state and focus management.",
  },
  {
    item: "AlertDialogTrigger",
    details: "Interactive element that launches the confirmation flow.",
  },
  {
    item: "AlertDialogContent",
    details: "Modal surface containing title, description and actions.",
  },
  {
    item: "AlertDialogAction / Cancel",
    details: "Explicit positive and cancel paths. Cancel should always stay available.",
  },
];

const propRows = [
  {
    prop: "open / onOpenChange",
    type: "boolean / (open) => void",
    default: "uncontrolled",
    description: "Use controlled mode when the decision step is driven by external application state.",
  },
  {
    prop: "asChild",
    type: "boolean",
    default: "false",
    description: "Allows trigger, cancel and action wrappers to pass behavior into your own button component.",
  },
  {
    prop: "className",
    type: "string",
    default: "—",
    description: "Extends content, header or footer styling without replacing the base structure.",
  },
];

const accessibilityRows = [
  {
    item: "Focus trap",
    details: "Keyboard focus stays inside the dialog until the user confirms or cancels.",
  },
  {
    item: "Accessible naming",
    details: "Always provide AlertDialogTitle and a supporting AlertDialogDescription.",
  },
  {
    item: "Safe exit",
    details: "Keep the cancel action visible and easy to reach. Avoid single-action destructive dialogs.",
  },
];

export default function AlertDialogPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="Use Alert Dialog for destructive or high-impact actions where the user must stop and make an explicit choice."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ShowcaseCard
              title="Destructive confirmation"
              description="Account deletion, patient archive and any irreversible flow should use an explicit confirm step."
            >
              <AlertDialogBasicDemo />
            </ShowcaseCard>
            <ShowcaseCard
              title="Custom risk framing"
              description="Add context, iconography and consequence language when the action has multiple side effects."
            >
              <AlertDialogCustomDemo />
            </ShowcaseCard>
          </div>
          <div className="mt-6">
            <Callout tone="warning" title="Decision rule">
              If the action is low-risk or easily reversible, prefer a regular dialog, inline feedback or undo toast
              instead of interrupting the user with Alert Dialog.
            </Callout>
          </div>
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="The component is intentionally constrained: one visual language, one job, and a strong emphasis on clear consequence messaging."
        >
          <NotesTable rows={structureRows} />
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="Compose the root, trigger and content regions together. Keep the action copy explicit and aligned with the consequence."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs["alert-dialog"].tokens} />
          </div>
        </DocsSection>

        <DocsSection
          id="accessibility"
          title="Accessibility"
          description="Alert Dialog should make the risk understandable for screen reader, keyboard and pointer users equally."
        >
          <NotesTable rows={accessibilityRows} />
        </DocsSection>
      </div>
    </div>
  );
}
