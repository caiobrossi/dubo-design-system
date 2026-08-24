"use client";

import * as React from "react";
import { format as formatDate } from "date-fns";
import { CalendarDays, X } from "dubo-design-system/lib/icons";
import { cn } from "dubo-design-system/lib/utils";
import { useDesignSystemLabel } from "dubo-design-system/lib/labels";
import {
  fieldBodyLgClass,
  fieldClearActionClass,
  fieldClearActionVisibleClass,
  fieldDescriptionClass,
  fieldTransitionClass,
  floatingLabelCompactClass,
  floatingLabelIdleClass,
} from "dubo-design-system/components/ui/field-styles";
import { Calendar, type CalendarProps } from "./calendar";
import { Popover, PopoverAnchor, PopoverContent } from "./popover";
import { useMobileNativeControl } from "./mobile-native-control";

type DateFieldVariant = "outline" | "filled";
type SupportedDateFormat = "dd/MM/yyyy" | "MM/dd/yyyy" | "yyyy-MM-dd";
type CalendarOverrides = Omit<
  Partial<CalendarProps>,
  "mode" | "selected" | "onSelect" | "required"
>;

export interface FloatingDateFieldProps {
  value?: Date;
  onChange?: (value: Date | undefined) => void;
  label: string;
  id?: string;
  name?: string;
  autoComplete?: string;
  variant?: DateFieldVariant;
  dateFormat?: SupportedDateFormat;
  clearable?: boolean;
  error?: boolean;
  helpText?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  calendarProps?: CalendarOverrides;
  portalContainer?: HTMLElement | null;
}

const inputFieldClass = [
  "size-full min-w-0 flex-1 border-none bg-transparent outline-none",
  "placeholder:text-[color:var(--color-text-muted)]",
  "focus:outline-none focus:ring-0",
  "disabled:cursor-not-allowed",
  fieldBodyLgClass,
  "text-[color:var(--color-text-primary)]",
].join(" ");

const supportedFormats = new Set<SupportedDateFormat>(["dd/MM/yyyy", "MM/dd/yyyy", "yyyy-MM-dd"]);

function normalizeDateFormat(dateFormat: string): SupportedDateFormat {
  if (supportedFormats.has(dateFormat as SupportedDateFormat)) {
    return dateFormat as SupportedDateFormat;
  }
  return "dd/MM/yyyy";
}

function getDatePlaceholder(dateFormat: SupportedDateFormat) {
  switch (dateFormat) {
    case "MM/dd/yyyy":
      return "MM/DD/YYYY";
    case "yyyy-MM-dd":
      return "YYYY-MM-DD";
    default:
      return "DD/MM/YYYY";
  }
}

function getWeekStart(weekStartsOn?: CalendarProps["weekStartsOn"]): 0 | 1 | 6 {
  if (weekStartsOn === 0 || weekStartsOn === 6) return weekStartsOn;
  return 1;
}

function validateDateDigits(digits: string, dateFormat: SupportedDateFormat) {
  const numbersOnly = digits.replace(/\D/g, "");
  if (numbersOnly.length === 0) return "";

  let validated = "";

  if (dateFormat === "dd/MM/yyyy") {
    if (numbersOnly.length >= 1) {
      const first = numbersOnly[0];
      validated += first > "3" ? `0${first}` : first;
    }
    if (numbersOnly.length >= 2) {
      const day = numbersOnly.slice(0, 2);
      const dayNum = Number.parseInt(day, 10);
      validated =
        dayNum > 31 ? `${validated.slice(0, 1)}1` : dayNum === 0 ? "01" : day.padStart(2, "0");
    }
    if (numbersOnly.length >= 3) {
      const first = numbersOnly[2];
      validated += first > "1" ? `0${first}` : first;
    }
    if (numbersOnly.length >= 4) {
      const month = numbersOnly.slice(2, 4);
      const monthNum = Number.parseInt(month, 10);
      validated = `${validated.slice(0, 2)}${monthNum > 12 ? "12" : monthNum === 0 ? "01" : month.padStart(2, "0")}`;
    }
    if (numbersOnly.length >= 5) {
      const yearPart = numbersOnly.slice(4, 8);
      validated += yearPart;
    }
    return validated;
  }

  if (dateFormat === "MM/dd/yyyy") {
    if (numbersOnly.length >= 1) {
      const first = numbersOnly[0];
      validated += first > "1" ? `0${first}` : first;
    }
    if (numbersOnly.length >= 2) {
      const month = numbersOnly.slice(0, 2);
      const monthNum = Number.parseInt(month, 10);
      validated =
        monthNum > 12
          ? `${validated.slice(0, 1)}2`
          : monthNum === 0
            ? "01"
            : month.padStart(2, "0");
    }
    if (numbersOnly.length >= 3) {
      const first = numbersOnly[2];
      validated += first > "3" ? `0${first}` : first;
    }
    if (numbersOnly.length >= 4) {
      const day = numbersOnly.slice(2, 4);
      const dayNum = Number.parseInt(day, 10);
      validated = `${validated.slice(0, 2)}${dayNum > 31 ? "31" : dayNum === 0 ? "01" : day.padStart(2, "0")}`;
    }
    if (numbersOnly.length >= 5) {
      const yearPart = numbersOnly.slice(4, 8);
      validated += yearPart;
    }
    return validated;
  }

  if (numbersOnly.length >= 1) {
    const yearPart = numbersOnly.slice(0, 4);
    validated += yearPart;
  }
  if (numbersOnly.length >= 5) {
    const first = numbersOnly[4];
    validated += first > "1" ? `0${first}` : first;
  }
  if (numbersOnly.length >= 6) {
    const month = numbersOnly.slice(4, 6);
    const monthNum = Number.parseInt(month, 10);
    validated = `${validated.slice(0, 4)}${monthNum > 12 ? "12" : monthNum === 0 ? "01" : month.padStart(2, "0")}`;
  }
  if (numbersOnly.length >= 7) {
    const first = numbersOnly[6];
    validated += first > "3" ? `0${first}` : first;
  }
  if (numbersOnly.length >= 8) {
    const day = numbersOnly.slice(6, 8);
    const dayNum = Number.parseInt(day, 10);
    validated = `${validated.slice(0, 6)}${dayNum > 31 ? "31" : dayNum === 0 ? "01" : day.padStart(2, "0")}`;
  }
  return validated;
}

