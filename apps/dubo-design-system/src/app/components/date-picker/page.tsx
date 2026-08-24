"use client";

import React, { useState } from "react";
import { addDays, addMonths, startOfMonth, endOfMonth } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { DatePicker, FloatingDatePicker } from "@/components/ui/date-picker";
import { DocsSection } from "@/components/docs/section";
import type { IndicatorMap } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";
import { componentTokenDocs } from "@/lib/component-token-docs";

/* ── Helpers ── */

function ShowcaseCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      <div className="max-w-sm">{children}</div>
    </div>
  );
}

/* ── Demo data ── */

function buildIndicators(): IndicatorMap {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");

  return {
    [`${y}-${m}-03`]: [{ color: "success", label: "Available" }],
    [`${y}-${m}-08`]: [{ color: "danger", label: "Full" }],
    [`${y}-${m}-12`]: [
      { color: "success", label: "Available" },
      { color: "warning", label: "Partial" },
    ],
    [`${y}-${m}-18`]: [{ color: "warning", label: "Partial" }],
    [`${y}-${m}-25`]: [{ color: "success", label: "Available" }],
  };
}

const today = new Date();

const singlePresets = [
  { label: "Today", value: today },
  { label: "Tomorrow", value: addDays(today, 1) },
  { label: "In a week", value: addDays(today, 7) },
  { label: "In a month", value: addMonths(today, 1) },
];

const rangePresets: { label: string; value: DateRange }[] = [
  { label: "This week", value: { from: today, to: addDays(today, 6) } },
  { label: "Next 2 weeks", value: { from: today, to: addDays(today, 13) } },
  {
    label: "This month",
    value: { from: startOfMonth(today), to: endOfMonth(today) },
  },
];

/* ── Interactive Demos ── */

function StandardOutlineDemo() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <DatePicker
      variant="outline"
      label="Appointment date"
      placeholder="Select date"
      value={date}
      onChange={setDate}
    />
  );
}

function StandardFilledDemo() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <DatePicker
      variant="filled"
      label="Appointment date"
      placeholder="Select date"
      value={date}
      onChange={setDate}
    />
  );
}

function FloatingOutlineDemo() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <FloatingDatePicker
      variant="outline"
      label="Appointment date"
      value={date}
      onChange={setDate}
    />
  );
}

function FloatingFilledDemo() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <FloatingDatePicker variant="filled" label="Appointment date" value={date} onChange={setDate} />
  );
}

function DateRangeDemo() {
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  return (
    <DatePicker
      mode="range"
      label="Date range"
      placeholder="Select range"
      value={range}
      onChange={setRange}
    />
  );
}

function FloatingDateRangeDemo() {
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  return <FloatingDatePicker mode="range" label="Date range" value={range} onChange={setRange} />;
}

function PresetsDemo() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <DatePicker
      label="Quick select"
      placeholder="Select date"
      value={date}
      onChange={setDate}
      presets={singlePresets}
    />
  );
}

function RangePresetsDemo() {
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  return (
    <DatePicker
      mode="range"
      label="Quick range"
      placeholder="Select range"
      value={range}
      onChange={setRange}
      presets={rangePresets}
    />
  );
}

function IndicatorsDemo() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const indicators = buildIndicators();

  return (
    <DatePicker
      label="Select date"
      placeholder="Choose a date"
      value={date}
      onChange={setDate}
      indicators={indicators}
      showLegend
    />
  );
}

function ClearableDemo() {
  const [date, setDate] = useState<Date | undefined>(today);

  return <DatePicker label="Clearable date" value={date} onChange={setDate} clearable />;
}

function FloatingClearableDemo() {
  const [date, setDate] = useState<Date | undefined>(today);

  return <FloatingDatePicker label="Clearable date" value={date} onChange={setDate} clearable />;
}

/* ── Page ── */

