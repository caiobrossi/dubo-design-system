"use client";

import React, { useState } from "react";
import { ArrowDownUp, CalendarDays, Filter, MapPin, User } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { FilterChip } from "@/components/ui/filter-chip";
import { DocsSection } from "@/components/docs/section";
import { componentTokenDocs } from "@/lib/component-token-docs";

/* ── Helpers ── */

function ShowcaseCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

/* ── Interactive Demos ── */

function DateFilterDemo() {
  const [selected, setSelected] = useState<string | null>(null);
  const options = ["Last 7 days", "Last 30 days", "This year", "All time"];

  return (
    <FilterChip
      label="Date range"
      activeLabel={selected}
      active={!!selected}
      onClear={() => setSelected(null)}
      icon={<CalendarDays />}
    >
      <div className="flex flex-col gap-0.5 p-1">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            className={`rounded-full px-3 py-2 text-left text-body-md transition-colors duration-[var(--transition-fast)] ${
              selected === opt
                ? "bg-[var(--color-brand-subtle)] font-medium text-[color:var(--color-brand)]"
                : "text-[color:var(--color-text-primary)] hover:bg-[var(--color-hover)]"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </FilterChip>
  );
}

function FilterBarDemo() {
  const [dateRange, setDateRange] = useState<string | null>("Last 7 days");
  const [location, setLocation] = useState<string | null>("Lisbon");
  const [status, setStatus] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <FilterChip
        label="Date range"
        activeLabel={dateRange}
        active={!!dateRange}
        onClear={() => setDateRange(null)}
        icon={<CalendarDays />}
      >
        <div className="flex flex-col gap-0.5 p-1">
          {["Last 7 days", "Last 30 days", "This year"].map((opt) => (
            <button
              key={opt}
              onClick={() => setDateRange(opt)}
              className={`rounded-full px-3 py-2 text-left text-body-md transition-colors ${
                dateRange === opt
                  ? "bg-[var(--color-brand-subtle)] font-medium text-[color:var(--color-brand)]"
                  : "text-[color:var(--color-text-primary)] hover:bg-[var(--color-hover)]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </FilterChip>

      <FilterChip
        label="Location"
        activeLabel={location}
        active={!!location}
        onClear={() => setLocation(null)}
        icon={<MapPin />}
      >
        <div className="flex flex-col gap-0.5 p-1">
          {["Lisbon", "Porto", "Faro"].map((opt) => (
            <button
              key={opt}
              onClick={() => setLocation(opt)}
              className={`rounded-full px-3 py-2 text-left text-body-md transition-colors ${
                location === opt
                  ? "bg-[var(--color-brand-subtle)] font-medium text-[color:var(--color-brand)]"
                  : "text-[color:var(--color-text-primary)] hover:bg-[var(--color-hover)]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </FilterChip>

      <FilterChip
        label="Status"
        activeLabel={status}
        active={!!status}
        onClear={() => setStatus(null)}
        icon={<Filter />}
      >
        <div className="flex flex-col gap-0.5 p-1">
          {["Active", "Inactive", "Pending"].map((opt) => (
            <button
              key={opt}
              onClick={() => setStatus(opt)}
              className={`rounded-full px-3 py-2 text-left text-body-md transition-colors ${
                status === opt
                  ? "bg-[var(--color-brand-subtle)] font-medium text-[color:var(--color-brand)]"
                  : "text-[color:var(--color-text-primary)] hover:bg-[var(--color-hover)]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </FilterChip>
    </div>
  );
}

function PersistentSortDemo() {
  const sortOptions = ["Newest to Oldest", "Oldest to Newest", "Name A\u2013Z", "Name Z\u2013A"];
  const [sort, setSort] = useState(sortOptions[0]);

  return (
    <FilterChip label={sort} active persistent icon={<ArrowDownUp />}>
      <div className="flex flex-col gap-0.5 p-1">
        {sortOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => setSort(opt)}
            className={`rounded-full px-3 py-2 text-left text-body-md transition-colors duration-[var(--transition-fast)] ${
              sort === opt
                ? "bg-[var(--color-brand-subtle)] font-medium text-[color:var(--color-brand)]"
                : "text-[color:var(--color-text-primary)] hover:bg-[var(--color-hover)]"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </FilterChip>
  );
}

/* ── Page ── */

export default function FilterChipPage() {
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
              FilterChip
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Pill-shaped filter button that opens a popover with any content. Shows brand styling
              when active and an inline clear button. Supports 3 sizes and a persistent mode for
              sort controls. Composable — the popover can contain lists, date pickers, checkboxes,
              or any React node. Zero component-specific tokens.
            </p>
          </div>
        </div>
      </section>

      {/* ── States ── */}
      <DocsSection
        id="states"
        title="Visual States"
        description="Inactive (outline), active (brand-subtle bg + brand border), and disabled states."
      >
        <ShowcaseCard title="All states side by side">
          <FilterChip label="Status" icon={<Filter />}>
            <div className="p-4 text-body-md text-[color:var(--color-text-secondary)]">
              Dropdown content
            </div>
          </FilterChip>

          <FilterChip
            label="Location"
            activeLabel="Lisbon"
            active
            onClear={() => {}}
            icon={<MapPin />}
          >
            <div className="p-4 text-body-md text-[color:var(--color-text-secondary)]">
              Dropdown content
            </div>
          </FilterChip>

          <FilterChip label="Assignee" icon={<User />} disabled>
            <div className="p-4 text-body-md text-[color:var(--color-text-secondary)]">
              Dropdown content
            </div>
          </FilterChip>
        </ShowcaseCard>
      </DocsSection>

      {/* ── Sizes ── */}
      <DocsSection
        id="sizes"
        title="Sizes"
        description="Three size variants via the size prop: sm (32px), default (40px), and lg (48px)."
      >
        <ShowcaseCard title="Inactive at each size">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col items-start gap-1.5">
              <span className="text-body-sm font-medium text-[color:var(--color-text-muted)]">
                sm: 32px
              </span>
              <FilterChip label="Status" icon={<Filter />} size="sm">
                <div className="p-4 text-body-md text-[color:var(--color-text-secondary)]">
                  Dropdown content
                </div>
              </FilterChip>
            </div>
            <div className="flex flex-col items-start gap-1.5">
              <span className="text-body-sm font-medium text-[color:var(--color-text-muted)]">
                default: 40px
              </span>
              <FilterChip label="Status" icon={<Filter />} size="default">
                <div className="p-4 text-body-md text-[color:var(--color-text-secondary)]">
                  Dropdown content
                </div>
              </FilterChip>
            </div>
            <div className="flex flex-col items-start gap-1.5">
              <span className="text-body-sm font-medium text-[color:var(--color-text-muted)]">
                lg: 48px
              </span>
              <FilterChip label="Status" icon={<Filter />} size="lg">
                <div className="p-4 text-body-md text-[color:var(--color-text-secondary)]">
                  Dropdown content
                </div>
              </FilterChip>
            </div>
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="Active at each size">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col items-start gap-1.5">
              <span className="text-body-sm font-medium text-[color:var(--color-text-muted)]">
                sm active
              </span>
              <FilterChip
                label="Location"
                activeLabel="Lisbon"
                active
                onClear={() => {}}
                icon={<MapPin />}
                size="sm"
              >
                <div className="p-4 text-body-md">Dropdown</div>
              </FilterChip>
            </div>
            <div className="flex flex-col items-start gap-1.5">
              <span className="text-body-sm font-medium text-[color:var(--color-text-muted)]">
                default active
              </span>
              <FilterChip
                label="Location"
                activeLabel="Lisbon"
                active
                onClear={() => {}}
                icon={<MapPin />}
                size="default"
              >
                <div className="p-4 text-body-md">Dropdown</div>
              </FilterChip>
            </div>
            <div className="flex flex-col items-start gap-1.5">
              <span className="text-body-sm font-medium text-[color:var(--color-text-muted)]">
                lg active
              </span>
              <FilterChip
                label="Location"
                activeLabel="Lisbon"
                active
                onClear={() => {}}
                icon={<MapPin />}
                size="lg"
              >
                <div className="p-4 text-body-md">Dropdown</div>
              </FilterChip>
            </div>
          </div>
        </ShowcaseCard>
      </DocsSection>

      {/* ── Persistent ── */}
      <DocsSection
        id="persistent"
        title="Persistent Mode"
        description="When persistent={true}, the chip never shows active styling — no brand border, no brand background, no X button. Ideal for sort controls where the label changes but there's no clear action."
      >
        <ShowcaseCard title="Sort filter (persistent)">
          <PersistentSortDemo />
        </ShowcaseCard>
      </DocsSection>

      {/* ── Icons ── */}
      <DocsSection
        id="icons"
        title="With Icons"
        description="Leading icons provide visual context for the filter type."
      >
        <ShowcaseCard title="Various filter types">
          <DateFilterDemo />

          <FilterChip label="Location" icon={<MapPin />}>
            <div className="p-4 text-body-md">Location list</div>
          </FilterChip>

          <FilterChip label="Practitioner" icon={<User />}>
            <div className="p-4 text-body-md">Practitioner list</div>
          </FilterChip>
        </ShowcaseCard>
      </DocsSection>

      {/* ── Filter Bar ── */}
      <DocsSection
        id="filter-bar"
        title="Filter Bar Pattern"
        description="Common pattern — a row of filter chips, some active, some not. Each chip opens its own popover."
      >
        <ShowcaseCard title="Dashboard filter bar">
          <FilterBarDemo />
        </ShowcaseCard>
      </DocsSection>

      {/* ── API ── */}
      <DocsSection id="api" title="API Reference" description="Props and CSS custom properties.">
        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Prop</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Type</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Default</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {[
                ["label", "string", "\u2014", "Default label text"],
                ["activeLabel", "ReactNode", "\u2014", "Label when active/filtered"],
                ["active", "boolean", "false", "Controls active visual state"],
                ["persistent", "boolean", "false", "Never show active styling (for sort filters)"],
                [
                  "size",
                  '"sm" | "default" | "lg"',
                  '"default"',
                  "Size variant — 32px, 40px, or 48px",
                ],
                ["onClear", "() => void", "\u2014", "Reset handler (shows inline X when active)"],
                ["children", "ReactNode", "\u2014", "Popover content"],
                ["icon", "ReactNode", "\u2014", "Optional leading icon"],
                ["disabled", "boolean", "false", "Disable the chip"],
                ["open", "boolean", "\u2014", "Controlled open state"],
                ["onOpenChange", "(open: boolean) => void", "\u2014", "Open state callback"],
                ["align", '"start" | "center" | "end"', '"start"', "Popover alignment"],
                ["sideOffset", "number", "6", "Px offset from chip"],
                ["className", "string", "\u2014", "Additional class names for the trigger"],
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

        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  CSS Variable / Size
                </th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Value</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {componentTokenDocs["filter-chip"].tokens.map(({ token, value, usage }) => (
                <tr key={token}>
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
