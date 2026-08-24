"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "dubo-design-system/lib/utils";
import { useDesignSystemLabel } from "dubo-design-system/lib/labels";
import { X } from "dubo-design-system/lib/icons";
import {
  fieldBodyLgClass,
  fieldClearActionClass,
  fieldClearActionVisibleClass,
  fieldDescriptionClass,
  fieldOpenFilledVariantClass,
  fieldOpenOutlineVariantClass,
  fieldTransitionClass,
  floatingLabelCompactClass,
  floatingLabelIdleClass,
} from "dubo-design-system/components/ui/field-styles";

const floatingFieldTriggerVariants = cva(
  [
    "group relative flex min-w-0 w-full items-center",
    "rounded-[var(--radius-scale-xl)]",
    "border",
    "px-[var(--space-2)] gap-[var(--space-1)]",
    fieldTransitionClass,
    "text-left",
  ].join(" "),
  {
    variants: {
      variant: {
        outline: fieldOpenOutlineVariantClass,
        filled: fieldOpenFilledVariantClass,
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
);

export interface FloatingFieldTriggerProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof floatingFieldTriggerVariants> {
  label: React.ReactNode;
  helpText?: React.ReactNode;
  error?: boolean;
  open?: boolean;
  hasValue?: boolean;
  disabled?: boolean;
  triggerIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  children?: React.ReactNode;
  valueContainerClassName?: string;
  valueClassName?: string;
  multiline?: boolean;
}

const FloatingFieldTrigger = React.forwardRef<HTMLDivElement, FloatingFieldTriggerProps>(
  (
    {
      className,
      variant,
      label,
      helpText,
      error = false,
      open = false,
      hasValue = false,
      disabled = false,
      triggerIcon,
      clearable = false,
      onClear,
      children,
      onClick,
      onKeyDown,
      valueContainerClassName,
      valueClassName,
      multiline = false,
      tabIndex,
      ...props
    },
    ref
  ) => {
    const isFloating = open || hasValue;
    const clearLabel = useDesignSystemLabel("clear");

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        onKeyDown?.(event);

        if (event.defaultPrevented || disabled) return;

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick?.(event as unknown as React.MouseEvent<HTMLDivElement>);
        }
      },
      [disabled, onClick, onKeyDown]
    );

    const handleClear = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        onClear?.();
      },
      [onClear]
    );

    return (
      <div className="flex flex-col gap-1.5">
        <div
          ref={ref}
          role="button"
          tabIndex={disabled ? -1 : (tabIndex ?? 0)}
          data-state={open ? "open" : "closed"}
          aria-expanded={open}
          aria-disabled={disabled || undefined}
          onClick={disabled ? undefined : onClick}
          onKeyDown={handleKeyDown}
          className={cn(
            floatingFieldTriggerVariants({ variant }),
            multiline
              ? "h-auto min-h-[var(--size-14)] items-start py-[var(--space-1)]"
              : "h-[var(--size-14)]",
            "cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-[var(--focus-ring)]",
            disabled && "cursor-not-allowed opacity-[var(--disabled-opacity)]",
            error &&
              "border-[var(--color-danger)] data-[state=open]:border-[var(--color-danger)] focus-visible:ring-[var(--color-danger)]",
            className
          )}
          {...props}
        >
          <div
            className={cn(
              "relative flex min-w-0 flex-1 px-1",
              multiline
                ? "min-h-[calc(var(--size-14)-var(--space-2))] items-start"
                : "h-full items-center",
              valueContainerClassName
            )}
          >
            <span
              className={cn(
                "pointer-events-none absolute left-1 max-w-full truncate select-none transition-all duration-200 ease-out",
                isFloating
                  ? `top-1 -translate-y-0 ${floatingLabelCompactClass}`
                  : `top-1/2 -translate-y-1/2 ${floatingLabelIdleClass}`,
                open
                  ? "text-[color:var(--color-border-focus)]"
                  : "text-[color:var(--color-text-secondary)]"
              )}
            >
              {label}
            </span>

            {children ? (
              <div
                className={cn(
                  "w-full min-w-0 text-left text-[color:var(--color-text-primary)]",
                  fieldBodyLgClass,
                  isFloating ? "pt-[var(--space-5)] pb-[var(--space-1)]" : "opacity-0",
                  multiline
                    ? "whitespace-normal break-words"
                    : "truncate [&>span]:block [&>span]:truncate",
                  valueClassName
                )}
              >
                {children}
              </div>
            ) : (
              <span
                aria-hidden="true"
                className={cn(
                  "opacity-0",
                  fieldBodyLgClass,
                  isFloating ? "pt-[var(--space-5)] pb-[var(--space-1)]" : "h-0"
                )}
              >
                &nbsp;
              </span>
            )}
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
              aria-label={clearLabel}
            >
              <X className="size-[var(--icon-size-sm)]" />
            </button>
          ) : null}

          {triggerIcon ? <div className="pointer-events-none shrink-0">{triggerIcon}</div> : null}
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
);

FloatingFieldTrigger.displayName = "FloatingFieldTrigger";

export { FloatingFieldTrigger };
