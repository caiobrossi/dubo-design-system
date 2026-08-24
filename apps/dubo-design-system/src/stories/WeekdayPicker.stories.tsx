"use client";

import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { WeekdayPicker, type WeekdayPickerItem, type WeekdayPickerProps } from "@/components/ui/weekday-picker";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { DesignTokensTable } from "./_components/DesignTokensTable";

const baseItems: WeekdayPickerItem[] = [
  { id: "mon", dayNumber: "11", dayLabel: "Mon" },
  { id: "tue", dayNumber: "12", dayLabel: "Tue" },
  { id: "wed", dayNumber: "13", dayLabel: "Wed", isToday: true },
  { id: "thu", dayNumber: "14", dayLabel: "Thu" },
  { id: "fri", dayNumber: "15", dayLabel: "Fri" },
  { id: "sat", dayNumber: "16", dayLabel: "Sat" },
  { id: "sun", dayNumber: "17", dayLabel: "Sun" },
];

function WeekdayPickerDemo({ selectedId = "wed" }: { selectedId?: string }) {
  const [activeDay, setActiveDay] = React.useState(selectedId);

  return (
    <div className="rounded-[32px] border border-[var(--color-border)] bg-[var(--color-bg-page)] p-[var(--space-6)]">
      <WeekdayPicker
        items={baseItems}
        selectedId={activeDay}
        onSelect={setActiveDay}
        onPrevious={() => undefined}
        onNext={() => undefined}
      />
    </div>
  );
}

const meta = {
  title: "Components/WeekdayPicker",
  component: WeekdayPicker as unknown as Meta<WeekdayPickerProps>["component"],
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**WeekdayPicker** — compact weekly day selector with animated selected pill and optional previous/next navigation.

Use it for calendar summaries, mobile scheduling controls, and any workflow that needs one-tap day switching inside a constrained space.

### Core behaviors
- seven-day row with selected pill
- optional previous/next buttons
- today and selected states
- no component-specific design tokens
        `,
      },
    },
  },
} satisfies Meta<WeekdayPickerProps>;

export default meta;

type Story = StoryObj<WeekdayPickerProps>;

export const Playground: Story = {
  render: () => <WeekdayPickerDemo />,
};

export const WithoutNavigation: Story = {
  render: () => (
    <div className="rounded-[32px] border border-[var(--color-border)] bg-[var(--color-bg-page)] p-[var(--space-6)]">
      <WeekdayPicker items={baseItems} selectedId="fri" onSelect={() => undefined} />
    </div>
  ),
};

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["weekday-picker"].title}
      tokens={componentTokenDocs["weekday-picker"].tokens}
    />
  ),
};
