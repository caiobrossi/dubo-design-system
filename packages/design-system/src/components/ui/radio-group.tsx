"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "dubo-design-system/lib/utils";

/**
 * Dubo Design System — RadioGroup
 *
 * Built on @radix-ui/react-radio-group.
 * Follows the shared field-selection semantics used across Dubo form controls.
 *
 * Shared tokens:
 *   --color-border-input (unchecked border)
 *   --color-border-active (checked/hover border)
 *   --color-bg-active (checked inner dot)
 *   --color-danger (invalid state)
 *   --type-body-md-* + --font-weight-400 / --label-* / --description-*
 *   --disabled-opacity, --focus-ring, --transition-fast
 */

/* ── RadioGroup Root ── */

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
> {
  /** Group label */
  label?: React.ReactNode;
  /** Helper/description text below the group */
  helpText?: React.ReactNode;
  /** Whether the group is in an error state */
  error?: boolean;
  /** Error message displayed when error is true */
  errorMessage?: string;
  /** Horizontal layout for radio items */
  horizontal?: boolean;
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(
  (
    {
      className,
      label,
      helpText,
      error = false,
      errorMessage,
      horizontal = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("flex flex-col gap-[var(--space-2)]", className)}>
        {label && (
          <span className="text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
            {label}
          </span>
        )}
        <RadioGroupPrimitive.Root
          ref={ref}
          className={cn(
            "flex gap-[var(--space-2)]",
            horizontal
              ? "flex-row flex-wrap items-start gap-x-[var(--space-6)]"
              : "flex-col items-start"
          )}
          {...props}
        >
          {children}
        </RadioGroupPrimitive.Root>
        {helpText && !error && (
          <p className="text-body-sm [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
            {helpText}
          </p>
        )}
        {error && errorMessage && (
          <p className="text-body-sm [font-weight:var(--font-weight-400)] text-[color:var(--color-danger)]">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

/* ── RadioGroupItem ── */

export interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Item
> {
  /** Label text displayed next to the radio */
  label?: React.ReactNode;
  /** Description text displayed below the label */
  description?: React.ReactNode;
  /** Whether the radio is in an invalid/error state */
  invalid?: boolean;
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, label, description, invalid = false, id, disabled, ...props }, ref) => {
  const generatedId = React.useId();
  const radioId = id ?? generatedId;
  const descriptionId = description ? `${radioId}-description` : undefined;

  return (
    <div className="flex items-start gap-[var(--space-3)]">
      <RadioGroupPrimitive.Item
        ref={ref}
        id={radioId}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        aria-describedby={descriptionId}
        className={cn(
          "peer inline-flex shrink-0 items-center justify-center",
          "size-[var(--size-5)]",
          "rounded-full",
          "border",
          "border-[var(--color-border-interactive)]",
          "bg-[var(--color-bg-surface)]",
          /* Transition */
          "transition-all duration-[var(--transition-fast)]",
          "[transition-timing-function:var(--transition-easing)]",
          /* Hover */
          "hover:border-[var(--color-border-active)]",
          /* Focus */
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-[var(--focus-ring)]",
          "focus-visible:ring-offset-[var(--focus-ring-offset)]",
          /* Checked */
          "data-[state=checked]:border-[var(--color-border-active)]",
          /* Invalid */
          invalid && "border-[var(--color-danger)]",
          /* Disabled */
          "disabled:cursor-not-allowed",
          "disabled:opacity-[var(--disabled-opacity)]",
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <div className="size-[var(--space-2)] rounded-full bg-[var(--color-bg-active)]" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>

      {(label || description) && (
        <div className="flex flex-col gap-[var(--space-1)]">
          {label && (
            <label
              htmlFor={radioId}
              className={cn(
                "cursor-pointer select-none",
                "text-body-md",
                "[font-weight:var(--font-weight-400)]",
                "text-[color:var(--color-text-primary)]",
                "peer-disabled:cursor-not-allowed",
                "peer-disabled:opacity-[var(--disabled-opacity)]"
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p
              id={descriptionId}
              className="text-body-sm [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]"
            >
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
