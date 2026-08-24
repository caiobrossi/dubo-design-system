"use client";

/**
 * DatePicker — Dubo Design System
 *
 * Composition of Calendar + Popover + Input trigger.
 * Supports single date, date range, and presets.
 *
 * Two visual styles matching the Input component:
 *   - Standard: outline/filled with label above
 *   - Floating: label animates from center to top on focus/fill
 *
 * Reuses the shared field trigger recipe plus calendar and glass overlay tokens.
 */

import * as React from "react";
import { format as formatDate } from "date-fns";
import { CalendarDays, X } from "dubo-design-system/lib/icons";
import { cn } from "dubo-design-system/lib/utils";
import { useDesignSystemLabel } from "dubo-design-system/lib/labels";
import {
  fieldBodyMdClass,
  fieldBodyLgClass,
  fieldClearActionClass,
  fieldClearActionVisibleClass,
  fieldDescriptionClass,
  fieldLabelClass,
  fieldTransitionClass,
  floatingLabelCompactClass,
} from "dubo-design-system/components/ui/field-styles";
import { Calendar, type CalendarProps, type IndicatorMap } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useMobileNativeControl } from "./mobile-native-control";
import type { DateRange } from "react-day-picker";

// ── Types ──

type DatePickerVariant = "outline" | "filled";
type CalendarOverrides = Omit<
  Partial<CalendarProps>,
  "mode" | "selected" | "onSelect" | "required"
> & {
  min?: number;
  max?: number;
  excludeDisabled?: boolean;
};

interface DatePickerBaseProps {
  /** Visual style */
  variant?: DatePickerVariant;
  /** Label text */
  label?: string;
  /** Placeholder when no date selected */
  placeholder?: string;
  /** Date format string (date-fns) */
  dateFormat?: string;
  /** Show clear button */
  clearable?: boolean;
  /** Error state */
  error?: boolean;
  /** Help/error text below input */
  helpText?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Open state callback */
  onOpenChange?: (open: boolean) => void;
  /** Additional className */
  className?: string;
  /** Optional portal container for the calendar popover */
  portalContainer?: HTMLElement | null;
  /** Indicator dots for calendar */
  indicators?: IndicatorMap;
  /** Show legend in calendar */
  showLegend?: boolean;
  /** Calendar props passthrough */
  calendarProps?: CalendarOverrides;
  /** Preset quick-select options */
  presets?: { label: string; value: Date | DateRange }[];
}

interface SingleDatePickerProps extends DatePickerBaseProps {
  /** Selection mode */
  mode?: "single";
  /** Selected date */
  value?: Date;
  /** Change handler */
  onChange?: (date: Date | undefined) => void;
}

interface RangeDatePickerProps extends DatePickerBaseProps {
  /** Selection mode */
  mode: "range";
  /** Selected range */
  value?: DateRange;
  /** Change handler */
  onChange?: (range: DateRange | undefined) => void;
}

export type DatePickerProps = SingleDatePickerProps | RangeDatePickerProps;

// ── Floating DatePicker ──

interface FloatingDatePickerBaseProps {
  /** Visual style */
  variant?: DatePickerVariant;
  /** Label text (required for floating) */
  label: string;
  /** Date format string */
  dateFormat?: string;
  /** Show clear button */
  clearable?: boolean;
  /** Error state */
  error?: boolean;
  /** Help/error text */
  helpText?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Open state callback */
  onOpenChange?: (open: boolean) => void;
  /** Additional className */
  className?: string;
  /** Optional portal container for the calendar popover */
  portalContainer?: HTMLElement | null;
  /** Indicator dots */
  indicators?: IndicatorMap;
  /** Show legend */
  showLegend?: boolean;
  /** Calendar props */
  calendarProps?: CalendarOverrides;
  /** Presets */
  presets?: { label: string; value: Date | DateRange }[];
}

interface FloatingSingleProps extends FloatingDatePickerBaseProps {
  mode?: "single";
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}

