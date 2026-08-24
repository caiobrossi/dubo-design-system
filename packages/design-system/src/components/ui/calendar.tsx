"use client";

/**
 * Calendar — Dubo Design System
 *
 * Built on react-day-picker v9 with Dubo design tokens.
 * Supports single, range, and multiple date selection.
 *
 * Key feature: Availability indicators (dots) below day numbers.
 * Uses custom DayButton component to render JSX indicators inside each cell.
 *
 * Tokens used (shared semantic + sizing tokens):
 *   --color-brand             Selected day bg
 *   --color-brand-subtle      Range middle bg, today ring
 *   --color-text-on-brand     Selected day text
 *   --color-text-primary      Day number text
 *   --color-text-muted        Weekday headers, outside days
 *   --color-bg-surface        Calendar surface bg
 *   --color-border            Calendar border
 *   --color-hover             Day hover bg
 *   --color-pressed           Day active bg
 *   --color-success           Available indicator dot
 *   --color-warning           Partial indicator dot
 *   --color-danger            Full/busy indicator dot
 *   --color-brand (dot)       Brand indicator dot
 *   --color-info-strong       Info indicator dot
 *   --transition-fast         Hover/focus transitions
 *   --focus-ring              Focus ring color
 *   --disabled-opacity        Disabled day opacity
 *   --shadow-lg               Standalone calendar shadow
 *   Primitives: --size-10 (40px cell), --radius-md (8px), --radius-lg (12px),
 *               text-body-sm (weekday headers), text-body-md (day numbers), font-medium (500)
 */

import * as React from "react";
import { DayPicker, type DayPickerProps, type DayButtonProps } from "react-day-picker";
import { enUS, es, pt as ptPT, type Locale as DateFnsLocale } from "date-fns/locale";
import { ChevronDown, ChevronLeft, ChevronRight } from "dubo-design-system/lib/icons";
import { cn } from "dubo-design-system/lib/utils";

// ── Indicator types ──

export type IndicatorColor = "success" | "warning" | "danger" | "brand" | "info";

export interface DayIndicator {
  color: IndicatorColor;
  label?: string;
}

/** Map of date string (YYYY-MM-DD) → array of indicator dots */
export type IndicatorMap = Record<string, DayIndicator[]>;

// ── Indicator color map to CSS variables ──

const indicatorColorMap: Record<IndicatorColor, string> = {
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  danger: "var(--color-danger)",
  brand: "var(--color-brand)",
  info: "var(--color-info-strong)",
};

// ── Custom DayButton with indicator dots ──

function DayButtonWithIndicators({
  indicators,
  ...props
}: DayButtonProps & { indicators?: IndicatorMap }) {
  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  const day = props.day;
  const dateStr = day
    ? `${day.date.getFullYear()}-${String(day.date.getMonth() + 1).padStart(2, "0")}-${String(day.date.getDate()).padStart(2, "0")}`
    : "";
  const dots = indicators?.[dateStr] ?? [];

  return (
    <button {...buttonProps} className={cn(props.className)}>
      <span className="relative flex size-full items-center justify-center">
        <span>{day?.date.getDate()}</span>
        {dots.length > 0 && (
          <span
            className="pointer-events-none absolute bottom-[4px] left-1/2 flex -translate-x-1/2 items-center justify-center gap-[3px]"
            aria-hidden="true"
          >
            {dots.slice(0, 4).map((dot, i) => (
              <span
                key={i}
                className="block rounded-full"
                style={{
                  width: "5px",
                  height: "5px",
                  backgroundColor: indicatorColorMap[dot.color],
                }}
                title={dot.label}
              />
            ))}
          </span>
        )}
      </span>
    </button>
  );
}

// ── Calendar component ──

export type CalendarProps = DayPickerProps & {
  /** Availability/status indicator dots per day */
  indicators?: IndicatorMap;
  /** Additional className for the root container */
  className?: string;
  /** Show legend for indicator dots */
  showLegend?: boolean;
  /** Legend items to display */
  legendItems?: { color: IndicatorColor; label: string }[];
};

const defaultLegendItems: { color: IndicatorColor; label: string }[] = [
  { color: "success", label: "Available" },
  { color: "warning", label: "Partial" },
  { color: "danger", label: "Full" },
];

function resolveCalendarLocaleFromLang(lang?: string | null): DateFnsLocale {
  const normalized = (lang ?? "").toLowerCase();
  if (normalized.startsWith("en")) return enUS;
  if (normalized.startsWith("es")) return es;
  return ptPT;
}

function readGlobalCalendarLocale() {
  if (typeof document !== "undefined") {
    const documentLang = document.documentElement.lang;
    if (documentLang) {
      return resolveCalendarLocaleFromLang(documentLang);
    }
  }

  if (typeof navigator !== "undefined") {
    return resolveCalendarLocaleFromLang(navigator.language);
  }

  return ptPT;
}