function formatDateInput(value: string, rawDateFormat: string) {
  const dateFormat = normalizeDateFormat(rawDateFormat);
  const validated = validateDateDigits(value, dateFormat);
  if (!validated) return "";

  const separator = dateFormat === "yyyy-MM-dd" ? "-" : "/";

  if (dateFormat === "yyyy-MM-dd") {
    if (validated.length <= 4) return validated;
    if (validated.length <= 6) return `${validated.slice(0, 4)}${separator}${validated.slice(4)}`;
    return `${validated.slice(0, 4)}${separator}${validated.slice(4, 6)}${separator}${validated.slice(6, 8)}`;
  }

  if (validated.length <= 2) return validated;
  if (validated.length <= 4) return `${validated.slice(0, 2)}${separator}${validated.slice(2)}`;
  return `${validated.slice(0, 2)}${separator}${validated.slice(2, 4)}${separator}${validated.slice(4, 8)}`;
}

function parseDateInput(value: string, rawDateFormat: string) {
  const dateFormat = normalizeDateFormat(rawDateFormat);
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 8) return undefined;

  let day = "";
  let month = "";
  let year = "";

  if (dateFormat === "dd/MM/yyyy") {
    day = digits.slice(0, 2);
    month = digits.slice(2, 4);
    year = digits.slice(4, 8);
  } else if (dateFormat === "MM/dd/yyyy") {
    month = digits.slice(0, 2);
    day = digits.slice(2, 4);
    year = digits.slice(4, 8);
  } else {
    year = digits.slice(0, 4);
    month = digits.slice(4, 6);
    day = digits.slice(6, 8);
  }

  const candidate = new Date(
    Number.parseInt(year, 10),
    Number.parseInt(month, 10) - 1,
    Number.parseInt(day, 10)
  );
  if (Number.isNaN(candidate.getTime())) return undefined;
  if (
    candidate.getFullYear() !== Number.parseInt(year, 10) ||
    candidate.getMonth() !== Number.parseInt(month, 10) - 1 ||
    candidate.getDate() !== Number.parseInt(day, 10)
  ) {
    return undefined;
  }
  return candidate;
}