interface FloatingRangeProps extends FloatingDatePickerBaseProps {
  mode: "range";
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
}

export type FloatingDatePickerProps = FloatingSingleProps | FloatingRangeProps;

// ── Variant classes ──

const variantClasses: Record<DatePickerVariant, string> = {
  outline: cn(
    "bg-[var(--color-bg-surface)] border border-[var(--color-border-input)]",
    "focus-within:border-[var(--color-border-focus)]"
  ),
  filled: cn(
    "bg-[var(--color-hover)] border border-transparent",
    "focus-within:bg-[var(--color-bg-surface)] focus-within:border-[var(--color-border-focus)]"
  ),
};

// ── Helper: format display value ──

function formatDisplayValue(
  mode: "single" | "range",
  value: Date | DateRange | undefined,
  dateFormat: string
): string {
  if (!value) return "";
  if (mode === "single" && value instanceof Date) {
    return formatDate(value, dateFormat);
  }
  if (mode === "range" && value && typeof value === "object" && "from" in value) {
    const range = value as DateRange;
    if (range.from && range.to) {
      return `${formatDate(range.from, dateFormat)} — ${formatDate(range.to, dateFormat)}`;
    }
    if (range.from) {
      return formatDate(range.from, dateFormat);
    }
  }
  return "";
}

function toNativeDateInputValue(value?: Date) {
  if (!value || Number.isNaN(value.getTime())) return "";
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function fromNativeDateInputValue(value: string) {
  if (!value) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day);
}

// ── DatePicker component ──

