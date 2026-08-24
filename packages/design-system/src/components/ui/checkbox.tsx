"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "dubo-design-system/lib/utils";

/**
 * Dubo Design System — Checkbox
 *
 * Built on @radix-ui/react-checkbox.
 * Supports: checked, unchecked, indeterminate, disabled, invalid states.
 * Includes CheckboxGroup for grouping with label and error.
 *
 * Uses shared semantic tokens — no checkbox-specific design token family:
 *   --color-border-input (unchecked border)
 *   --color-border-active (hover border)
 *   --color-bg-active (checked bg)
 *   --color-bg-active-hover (checked hover bg)
 *   --color-text-on-brand (checkmark color)
 *   --color-danger (invalid state)
 *   --color-text-primary, --color-text-secondary (labels)
 *   --disabled-opacity, --focus-ring, --transition-fast (shared)
 *
 * Sizes use primitives/shared roles directly: 20px box, 6px radius, 1px border.
 */

/* ── Checkbox ── */

export interface CheckboxProps extends React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  invalid?: boolean;
  errorMessage?: string;
}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  (
    { className, label, description, invalid = false, errorMessage, id, disabled, ...props },
    ref
  ) => {
    const generatedId = React.useId();
    const checkboxId = id ?? generatedId;
    const descriptionId = description ? `${checkboxId}-description` : undefined;
    const errorId = invalid && errorMessage ? `${checkboxId}-error` : undefined;

    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-3">
          <CheckboxPrimitive.Root
            ref={ref}
            id={checkboxId}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            aria-describedby={[descriptionId, errorId].filter(Boolean).join(" ") || undefined}
            className={cn(
              /* Base box — 20px, 6px radius, 1px border */
              "peer inline-flex shrink-0 items-center justify-center",
              "size-5" /* 20px */,
              "rounded-[var(--radius-scale-sm)]",
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
              "data-[state=checked]:bg-[var(--color-bg-active)]",
              "data-[state=checked]:border-[var(--color-border-active)]",
              "data-[state=checked]:hover:bg-[var(--color-bg-active-hover)]",
              "data-[state=checked]:hover:border-[var(--color-bg-active-hover)]",
              /* Indeterminate */
              "data-[state=indeterminate]:bg-[var(--color-bg-active)]",
              "data-[state=indeterminate]:border-[var(--color-border-active)]",
              /* Invalid */
              invalid && "border-[var(--color-danger)]",
              invalid && "data-[state=unchecked]:border-[var(--color-danger)]",
              /* Disabled */
              "disabled:cursor-not-allowed",
              "disabled:opacity-[var(--disabled-opacity)]",
              className
            )}
            {...props}
          >
            <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
              <CheckmarkIcon checked={props.checked} className="size-3" /* 12px — ~65% of 20px */ />
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>

          {(label || description) && (
            <div className="flex flex-col gap-1">
              {label && (
                <label
                  htmlFor={checkboxId}
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

        {invalid && errorMessage && (
          <p
            id={errorId}
            className="text-body-sm [font-weight:var(--font-weight-400)] text-[color:var(--color-danger)]"
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

/* ── CheckboxGroup ── */

export interface CheckboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  helpText?: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
  horizontal?: boolean;
}

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      label,
      helpText,
      error = false,
      errorMessage,
      horizontal = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="group"
        aria-label={typeof label === "string" ? label : undefined}
        className={cn("flex flex-col gap-2", className)}
        {...props}
      >
        {label && (
          <span className="text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
            {label}
          </span>
        )}
        {children && (
          <div
            className={cn(
              "flex gap-2",
              horizontal ? "flex-row flex-wrap items-start gap-x-6" : "flex-col items-start"
            )}
          >
            {children}
          </div>
        )}
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

CheckboxGroup.displayName = "CheckboxGroup";

/* ── Icons ── */

function CheckmarkIcon({
  checked,
  className,
}: {
  checked?: boolean | "indeterminate";
  className?: string;
}) {
  if (checked === "indeterminate") {
    return <MinusIcon className={className} />;
  }
  return <CheckIcon className={className} />;
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 3L4.5 8.5L2 6"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 6H9.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export { Checkbox, CheckboxGroup, CheckIcon, MinusIcon };
