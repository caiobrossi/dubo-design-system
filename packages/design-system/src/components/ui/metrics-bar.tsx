"use client";

// Compatibility wrapper.
// Canonical component: `stats-bar`
// Keep this file only to avoid breaking old imports while the repo is being normalized.

export {
  StatsBar as MetricsBar,
  type StatsBarItem as MetricsBarItem,
  type StatsBarProps as MetricsBarProps,
  type StatsBarTrend as MetricsBarTrend,
  type StatsBarTrendTone as MetricsBarTrendTone,
} from "@dubo/design-system-shared/components/ui/stats-bar";