function formatSelectedDate(value: Date | undefined, rawDateFormat: string) {
  if (!value || Number.isNaN(value.getTime())) return "";
  return formatDate(value, normalizeDateFormat(rawDateFormat));
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

export const dateFieldHelpers = {
  formatDateInput,
  parseDateInput,
  formatSelectedDate,
};

function FloatingDateField({
  value,
  onChange,
  label,
  id,
  name,
  autoComplete = "off",
  variant = "filled",
  dateFormat = "dd/MM/yyyy",
  clearable = false,
  error = false,
  helpText,
  disabled = false,
  className,
  calendarProps,
  portalContainer,
}: FloatingDateFieldProps) {
  const useNativeControl = useMobileNativeControl();
  const clearDateLabel = useDesignSystemLabel("clearDate");
  const openCalendarLabel = useDesignSystemLabel("openCalendar");
  const normalizedFormat = normalizeDateFormat(dateFormat);
  const fallbackId = React.useId();
  const inputId = id ?? fallbackId;
  const [open, setOpen] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const nativeInputRef = React.useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = React.useState(() =>
    formatSelectedDate(value, normalizedFormat)
  );

  React.useEffect(() => {
    if (!focused) {
      setInputValue(formatSelectedDate(value, normalizedFormat));
    }
  }, [value, normalizedFormat, focused]);

  const hasValue = inputValue.trim() !== "";
  const visualPlaceholder = getDatePlaceholder(normalizedFormat);

  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatDateInput(event.target.value, normalizedFormat);
      setInputValue(formatted);

      if (formatted === "") {
        onChange?.(undefined);
        return;
      }

      const parsed = parseDateInput(formatted, normalizedFormat);
      if (parsed) {
        onChange?.(parsed);
      }
    },
    [normalizedFormat, onChange]
  );

  const handleBlur = React.useCallback(() => {
    setFocused(false);
    const parsed = parseDateInput(inputValue, normalizedFormat);
    setInputValue(
      parsed
        ? formatSelectedDate(parsed, normalizedFormat)
        : formatSelectedDate(value, normalizedFormat)
    );
  }, [inputValue, normalizedFormat, value]);

  const handleSelect = React.useCallback(
    (date: Date | undefined) => {
      onChange?.(date);
      setInputValue(formatSelectedDate(date, normalizedFormat));
      if (date) {
        setOpen(false);
      }
    },
    [normalizedFormat, onChange]
  );

  const handleClear = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      setInputValue("");
      onChange?.(undefined);
    },
    [onChange]
  );

  const handleOpenNativePicker = React.useCallback(() => {
    if (disabled) return;
    const input = nativeInputRef.current;
    if (!input) return;

    const pickerInput = input as HTMLInputElement & {
      showPicker?: () => void;
    };

    if (typeof pickerInput.showPicker === "function") {
      pickerInput.showPicker();
      return;
    }

    input.focus();
    input.click();
  }, [disabled]);

  if (useNativeControl) {
    const nativeValue = toNativeDateInputValue(value);

    return (
      <div className={cn("flex flex-col gap-1.5", className)}>
        <div
          className={cn(
            "group relative flex h-[var(--size-14)] w-full items-center gap-[var(--space-2)] rounded-[var(--radius-scale-xl)] border px-[var(--space-3)]",
            fieldTransitionClass,
            variant === "outline"
              ? "border-[var(--color-border-interactive)] bg-[var(--color-bg-surface)]"
              : "border-transparent bg-[var(--color-hover)]",
            error && "border-[var(--color-danger)]",
            disabled && "cursor-not-allowed opacity-[var(--disabled-opacity)]"
          )}
        >
          <div className="relative flex-1 h-full px-1">
            <input
              id={inputId}
              name={name}
              type="text"
              inputMode="numeric"
              value={inputValue}
              disabled={disabled}
              autoComplete={autoComplete}
              placeholder=""
              className={cn(inputFieldClass, "pt-[var(--space-5)] pb-[var(--space-1)]")}
              onFocus={() => setFocused(true)}
              onBlur={handleBlur}
              onChange={handleInputChange}
            />
            <label
              className={cn(
                "absolute left-1 pointer-events-none select-none transition-all duration-200 ease-out",
                hasValue || focused
                  ? `top-1 -translate-y-0 ${floatingLabelCompactClass}`
                  : `top-1/2 -translate-y-1/2 ${floatingLabelIdleClass}`,
                error
                  ? "text-[color:var(--color-danger)]"
                  : focused
                    ? "text-[color:var(--color-border-focus)]"
                    : "text-[color:var(--color-text-secondary)]"
              )}
            >
              {label}
            </label>
            {!hasValue && focused ? (
              <span
                className={cn(
                  "pointer-events-none absolute bottom-[var(--space-1)] left-1 select-none",
                  fieldBodyLgClass,
                  "text-[color:var(--color-text-muted)]"
                )}
              >
                {visualPlaceholder}
              </span>
            ) : null}
            <input
              ref={nativeInputRef}
              name={name}
              type="date"
              value={nativeValue}
              disabled={disabled}
              autoComplete={autoComplete}
              tabIndex={-1}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 size-0 opacity-0"
              onChange={(event) => {
                const nextValue = fromNativeDateInputValue(event.target.value);
                onChange?.(nextValue);
                setInputValue(formatSelectedDate(nextValue, normalizedFormat));
              }}
            />
          </div>

          {clearable && hasValue && !disabled ? (
            <button
              type="button"
              onPointerDown={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              onMouseDown={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              onClick={handleClear}
              className={cn(fieldClearActionClass, fieldClearActionVisibleClass)}
              aria-label={clearDateLabel}
            >
              <X className="size-[var(--icon-size-sm)]" />
            </button>
          ) : null}

          <button
            type="button"
            disabled={disabled}
            onMouseDown={(event) => event.preventDefault()}
            onClick={handleOpenNativePicker}
            className={cn(
              "inline-flex shrink-0 items-center justify-center rounded-[var(--radius-control-pill)] p-0.5",
              "text-[color:var(--color-text-secondary)] transition-colors duration-[var(--transition-fast)]",
              "hover:bg-[var(--color-hover)] hover:text-[color:var(--color-text-primary)]",
              disabled && "pointer-events-none"
            )}
            aria-label={openCalendarLabel}
          >
            <CalendarDays className="size-[var(--icon-size-md)]" />
          </button>
        </div>

        {helpText ? (
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
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <div
            className={cn(
              "group relative flex h-[var(--size-14)] w-full items-center gap-[var(--space-2)] rounded-[var(--radius-scale-xl)] border px-[var(--space-3)]",
              fieldTransitionClass,
              variant === "outline"
                ? cn(
                    "border-[var(--color-border-interactive)] bg-[var(--color-bg-surface)]",
                    (focused || open) && "border-2 border-[var(--color-border-focus)]"
                  )
                : cn(
                    focused || open
                      ? "border-[var(--color-border-focus)] bg-[var(--color-bg-surface)]"
                      : "border-transparent bg-[var(--color-hover)] hover:bg-[var(--color-pressed)]"
                  ),
              error && "border-[var(--color-danger)]",
              disabled && "cursor-not-allowed opacity-[var(--disabled-opacity)]"
            )}
          >
            <div className="relative flex-1 h-full px-1">
              <input
                id={inputId}
                name={name}
                type="text"
                inputMode="numeric"
                value={inputValue}
                disabled={disabled}
                autoComplete={autoComplete}
                placeholder=""
                className={cn(inputFieldClass, "pt-[var(--space-5)] pb-[var(--space-1)]")}
                onChange={handleInputChange}
                onFocus={() => setFocused(true)}
                onBlur={handleBlur}
              />
              <label
                className={cn(
                  "absolute left-1 pointer-events-none select-none transition-all duration-200 ease-out",
                  hasValue || focused || open
                    ? `top-1 -translate-y-0 ${floatingLabelCompactClass}`
                    : `top-1/2 -translate-y-1/2 ${floatingLabelIdleClass}`,
                  error
                    ? "text-[color:var(--color-danger)]"
                    : focused || open
                      ? "text-[color:var(--color-border-focus)]"
                      : hasValue
                        ? "text-[color:var(--color-text-secondary)]"
                        : "text-[color:var(--color-text-secondary)]"
                )}
              >
                {label}
              </label>
              {!hasValue && (focused || open) ? (
                <span
                  className={cn(
                    "pointer-events-none absolute bottom-[var(--space-1)] left-1 select-none",
                    fieldBodyLgClass,
                    "text-[color:var(--color-text-muted)]"
                  )}
                >
                  {visualPlaceholder}
                </span>
              ) : null}
            </div>

            {clearable && hasValue && !disabled ? (
              <button
                type="button"
                onPointerDown={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
                onMouseDown={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
                onClick={handleClear}
                className={cn(fieldClearActionClass, fieldClearActionVisibleClass)}
                aria-label={clearDateLabel}
              >
                <X className="size-[var(--icon-size-sm)]" />
              </button>
            ) : null}

            <button
              type="button"
              disabled={disabled}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => setOpen((previous) => !previous)}
              className={cn(
                "inline-flex shrink-0 items-center justify-center rounded-[var(--radius-control-pill)] p-0.5",
                "text-[color:var(--color-text-secondary)] transition-colors duration-[var(--transition-fast)]",
                "hover:bg-[var(--color-hover)] hover:text-[color:var(--color-text-primary)]",
                disabled && "pointer-events-none"
              )}
              aria-label={openCalendarLabel}
            >
              <CalendarDays className="size-[var(--icon-size-md)]" />
            </button>
          </div>
        </PopoverAnchor>

        <PopoverContent
          align="start"
          sideOffset={8}
          className="w-auto p-0 [backdrop-filter:blur(calc(var(--space-4)+var(--space-2)))_var(--overlay-glass-saturate)]"
          container={portalContainer}
        >
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleSelect}
            weekStartsOn={getWeekStart(calendarProps?.weekStartsOn)}
            {...calendarProps}
          />
        </PopoverContent>
      </Popover>

      {helpText ? (
        <p
          className={cn(
            fieldDescriptionClass,
            error ? "text-[color:var(--color-danger)]" : "text-[color:var(--color-text-secondary)]"
          )}
        >
          {helpText}
        </p>
      ) : null}
    </div>
  );
}

FloatingDateField.displayName = "FloatingDateField";

export { FloatingDateField };
