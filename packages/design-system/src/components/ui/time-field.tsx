"use client";

import * as React from "react";
import { Clock3, X } from "dubo-design-system/lib/icons";
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
import { Popover, PopoverAnchor, PopoverContent } from "./popover";
import { useMobileNativeControl } from "./mobile-native-control";
import { ScrollArea } from "./scroll-area";

type TimeFieldVariant = "outline" | "filled";

export interface FloatingTimeFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  label: string;
  variant?: TimeFieldVariant;
  clearable?: boolean;
  error?: boolean;
  helpText?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  minuteStep?: number;
  portalContainer?: HTMLElement | null;
}

const inputFieldClass = [
  "h-full w-full min-w-0 flex-1 border-none bg-transparent outline-none",
  "placeholder:text-transparent",
  "focus:outline-none focus:ring-0",
  "disabled:cursor-not-allowed",
  fieldBodyLgClass,
  "text-[color:var(--color-text-primary)]",
].join(" ");

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function normalizeTimeDigits(input: string) {
  return input.replace(/\D/g, "").slice(0, 4);
}

function formatTimeFromDigits(input: string) {
  const digits = normalizeTimeDigits(input);
  if (!digits) return "";
  if (digits.length === 1) return digits;

  const hours = String(clamp(Number.parseInt(digits.slice(0, 2), 10), 0, 23)).padStart(2, "0");
  if (digits.length === 2) return hours;
  if (digits.length === 3) return `${hours}:${digits.slice(2)}`;

  const minutes = String(clamp(Number.parseInt(digits.slice(2, 4), 10), 0, 59)).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function completeTimeValue(input: string) {
  const digits = normalizeTimeDigits(input);
  if (!digits) return "";

  if (digits.length === 1) {
    return `0${digits}:00`;
  }

  const hours = String(clamp(Number.parseInt(digits.slice(0, 2), 10), 0, 23)).padStart(2, "0");
  if (digits.length === 2) {
    return `${hours}:00`;
  }

  const partialMinutes = digits.slice(2, 4);
  const minutes =
    partialMinutes.length === 1
      ? `${partialMinutes}0`
      : String(clamp(Number.parseInt(partialMinutes, 10), 0, 59)).padStart(2, "0");

  return `${hours}:${minutes}`;
}

function isValidTime(value: string) {
  if (!/^\d{2}:\d{2}$/.test(value)) return false;
  const [hours, minutes] = value.split(":").map(Number);
  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}

function parseTimeParts(value?: string) {
  if (!value || !isValidTime(value)) {
    return { hours: 0, minutes: 0 };
  }

  const [hours, minutes] = value.split(":").map(Number);
  return { hours, minutes };
}

function formatTimeParts(hours: number, minutes: number) {
  return `${String(clamp(hours, 0, 23)).padStart(2, "0")}:${String(clamp(minutes, 0, 59)).padStart(2, "0")}`;
}

export const timeFieldHelpers = {
  completeTimeValue,
  formatTimeFromDigits,
  formatTimeParts,
  isValidTime,
};

function FloatingTimeField({
  value = "",
  onChange,
  label,
  variant = "filled",
  clearable = false,
  error = false,
  helpText,
  disabled = false,
  className,
  minuteStep = 5,
  portalContainer,
}: FloatingTimeFieldProps) {
  const useNativeControl = useMobileNativeControl();
  const clearTimeLabel = useDesignSystemLabel("clearTime");
  const openTimePickerLabel = useDesignSystemLabel("openTimePicker");
  const [open, setOpen] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);

  React.useEffect(() => {
    if (!focused) {
      setInputValue(value);
    }
  }, [value, focused]);

  const hasValue = inputValue.trim() !== "";
  const step = Math.max(1, Math.min(minuteStep, 30));
  const hours = React.useMemo(() => Array.from({ length: 24 }, (_, index) => index), []);
  const minutes = React.useMemo(
    () => Array.from({ length: Math.ceil(60 / step) }, (_, index) => Math.min(index * step, 59)),
    [step]
  );

  const currentParts = parseTimeParts(isValidTime(inputValue) ? inputValue : value);

  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatTimeFromDigits(event.target.value);
      setInputValue(formatted);

      if (formatted.length === 5 && isValidTime(formatted)) {
        onChange?.(formatted);
      }
    },
    [onChange]
  );

  const handleBlur = React.useCallback(() => {
    setFocused(false);
    const completed = completeTimeValue(inputValue);
    if (!completed) {
      setInputValue("");
      onChange?.("");
      return;
    }

    if (isValidTime(completed)) {
      setInputValue(completed);
      onChange?.(completed);
      return;
    }

    setInputValue(value);
  }, [inputValue, onChange, value]);

  const handleClear = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      setInputValue("");
      onChange?.("");
    },
    [onChange]
  );

  const selectHour = React.useCallback(
    (hoursValue: number) => {
      const nextValue = formatTimeParts(hoursValue, currentParts.minutes);
      setInputValue(nextValue);
      onChange?.(nextValue);
    },
    [currentParts.minutes, onChange]
  );

  const selectMinute = React.useCallback(
    (minutesValue: number) => {
      const nextValue = formatTimeParts(currentParts.hours, minutesValue);
      setInputValue(nextValue);
      onChange?.(nextValue);
      setOpen(false);
    },
    [currentParts.hours, onChange]
  );

  if (useNativeControl) {
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
              type="time"
              value={value}
              disabled={disabled}
              step={Math.max(1, Math.min(minuteStep, 30)) * 60}
              className={cn(
                inputFieldClass,
                "pt-[var(--space-5)] pb-[var(--space-1)]",
                value ? "text-[color:var(--color-text-primary)]" : "text-transparent"
              )}
              aria-label={label}
              onChange={(event) => onChange?.(event.target.value)}
            />
            <label
              className={cn(
                "absolute left-1 pointer-events-none select-none transition-all duration-200 ease-out",
                value
                  ? `top-1 -translate-y-0 ${floatingLabelCompactClass}`
                  : `top-1/2 -translate-y-1/2 ${floatingLabelIdleClass}`,
                error
                  ? "text-[color:var(--color-danger)]"
                  : "text-[color:var(--color-text-secondary)]"
              )}
            >
              {label}
            </label>
          </div>

          {clearable && value && !disabled ? (
            <button
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={handleClear}
              className={cn(fieldClearActionClass, fieldClearActionVisibleClass)}
              aria-label={clearTimeLabel}
            >
              <X className="size-[var(--icon-size-sm)]" />
            </button>
          ) : null}
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
                type="text"
                inputMode="numeric"
                value={inputValue}
                disabled={disabled}
                placeholder="00:00"
                className={cn(
                  inputFieldClass,
                  "pt-[var(--space-5)] pb-[var(--space-1)]",
                  !focused && !hasValue && "placeholder:text-transparent"
                )}
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
                    : hasValue || focused || open
                      ? "text-[color:var(--color-text-secondary)]"
                      : "text-[color:var(--color-text-muted)]"
                )}
              >
                {label}
              </label>
            </div>

            {clearable && hasValue && !disabled ? (
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={handleClear}
                className={cn(fieldClearActionClass, fieldClearActionVisibleClass)}
                aria-label={clearTimeLabel}
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
              aria-label={openTimePickerLabel}
            >
              <Clock3 className="size-[var(--icon-size-md)]" />
            </button>
          </div>
        </PopoverAnchor>

        <PopoverContent
          align="start"
          sideOffset={8}
          className="w-[240px] p-[var(--space-3)]"
          container={portalContainer}
        >
          <div className="grid grid-cols-2 gap-[var(--space-3)]">
            <div className="flex flex-col gap-[var(--space-2)]">
              <span className="text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
                Hora
              </span>
              <ScrollArea className="h-48 rounded-[var(--radius-scale-xl)] bg-[var(--color-bg-surface)]">
                <div className="flex flex-col gap-1 p-1">
                  {hours.map((hour) => {
                    const selected = currentParts.hours === hour;
                    return (
                      <button
                        key={hour}
                        type="button"
                        onClick={() => selectHour(hour)}
                        className={cn(
                          "rounded-[var(--radius-scale-lg)] px-[var(--space-3)] py-[var(--space-2)] text-center",
                          fieldBodyLgClass,
                          fieldTransitionClass,
                          selected
                            ? "bg-[var(--color-brand)] text-[color:var(--color-text-on-brand)]"
                            : "text-[color:var(--color-text-primary)] hover:bg-[var(--color-hover)]"
                        )}
                      >
                        {String(hour).padStart(2, "0")}
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>

            <div className="flex flex-col gap-[var(--space-2)]">
              <span className="text-body-sm [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
                Min
              </span>
              <ScrollArea className="h-48 rounded-[var(--radius-scale-xl)] bg-[var(--color-bg-surface)]">
                <div className="flex flex-col gap-1 p-1">
                  {minutes.map((minute) => {
                    const selected = currentParts.minutes === minute;
                    return (
                      <button
                        key={minute}
                        type="button"
                        onClick={() => selectMinute(minute)}
                        className={cn(
                          "rounded-[var(--radius-scale-lg)] px-[var(--space-3)] py-[var(--space-2)] text-center",
                          fieldBodyLgClass,
                          fieldTransitionClass,
                          selected
                            ? "bg-[var(--color-brand)] text-[color:var(--color-text-on-brand)]"
                            : "text-[color:var(--color-text-primary)] hover:bg-[var(--color-hover)]"
                        )}
                      >
                        {String(minute).padStart(2, "0")}
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          </div>
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

FloatingTimeField.displayName = "FloatingTimeField";

export { FloatingTimeField };
