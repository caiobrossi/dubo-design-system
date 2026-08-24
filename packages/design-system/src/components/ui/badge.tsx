"use client";

import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "dubo-design-system/lib/utils";
import { useDesignSystemLabel } from "dubo-design-system/lib/labels";

const SIZE_CONFIG = {
  sm: {
    height: "20px",
    fontSize: "var(--type-body-sm-size)",
    iconSize: "16px",
    avatarSize: "16px",
    closeSize: "16px",
  },
  default: {
    height: "24px",
    fontSize: "var(--type-body-md-size)",
    iconSize: "16px",
    avatarSize: "18px",
    closeSize: "16px",
  },
} as const;

const BADGE_TOKEN_FAMILIES = {
  success: "success",
  error: "danger",
  warning: "warning",
  info1: "info1",
  info2: "info2",
  info3: "info3",
} as const;

const badgeVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap select-none",
    "rounded-full",
    "gap-1",
    "border border-transparent",
    "[font-weight:var(--font-weight-400)]",
    "transition-colors duration-[var(--transition-fast)]",
    "[transition-timing-function:var(--transition-easing)]",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        success: "",
        error: "",
        warning: "",
        info1: "",
        info2: "",
        info3: "",
      },
      intensity: {
        soft: "",
        strong: "",
      },
      size: {
        sm: "",
        default: "",
      },
    },
    defaultVariants: {
      variant: "info1",
      intensity: "soft",
      size: "default",
    },
  }
);

function getBadgeVisualStyles(
  variant: NonNullable<BadgeProps["variant"]>,
  intensity: NonNullable<BadgeProps["intensity"]>
): React.CSSProperties {
  const family = BADGE_TOKEN_FAMILIES[variant];
  const bgToken = `var(--badge-${family}-${intensity}-bg)`;
  const borderToken = `var(--badge-${family}-${intensity}-border)`;
  const textToken = `var(--badge-${family}-${intensity}-text)`;

  return {
    backgroundColor: bgToken,
    borderColor: borderToken,
    borderWidth: "0.5px",
    color: textToken,
    boxShadow: `0px 1px 2px 0px rgb(0 0 0 / 0.05), inset 0px 0px 0px 0.5px ${borderToken}`,
  };
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  avatar?: React.ReactNode;
  onClose?: () => void;
  loading?: boolean;
}

const Badge = React.forwardRef<HTMLElement, BadgeProps>(function Badge(
  {
    className,
    variant,
    intensity,
    size = "default",
    asChild = false,
    avatar,
    onClose,
    loading = false,
    children,
    style,
    ...props
  },
  ref
) {
  const Comp = asChild ? Slot : "span";
  const removeLabel = useDesignSystemLabel("remove");
  const config = SIZE_CONFIG[size ?? "default"];
  const hasAvatar = Boolean(avatar);
  const resolvedVariant = variant ?? "info1";
  const resolvedIntensity = intensity ?? "soft";
  const visualStyles = getBadgeVisualStyles(resolvedVariant, resolvedIntensity);

  return (
    <Comp
      ref={ref as React.Ref<HTMLSpanElement>}
      className={cn(
        badgeVariants({ variant: resolvedVariant, intensity: resolvedIntensity, size }),
        className
      )}
      style={{
        height: config.height,
        paddingLeft: hasAvatar ? "2px" : "8px",
        paddingRight: onClose ? "2px" : "8px",
        fontSize: config.fontSize,
        ...visualStyles,
        ...style,
      }}
      {...props}
    >
      {avatar ? (
        <span
          className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full"
          style={{ width: config.avatarSize, height: config.avatarSize }}
        >
          {avatar}
        </span>
      ) : null}
      {loading ? (
        <svg
          className="animate-spin"
          style={{ width: config.iconSize, height: config.iconSize }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : null}
      <Slottable>{children}</Slottable>
      {onClose ? (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          className="inline-flex shrink-0 items-center justify-center rounded-full border border-transparent opacity-80 transition-all hover:bg-[var(--color-hover)] hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-1"
          style={{ width: config.closeSize, height: config.closeSize }}
          aria-label={removeLabel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      ) : null}
    </Comp>
  );
});

Badge.displayName = "Badge";

export { Badge, badgeVariants };
export type { BadgeProps as BadgeComponentProps };
