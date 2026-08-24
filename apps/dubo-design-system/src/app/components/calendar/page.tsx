"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, type IndicatorMap } from "@/components/ui/calendar";
import { DocsSection } from "@/components/docs/section";
import type { DateRange } from "react-day-picker";
import { componentTokenDocs } from "@/lib/component-token-docs";

/* ── Helpers ── */

function ShowcaseCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      <div>{children}</div>
    </div>
  );
}

function ShowcaseRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-body-md font-medium text-subtext-color">{label}</p>
      <div className="flex flex-wrap items-start gap-6">{children}</div>
    </div>
  );
}

/* ── Demo data ── */

function buildIndicatorMap(): IndicatorMap {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");

  return {
    [`${y}-${m}-03`]: [{ color: "success", label: "Available" }],
    [`${y}-${m}-05`]: [
      { color: "success", label: "Available" },
      { color: "warning", label: "Partial" },
    ],
    [`${y}-${m}-08`]: [{ color: "danger", label: "Full" }],
    [`${y}-${m}-10`]: [{ color: "brand", label: "Booked" }],
    [`${y}-${m}-12`]: [
      { color: "success", label: "Available" },
      { color: "danger", label: "Full" },
      { color: "info", label: "Info" },
    ],
    [`${y}-${m}-15`]: [{ color: "warning", label: "Partial" }],
    [`${y}-${m}-18`]: [
      { color: "success", label: "Available" },
      { color: "warning", label: "Partial" },
      { color: "danger", label: "Full" },
    ],
    [`${y}-${m}-22`]: [{ color: "info", label: "Info" }],
    [`${y}-${m}-25`]: [{ color: "success", label: "Available" }],
  };
}

/* ── Interactive Demos ── */

function SingleSelectionDemo() {
  const [selected, setSelected] = useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col gap-2">
      <Calendar mode="single" selected={selected} onSelect={setSelected} />
      <p className="text-body-sm text-subtext-color px-4">
        Selected: {selected ? selected.toLocaleDateString() : "none"}
      </p>
    </div>
  );
}

function RangeSelectionDemo() {
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  return (
    <div className="flex flex-col gap-2">
      <Calendar mode="range" selected={range} onSelect={setRange} />
      <p className="text-body-sm text-subtext-color px-4">
        From: {range?.from?.toLocaleDateString() ?? "—"} &mdash; To:{" "}
        {range?.to?.toLocaleDateString() ?? "—"}
      </p>
    </div>
  );
}

function MultipleSelectionDemo() {
  const [dates, setDates] = useState<Date[] | undefined>(undefined);

  return (
    <div className="flex flex-col gap-2">
      <Calendar mode="multiple" selected={dates} onSelect={setDates} />
      <p className="text-body-sm text-subtext-color px-4">Selected: {dates?.length ?? 0} day(s)</p>
    </div>
  );
}

function IndicatorsDemo() {
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const indicators = buildIndicatorMap();

  return (
    <Calendar mode="single" selected={selected} onSelect={setSelected} indicators={indicators} />
  );
}

function LegendDemo() {
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const indicators = buildIndicatorMap();

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      indicators={indicators}
      showLegend
    />
  );
}

function CustomLegendDemo() {
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const indicators = buildIndicatorMap();

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      indicators={indicators}
      showLegend
      legendItems={[
        { color: "success", label: "Open slots" },
        { color: "warning", label: "Few remaining" },
        { color: "danger", label: "Fully booked" },
        { color: "brand", label: "Your appointments" },
      ]}
    />
  );
}

function MultipleMonthsDemo() {
  const [selected, setSelected] = useState<Date | undefined>(undefined);

  return <Calendar mode="single" selected={selected} onSelect={setSelected} numberOfMonths={2} />;
}

function DropdownsDemo() {
  const [selected, setSelected] = useState<Date | undefined>(undefined);

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      captionLayout="dropdown"
      startMonth={new Date(2020, 0)}
      endMonth={new Date(2030, 11)}
    />
  );
}

/* ── Page ── */

