"use client";

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { ArrowDownUp, CalendarDays, Filter, MapPin, User } from "@/lib/icons";
import { FilterChip } from "@/components/ui/filter-chip";

const meta: Meta = {
  title: "Components/FilterChip",
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "Size variant — sm (32px), default (40px), lg (48px)",
      table: {
        defaultValue: { summary: "default" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
**FilterChip** — Dubo Design System component.

A pill-shaped button that opens a popover dropdown. When a filter is active, it shows brand styling and an inline clear (X) button.

### Sizes
| Size | Height | Font | Padding |
|---|---|---|---|
| \`sm\` | 32px | caption role | \`--space-2\` |
| \`default\` | 40px | label-sm role | \`--space-3\` |
| \`lg\` | 48px | label-md role | \`--space-4\` |

### Visual States
| State | Border | Background | Text |
|---|---|---|---|
| Inactive | \`--color-border\` | \`--color-bg-surface\` | \`--color-text-secondary\` |
| Hover | \`--color-border\` | \`--color-hover\` | \`--color-text-secondary\` |
| Active | \`--color-brand\` | \`--color-brand-subtle\` | \`--color-brand\` |
| Disabled | — | — | — @ 40% opacity |
| Persistent | Same as inactive | Same as inactive | Same as inactive |

### Props
- \`label\` — default label text
- \`activeLabel\` — label when active/filtered
- \`active\` — controls active visual state
- \`persistent\` — never shows active styling (for sort filters)
- \`size\` — \`"sm"\` | \`"default"\` | \`"lg"\`
- \`onClear\` — reset handler (shows X button when active)
- \`children\` — popover content (any React node)
- \`icon\` — optional leading icon
- \`disabled\` — disable the chip

### Tokens
Reuses shared control heights, label roles, selection colors, focus tokens, and the shared glass overlay recipe for the dropdown content.
        `,
      },
    },
  },
};

export default meta;

// ─── Playground ──────────────────────────────────────────────────────────────

function PlaygroundDemo() {
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

export const Playground: StoryObj = {
  render: () => <PlaygroundDemo />,
};

// ─── Sizes ──────────────────────────────────────────────────────────────────

export const Sizes: StoryObj = {
  name: "Sizes",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Three size variants: **sm** (32px), **default** (40px), and **lg** (48px). Use `sm` in dense UIs like tables, `default` for standard filter bars, and `lg` for prominent page-level filters.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col items-start gap-1.5">
          <span className="text-body-sm font-medium text-[color:var(--color-text-muted)]">sm: 32px</span>
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
          <span className="text-body-sm font-medium text-[color:var(--color-text-muted)]">lg: 48px</span>
          <FilterChip label="Status" icon={<Filter />} size="lg">
            <div className="p-4 text-body-md text-[color:var(--color-text-secondary)]">
              Dropdown content
            </div>
          </FilterChip>
        </div>
      </div>

      {/* Active state at each size */}
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col items-start gap-1.5">
          <span className="text-body-sm font-medium text-[color:var(--color-text-muted)]">sm active</span>
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
          <span className="text-body-sm font-medium text-[color:var(--color-text-muted)]">lg active</span>
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
    </div>
  ),
};

// ─── All States ──────────────────────────────────────────────────────────────

export const AllStates: StoryObj = {
  name: "All States",
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: "Inactive, active, and disabled states side by side." },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <FilterChip label="Status" icon={<Filter />}>
        <div className="p-4 text-body-md text-[color:var(--color-text-secondary)]">
          Dropdown content here
        </div>
      </FilterChip>

      <FilterChip label="Location" activeLabel="Lisbon" active onClear={() => {}} icon={<MapPin />}>
        <div className="p-4 text-body-md text-[color:var(--color-text-secondary)]">
          Dropdown content here
        </div>
      </FilterChip>

      <FilterChip label="Assignee" icon={<User />} disabled>
        <div className="p-4 text-body-md text-[color:var(--color-text-secondary)]">
          Dropdown content here
        </div>
      </FilterChip>
    </div>
  ),
};

// ─── Persistent ─────────────────────────────────────────────────────────────

function PersistentSortDemo() {
  const sortOptions = ["Newest to Oldest", "Oldest to Newest", "Name A–Z", "Name Z–A"];
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

export const Persistent: StoryObj = {
  name: "Persistent",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '**Persistent mode** (`persistent={true}`) — the chip never shows active styling (no brand border/bg, no X button). Ideal for sort controls where the label changes ("Newest to Oldest" ↔ "Oldest to Newest") but there\'s no "clear" action.',
      },
    },
  },
  render: () => <PersistentSortDemo />,
};

// ─── With Icons ──────────────────────────────────────────────────────────────

export const WithIcons: StoryObj = {
  name: "With Icons",
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: "Filter chips with leading icons for context." },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <FilterChip label="Date" icon={<CalendarDays />}>
        <div className="p-4 text-body-md">Date picker goes here</div>
      </FilterChip>
      <FilterChip label="Location" icon={<MapPin />}>
        <div className="p-4 text-body-md">Location list goes here</div>
      </FilterChip>
      <FilterChip label="Practitioner" icon={<User />}>
        <div className="p-4 text-body-md">Practitioner list goes here</div>
      </FilterChip>
      <FilterChip label="Filter" icon={<Filter />}>
        <div className="p-4 text-body-md">Filter options go here</div>
      </FilterChip>
    </div>
  ),
};

// ─── Multiple Active ─────────────────────────────────────────────────────────

function MultipleActiveDemo() {
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

export const MultipleActive: StoryObj = {
  name: "Multiple Filters",
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: "Common pattern — a row of filter chips, some active, some not." },
    },
  },
  render: () => <MultipleActiveDemo />,
};

// ─── Design Tokens ───────────────────────────────────────────────────────────

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["filter-chip"].title}
      tokens={componentTokenDocs["filter-chip"].tokens}
    />
  ),
};