function DatePicker({
  mode = "single",
  variant = "outline",
  label,
  // pt-PT default. This package has no i18n layer, so a hardcoded English
  // default surfaced verbatim wherever a caller omitted the prop — which is how
  // the campaign scheduler showed "Select date" inside a Portuguese form
  // (DUB-138). The product ships in pt-PT, so that is what the fallback says;
  // an `en`/`es` surface passes `placeholder` explicitly.
  placeholder = "Escolher data",
  dateFormat = "dd/MM/yyyy",
  clearable = false,
  error = false,
  helpText,
  disabled = false,
  onOpenChange,
  className,
  portalContainer,
  value,
  onChange,
  indicators,
  showLegend,
  calendarProps,
  presets,
}: DatePickerProps) {
  const useNativeControl = useMobileNativeControl();
  const clearLabel = useDesignSystemLabel("clear");
  const [open, setOpen] = React.useState(false);
  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [onOpenChange]
  );
  const displayValue = formatDisplayValue(mode, value, dateFormat);
  const hasValue = !!displayValue;

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(undefined as never);
  };

  const handleSelect = (selected: Date | DateRange | undefined) => {
    if (mode === "single") {
      (onChange as SingleDatePickerProps["onChange"])?.(selected as Date | undefined);
      if (selected) setOpen(false);
    } else {
      const range = selected as DateRange | undefined;
      (onChange as RangeDatePickerProps["onChange"])?.(range);
      if (range?.from && range?.to) setOpen(false);
    }
  };

  if (useNativeControl && mode === "single") {
    const singleValue = value instanceof Date ? value : undefined;
    const nativeValue = toNativeDateInputValue(singleValue);

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        {label && <label className={fieldLabelClass}>{label}</label>}
        <div
          className={cn(
            "group flex h-[var(--height-control-md)] w-full items-center gap-[var(--space-2)] rounded-[var(--radius-control-input)] px-[var(--space-3)]",
            fieldBodyLgClass,
            fieldTransitionClass,
            variantClasses[variant],
            error && "border-[var(--color-danger)] focus-within:border-[var(--color-danger)]",
            disabled && "opacity-[var(--disabled-opacity)] pointer-events-none"
          )}
        >
          <CalendarDays className="size-[var(--icon-size-md)] shrink-0 text-[color:var(--color-text-muted)]" />
          <input
            type="date"
            disabled={disabled}
            value={nativeValue}
            className={cn(
              "min-w-0 flex-1 border-none bg-transparent outline-none",
              fieldBodyLgClass,
              nativeValue
                ? "text-[color:var(--color-text-primary)]"
                : "text-[color:var(--color-text-muted)]",
              "focus:outline-none focus:ring-0"
            )}
            aria-label={label ?? placeholder}
            onChange={(event) =>
              (onChange as SingleDatePickerProps["onChange"])?.(
                fromNativeDateInputValue(event.target.value)
              )
            }
          />
          {clearable && nativeValue && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              onKeyDown={(e) => e.key === "Enter" && handleClear(e as never)}
              className={cn(fieldClearActionClass, fieldClearActionVisibleClass)}
              title={clearLabel}
              aria-label={clearLabel}
            >
              <X className="size-[var(--icon-size-sm)]" />
            </span>
          )}
        </div>
        {helpText && (
          <p
            className={cn(
              fieldDescriptionClass,
              error
                ? "text-[color:var(--color-danger)]"
                : "text-[color:var(--color-text-secondary)]"
            )}
          >
            {helpText}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && <label className={fieldLabelClass}>{label}</label>}
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "group flex h-[var(--height-control-md)] w-full cursor-pointer items-center gap-[var(--space-2)] rounded-[var(--radius-control-input)] px-[var(--space-3)]",
              fieldBodyLgClass,
              fieldTransitionClass,
              variantClasses[variant],
              error && "border-[var(--color-danger)] focus-within:border-[var(--color-danger)]",
              disabled && "opacity-[var(--disabled-opacity)] pointer-events-none"
            )}
          >
            <CalendarDays className="size-[var(--icon-size-md)] shrink-0 text-[color:var(--color-text-muted)]" />
            <span
              className={cn(
                "flex-1 text-left truncate",
                hasValue
                  ? "text-[color:var(--color-text-primary)]"
                  : "text-[color:var(--color-text-muted)]"
              )}
            >
              {displayValue || placeholder}
            </span>
            {clearable && hasValue && (
              <span
                role="button"
                tabIndex={0}
                onClick={handleClear}
                onKeyDown={(e) => e.key === "Enter" && handleClear(e as never)}
                className={cn(fieldClearActionClass, fieldClearActionVisibleClass)}
                title={clearLabel}
                aria-label={clearLabel}
              >
                <X className="size-[var(--icon-size-sm)]" />
              </span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          container={portalContainer}
          className="w-auto p-0 [backdrop-filter:blur(calc(var(--space-4)+var(--space-2)))_var(--overlay-glass-saturate)]"
          align="start"
          sideOffset={8}
        >
          <div className="flex">
            {presets && presets.length > 0 && (
              <div className="flex flex-col gap-1 p-3 border-r border-[var(--color-border)]">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleSelect(preset.value as never)}
                    className={cn(
                      "rounded-[var(--radius-control-input)] px-[var(--space-3)] py-[var(--space-2)] text-left whitespace-nowrap",
                      fieldBodyMdClass,
                      "text-[color:var(--color-text-secondary)]",
                      "hover:bg-[var(--color-hover)] hover:text-[color:var(--color-text-primary)]",
                      fieldTransitionClass
                    )}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            )}
            <Calendar
              {...(mode === "single"
                ? {
                    mode: "single" as const,
                    selected: value as Date | undefined,
                    onSelect: (d: Date | undefined) => handleSelect(d),
                  }
                : {
                    mode: "range" as const,
                    selected: value as DateRange | undefined,
                    onSelect: (r: DateRange | undefined) => handleSelect(r),
                  })}
              indicators={indicators}
              showLegend={showLegend}
              {...calendarProps}
            />
          </div>
        </PopoverContent>
      </Popover>
      {helpText && (
        <p
          className={cn(
            fieldDescriptionClass,
            error ? "text-[color:var(--color-danger)]" : "text-[color:var(--color-text-secondary)]"
          )}
        >
          {helpText}
        </p>
      )}
    </div>
  );
}

