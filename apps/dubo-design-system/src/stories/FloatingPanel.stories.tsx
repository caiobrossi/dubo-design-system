import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, FileText, MessageSquare, Sparkles } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import {
  FloatingPanel,
  type FloatingPanelPlacement,
  type FloatingPanelProps,
} from "@/components/ui/floating-panel";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";

function StoryCanvas({
  children,
  tone = "surface",
}: {
  children: React.ReactNode;
  tone?: "surface" | "brand";
}) {
  return (
    <div
      className={
        tone === "brand"
          ? "relative min-h-[680px] overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-brand-subtle)]"
          : "relative min-h-[680px] overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-bg-page)]"
      }
    >
      <div className="pointer-events-none absolute inset-0 bg-docs-grid bg-[size:28px_28px] opacity-40" />
      {children}
    </div>
  );
}

function FloatingPanelDemo({
  placement,
  defaultMinimized,
  title = "Clinical Notes",
  description = "Capture ideas, tasks, or quick patient notes without leaving the page.",
}: {
  placement: FloatingPanelPlacement;
  defaultMinimized?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
}) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <StoryCanvas>
      <div ref={containerRef} className="relative min-h-[680px]">
        <FloatingPanel
          strategy="absolute"
          containerRef={containerRef}
          placement={placement}
          defaultMinimized={defaultMinimized}
          icon={<FileText className="size-[var(--icon-size-md)]" />}
          title={title}
          description={description}
          minimizedIcon={<MessageSquare className="size-[var(--icon-size-md)]" />}
          footer={
            <div className="flex items-center justify-between gap-[var(--space-3)]">
              <span className="text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
                Last saved 2 minutes ago
              </span>
              <div className="flex items-center gap-[var(--space-2)]">
                <Button variant="ghost" size="sm" rounded={false}>
                  Dismiss
                </Button>
                <Button size="sm" rounded={false}>
                  Save note
                </Button>
              </div>
            </div>
          }
        >
          <div className="flex flex-col gap-[var(--space-4)]">
            <div className="rounded-[var(--radius-control-soft)] border border-[var(--color-border)] bg-[var(--color-bg-input)] p-[var(--space-4)]">
              <p className="text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
                Context
              </p>
              <p className="mt-[var(--space-2)] text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
                Floating panels work well for secondary workflows that should stay available while
                the user navigates the rest of the screen.
              </p>
            </div>
            <div className="rounded-[var(--radius-control-soft)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-[var(--space-4)]">
              <p className="text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
                Suggested actions
              </p>
              <ul className="mt-[var(--space-2)] space-y-[var(--space-2)] text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
                <li>Drag the panel to reposition it.</li>
                <li>Minimize it when the task becomes secondary.</li>
                <li>Keep calls to action in the footer for predictable recovery.</li>
              </ul>
            </div>
          </div>
        </FloatingPanel>
      </div>
    </StoryCanvas>
  );
}

const meta = {
  title: "Components/FloatingPanel",
  component: FloatingPanel as unknown as Meta<FloatingPanelProps>["component"],
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
**FloatingPanel** — movable secondary workspace that can stay open or collapse into a compact card.

Use it for sticky workflows such as notes, messaging, assistants, or task capture that should remain reachable while the user continues interacting with the page.

### Core behaviors
- draggable by the handle
- open and minimized states
- initial placement in \`bottom-left\`, \`bottom-right\`, or \`bottom-center\`
- optional footer and header actions
- works in \`fixed\` mode for app usage and \`absolute\` mode for contained demos
        `,
      },
    },
  },
  argTypes: {
    placement: {
      control: "select",
      options: ["bottom-left", "bottom-right", "bottom-center"],
    },
    defaultMinimized: {
      control: "boolean",
    },
    draggable: {
      control: "boolean",
    },
  },
  args: {
    placement: "bottom-right",
    draggable: true,
    defaultMinimized: false,
  },
} satisfies Meta<FloatingPanelProps>;

export default meta;
type Story = StoryObj<FloatingPanelProps>;

export const Playground: Story = {
  render: (args: FloatingPanelProps) => (
    <FloatingPanelDemo
      placement={(args.placement ?? "bottom-right") as FloatingPanelPlacement}
      defaultMinimized={args.defaultMinimized}
      title="Clinical Notes"
      description={
        args.draggable
          ? "Drag me around the page to choose the best working position."
          : "Secondary workspace for notes and quick capture."
      }
    />
  ),
};

export const Placements: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid gap-6 xl:grid-cols-3">
      <FloatingPanelDemo placement="bottom-left" title="Bottom left" />
      <FloatingPanelDemo placement="bottom-center" title="Bottom center" />
      <FloatingPanelDemo placement="bottom-right" title="Bottom right" />
    </div>
  ),
};

export const Minimized: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <FloatingPanelDemo
      placement="bottom-right"
      defaultMinimized
      title="Assistant"
      description="A compact card keeps the workflow visible without stealing attention."
    />
  ),
};

export const WithCustomMinimizedContent: Story = {
  parameters: { controls: { disable: true } },
  render: () => <CustomMinimizedContentDemo />,
};

function CustomMinimizedContentDemo() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <StoryCanvas tone="brand">
      <div ref={containerRef} className="relative min-h-[680px]">
        <FloatingPanel
          strategy="absolute"
          containerRef={containerRef}
          placement="bottom-right"
          defaultMinimized
          icon={<Sparkles className="size-[var(--icon-size-md)]" />}
          title="AI Assistant"
          description="Keeps proactive suggestions available while the user keeps working."
          minimizedContent={
            <div className="min-w-0">
              <p className="truncate text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
                AI Assistant
              </p>
              <p className="mt-[var(--space-1)] truncate text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
                2 new suggestions ready
              </p>
            </div>
          }
        >
          <div className="rounded-[var(--radius-control-soft)] border border-[var(--color-border)] bg-[var(--color-bg-input)] p-[var(--space-4)]">
            <div className="flex items-center gap-[var(--space-3)]">
              <div className="flex size-[var(--height-control-md)] items-center justify-center rounded-[var(--radius-control-soft)] bg-[var(--color-brand-subtle)] text-[color:var(--color-brand)]">
                <Bell className="size-[var(--icon-size-md)]" />
              </div>
              <div>
                <p className="text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
                  Smart nudges
                </p>
                <p className="text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
                  Highlight urgent actions without interrupting the main flow.
                </p>
              </div>
            </div>
          </div>
        </FloatingPanel>
      </div>
    </StoryCanvas>
  );
}

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["floating-panel"].title}
      tokens={componentTokenDocs["floating-panel"].tokens}
    />
  ),
};
