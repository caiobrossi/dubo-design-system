import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  CalendarClock,
  Clock3,
  HeartPulse,
  TrendingUp,
  UserRoundPlus,
  UserRoundSearch,
  XCircle,
} from "@/lib/icons";
import {
  DesignTokensDocTable,
  NotesTable,
  PropsTable,
  ShowcaseCard,
} from "@/components/docs/component-doc-helpers";
import { ComponentHero } from "@/components/docs/component-hero";
import { DocsSection } from "@/components/docs/section";
import { StatsBar } from "@/components/ui/stats-bar";
import { getComponentDoc } from "@/lib/content-registry";
import { componentTokenDocs } from "@/lib/component-token-docs";

const entry = getComponentDoc("stats-bar");

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
};

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

const stats = [
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

const usageRows = [
  {
    item: "Insight headers",
    details:
      "Use it at the top of dashboard and analytics views when four to six KPIs need to be scanned together.",
  },
  {
    item: "Illustrated summary",
    details:
      "The illustration gives each stat a fast visual anchor, especially when the numbers repeat across tabs or date filters.",
  },
  {
    item: "Comparative context",
    details:
      "Use the optional comparison row only when you can explain what the stat is being compared against.",
  },
];

const propRows = [
  {
    prop: "items",
    type: "StatsBarItem[]",
    default: "required",
    description:
      "Each stat item receives illustration, label, value, and optional trend comparison.",
  },
  {
    prop: "variant",
    type: '"card" | "ghost"',
    default: '"card"',
    description: "Switches between the bordered surface and a transparent wrapper while preserving separators.",
  },
  {
    prop: "trend.value",
    type: "ReactNode",
    default: "—",
    description: "Small comparison copy such as “24% more than last week”.",
  },
  {
    prop: "trend.tone",
    type: '"positive" | "negative" | "neutral"',
    default: '"neutral"',
    description: "Controls the comparison color using shared semantic status colors.",
  },
];

const accessibilityRows = [
  {
    item: "Stat clarity",
    details:
      "Labels should stay self-explanatory even if the illustration is hidden or not perceived.",
  },
  {
    item: "Comparison honesty",
    details:
      "Do not use a positive color unless the change is genuinely favorable in that product context.",
  },
  {
    item: "Reading order",
    details:
      "Keep the most important stat first because the component reads left to right on larger screens and top to bottom on small ones.",
  },
];

export default function StatsBarPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="StatsBar packages the dashboard-style metrics row into a reusable core component, so product teams can stop rebuilding the same insight header with hardcoded spacing and typography."
        >
          <div className="grid gap-6">
            <ShowcaseCard
              title="Card variant"
              description="A row of four stats with separators, illustration anchors, and comparison context."
            >
              <StatsBar items={stats} />
            </ShowcaseCard>
            <ShowcaseCard
              title="Transparent variant"
              description="Use the ghost variant when the surrounding layout already provides the surface container."
            >
              <StatsBar items={stats} variant="ghost" />
            </ShowcaseCard>
          </div>
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="The component intentionally relies on shared sizing, spacing, typography, surface, and status colors. That keeps it aligned with the rest of the system instead of becoming a one-off analytics widget."
        >
          <NotesTable rows={usageRows} />
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="Compose the stats row by supplying structured items. The container handles separators and responsive layout for you."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs["stats-bar"].tokens} />
          </div>
        </DocsSection>

        <DocsSection
          id="accessibility"
          title="Accessibility"
          description="Stats are often used in decision-making flows, so labels and trend language need to stay trustworthy and easy to parse."
        >
          <NotesTable rows={accessibilityRows} />
        </DocsSection>
      </div>
    </div>
  );
}