export default function DatePickerPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-[1120px] flex-col gap-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-8 lg:px-8">
        <div className="relative z-10 flex flex-col gap-6">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <Badge variant="success">Ready</Badge>
              <Badge variant="info1">Component</Badge>
            </div>
            <h1 className="text-hero font-medium tracking-[0em] text-default-font lg:text-hero">
              Date Picker
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Composition of Calendar + Popover + shared field trigger. The standard trigger keeps
              the same 40px field recipe as Input, while the floating version uses the shared 56px
              surface. Calendar selection, presets, helper text, and error states all stay aligned
              with the same system tokens.
            </p>
          </div>
        </div>
      </section>

      {/* ── Standard Variants ── */}
      <DocsSection
        id="standard"
        title="Standard Variants"
        description="40px field trigger with label above. Two variants: outline (default) and filled, following the same trigger recipe as Input."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Outline variant (default)">
            <StandardOutlineDemo />
          </ShowcaseCard>

          <ShowcaseCard title="Filled variant">
            <StandardFilledDemo />
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Floating Label ── */}
      <DocsSection
        id="floating"
        title="Floating Label"
        description="56px floating field surface with the same label motion language as FloatingInput, now using the shared floating radius and helper roles."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Outline variant">
            <FloatingOutlineDemo />
          </ShowcaseCard>

          <ShowcaseCard title="Filled variant">
            <FloatingFilledDemo />
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Date Range ── */}
      <DocsSection
        id="range"
        title="Date Range"
        description='Set mode="range" for start/end date selection. The popover closes automatically after both dates are picked.'
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Standard range picker">
            <DateRangeDemo />
          </ShowcaseCard>

          <ShowcaseCard title="Floating range picker">
            <FloatingDateRangeDemo />
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── With Presets ── */}
      <DocsSection
        id="presets"
        title="With Presets"
        description="Quick-select presets appear in a sidebar panel next to the calendar. Pass an array of { label, value } objects."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Single date presets">
            <PresetsDemo />
          </ShowcaseCard>

          <ShowcaseCard title="Range presets">
            <RangePresetsDemo />
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── With Indicators ── */}
      <DocsSection
        id="indicators"
        title="With Indicators"
        description="Pass indicators and showLegend to display availability dots inside the calendar dropdown."
      >
        <ShowcaseCard title="Indicators with legend">
          <IndicatorsDemo />
        </ShowcaseCard>
      </DocsSection>

      {/* ── Clearable ── */}
      <DocsSection
        id="clearable"
        title="Clearable"
        description="Enable clearable to show an X button when a date is selected. Clicking it resets the value to undefined."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Standard — clearable">
            <ClearableDemo />
          </ShowcaseCard>

          <ShowcaseCard title="Floating — clearable">
            <FloatingClearableDemo />
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── States ── */}
      <DocsSection
        id="states"
        title="States"
        description="Error and disabled states match the Input component patterns."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Error state">
            <div className="flex flex-col gap-4">
              <DatePicker
                label="Appointment date"
                placeholder="Select date"
                error
                helpText="Please select a valid appointment date"
              />
              <FloatingDatePicker
                label="Appointment date"
                error
                helpText="Please select a valid appointment date"
              />
            </div>
          </ShowcaseCard>

          <ShowcaseCard title="Disabled state">
            <div className="flex flex-col gap-4">
              <DatePicker label="Appointment date" placeholder="Select date" disabled />
              <FloatingDatePicker label="Appointment date" disabled />
            </div>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── API Reference ── */}
      <DocsSection
        id="api"
        title="API Reference"
        description="Props, types, and shared semantic design tokens."
      >
        {/* DatePicker props */}
        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Prop (DatePicker)
                </th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Type</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Default</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {[
                ["mode", '"single" | "range"', '"single"', "Selection mode"],
                ["variant", '"outline" | "filled"', '"outline"', "Visual style"],
                ["label", "string", "—", "Label text above the trigger"],
                ["placeholder", "string", '"Select date"', "Placeholder when no date selected"],
                ["dateFormat", "string", '"dd/MM/yyyy"', "Display format (date-fns)"],
                ["value", "Date | DateRange", "—", "Controlled selected value"],
                ["onChange", "(value) => void", "—", "Selection change handler"],
                ["clearable", "boolean", "false", "Show clear (X) button"],
                ["error", "boolean", "false", "Error state (red border + help text)"],
                ["helpText", "string", "—", "Help or error message below trigger"],
                ["disabled", "boolean", "false", "Disabled state"],
                ["indicators", "IndicatorMap", "—", "Indicator dots for calendar"],
                ["showLegend", "boolean", "false", "Show legend in calendar dropdown"],
                [
                  "presets",
                  "{ label: string; value: Date | DateRange }[]",
                  "—",
                  "Quick-select preset options",
                ],
                ["calendarProps", "Partial<CalendarProps>", "—", "Extra props passed to Calendar"],
                ["className", "string", "—", "Additional className"],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop}>
                  <td className="px-4 py-3 font-mono text-body-sm">{prop}</td>
                  <td className="px-4 py-3 font-mono text-body-sm">{type}</td>
                  <td className="px-4 py-3 font-mono text-body-sm">{def}</td>
                  <td className="px-4 py-3">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FloatingDatePicker props */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Prop (FloatingDatePicker)
                </th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Type</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Default</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {[
                ["mode", '"single" | "range"', '"single"', "Selection mode"],
                ["variant", '"outline" | "filled"', '"outline"', "Visual style"],
                ["label", "string", "— (required)", "Floating label text"],
                ["dateFormat", "string", '"dd/MM/yyyy"', "Display format (date-fns)"],
                ["value", "Date | DateRange", "—", "Controlled selected value"],
                ["onChange", "(value) => void", "—", "Selection change handler"],
                ["clearable", "boolean", "false", "Show clear (X) button"],
                ["error", "boolean", "false", "Error state (red border + help text)"],
                ["helpText", "string", "—", "Help or error message below trigger"],
                ["disabled", "boolean", "false", "Disabled state"],
                ["indicators", "IndicatorMap", "—", "Indicator dots for calendar"],
                ["showLegend", "boolean", "false", "Show legend in calendar dropdown"],
                [
                  "presets",
                  "{ label: string; value: Date | DateRange }[]",
                  "—",
                  "Quick-select preset options",
                ],
                ["calendarProps", "Partial<CalendarProps>", "—", "Extra props passed to Calendar"],
                ["className", "string", "—", "Additional className"],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop}>
                  <td className="px-4 py-3 font-mono text-body-sm">{prop}</td>
                  <td className="px-4 py-3 font-mono text-body-sm">{type}</td>
                  <td className="px-4 py-3 font-mono text-body-sm">{def}</td>
                  <td className="px-4 py-3">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Preset type */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Type</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Definition
                </th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {[
                [
                  "Preset (single)",
                  "{ label: string; value: Date }",
                  "Quick-select option for single mode",
                ],
                [
                  "Preset (range)",
                  "{ label: string; value: DateRange }",
                  "Quick-select option for range mode",
                ],
                ["DateRange", "{ from: Date; to?: Date }", "react-day-picker range type"],
              ].map(([name, def, desc]) => (
                <tr key={name}>
                  <td className="px-4 py-3 font-mono text-body-sm">{name}</td>
                  <td className="px-4 py-3 font-mono text-body-sm">{def}</td>
                  <td className="px-4 py-3">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CSS Variables */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Token</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Value</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {componentTokenDocs["date-picker"].tokens.map(({ token, value, usage }) => (
                <tr key={`${token}-${usage}`}>
                  <td className="px-4 py-3 font-mono text-body-sm">{token}</td>
                  <td className="px-4 py-3 font-mono text-body-sm">{value}</td>
                  <td className="px-4 py-3">{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocsSection>
    </div>
  );
}
