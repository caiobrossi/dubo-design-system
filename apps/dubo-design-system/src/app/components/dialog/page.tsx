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
import { DialogFormDemo, DialogSizesDemo } from "../_missing-component-demos";

const entry = getComponentDoc("dialog");

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
};

const sizeRows = [
  {
    item: "sm",
    details: "384px max width. Best for short confirmations, simple choices and compact review steps.",
  },
  {
    item: "default",
    details: "512px max width. The baseline for forms, summaries and detail editing.",
  },
  {
    item: "lg",
    details: "672px max width. Use when content needs more horizontal space, such as denser forms or tables.",
  },
  {
    item: "xl",
    details: "768px max width. Best for patient-style creation and editing flows with fixed chrome.",
  },
];

const typographyRows = [
  {
    item: "Modal title",
    details:
      "Use DialogTitle, SheetTitle, or AlertDialogTitle. They own the shared 24px, weight 300, 1.2 line-height and primary-text treatment.",
  },
  {
    item: "Section title",
    details:
      "Use modalSectionTitleClass from dubo-design-system/components/ui/modal-typography for the shared 20px, weight 300, 1.2 line-height and primary-text treatment.",
  },
  {
    item: "Local overrides",
    details:
      "Do not rebuild modal title roles with one-off text-size, font-weight or line-height utilities. Update the shared modal typography contract when the product-wide role changes.",
  },
];

const propRows = [
  {
    prop: "size",
    type: `"sm" | "default" | "lg" | "xl"`,
    default: `"default"`,
    description: "Controls the max width of DialogContent while keeping the same overall spacing rhythm.",
  },
  {
    prop: "showCloseButton",
    type: "boolean",
    default: "true",
    description: "Allows teams to hide the floating close affordance when the flow has its own controlled close actions.",
  },
  {
    prop: "sticky",
    type: "boolean",
    default: "false",
    description: "Available on DialogHeader and DialogFooter when those areas should stay fixed while DialogBody scrolls.",
  },
  {
    prop: "open / onOpenChange",
    type: "boolean / (open) => void",
    default: "uncontrolled",
    description: "Use controlled mode for flows tied to route state, async actions or coordinated layouts.",
  },
  {
    prop: "asChild",
    type: "boolean",
    default: "false",
    description: "Allows triggers and close buttons to reuse Dubo Button or custom primitives without extra wrappers.",
  },
  {
    prop: "className",
    type: "string",
    default: "—",
    description: "Adds local styling to content and layout while preserving overlay, focus and close behavior.",
  },
];

const accessibilityRows = [
  {
    item: "Focus order",
    details: "Focus moves into the dialog on open and returns to the trigger on close.",
  },
  {
    item: "Close paths",
    details: "Users can close with Escape, the close affordance or a dedicated footer action.",
  },
  {
    item: "Labeling",
    details: "Every dialog should include DialogTitle and, whenever possible, DialogDescription for extra context.",
  },
];

export default function DialogPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="Dialog is the general-purpose modal for forms, detail editing and richer interruptive flows that are not strictly destructive."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ShowcaseCard
              title="Size variants"
              description="Choose the smallest size that comfortably fits the task."
            >
              <DialogSizesDemo />
            </ShowcaseCard>
            <ShowcaseCard
              title="Form flow"
              description="Dialogs work well for short editing tasks that should stay in context."
            >
              <DialogFormDemo />
            </ShowcaseCard>
          </div>
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="Dialog, Sheet, and AlertDialog share one modal typography contract so product flows stay consistent without modal-by-modal heading overrides."
        >
          <div className="flex flex-col gap-6">
            <NotesTable rows={typographyRows} />
            <NotesTable rows={sizeRows} />
          </div>
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="Compose Dialog, Trigger and Content with DialogHeader, DialogBody and DialogFooter. Reserve Alert Dialog for destructive confirmations."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs["dialog"].tokens} />
          </div>
        </DocsSection>

        <DocsSection
          id="accessibility"
          title="Accessibility"
          description="Dialogs temporarily interrupt the main task, so focus management and clear text hierarchy are essential."
        >
          <NotesTable rows={accessibilityRows} />
        </DocsSection>
      </div>
    </div>
  );
}
