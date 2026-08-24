import type { Metadata } from "next";
import { Bell, FileText, Sparkles } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { FloatingPanelShowcase } from "./demo";
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

const entry = getComponentDoc("floating-panel");

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
};

const patternRows = [
  {
    item: "Anchored start",
    details:
      "Use placement only for the initial anchor. After that, the user can move the panel freely.",
  },
  {
    item: "Minimized state",
    details:
      "Minimize when the workflow should stay present but no longer deserves full visual weight.",
  },
  {
    item: "Header actions",
    details:
      "Reserve the top-right area for contextual actions, minimize, and close so the interaction model stays predictable.",
  },
  {
    item: "Footer actions",
    details:
      "Use the footer for primary actions or status text. This keeps the content area focused on the task itself.",
  },
];

const propRows = [
  {
    prop: "title / description / icon",
    type: "ReactNode",
    default: "—",
    description: "Primary header content shown in the expanded state.",
  },
  {
    prop: "showIcon / showFooter",
    type: "boolean",
    default: "true",
    description:
      "Allows the panel shell to hide the leading icon or footer region without changing the content contract.",
  },
  {
    prop: "size",
    type: '"default" | "tall"',
    default: '"default"',
    description:
      "Switches between the standard workspace height and a taller preset for chat-like layouts.",
  },
  {
    prop: "minimizedTitle / minimizedDescription / minimizedIcon",
    type: "ReactNode",
    default: "fallback to expanded header",
    description: "Override what appears in the compact minimized card.",
  },
  {
    prop: "placement",
    type: '"bottom-left" | "bottom-right" | "bottom-center"',
    default: '"bottom-right"',
    description: "Initial anchor used before the panel is dragged.",
  },
  {
    prop: "open / defaultOpen / onOpenChange",
    type: "boolean / boolean / (open) => void",
    default: "true / true / —",
    description: "Controlled or uncontrolled visibility of the panel.",
  },
  {
    prop: "minimized / defaultMinimized / onMinimizedChange",
    type: "boolean / boolean / (minimized) => void",
    default: "false / false / —",
    description: "Controlled or uncontrolled minimized state.",
  },
  {
    prop: "draggable",
    type: "boolean",
    default: "true",
    description: "Enables drag repositioning with the grip handle.",
  },
  {
    prop: "strategy",
    type: '"fixed" | "absolute"',
    default: '"fixed"',
    description: "Use fixed in the app and absolute for contained demos or bounded canvases.",
  },
  {
    prop: "footer / headerActions / minimizedContent",
    type: "ReactNode",
    default: "—",
    description:
      "Slots for expanded footer actions, extra header controls, and custom minimized summaries.",
  },
];

const accessibilityRows = [
  {
    item: "Keyboard actions",
    details:
      "Minimize, expand, and close must stay available through real buttons with accessible labels.",
  },
  {
    item: "Drag fallback",
    details:
      "Dragging is a convenience, not the only way to recover the panel. Placement should start from a sensible anchor by default.",
  },
  {
    item: "Minimized clarity",
    details:
      "The minimized state should still expose enough text or iconography for users to understand what workflow is being preserved.",
  },
];

export default function FloatingPanelPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="Use FloatingPanel for sticky secondary workflows that should remain available while the user continues using the rest of the screen."
        >
          <FloatingPanelShowcase />
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="The panel borrows the elevated surface recipe from overlays and keeps the minimized state as a compact summary card."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ShowcaseCard
              title="Bottom left"
              description="Good when the primary navigation or other fixed utilities already live on the right."
            >
              <FloatingPanelShowcase placement="bottom-left" />
            </ShowcaseCard>
            <ShowcaseCard
              title="Minimized summary"
              description="A compact card keeps the workflow visible without holding the whole viewport."
            >
              <FloatingPanelShowcase
                defaultMinimized
                title={
                  <span className="inline-flex items-center gap-[var(--space-2)]">
                    <Sparkles className="size-[var(--icon-size-sm)]" />
                    Assistant
                  </span>
                }
                description="2 suggestions ready to review"
              />
            </ShowcaseCard>
            <ShowcaseCard
              title="Tall workspace"
              description="Use the taller height preset for assistant, chat, or denser secondary workflows."
            >
              <FloatingPanelShowcase
                size="tall"
                title="Assistant chat"
                description="A taller shell keeps the conversation readable without opening a modal."
              />
            </ShowcaseCard>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <ShowcaseCard
              title="Header actions"
              description="Keep utility actions lightweight and reserve strong CTA emphasis for the footer."
            >
              <div className="rounded-[var(--radius-control-soft)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-[var(--space-4)]">
                <div className="flex items-center gap-[var(--space-3)]">
                  <div className="flex size-[var(--height-control-md)] items-center justify-center rounded-[var(--radius-control-soft)] bg-[var(--color-brand-subtle)] text-[color:var(--color-brand)]">
                    <FileText className="size-[var(--icon-size-md)]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
                      Notes workspace
                    </p>
                    <p className="text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
                      Use lightweight controls such as alerts, status chips, or helper buttons.
                    </p>
                  </div>
                </div>
                <div className="mt-[var(--space-4)] flex items-center gap-[var(--space-2)]">
                  <Button variant="secondary" size="sm">
                    <Bell className="mr-2 size-[var(--icon-size-sm)]" />
                    Notify me
                  </Button>
                  <Button variant="ghost" size="sm">
                    Attach item
                  </Button>
                </div>
              </div>
            </ShowcaseCard>

            <ShowcaseCard
              title="Behavior rules"
              description="These rules help the component remain useful without turning into a second modal system."
            >
              <NotesTable rows={patternRows} />
            </ShowcaseCard>
          </div>
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="FloatingPanel is intentionally generic: sticky workflow shell, minimized summary, anchored start, and drag support."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs["floating-panel"].tokens} />
          </div>
        </DocsSection>

        <DocsSection
          id="accessibility"
          title="Accessibility"
          description="Floating interactions should stay understandable and recoverable even when users do not drag the component."
        >
          <NotesTable rows={accessibilityRows} />
        </DocsSection>
      </div>
    </div>
  );
}
