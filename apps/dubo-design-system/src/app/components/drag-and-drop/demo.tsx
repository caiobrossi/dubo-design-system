"use client";

import * as React from "react";
import { CalendarDays, Sparkles } from "@/lib/icons";
import { DragAndDrop, type DragAndDropItem } from "@/components/ui/drag-and-drop";

interface DemoCard extends DragAndDropItem {
  title: string;
  description: string;
  meta: string;
  badge: string;
}

const baseCards: DemoCard[] = [
  {
    id: "patients",
    title: "Patient follow-up queue",
    description: "Keep the highest-priority recalls visible at the top of the workflow.",
    meta: "Today",
    badge: "Clinical",
  },
  {
    id: "payments",
    title: "Payment confirmations",
    description: "Review the pending confirmations before the finance sync happens.",
    meta: "2 blockers",
    badge: "Finance",
  },
  {
    id: "messages",
    title: "Inbox triage",
    description: "Triage the cards to decide what should be answered first.",
    meta: "Ready now",
    badge: "Ops",
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
            <Sparkles className="size-[var(--icon-size-sm)]" />
            <span className="text-body-sm [font-weight:var(--font-weight-400)]">Moving</span>
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function DragAndDropCardsVerticalDemo() {
  const [items, setItems] = React.useState(baseCards);

  return (
    <DragAndDrop
      items={items}
      onReorder={setItems}
      getItemLabel={(item) => item.title}
      renderItem={(item, state) => <CardContent item={item} isDragging={state.isDragging} />}
    />
  );
}

export function DragAndDropCardsHorizontalDemo() {
  const [items, setItems] = React.useState(baseCards);

  return (
    <DragAndDrop
      items={items}
      onReorder={setItems}
      orientation="horizontal"
      getItemLabel={(item) => item.title}
      itemClassName="min-w-[320px]"
      renderItem={(item, state) => <CardContent item={item} isDragging={state.isDragging} />}
    />
  );
}

export const DragAndDropVerticalDemo = DragAndDropCardsVerticalDemo;
export const DragAndDropHorizontalDemo = DragAndDropCardsHorizontalDemo;
