"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Calendar, List, LayoutGrid } from "@/lib/icons";
import { SegmentControl, SegmentItem } from "@/components/ui/segment-control";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";

const meta: Meta = {
  title: "Components/SegmentControl",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**SegmentControl** — iOS-style segmented control with animated spring pill.

The pill indicator slides between items with a spring animation (stiffness: 500, damping: 30, mass: 0.8).

### Variants
| Variant | Use |
|---|---|
| \`default\` | Gray background — standard use |
| \`light\` | Transparent — use on colored surfaces |
| \`header\` | Darker gray — use in header bars |

### Sizes
- \`sm\` → 32px height
- \`default\` → 40px height

### Design Tokens
SegmentControl reuses shared surface, text, and motion tokens. Component-specific tokens are limited to spacing, typography, and pill geometry.
        `,
      },
    },
  },
};

export default meta;

// ─── Interactive ──────────────────────────────────────────────────────────────

function InteractiveSegment() {
  const [active, setActive] = useState(0);
  const items = ["Day", "Week", "Month"];

  return (
    <SegmentControl>
      {items.map((item, i) => (
        <SegmentItem key={item} active={active === i} onClick={() => setActive(i)}>
          {item}
        </SegmentItem>
      ))}
    </SegmentControl>
  );
}

export const Default: StoryObj = {
  render: () => <InteractiveSegment />,
};

// ─── Variants ─────────────────────────────────────────────────────────────────

function VariantDemo({ variant }: { variant: "default" | "light" | "header" }) {
  const [active, setActive] = useState(0);
  const items = ["Tasks", "Insights", "Reports"];
  return (
    <SegmentControl variant={variant}>
      {items.map((item, i) => (
        <SegmentItem key={item} active={active === i} onClick={() => setActive(i)}>
          {item}
        </SegmentItem>
      ))}
    </SegmentControl>
  );
}

export const Variants: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Default
        </p>
        <VariantDemo variant="default" />
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Light (transparent bg)
        </p>
        <VariantDemo variant="light" />
      </div>
      <div className="rounded-xl bg-[var(--color-pressed)] p-4">
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Header (on darker surface)
        </p>
        <VariantDemo variant="header" />
      </div>
    </div>
  ),
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

function SizeDemo({ size }: { size: "sm" | "default" }) {
  const [active, setActive] = useState(0);
  const items = ["Day", "Week", "Month"];
  return (
    <SegmentControl size={size}>
      {items.map((item, i) => (
        <SegmentItem key={item} active={active === i} onClick={() => setActive(i)}>
          {item}
        </SegmentItem>
      ))}
    </SegmentControl>
  );
}

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Small: 32px
        </p>
        <SizeDemo size="sm" />
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Default: 40px
        </p>
        <SizeDemo size="default" />
      </div>
    </div>
  ),
};

// ─── With Icons ───────────────────────────────────────────────────────────────

function WithIconsDemo() {
  const [active, setActive] = useState(0);
  return (
    <SegmentControl>
      <SegmentItem active={active === 0} onClick={() => setActive(0)} icon={<List />}>
        List
      </SegmentItem>
      <SegmentItem active={active === 1} onClick={() => setActive(1)} icon={<LayoutGrid />}>
        Grid
      </SegmentItem>
      <SegmentItem active={active === 2} onClick={() => setActive(2)} icon={<Calendar />}>
        Calendar
      </SegmentItem>
    </SegmentControl>
  );
}

export const WithIcons: StoryObj = {
  name: "With Icons",
  render: () => <WithIconsDemo />,
};

// ─── Fit Content ──────────────────────────────────────────────────────────────

function FitDemo() {
  const [active, setActive] = useState(0);
  return (
    <SegmentControl className="w-auto">
      <SegmentItem fit active={active === 0} onClick={() => setActive(0)}>
        Active
      </SegmentItem>
      <SegmentItem fit active={active === 1} onClick={() => setActive(1)}>
        Inactive
      </SegmentItem>
      <SegmentItem fit active={active === 2} onClick={() => setActive(2)}>
        All
      </SegmentItem>
    </SegmentControl>
  );
}

export const FitContent: StoryObj = {
  name: "Fit Content Width",
  parameters: {
    docs: {
      description: { story: "Items hug their content width instead of expanding equally." },
    },
  },
  render: () => <FitDemo />,
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

function DisabledDemo() {
  const [active, setActive] = useState(0);
  return (
    <SegmentControl>
      <SegmentItem active={active === 0} onClick={() => setActive(0)}>
        Active
      </SegmentItem>
      <SegmentItem disabled>Disabled</SegmentItem>
      <SegmentItem active={active === 2} onClick={() => setActive(2)}>
        Another
      </SegmentItem>
    </SegmentControl>
  );
}

export const Disabled: StoryObj = {
  render: () => <DisabledDemo />,
};

// ─── Many Items ───────────────────────────────────────────────────────────────

function ManyItemsDemo() {
  const [active, setActive] = useState(0);
  const items = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  return (
    <SegmentControl>
      {items.map((item, i) => (
        <SegmentItem key={item} active={active === i} onClick={() => setActive(i)}>
          {item}
        </SegmentItem>
      ))}
    </SegmentControl>
  );
}

export const ManyItems: StoryObj = {
  name: "Many Items",
  render: () => <ManyItemsDemo />,
};

// ─── Design Tokens ───────────────────────────────────────────────────────────

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["segment-control"].title}
      tokens={componentTokenDocs["segment-control"].tokens}
    />
  ),
};
