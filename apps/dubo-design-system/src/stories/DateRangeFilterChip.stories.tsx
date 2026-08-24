"use client";

import React, { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar } from "@/lib/icons";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import {
  DateRangeFilterChip,
  type DateRangeFilterPreset,
} from "@/components/ui/date-range-filter-chip";

type DatePreset = "today" | "thisWeek" | "last7Days" | "last30Days" | "thisMonth";

const meta: Meta<typeof DateRangeFilterChip<DatePreset>> = {
  title: "Components/DateRangeFilterChip",
  component: DateRangeFilterChip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**DateRangeFilterChip** — Dubo Design System component.

Approved date-range filter composition built from \`FilterChip\`, \`DatePicker\`, preset actions, and separators.

### Defaults
- Uses the same chip shell as \`FilterChip\`
- Two filled date pickers on the left
- Preset list on the right
- Shared spacing and typography with task history

### Use
- Toolbar filters like "Todas as datas"
- History panels and audit views
- Any flow that should reuse the approved task-history date-range pattern

This component composes existing primitives, so it has no exclusive visual language beyond the inherited tokens.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateRangeFilterChip<DatePreset>>;

const presets: DateRangeFilterPreset<DatePreset>[] = [
  { key: "today", label: "Hoje" },
  { key: "thisWeek", label: "Esta semana" },
  { key: "last7Days", label: "Últimos 7 dias" },
  { key: "last30Days", label: "Últimos 30 dias" },
  { key: "thisMonth", label: "Este mês" },
];

function formatDisplayDate(date?: Date) {
  if (!date) return "";
  return date.toLocaleDateString("pt-PT");
}

function PlaygroundDemo() {
  const [from, setFrom] = useState<Date | undefined>(new Date("2026-04-01"));
  const [to, setTo] = useState<Date | undefined>(new Date("2026-04-30"));
  const [activePreset, setActivePreset] = useState<DatePreset | "custom">("thisMonth");

  const activeLabel = useMemo(() => {
    const fromLabel = formatDisplayDate(from);
    const toLabel = formatDisplayDate(to);
    if (fromLabel && toLabel) return `${fromLabel} - ${toLabel}`;
    return fromLabel || toLabel || "Todas as datas";
  }, [from, to]);

  return (
    <div className="max-w-xl">
      <DateRangeFilterChip
        label="Todas as datas"
        activeLabel={activeLabel}
        active={Boolean(from || to)}
        icon={<Calendar />}
        fromLabel="De"
        toLabel="Até"
        fromValue={from}
        toValue={to}
        onFromChange={(date) => {
          setFrom(date);
          setActivePreset("custom");
        }}
        onToChange={(date) => {
          setTo(date);
          setActivePreset("custom");
        }}
        presets={presets}
        activePreset={activePreset === "custom" ? null : activePreset}
        onPresetSelect={(preset) => setActivePreset(preset)}
        onClear={() => {
          setFrom(undefined);
          setTo(undefined);
          setActivePreset("custom");
        }}
      />
    </div>
  );
}

function ToolbarUsageDemo() {
  const [from, setFrom] = useState<Date | undefined>();
  const [to, setTo] = useState<Date | undefined>();

  return (
    <div className="flex max-w-3xl flex-wrap items-center gap-4">
      <DateRangeFilterChip
        label="Todas as datas"
        activeLabel="Todas as datas"
        active={Boolean(from || to)}
        icon={<Calendar />}
        fromLabel="De"
        toLabel="Até"
        fromValue={from}
        toValue={to}
        onFromChange={setFrom}
        onToChange={setTo}
        presets={presets}
        activePreset={null}
        onPresetSelect={() => undefined}
        onClear={() => {
          setFrom(undefined);
          setTo(undefined);
        }}
        size="lg"
      />
    </div>
  );
}

export const Playground: Story = {
  render: () => <PlaygroundDemo />,
};

export const ToolbarUsage: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <ToolbarUsageDemo />,
};

export const DesignTokens: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "DateRangeFilterChip composes FilterChip, DatePicker, Button, and Separator, so token coverage comes from those base primitives.",
      },
    },
  },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["date-range-filter-chip"].title}
      tokens={componentTokenDocs["date-range-filter-chip"].tokens}
    />
  ),
};