function Calendar({
  className,
  indicators,
  showLegend = false,
  legendItems = defaultLegendItems,
  classNames,
  locale: localeProp,
  ...props
}: CalendarProps) {
  const [resolvedLocale, setResolvedLocale] = React.useState<DateFnsLocale>(() =>
    localeProp ? (localeProp as DateFnsLocale) : readGlobalCalendarLocale()
  );

  React.useEffect(() => {
    if (localeProp) {
      setResolvedLocale(localeProp as DateFnsLocale);
      return;
    }

    const syncLocale = () => {
      setResolvedLocale(readGlobalCalendarLocale());
    };

    syncLocale();

    if (typeof document === "undefined") return;

    const observer = new MutationObserver(syncLocale);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });

    return () => observer.disconnect();
  }, [localeProp]);

  const CustomDayButton = React.useCallback(
    (dayProps: DayButtonProps) => <DayButtonWithIndicators {...dayProps} indicators={indicators} />,
    [indicators]
  );

  return (
    <div className={cn("px-3 py-4", className)}>
      <DayPicker
        showOutsideDays
        navLayout="around"
        locale={resolvedLocale}
        className="w-full"
        classNames={{
          months: "flex flex-col gap-4",
          month:
            "grid grid-cols-[var(--size-10)_1fr_var(--size-10)] grid-rows-[auto_auto] items-center gap-y-3",
          month_caption: "col-start-2 row-start-1 flex items-center justify-center px-1",
          caption_label: cn(
            "inline-flex items-center justify-center gap-1 text-center",
            "text-body-md font-semibold text-[color:var(--color-text-primary)]"
          ),
          // Dropdown navigation styles
          dropdowns: "flex items-center gap-2",
          dropdown_root: "relative inline-flex items-center",
          dropdown: cn(
            "absolute inset-0 z-[2] w-full cursor-pointer opacity-0",
            "appearance-none border-none bg-transparent"
          ),
          months_dropdown: "",
          years_dropdown: "",
          chevron: "size-4",
          nav: "contents",
          button_previous: cn(
            "col-start-1 row-start-1",
            "inline-flex items-center justify-center rounded-full",
            "size-10 border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[color:var(--color-text-secondary)]",
            "shadow-[0_1px_0_0_var(--color-border)]",
            "hover:bg-[var(--color-hover)] hover:text-[color:var(--color-text-primary)]",
            "transition-colors duration-[var(--transition-fast)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          ),
          button_next: cn(
            "col-start-3 row-start-1 justify-self-end",
            "inline-flex items-center justify-center rounded-full",
            "size-10 border border-[var(--color-border)] bg-[var(--color-bg-surface)] text-[color:var(--color-text-secondary)]",
            "shadow-[0_1px_0_0_var(--color-border)]",
            "hover:bg-[var(--color-hover)] hover:text-[color:var(--color-text-primary)]",
            "transition-colors duration-[var(--transition-fast)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          ),
          month_grid: "col-span-3 row-start-2 w-full border-collapse",
          weekdays: "flex w-full",
          weekday: cn(
            "w-10 text-center text-body-sm font-medium uppercase",
            "text-[color:var(--color-text-muted)] py-1"
          ),
          week: "flex w-full",
          day: cn(
            "relative size-10 rounded-full p-0 text-center text-body-md text-[color:var(--color-text-primary)]",
            "focus-within:relative focus-within:z-20"
          ),
          day_button: cn(
            "inline-flex size-10 items-center justify-center rounded-full",
            "text-body-md font-medium text-inherit",
            "transition-colors duration-[var(--transition-fast)]",
            "hover:bg-[var(--color-hover)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          ),
          selected: cn(
            "rounded-full bg-[var(--color-brand)] text-[color:var(--color-text-on-brand)]",
            "[&>button]:rounded-full [&>button]:bg-[var(--color-brand)] [&>button]:text-[color:var(--color-text-on-brand)]",
            "[&>button]:hover:bg-[var(--color-brand-hover)]"
          ),
          today: "rounded-full ring-2 ring-[var(--color-brand-subtle)]",
          outside: "text-[color:var(--color-text-muted)] opacity-50",
          disabled:
            "text-[color:var(--color-text-muted)] opacity-[var(--disabled-opacity)] pointer-events-none",
          hidden: "invisible",
          range_start:
            "rounded-full bg-[var(--color-brand)] text-[color:var(--color-text-on-brand)] [&>button]:rounded-full [&>button]:bg-[var(--color-brand)] [&>button]:text-[color:var(--color-text-on-brand)]",
          range_end:
            "rounded-full bg-[var(--color-brand)] text-[color:var(--color-text-on-brand)] [&>button]:rounded-full [&>button]:bg-[var(--color-brand)] [&>button]:text-[color:var(--color-text-on-brand)]",
          range_middle:
            "rounded-full bg-[var(--color-brand-subtle)] text-[color:var(--color-brand)] [&>button]:rounded-full [&>button]:bg-[var(--color-brand-subtle)] [&>button]:text-[color:var(--color-brand)]",
          ...classNames,
        }}
        components={{
          DayButton: CustomDayButton,
          Chevron: ({ orientation, className: chevronClassName }) => {
            if (orientation === "left")
              return <ChevronLeft className={cn("size-4", chevronClassName)} />;
            if (orientation === "down")
              return (
                <ChevronDown
                  className={cn("size-3.5 text-[color:var(--color-text-muted)]", chevronClassName)}
                />
              );
            return <ChevronRight className={cn("size-4", chevronClassName)} />;
          },
        }}
        {...props}
      />
      {showLegend && legendItems.length > 0 && (
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[var(--color-border)]">
          {legendItems.map((item) => (
            <div
              key={item.color}
              className="flex items-center gap-1.5 text-body-sm text-[color:var(--color-text-secondary)]"
            >
              <span
                className="block size-2 rounded-full"
                style={{ backgroundColor: indicatorColorMap[item.color] }}
              />
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
