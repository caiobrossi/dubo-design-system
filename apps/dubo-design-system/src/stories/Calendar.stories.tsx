"use client";

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import {
  Calendar,
  type CalendarProps,
  type IndicatorMap,
  type IndicatorColor,
} from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";

// ── Helper: generate sample indicator data for the current month ──

function generateIndicators(): IndicatorMap {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const indicators: IndicatorMap = {};

  const patterns: { day: number; dots: { color: IndicatorColor; label: string }[] }[] = [
    { day: 2, dots: [{ color: "success", label: "Available" }] },
    { day: 3, dots: [{ color: "success", label: "Available" }] },
    { day: 5, dots: [{ color: "warning", label: "Partial" }] },
    {
      day: 7,
      dots: [
        { color: "success", label: "Available" },
        { color: "warning", label: "Partial" },
      ],
    },
    { day: 9, dots: [{ color: "danger", label: "Full" }] },
    { day: 10, dots: [{ color: "success", label: "Available" }] },
    {
      day: 12,
      dots: [
        { color: "danger", label: "Full" },
        { color: "warning", label: "Partial" },
      ],
    },
    { day: 14, dots: [{ color: "success", label: "Available" }] },
    {
      day: 15,
      dots: [
        { color: "success", label: "Available" },
        { color: "success", label: "Available" },
      ],
    },
    { day: 17, dots: [{ color: "warning", label: "Partial" }] },
    { day: 18, dots: [{ color: "danger", label: "Full" }] },
    {
      day: 20,
      dots: [
        { color: "success", label: "Available" },
        { color: "warning", label: "Partial" },
        { color: "danger", label: "Full" },
      ],
    },
    { day: 22, dots: [{ color: "success", label: "Available" }] },
    { day: 24, dots: [{ color: "warning", label: "Partial" }] },
    { day: 25, dots: [{ color: "success", label: "Available" }] },
    { day: 27, dots: [{ color: "danger", label: "Full" }] },
    {
      day: 28,
      dots: [
        { color: "success", label: "Available" },
        { color: "danger", label: "Full" },
      ],
    },
  ];

  for (const p of patterns) {
    if (p.day <= daysInMonth) {
      const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(p.day).padStart(2, "0")}`;
      indicators[key] = p.dots;
    }
  }

  return indicators;
}

const sampleIndicators = generateIndicators();

// ── Meta ──

const meta: Meta<CalendarProps> = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Calendar** — Dubo Design System component.

Built on react-day-picker v9 with Dubo design tokens. Supports single, range, and multiple date selection.

### Key feature
Availability indicators (colored dots) below day numbers to show scheduling status.

### Selection modes
- \`single\` — pick one date
- \`range\` — pick a start/end range
- \`multiple\` — pick multiple individual dates

### Indicator colors
| Color | CSS variable | Meaning |
|---|---|---|
| success | \`--color-success\` | Available (green) |
| warning | \`--color-warning\` | Partial (yellow) |
| danger | \`--color-danger\` | Full/busy (red) |
| brand | \`--color-brand\` | Brand highlight |
| info | \`--color-info-strong\` | Informational |
        `,
      },
    },
  },
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "range", "multiple"],
    },
    showOutsideDays: { control: "boolean" },
    showLegend: { control: "boolean" },
    numberOfMonths: { control: "number" },
  },
  args: {
    mode: "single",
    showOutsideDays: true,
  },
};

export default meta;
type Story = StoryObj<CalendarProps>;

// ─── Playground ──────────────────────────────────────────────────────────────

function PlaygroundDemo(args: CalendarProps) {
  const [selected, setSelected] = useState<Date | undefined>(new Date());

  return (
    <div className="max-w-sm rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]">
      <Calendar {...args} mode="single" selected={selected} onSelect={setSelected} />
    </div>
  );
}

export const Playground: Story = {
  name: "Playground",
  render: (args: CalendarProps) => <PlaygroundDemo {...args} />,
};

