import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CalendarClock,
  Clock3,
  HeartPulse,
  TrendingUp,
  UserRoundPlus,
  UserRoundSearch,
  XCircle,
} from "@/lib/icons";
import { StatsBar, type StatsBarProps } from "@/components/ui/stats-bar";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { DesignTokensTable } from "./_components/DesignTokensTable";

function StatIllustration({
  tone,
  icon,
}: {
  tone: "brand" | "success" | "danger" | "neutral";
  icon: ReactNode;
}) {
  const toneClass =
    tone === "brand"
      ? "bg-[var(--color-brand-subtle)] text-[color:var(--color-brand)]"
      : tone === "success"
        ? "bg-[var(--color-success-subtle)] text-[color:var(--color-success)]"
        : tone === "danger"
          ? "bg-[var(--color-danger-subtle)] text-[color:var(--color-danger)]"
          : "bg-[var(--color-hover)] text-[color:var(--color-text-secondary)]";

  return (
    <div
      className={`flex h-[var(--size-12)] w-[var(--size-12)] items-center justify-center rounded-[var(--radius-scale-xl)] xl:h-[var(--size-20)] xl:w-[var(--size-20)] ${toneClass}`}
      aria-hidden="true"
    >
      <div className="scale-125 xl:scale-[1.65]">{icon}</div>
    </div>
  );
}

const metrics = [
  {
    id: "new-patients",
    illustration: (
      <StatIllustration tone="brand" icon={<TrendingUp className="size-[var(--icon-size-lg)]" />} />
    ),
    label: "New patients",
    value: "24",
    trend: {
      tone: "positive" as const,
      value: "24% more than last week",
      icon: <UserRoundPlus className="size-[var(--icon-size-sm)]" />,
    },
  },
  {
    id: "recurring-patients",
    illustration: (
      <StatIllustration tone="success" icon={<HeartPulse className="size-[var(--icon-size-lg)]" />} />
    ),
    label: "Recurring patients",
    value: "18",
    trend: {
      tone: "positive" as const,
      value: "12% more than last week",
      icon: <UserRoundSearch className="size-[var(--icon-size-sm)]" />,
    },
  },
  {
    id: "no-show",
    illustration: (
      <StatIllustration tone="danger" icon={<XCircle className="size-[var(--icon-size-lg)]" />} />
    ),
    label: "No-show + cancelled",
    value: "05",
    trend: {
      tone: "negative" as const,
      value: "8% more than last week",
      icon: <XCircle className="size-[var(--icon-size-sm)]" />,
    },
  },
  {
    id: "avg-wait",
    illustration: (
      <StatIllustration tone="neutral" icon={<CalendarClock className="size-[var(--icon-size-lg)]" />} />
    ),
    label: "Average wait time",
    value: "14 min",
    trend: {
      tone: "positive" as const,
      value: "3 min faster than last week",
      icon: <Clock3 className="size-[var(--icon-size-sm)]" />,
    },
  },
];

const compactMetrics = metrics.map((item, index) => ({
  ...item,
  trend:
    index === 1
      ? undefined
      : {
          tone: index === 2 ? ("negative" as const) : ("positive" as const),
          value: index === 2 ? "2 more this week" : "Improving",
        },
}));

const meta = {
  title: "Components/StatsBar",
  component: StatsBar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**StatsBar** — horizontal stats surface for insight summaries, KPI headers, and dashboard overviews.

Use it when you need a compact row of metrics with illustration, value, label, separators, and optional trend comparison.

### Core behaviors
- responsive metric row with built-in separators
- illustration, value, and label per metric
- optional comparison row with positive / negative / neutral tone
- \`card\` and \`ghost\` surface variants
        `,
      },
    },
  },
} satisfies Meta<StatsBarProps>;

export default meta;

type Story = StoryObj<StatsBarProps>;

export const Playground: Story = {
  args: {
    items: metrics,
  },
};

export const WithoutComparison: Story = {
  args: {
    items: compactMetrics,
  },
};

export const Transparent: Story = {
  args: {
    items: metrics,
    variant: "ghost",
  },
};

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["stats-bar"].title}
      tokens={componentTokenDocs["stats-bar"].tokens}
    />
  ),
};
