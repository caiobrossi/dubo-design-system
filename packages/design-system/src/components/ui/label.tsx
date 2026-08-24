"use client";

import * as React from "react";
import { Info } from "dubo-design-system/lib/icons";
import { cn } from "dubo-design-system/lib/utils";

/**
 * Dubo Design System — Label
 *
 * Reusable form label with support for:
 * - Required indicator (red asterisk *)
 * - Optional indicator ("(optional)" text)
 * - Info icon with tooltip
 * - Description/subtext below the label
 *
 * Uses shared semantic typography roles and semantic text colors:
 *   --type-body-md-* + --font-weight-400 (label role)
 *   --color-text-primary
 *   --color-danger
 *   --color-text-muted / --color-text-secondary
 *   --type-body-sm-* + --font-weight-400 (helper role)
 *   --color-text-secondary
 */

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Shows red asterisk (*) after label text */
  required?: boolean;
  /** Shows "(optional)" text after label text */
  optional?: boolean;
  /** Info icon — string for tooltip text, or ReactNode for custom content */
  info?: string | React.ReactNode;
  /** Description/subtext below the label */
  description?: React.ReactNode;
  /** Reduces opacity when disabled */
  disabled?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      className,
      children,
      required = false,
      optional = false,
      info,
      description,
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("flex flex-col gap-1", disabled && "opacity-[var(--disabled-opacity)]")}>
        <label
          ref={ref}
          className={cn(
            "inline-flex items-center gap-1.5 select-none",
            "text-body-md",
            "[font-weight:var(--font-weight-400)]",
            "text-[color:var(--color-text-primary)]",
            disabled && "cursor-not-allowed",
            !disabled && "cursor-pointer",
            className
          )}
          {...props}
        >
          {/* Label text */}
          <span>{children}</span>

          {/* Required asterisk */}
          {required && (
            <span className="text-[color:var(--color-danger)]" aria-hidden="true">
              *
            </span>
          )}

          {/* Optional text */}
          {optional && !required && (
            <span className="text-body-sm [font-weight:var(--font-weight-400)] text-[color:var(--color-text-muted)]">
              (optional)
            </span>
          )}

          {/* Info icon */}
          {info && (
            <span
              className={cn(
                "inline-flex items-center",
                "text-[color:var(--color-text-muted)]",
                "transition-colors duration-[var(--transition-fast)]",
                "hover:text-[color:var(--color-text-secondary)]"
              )}
              title={typeof info === "string" ? info : undefined}
            >
              {typeof info === "string" ? <Info className="size-3.5" /> : info}
            </span>
          )}
        </label>

        {/* Description */}
        {description && (
          <p
            className={cn(
              "text-body-sm",
              "[font-weight:var(--font-weight-400)]",
              "text-[color:var(--color-text-secondary)]"
            )}
          >
            {description}
          </p>
        )}
      </div>
    );
  }
);

Label.displayName = "Label";

export { Label };
