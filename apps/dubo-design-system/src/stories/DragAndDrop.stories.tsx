"use client";

import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarDays, GripVertical, Sparkles } from "@/lib/icons";
import {
  DragAndDrop,
  type DragAndDropItem,
  type DragAndDropProps,
} from "@/components/ui/drag-and-drop";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { DesignTokensTable } from "./_components/DesignTokensTable";

interface DemoCard extends DragAndDropItem {
  title: string;
  description: string;
  meta: string;
  badge: string;
}

const demoCards: DemoCard[] = [
  {
    id: "follow-up",
    title: "Follow-up review",
    description: "Prepare the checklist for tomorrow morning's recall appointments.",
    meta: "Due today",
    badge: "Clinical",
  },
  {
    id: "billing",
    title: "Outstanding invoices",
    description: "Review invoices that still need confirmation before the finance sync.",
    meta: "2 blockers",
    badge: "Finance",
  },
  {
    id: "campaign",
    title: "Campaign approval",
    description: "Confirm the copy for next week's promotional sequence.",
    meta: "Ready to publish",
    badge: "Marketing",
  },
];

function CardContent({ item, isDragging }: { item: DemoCard; isDragging: boolean }) {
  return (
    <div className="flex min-w-0 flex-col gap-[var(--space-2)]">
      <div className="flex min-w-0 items-center justify-between gap-[var(--space-3)]">
        <div className="min-w-0">
          <p className="truncate text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
            {item.title}
          </p>
          <p className="mt-[var(--space-1)] truncate text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
            {item.description}
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center rounded-full bg-[var(--color-bg-input)] px-[var(--space-2)] py-[6px] text-body-sm [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
          {item.badge}
        </span>
      </div>
      <div className="flex items-center gap-[var(--space-2)] text-[color:var(--color-text-muted)]">
        <CalendarDays className="size-[var(--icon-size-sm)]" />
        <span className="text-body-sm [font-weight:var(--font-weight-400)]">{item.meta}</span>
        {isDragging ? (
          <span className="inline-flex items-center gap-[var(--space-1)] text-[color:var(--color-brand)]">
            <GripVertical className="size-[var(--icon-size-sm)]" />
            <span className="text-body-sm [font-weight:var(--font-weight-400)]">Moving</span>
          </span>
        ) : null}
      </div>
    </div>
  );
}

function DragAndDropDemo({
  orientation = "vertical",
  handlePosition = "start",
  disabled = false,
}: Pick<DragAndDropProps<DemoCard>, "orientation" | "handlePosition" | "disabled">) {
  const [items, setItems] = React.useState(demoCards);

  return (
    <div className="rounded-[var(--radius-scale-3xl)] border border-[var(--color-border)] bg-[var(--color-bg-page)] p-[var(--space-6)]">
      <div className="mb-[var(--space-4)] flex items-start justify-between gap-[var(--space-3)]">
        <div>
          <p className="text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
            Prioritized cards
          </p>
          <p className="mt-[var(--space-1)] text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
            Drag to reorder the stack and keep the most important work at the top.
          </p>
        </div>
        <span className="inline-flex items-center gap-[var(--space-2)] rounded-full bg-[var(--color-brand-subtle)] px-[var(--space-3)] py-[8px] text-body-sm [font-weight:var(--font-weight-400)] text-[color:var(--color-brand)]">
          <Sparkles className="size-[var(--icon-size-sm)]" />
          Sortable
        </span>
      </div>

      <DragAndDrop
        items={items}
        onReorder={setItems}
        orientation={orientation}
        handlePosition={handlePosition}
        disabled={disabled}
        getItemLabel={(item) => item.title}
        className={orientation === "horizontal" ? "max-w-full" : undefined}
        itemClassName={orientation === "horizontal" ? "min-w-[320px]" : undefined}
        renderItem={(item, state) => <CardContent item={item} isDragging={state.isDragging} />}
      />
    </div>
  );
}

const meta = {
  title: "Components/DragAndDrop",
  component: DragAndDrop as unknown as Meta<DragAndDropProps<DemoCard>>["component"],
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**DragAndDrop** — sortable surface pattern for prioritization, ranking, and lightweight workflow ordering.

Use it when reordering matters visually and each item needs more structure than a plain row, but without forcing a unique card recipe.

### Core behaviors
- keyboard and pointer drag support via handle
- vertical or horizontal ordering
- shared surface, spacing, typography, and focus roles
- zero component-specific design tokens
        `,
      },
    },
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
    handlePosition: {
      control: "select",
      options: ["start", "end"],
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    orientation: "vertical",
    handlePosition: "start",
    disabled: false,
  },
} satisfies Meta<DragAndDropProps<DemoCard>>;

export default meta;

type Story = StoryObj<DragAndDropProps<DemoCard>>;

export const Playground: Story = {
  render: (args) => (
    <DragAndDropDemo
      orientation={args.orientation}
      handlePosition={args.handlePosition}
      disabled={args.disabled}
    />
  ),
};

export const Horizontal: Story = {
  parameters: { controls: { disable: true } },
  render: () => <DragAndDropDemo orientation="horizontal" />,
};

export const HandleOnEnd: Story = {
  parameters: { controls: { disable: true } },
  render: () => <DragAndDropDemo handlePosition="end" />,
};

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["drag-and-drop"].title}
      tokens={componentTokenDocs["drag-and-drop"].tokens}
    />
  ),
};