// ── Floating DatePicker ──

function FloatingDatePicker({
  mode = "single",
  variant = "outline",
  label,
  dateFormat = "dd/MM/yyyy",
  clearable = false,
  error = false,
  helpText,
  disabled = false,
  onOpenChange,
  className,
  portalContainer,
  value,
  onChange,
  indicators,
  showLegend,
  calendarProps,
  presets,
}: FloatingDatePickerProps) {
  const useNativeControl = useMobileNativeControl();
  const clearLabel = useDesignSystemLabel("clear");
  const [open, setOpen] = React.useState(false);
  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [onOpenChange]
  );
  const displayValue = formatDisplayValue(mode, value, dateFormat);
  const hasValue = !!displayValue;
  const isFocused = open;

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(undefined as never);
  };

  const handleSelect = (selected: Date | DateRange | undefined) => {
    if (mode === "single") {
      (onChange as FloatingSingleProps["onChange"])?.(selected as Date | undefined);
      if (selected) setOpen(false);
    } else {
      const range = selected as DateRange | undefined;
      (onChange as FloatingRangeProps["onChange"])?.(range);
      if (range?.from && range?.to) setOpen(false);
    }
  };

  if (useNativeControl && mode === "single") {
    const singleValue = value instanceof Date ? value : undefined;
    const nativeValue = toNativeDateInputValue(singleValue);

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        <div
          className={cn(
            "group relative flex h-[var(--size-14)] w-full items-center gap-[var(--space-2)] rounded-[var(--radius-scale-xl)] px-[var(--space-4)]",
            fieldBodyLgClass,
            fieldTransitionClass,
            variant === "outline"
              ? "bg-[var(--color-bg-surface)] border border-[var(--color-border-input)]"
              : "border border-transparent bg-[var(--color-hover)]",
            error && "border-[var(--color-danger)]",
            disabled && "opacity-[var(--disabled-opacity)] pointer-events-none"
          )}
        >
          <CalendarDays className="size-[var(--icon-size-md)] shrink-0 text-[color:var(--color-text-muted)]" />
          <span
            className={cn(
              "pointer-events-none absolute left-[calc(var(--space-4)+var(--icon-size-md)+var(--space-2))] origin-left transition-all duration-200",
              nativeValue
                ? `top-[var(--space-2)] ${floatingLabelCompactClass} text-[color:var(--color-text-secondary)]`
                : "top-1/2 -translate-y-1/2 text-[color:var(--color-text-muted)]",
              !nativeValue && fieldBodyMdClass
            )}
          >
            {label}
          </span>
          <input
            type="date"
            disabled={disabled}
            value={nativeValue}
            className={cn(
              "min-w-0 flex-1 border-none bg-transparent pt-[var(--space-3)] text-left outline-none",
              fieldBodyLgClass,
              nativeValue ? "text-[color:var(--color-text-primary)]" : "text-transparent",
              "focus:outline-none focus:ring-0"
            )}
            aria-label={label}
            onChange={(event) =>
              (onChange as FloatingSingleProps["onChange"])?.(
                fromNativeDateInputValue(event.target.value)
              )
            }
          />
          {clearable && nativeValue && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleClear}
              onKeyDown={(e) => e.key === "Enter" && handleClear(e as never)}
              className={cn(fieldClearActionClass, fieldClearActionVisibleClass)}
              title={clearLabel}
              aria-label={clearLabel}
            >
              <X className="size-[var(--icon-size-sm)]" />
            </span>
          )}
        </div>
        {helpText && (
          <p
            className={cn(
              fieldDescriptionClass,
              error
                ? "text-[color:var(--color-danger)]"
                : "text-[color:var(--color-text-secondary)]"
            )}
          >
            {helpText}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "group relative flex h-[var(--size-14)] w-full cursor-pointer items-center gap-[var(--space-2)] rounded-[var(--radius-scale-xl)] px-[var(--space-4)]",
              fieldBodyLgClass,
              fieldTransitionClass,
              variant === "outline"
                ? cn(
                    "bg-[var(--color-bg-surface)] border border-[var(--color-border-input)]",
                    isFocused && "border-[var(--color-border-focus)]"
                  )
                : cn(
                    "border border-transparent",
                    isFocused
                      ? "bg-[var(--color-bg-surface)] border-[var(--color-border-focus)]"
                      : "bg-[var(--color-hover)]"
                  ),
              error && "border-[var(--color-danger)]",
              disabled && "opacity-[var(--disabled-opacity)] pointer-events-none"
            )}
          >
            <CalendarDays className="size-[var(--icon-size-md)] shrink-0 text-[color:var(--color-text-muted)]" />
            {/* Floating label */}
            <span
              className={cn(
                "pointer-events-none absolute left-[calc(var(--space-4)+var(--icon-size-md)+var(--space-2))] origin-left transition-all duration-200",
                hasValue || isFocused
                  ? `top-[var(--space-2)] ${floatingLabelCompactClass} text-[color:var(--color-text-secondary)]`
                  : "top-1/2 -translate-y-1/2 text-[color:var(--color-text-muted)]",
                !hasValue && !isFocused && fieldBodyMdClass
              )}
            >
              {label}
            </span>
            {/* Value */}
            <span
              className={cn(
                "flex-1 truncate pt-[var(--space-3)] text-left",
                hasValue ? "text-[color:var(--color-text-primary)]" : "text-transparent"
              )}
            >
              {displayValue || "placeholder"}
            </span>
            {clearable && hasValue && (
              <span
                role="button"
                tabIndex={0}
                onClick={handleClear}
                onKeyDown={(e) => e.key === "Enter" && handleClear(e as never)}
                className={cn(fieldClearActionClass, fieldClearActionVisibleClass)}
                title={clearLabel}
                aria-label={clearLabel}
              >
                <X className="size-[var(--icon-size-sm)]" />
              </span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          container={portalContainer}
          className="w-auto p-0 [backdrop-filter:blur(calc(var(--space-4)+var(--space-2)))_var(--overlay-glass-saturate)]"
          align="start"
          sideOffset={8}
        >
          <div className="flex">
            {presets && presets.length > 0 && (
              <div className="flex flex-col gap-1 p-3 border-r border-[var(--color-border)]">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleSelect(preset.value as never)}
                    className={cn(
                      "rounded-[var(--radius-control-input)] px-[var(--space-3)] py-[var(--space-2)] text-left whitespace-nowrap",
                      fieldBodyMdClass,
                      "text-[color:var(--color-text-secondary)]",
                      "hover:bg-[var(--color-hover)] hover:text-[color:var(--color-text-primary)]",
                      fieldTransitionClass
                    )}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            )}
            <Calendar
              {...(mode === "single"
                ? {
                    mode: "single" as const,
                    selected: value as Date | undefined,
                    onSelect: (d: Date | undefined) => handleSelect(d),
                  }
                : {
                    mode: "range" as const,
                    selected: value as DateRange | undefined,
                    onSelect: (r: DateRange | undefined) => handleSelect(r),
                  })}
              indicators={indicators}
              showLegend={showLegend}
              {...calendarProps}
            />
          </div>
        </PopoverContent>
      </Popover>
      {helpText && (
        <p
          className={cn(
            fieldDescriptionClass,
            error ? "text-[color:var(--color-danger)]" : "text-[color:var(--color-text-secondary)]"
          )}
        >
          {helpText}
        </p>
      )}
    </div>
  );
}

DatePicker.displayName = "DatePicker";
FloatingDatePicker.displayName = "FloatingDatePicker";

export { DatePicker, FloatingDatePicker };