// ─── Range Selection ─────────────────────────────────────────────────────────

function RangeSelectionDemo() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  });

  return (
    <div className="max-w-sm rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]">
      <Calendar mode="range" selected={range} onSelect={setRange} />
      {range?.from && (
        <p className="px-4 pb-3 text-body-sm text-[color:var(--color-text-secondary)]">
          {range.from.toLocaleDateString()}
          {range.to ? ` — ${range.to.toLocaleDateString()}` : " — ..."}
        </p>
      )}
    </div>
  );
}

export const RangeSelection: Story = {
  name: "Range Selection",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Select a start and end date. The range between is highlighted with `--color-brand-subtle`.",
      },
    },
  },
  render: () => <RangeSelectionDemo />,
};

// ─── Multiple Selection ──────────────────────────────────────────────────────

function MultipleSelectionDemo() {
  const [dates, setDates] = useState<Date[] | undefined>([
    new Date(),
    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  ]);

  return (
    <div className="max-w-sm rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]">
      <Calendar mode="multiple" selected={dates} onSelect={setDates} />
      {dates && dates.length > 0 && (
        <p className="px-4 pb-3 text-body-sm text-[color:var(--color-text-secondary)]">
          {dates.length} date{dates.length !== 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}

export const MultipleSelection: Story = {
  name: "Multiple Selection",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Click individual dates to toggle selection. Each selected date is highlighted with `--color-brand`.",
      },
    },
  },
  render: () => <MultipleSelectionDemo />,
};

// ─── With Indicators ─────────────────────────────────────────────────────────

function WithIndicatorsDemo() {
  const [selected, setSelected] = useState<Date | undefined>();

  return (
    <div className="max-w-sm rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]">
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        indicators={sampleIndicators}
      />
    </div>
  );
}

export const WithIndicators: Story = {
  name: "With Indicators",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Availability dots below day numbers. Green = available (`--color-success`), yellow = partial (`--color-warning`), red = full/busy (`--color-danger`). Up to 4 dots per day.",
      },
    },
  },
  render: () => <WithIndicatorsDemo />,
};

// ─── With Legend ──────────────────────────────────────────────────────────────

function WithLegendDemo() {
  const [selected, setSelected] = useState<Date | undefined>();

  return (
    <div className="max-w-sm rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]">
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        indicators={sampleIndicators}
        showLegend
      />
    </div>
  );
}

export const WithLegend: Story = {
  name: "With Legend",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Indicators with `showLegend=true` adds a footer with color labels. Defaults to Available (green), Partial (yellow), Full (red).",
      },
    },
  },
  render: () => <WithLegendDemo />,
};

// ─── Two Months ──────────────────────────────────────────────────────────────

function TwoMonthsDemo() {
  const [range, setRange] = useState<DateRange | undefined>();

  return (
    <div className="inline-flex rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]">
      <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />
    </div>
  );
}

export const TwoMonths: Story = {
  name: "Two Months",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Side-by-side months with `numberOfMonths={2}`. Ideal for range pickers where users need visibility across month boundaries.",
      },
    },
  },
  render: () => <TwoMonthsDemo />,
};

// ─── With Dropdowns ──────────────────────────────────────────────────────────

function WithDropdownsDemo() {
  const [selected, setSelected] = useState<Date | undefined>(new Date());

  return (
    <div className="max-w-sm rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]">
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        captionLayout="dropdown"
        startMonth={new Date(2020, 0)}
        endMonth={new Date(2030, 11)}
      />
    </div>
  );
}

export const WithDropdowns: Story = {
  name: "With Dropdowns",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Month/year dropdown selectors using `captionLayout="dropdown"`. Requires `startMonth` and `endMonth` props for the dropdown range.',
      },
    },
  },
  render: () => <WithDropdownsDemo />,
};

// ─── Design Tokens ───────────────────────────────────────────────────────────

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["calendar"].title}
      tokens={componentTokenDocs["calendar"].tokens}
    />
  ),
};
