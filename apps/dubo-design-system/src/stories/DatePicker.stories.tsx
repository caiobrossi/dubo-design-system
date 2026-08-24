"use client";

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { DatePicker, FloatingDatePicker, type DatePickerProps } from "@/components/ui/date-picker";
import type { IndicatorMap, IndicatorColor } from "@/components/ui/calendar";
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

const meta: Meta<DatePickerProps> = {
  title: "Components/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**DatePicker** — Dubo Design System component.

Composition of Calendar + Popover + shared field trigger. Supports single date, date range, and presets.

### Styles
| Style | Height | Border-radius | Use |
|---|---|---|---|
| \`DatePicker\` | 40px (\`--height-control-md\`) | 8px (\`--radius-control-input\`) | Standard with label above |
| \`FloatingDatePicker\` | 56px (\`--size-14\`) | 16px (\`--radius-scale-xl\`) | Floating label that animates inside-to-top |

### Variants
- \`outline\` — border + surface bg (default)
- \`filled\` — subtle gray bg, no border

### Features
- Single date / date range selection
- Preset quick-select options
- Calendar indicator dots
- Clearable
- Error & disabled states
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "filled"],
    },
    label: { control: "text" },
    placeholder: { control: "text" },
    helpText: { control: "text" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    clearable: { control: "boolean" },
  },
  args: {
    variant: "outline",
    label: "Date",
    placeholder: "Select date",
    helpText: "",
    error: false,
    disabled: false,
    clearable: false,
  },
};

export default meta;
type Story = StoryObj<DatePickerProps>;

// ─── Playground Standard ─────────────────────────────────────────────────────

function PlaygroundStandardDemo(args: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <div className="max-w-sm">
      <DatePicker {...args} mode="single" value={date} onChange={setDate} />
    </div>
  );
}

export const PlaygroundStandard: Story = {
  name: "Playground — Standard",
  render: (args: DatePickerProps) => <PlaygroundStandardDemo {...args} />,
};

// ─── Playground Floating ─────────────────────────────────────────────────────

function PlaygroundFloatingDemo(args: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <div className="max-w-sm">
      <FloatingDatePicker
        label={args.label || "Date"}
        variant={args.variant}
        helpText={args.helpText}
        error={args.error}
        disabled={args.disabled}
        clearable={args.clearable}
        mode="single"
        value={date}
        onChange={setDate}
      />
    </div>
  );
}

export const PlaygroundFloating: Story = {
  name: "Playground — Floating",
  argTypes: {
    label: { control: "text" },
    variant: { control: "select", options: ["outline", "filled"] },
    helpText: { control: "text" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    clearable: { control: "boolean" },
  },
  args: {
    variant: "outline",
    label: "Date",
    helpText: "",
    error: false,
    disabled: false,
    clearable: false,
  },
  render: (args: DatePickerProps) => <PlaygroundFloatingDemo {...args} />,
};

// ─── Standard Outline ────────────────────────────────────────────────────────

function StandardOutlineDemo() {
  const [date1, setDate1] = useState<Date | undefined>();
  const [date2, setDate2] = useState<Date | undefined>(new Date());
  const [date3, setDate3] = useState<Date | undefined>();

  return (
    <div className="flex max-w-md flex-col gap-6">
      <DatePicker
        variant="outline"
        label="Appointment date"
        placeholder="Select date"
        mode="single"
        value={date1}
        onChange={setDate1}
      />
      <DatePicker
        variant="outline"
        label="Date of birth"
        placeholder="DD/MM/YYYY"
        mode="single"
        value={date2}
        onChange={setDate2}
        clearable
      />
      <DatePicker
        variant="outline"
        label="Follow-up"
        placeholder="Pick a date"
        mode="single"
        value={date3}
        onChange={setDate3}
        helpText="Optional follow-up visit"
      />
    </div>
  );
}

export const StandardOutline: Story = {
  name: "Standard — Outline",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Standard `DatePicker` with `variant="outline"` — border + surface background.',
      },
    },
  },
  render: () => <StandardOutlineDemo />,
};

// ─── Standard Filled ─────────────────────────────────────────────────────────

function StandardFilledDemo() {
  const [date1, setDate1] = useState<Date | undefined>();
  const [date2, setDate2] = useState<Date | undefined>(new Date());
  const [date3, setDate3] = useState<Date | undefined>();

  return (
    <div className="flex max-w-md flex-col gap-6">
      <DatePicker
        variant="filled"
        label="Appointment date"
        placeholder="Select date"
        mode="single"
        value={date1}
        onChange={setDate1}
      />
      <DatePicker
        variant="filled"
        label="Date of birth"
        placeholder="DD/MM/YYYY"
        mode="single"
        value={date2}
        onChange={setDate2}
        clearable
      />
      <DatePicker
        variant="filled"
        label="Follow-up"
        placeholder="Pick a date"
        mode="single"
        value={date3}
        onChange={setDate3}
        helpText="Optional follow-up visit"
      />
    </div>
  );
}

export const StandardFilled: Story = {
  name: "Standard — Filled",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Standard `DatePicker` with `variant="filled"` — subtle gray background, no border.',
      },
    },
  },
  render: () => <StandardFilledDemo />,
};

// ─── Floating Outline ────────────────────────────────────────────────────────

function FloatingOutlineDemo() {
  const [date1, setDate1] = useState<Date | undefined>();
  const [date2, setDate2] = useState<Date | undefined>(new Date());
  const [date3, setDate3] = useState<Date | undefined>();

  return (
    <div className="flex max-w-md flex-col gap-6">
      <FloatingDatePicker
        variant="outline"
        label="Appointment date"
        mode="single"
        value={date1}
        onChange={setDate1}
      />
      <FloatingDatePicker
        variant="outline"
        label="Date of birth"
        mode="single"
        value={date2}
        onChange={setDate2}
        clearable
      />
      <FloatingDatePicker
        variant="outline"
        label="Follow-up"
        mode="single"
        value={date3}
        onChange={setDate3}
        helpText="Optional follow-up visit"
      />
    </div>
  );
}

export const FloatingOutline: Story = {
  name: "Floating — Outline",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`FloatingDatePicker` with `variant="outline"` — label animates from center to top on focus/fill.',
      },
    },
  },
  render: () => <FloatingOutlineDemo />,
};

// ─── Floating Filled ─────────────────────────────────────────────────────────

function FloatingFilledDemo() {
  const [date1, setDate1] = useState<Date | undefined>();
  const [date2, setDate2] = useState<Date | undefined>(new Date());
  const [date3, setDate3] = useState<Date | undefined>();

  return (
    <div className="flex max-w-md flex-col gap-6">
      <FloatingDatePicker
        variant="filled"
        label="Appointment date"
        mode="single"
        value={date1}
        onChange={setDate1}
      />
      <FloatingDatePicker
        variant="filled"
        label="Date of birth"
        mode="single"
        value={date2}
        onChange={setDate2}
        clearable
      />
      <FloatingDatePicker
        variant="filled"
        label="Follow-up"
        mode="single"
        value={date3}
        onChange={setDate3}
        helpText="Optional follow-up visit"
      />
    </div>
  );
}

export const FloatingFilled: Story = {
  name: "Floating — Filled",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`FloatingDatePicker` with `variant="filled"` — subtle gray background, label floats on interaction.',
      },
    },
  },
  render: () => <FloatingFilledDemo />,
};

// ─── Date Range ──────────────────────────────────────────────────────────────

function DateRangeDemo() {
  const [range, setRange] = useState<DateRange | undefined>();

  return (
    <div className="max-w-md">
      <DatePicker
        mode="range"
        variant="outline"
        label="Date range"
        placeholder="Select range"
        value={range}
        onChange={setRange}
        clearable
      />
      {range?.from && (
        <p className="mt-2 text-body-sm text-[color:var(--color-text-secondary)]">
          {range.from.toLocaleDateString()}
          {range.to ? ` — ${range.to.toLocaleDateString()}` : " — pick end date"}
        </p>
      )}
    </div>
  );
}

export const DateRange_: Story = {
  name: "Date Range",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`mode="range"` enables start/end date selection. The popover closes automatically when both dates are picked.',
      },
    },
  },
  render: () => <DateRangeDemo />,
};

// ─── With Presets ────────────────────────────────────────────────────────────

function WithPresetsDemo() {
  const [date, setDate] = useState<Date | undefined>();

  const today = new Date();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  return (
    <div className="max-w-md">
      <DatePicker
        mode="single"
        variant="outline"
        label="Quick select"
        placeholder="Select date"
        value={date}
        onChange={setDate}
        clearable
        presets={[
          { label: "Today", value: today },
          { label: "Last 7 days", value: sevenDaysAgo },
          { label: "This month", value: firstOfMonth },
        ]}
      />
    </div>
  );
}

export const WithPresets: Story = {
  name: "With Presets",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Quick-select preset buttons appear in a sidebar within the popover. Clicking a preset selects the date and closes the popover.",
      },
    },
  },
  render: () => <WithPresetsDemo />,
};

// ─── With Indicators ─────────────────────────────────────────────────────────

function WithIndicatorsDemo() {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <div className="max-w-md">
      <DatePicker
        mode="single"
        variant="outline"
        label="Appointment"
        placeholder="Choose available date"
        value={date}
        onChange={setDate}
        indicators={sampleIndicators}
        showLegend
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
          "Calendar inside the popover shows availability indicator dots. Green = available, yellow = partial, red = full/busy. Legend is shown with `showLegend`.",
      },
    },
  },
  render: () => <WithIndicatorsDemo />,
};

// ─── Clearable ───────────────────────────────────────────────────────────────

function ClearableDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex max-w-md flex-col gap-6">
      <DatePicker
        mode="single"
        variant="outline"
        label="Clearable date"
        value={date}
        onChange={setDate}
        clearable
      />
      <p className="text-body-sm text-[color:var(--color-text-secondary)]">
        {date ? `Selected: ${date.toLocaleDateString()}` : "No date selected"}
      </p>
    </div>
  );
}

export const Clearable: Story = {
  name: "Clearable",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "`clearable=true` shows an X button when a date is selected, allowing the user to clear the value.",
      },
    },
  },
  render: () => <ClearableDemo />,
};

// ─── Error State ─────────────────────────────────────────────────────────────

function ErrorStateDemo() {
  const [date1, setDate1] = useState<Date | undefined>();
  const [date2, setDate2] = useState<Date | undefined>();

  return (
    <div className="flex max-w-md flex-col gap-6">
      <DatePicker
        mode="single"
        variant="outline"
        label="Appointment date"
        placeholder="Select date"
        value={date1}
        onChange={setDate1}
        error
        helpText="Please select a valid appointment date"
      />
      <FloatingDatePicker
        mode="single"
        variant="outline"
        label="Date of birth"
        value={date2}
        onChange={setDate2}
        error
        helpText="Date of birth is required"
      />
    </div>
  );
}

export const ErrorState: Story = {
  name: "Error State",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "`error=true` applies red border via `--color-danger`. Pair with `helpText` for inline validation messages.",
      },
    },
  },
  render: () => <ErrorStateDemo />,
};

// ─── Disabled ────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  name: "Disabled",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "`disabled=true` reduces opacity to `--disabled-opacity` and removes pointer events.",
      },
    },
  },
  render: () => (
    <div className="flex max-w-md flex-col gap-6">
      <DatePicker
        mode="single"
        variant="outline"
        label="Appointment date"
        placeholder="Select date"
        disabled
      />
      <DatePicker
        mode="single"
        variant="filled"
        label="Date of birth"
        placeholder="Select date"
        disabled
      />
      <FloatingDatePicker mode="single" variant="outline" label="Follow-up date" disabled />
      <FloatingDatePicker mode="single" variant="filled" label="Discharge date" disabled />
    </div>
  ),
};

// ─── Design Tokens ───────────────────────────────────────────────────────────

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["date-picker"].title}
      tokens={componentTokenDocs["date-picker"].tokens}
    />
  ),
};
