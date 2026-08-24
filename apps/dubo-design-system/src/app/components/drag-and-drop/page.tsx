import type { Metadata } from "next";
import {
  DesignTokensDocTable,
  NotesTable,
  PropsTable,
  ShowcaseCard,
} from "@/components/docs/component-doc-helpers";
import { ComponentHero } from "@/components/docs/component-hero";
import { DocsSection } from "@/components/docs/section";
import {
  DragAndDropHorizontalDemo,
  DragAndDropVerticalDemo,
} from "@/app/components/drag-and-drop/demo";
import { getComponentDoc } from "@/lib/content-registry";
import { componentTokenDocs } from "@/lib/component-token-docs";

const entry = getComponentDoc("drag-and-drop");

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
};

const usageRows = [
  {
    item: "Prioritization stacks",
    details:
      "Great for task, workflow, or queue views where people need to decide order quickly and visually.",
  },
  {
    item: "Structured reordering",
    details:
      "Use this when rows feel too compact and each item needs title, description, badges, or metadata.",
  },
  {
    item: "Avoid overloading",
    details:
      "If the interaction is only about moving a simple list item, prefer a lighter row-based pattern instead of a full card.",
  },
];

const propRows = [
  {
    prop: "items",
    type: "Array<{ id: string }>",
    default: "required",
    description: "Sortable collection. Each item must expose a stable id.",
  },
  {
    prop: "onReorder",
    type: "(items) => void",
    default: "required",
    description: "Called with the reordered array after a drag interaction completes.",
  },
  {
    prop: "renderItem",
    type: "(item, state) => ReactNode",
    default: "required",
    description: "Renders the card content while the component manages handle, movement, and shell.",
  },
  {
    prop: "orientation",
    type: '"vertical" | "horizontal"',
    default: '"vertical"',
    description: "Controls the sorting strategy and stack direction.",
  },
  {
    prop: "handlePosition",
    type: '"start" | "end"',
    default: '"start"',
    description: "Places the drag affordance before or after the content.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables pointer and keyboard sorting while preserving the visual layout.",
  },
];

const accessibilityRows = [
  {
    item: "Dedicated handle",
    details:
      "A visible drag handle reduces accidental movement and gives keyboard users a clear interaction target.",
  },
  {
    item: "Stable labels",
    details:
      "Pass a meaningful item label so the drag handle communicates what is being moved, not only its id.",
  },
  {
    item: "Order matters",
    details:
      "Only use sortable surfaces when changing order has a real product meaning that users can understand.",
  },
];

export default function DragAndDropPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="Use DragAndDrop when order is part of the meaning of the UI and each item needs more structure than a plain row."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ShowcaseCard
              title="Vertical priority stack"
              description="A strong default for queues, tasks, and sorted worklists."
            >
              <DragAndDropVerticalDemo />
            </ShowcaseCard>
            <ShowcaseCard
              title="Horizontal lane"
              description="Useful for horizontal rails where people still need to change sequence."
            >
              <DragAndDropHorizontalDemo />
            </ShowcaseCard>
          </div>
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="The component deliberately reuses the shared surface, spacing scale, typography roles, and focus treatment. That keeps draggable items aligned with the rest of the system instead of becoming a new visual island."
        >
          <NotesTable rows={usageRows} />
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="The API keeps sorting logic centralized in one wrapper while letting each product area decide what content lives inside each item."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs["drag-and-drop"].tokens} />
          </div>
        </DocsSection>

        <DocsSection
          id="accessibility"
          title="Accessibility"
          description="Sortable interfaces should always make the moved object and the order change understandable."
        >
          <NotesTable rows={accessibilityRows} />
        </DocsSection>
      </div>
    </div>
  );
}