export default function CalendarPage() {
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
              Calendar
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Date selection calendar built on react-day-picker v9 with Dubo design tokens. Supports
              single, range, and multiple selection modes with optional availability indicator dots,
              legend, multi-month view, and dropdown navigation.
            </p>
          </div>
        </div>
      </section>

      {/* ── Selection Modes ── */}
      <DocsSection
        id="selection-modes"
        title="Selection Modes"
        description="Three built-in selection modes: single date, date range, and multiple dates."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Single selection">
            <ShowcaseRow label="Click a day to select it">
              <SingleSelectionDemo />
            </ShowcaseRow>
          </ShowcaseCard>

          <ShowcaseCard title="Range selection">
            <ShowcaseRow label="Click start, then end date">
              <RangeSelectionDemo />
            </ShowcaseRow>
          </ShowcaseCard>

          <ShowcaseCard title="Multiple selection">
            <ShowcaseRow label="Click multiple days to toggle them">
              <MultipleSelectionDemo />
            </ShowcaseRow>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Availability Indicators ── */}
      <DocsSection
        id="indicators"
        title="Availability Indicators"
        description="Small colored dots below each day number convey availability or status at a glance. Pass an IndicatorMap keyed by YYYY-MM-DD with an array of indicator objects."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Indicator dots — success, warning, danger, brand, info">
            <IndicatorsDemo />
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Legend ── */}
      <DocsSection
        id="legend"
        title="Legend"
        description="Enable showLegend to render a color legend below the calendar. Customize labels via the legendItems prop."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Default legend">
            <LegendDemo />
          </ShowcaseCard>

          <ShowcaseCard title="Custom legend items">
            <CustomLegendDemo />
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Multiple Months ── */}
      <DocsSection
        id="multiple-months"
        title="Multiple Months"
        description="Set numberOfMonths to display side-by-side month grids. Useful for range pickers and scheduling views."
      >
        <ShowcaseCard title="Two months">
          <MultipleMonthsDemo />
        </ShowcaseCard>
      </DocsSection>

      {/* ── Dropdowns ── */}
      <DocsSection
        id="dropdowns"
        title="Dropdowns"
        description='Use captionLayout="dropdown" with startMonth/endMonth to allow fast month and year navigation via native selects.'
      >
        <ShowcaseCard title="Dropdown navigation">
          <DropdownsDemo />
        </ShowcaseCard>
      </DocsSection>

      {/* ── API Reference ── */}
      <DocsSection
        id="api"
        title="API Reference"
        description="Props, types, and shared semantic design tokens."
      >
        {/* Calendar props */}
        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Prop (Calendar)
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
                ["mode", '"single" | "range" | "multiple"', '"single"', "Selection mode"],
                [
                  "selected",
                  "Date | DateRange | Date[]",
                  "—",
                  "Currently selected value (controlled)",
                ],
                ["onSelect", "(value) => void", "—", "Selection change handler"],
                ["indicators", "IndicatorMap", "—", "Map of YYYY-MM-DD to indicator dot arrays"],
                ["showLegend", "boolean", "false", "Show color legend below calendar"],
                [
                  "legendItems",
                  "{ color: IndicatorColor; label: string }[]",
                  "Available / Partial / Full",
                  "Custom legend entries",
                ],
                ["numberOfMonths", "number", "1", "Number of side-by-side months"],
                [
                  "captionLayout",
                  '"buttons" | "dropdown"',
                  '"buttons"',
                  "Month/year navigation style",
                ],
                ["startMonth", "Date", "—", "Earliest navigable month (dropdown mode)"],
                ["endMonth", "Date", "—", "Latest navigable month (dropdown mode)"],
                ["disabled", "Matcher | Matcher[]", "—", "Days that cannot be selected"],
                ["showOutsideDays", "boolean", "true", "Show days from adjacent months"],
                ["className", "string", "—", "Additional className for root container"],
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

        {/* IndicatorMap type */}
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
                  "IndicatorMap",
                  "Record<string, DayIndicator[]>",
                  "Map keyed by YYYY-MM-DD with arrays of dot definitions",
                ],
                [
                  "DayIndicator",
                  "{ color: IndicatorColor; label?: string }",
                  "Single dot definition with color and optional tooltip",
                ],
                [
                  "IndicatorColor",
                  '"success" | "warning" | "danger" | "brand" | "info"',
                  "Available dot colors mapped to semantic tokens",
                ],
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
              {componentTokenDocs["calendar"].tokens.map(({ token, value, usage }) => (
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
