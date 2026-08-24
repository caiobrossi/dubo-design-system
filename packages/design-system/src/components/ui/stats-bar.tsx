"use client";

import * as React from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "dubo-design-system/lib/icons";
import { cn } from "dubo-design-system/lib/utils";

export type StatsBarTrendTone = "positive" | "negative" | "neutral";

export interface StatsBarTrend {
  value: React.ReactNode;
  tone?: StatsBarTrendTone;
  icon?: React.ReactNode;
}

export interface StatsBarItem {
  id: string;
  illustration: React.ReactNode;
  label: React.ReactNode;
  value: React.ReactNode;
  trend?: StatsBarTrend;
}

export interface StatsBarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: StatsBarItem[];
  variant?: "card" | "ghost";
}

function getTrendColor(tone: StatsBarTrendTone) {
  if (tone === "positive") return "text-[color:var(--color-success)]";
  if (tone === "negative") return "text-[color:var(--color-danger)]";
  return "text-[color:var(--color-text-secondary)]";
}

function TrendIcon({ tone }: { tone: StatsBarTrendTone }) {
  if (tone === "positive") return <ArrowUpRight className="size-[var(--icon-size-sm)]" />;
  if (tone === "negative") return <ArrowDownRight className="size-[var(--icon-size-sm)]" />;
  return <Minus className="size-[var(--icon-size-sm)]" />;
}

export function StatsBar({ items, variant = "card", className, ...props }: StatsBarProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-scale-xl)]",
        variant === "card" && "border border-[var(--color-border)] bg-[var(--color-bg-surface)]",
        variant === "ghost" && "border-transparent bg-transparent",
        className
      )}
      {...props}
    >
      <div className="flex flex-col md:flex-row">
        {items.map((item, index) => {
          const tone = item.trend?.tone ?? "neutral";

          return (
            <div
              key={item.id}
              className={cn(
                "flex min-w-0 flex-1 items-start gap-[var(--space-4)] px-[var(--space-5)] py-[var(--space-5)]",
                index > 0 && "border-t border-[var(--color-border)] md:border-l md:border-t-0"
              )}
            >
              <div
                className="flex h-[var(--size-12)] w-[var(--size-12)] shrink-0 items-center justify-center xl:h-[var(--size-20)] xl:w-[var(--size-20)]"
                aria-hidden="true"
              >
                {item.illustration}
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-[var(--space-1)]">
                <p className="text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
                  {item.label}
                </p>
                <p className="text-hero [font-weight:var(--font-weight-300)] text-[color:var(--color-text-primary)]">
                  {item.value}
                </p>

                {item.trend ? (
                  <div
                    className={cn(
                      "mt-[var(--space-1)] inline-flex items-center gap-[var(--space-1)]",
                      "text-body-sm [font-weight:var(--font-weight-400)]",
                      getTrendColor(tone)
                    )}
                  >
                    {item.trend.icon ?? <TrendIcon tone={tone} />}
                    <span>{item.trend.value}</span>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export type MetricsBarTrendTone = StatsBarTrendTone;
export type MetricsBarTrend = StatsBarTrend;
export type MetricsBarItem = StatsBarItem;
export type MetricsBarProps = StatsBarProps;
export const MetricsBar = StatsBar;
