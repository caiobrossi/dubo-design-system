"use client";

import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@dubo/design-system-shared/lib/utils";
import { Spinner } from "@dubo/design-system-shared/components/ui/spinner";

type LegacyButtonVariant =
  | "brand-primary"
  | "brand-secondary"
  | "brand-tertiary"
  | "neutral-primary"
  | "neutral-secondary"
  | "neutral-tertiary"
  | "destructive-primary"
  | "destructive-secondary"
  | "destructive-tertiary"
  | "inverse"
  | "success";

type LegacyButtonSize = "small" | "medium" | "large";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap select-none",
    "gap-2",
    "transition-all",
    "duration-[var(--transition-fast)]",
    "[transition-timing-function:var(--transition-easing)]",
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-[var(--focus-ring)]",
    "focus-visible:ring-offset-[var(--focus-ring-offset)]",
    "disabled:pointer-events-none disabled:opacity-[var(--disabled-opacity)]",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--color-brand-hover)] text-[color:var(--color-text-on-brand)]",
          "shadow-[var(--btn-primary-shadow)]",
          "hover:bg-[var(--color-brand)]",
          "hover:shadow-[var(--btn-primary-shadow-hover)]",
          "hover:scale-[var(--btn-primary-scale-hover)]",
          "active:bg-[var(--color-brand-active)]",
          "active:scale-[var(--btn-primary-scale-active)]",
          "active:shadow-[var(--btn-primary-shadow)]",
        ].join(" "),
        secondary: [
          "bg-[var(--color-hover)] text-[color:var(--color-text-primary)]",
          "border border-[var(--color-hover)]",
          "hover:bg-[var(--color-pressed)] hover:border-[var(--color-pressed)]",
          "active:bg-[var(--color-pressed)] active:border-[var(--color-pressed)]",
          "active:translate-y-px",
        ].join(" "),
        outline: [
          "bg-transparent text-[color:var(--color-text-primary)]",
          "border border-[var(--color-border-interactive)]",
          "hover:bg-[var(--color-hover)]",
          "hover:border-[var(--color-border-interactive)]",
          "active:bg-[var(--color-pressed)]",
          "active:translate-y-px",
        ].join(" "),
        ghost: [
          "bg-transparent text-[color:var(--color-text-secondary)]",
          "hover:bg-[var(--color-hover)]",
          "hover:text-[color:var(--color-text-primary)]",
          "active:bg-[var(--color-pressed)]",
          "active:translate-y-px",
        ].join(" "),
        destructive: [
          "bg-[var(--color-danger)] text-[color:var(--color-on-dark)]",
          "shadow-[var(--btn-destructive-shadow)]",
          "hover:bg-[var(--status-danger-strong-border-accent)]",
          "active:bg-[var(--status-danger-strong-border-accent)]",
          "active:translate-y-px",
        ].join(" "),
        link: [
          "bg-transparent text-[color:var(--color-brand)] underline-offset-4",
          "hover:underline",
          "active:text-[color:var(--color-brand-active)]",
        ].join(" "),
      },
      size: {
        sm: "h-[var(--height-control-sm)] px-[var(--space-3)] text-body-md [font-weight:var(--font-weight-400)] [&_svg]:size-[var(--icon-size-sm)]",
        default:
          "h-[var(--height-control-md)] px-[var(--space-4)] text-body-md [font-weight:var(--font-weight-400)] [&_svg]:size-[var(--icon-size-md)]",
        lg: "h-[var(--height-control-lg)] px-[var(--space-5)] text-body-md [font-weight:var(--font-weight-400)] [&_svg]:size-[var(--icon-size-lg)]",
        icon: "size-[var(--height-control-md)] shrink-0 self-center p-0 [&_svg]:size-[var(--icon-size-md)]",
        "icon-sm":
          "size-[var(--height-control-sm)] shrink-0 self-center p-0 [&_svg]:size-[var(--icon-size-sm)]",
        "icon-lg":
          "size-[var(--height-control-lg)] shrink-0 self-center p-0 [&_svg]:size-[var(--icon-size-lg)]",
      },
      rounded: {
        true: "rounded-full",
        false: "rounded-[var(--radius-control-soft)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: true,
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  rounded?: VariantProps<typeof buttonVariants>["rounded"];
  variant?: VariantProps<typeof buttonVariants>["variant"] | LegacyButtonVariant;
  size?: VariantProps<typeof buttonVariants>["size"] | LegacyButtonSize;
}

export interface IconButtonProps extends Omit<ButtonProps, "children" | "iconRight" | "asChild"> {
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

function mapLegacyVariant(
  variant: ButtonProps["variant"]
): VariantProps<typeof buttonVariants>["variant"] {
  switch (variant) {
    case "brand-primary":
      return "default";
    case "brand-secondary":
      return "secondary";
    case "brand-tertiary":
      return "ghost";
    case "neutral-primary":
      return "secondary";
    case "neutral-secondary":
      return "outline";
    case "neutral-tertiary":
      return "ghost";
    case "destructive-primary":
      return "destructive";
    case "destructive-secondary":
      return "outline";
    case "destructive-tertiary":
      return "ghost";
    case "inverse":
    case "success":
      return "secondary";
    default:
      return variant;
  }
}

function mapLegacySize(
  size: ButtonProps["size"],
  options?: { icon?: boolean }
): VariantProps<typeof buttonVariants>["size"] {
  if (
    size === "sm" ||
    size === "default" ||
    size === "lg" ||
    size === "icon" ||
    size === "icon-sm" ||
    size === "icon-lg"
  ) {
    return size;
  }

  if (options?.icon) {
    switch (size) {
      case "small":
        return "icon-sm";
      case "large":
        return "icon-lg";
      default:
        return "icon";
    }
  }

  switch (size) {
    case "small":
      return "sm";
    case "large":
      return "lg";
    default:
      return "default";
  }
}

function getLegacyVariantClassName(variant: ButtonProps["variant"]) {
  switch (variant) {
    case "brand-tertiary":
      return "text-[color:var(--color-brand)] hover:text-[color:var(--color-brand-hover)]";
    case "neutral-primary":
      return "border-transparent";
    case "neutral-secondary":
      return "bg-[var(--color-bg-surface)]";
    case "destructive-secondary":
      return "border-[var(--color-danger-border)] text-[color:var(--color-danger)] hover:bg-[var(--color-danger-subtle)]";
    case "destructive-tertiary":
      return "border-transparent text-[color:var(--color-danger)] hover:bg-[var(--color-danger-subtle)]";
    case "inverse":
      return "border-white/10 bg-white/10 text-white hover:bg-white/20 hover:text-white active:bg-white/15";
    case "success":
      return "border-[var(--status-success-subtle-bg)] bg-[var(--status-success-subtle-bg)] text-[color:var(--status-success-subtle-text)] hover:bg-[var(--status-success-strong-bg)] hover:text-[color:var(--status-success-strong-text)]";
    default:
      return "";
  }
}

type SizedIconElement = React.ReactElement<{ size?: number | string }>;

function withIconSize(icon: React.ReactNode, size: number) {
  if (!React.isValidElement(icon)) {
    return icon;
  }

  const iconElement = icon as SizedIconElement;
  return React.cloneElement(iconElement, {
    size: iconElement.props.size ?? size,
  });
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      asChild = false,
      loading = false,
      icon,
      iconRight,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const mappedVariant = mapLegacyVariant(variant);
    const mappedSize = mapLegacySize(size);

    return (
      <Comp
        className={cn(
          buttonVariants({ variant: mappedVariant, size: mappedSize, rounded, className }),
          getLegacyVariantClassName(variant)
        )}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? <Spinner size={mappedSize === "sm" ? "sm" : "default"} color="inherit" /> : null}
        {!loading && icon ? (
          <span className="inline-flex shrink-0 items-center">{icon}</span>
        ) : null}
        <Slottable>{children}</Slottable>
        {!loading && iconRight ? (
          <span className="inline-flex shrink-0 items-center">{iconRight}</span>
        ) : null}
      </Comp>
    );
  }
);

Button.displayName = "Button";

const ICON_SIZE_MAP: Record<LegacyButtonSize | "sm" | "default" | "lg", number> = {
  small: 14,
  medium: 16,
  large: 20,
  sm: 14,
  default: 16,
  lg: 20,
};

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = "medium", children, ...props }, ref) => {
    const resolvedSize =
      size === "icon" || size === "icon-sm" || size === "icon-lg" ? "default" : size;

    const iconSize = ICON_SIZE_MAP[resolvedSize as keyof typeof ICON_SIZE_MAP] ?? 16;

    return (
      <Button
        ref={ref}
        {...props}
        size={mapLegacySize(size, { icon: true })}
        icon={icon ? withIconSize(icon, iconSize) : undefined}
      >
        {children}
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "inline-flex",
          orientation === "horizontal"
            ? [
                "flex-row",
                "[&>*:not(:first-child):not(:last-child)]:rounded-none",
                "[&>*:first-child]:rounded-r-none",
                "[&>*:last-child]:rounded-l-none",
                "[&>*:not(:first-child)]:-ml-px",
              ].join(" ")
            : [
                "flex-col",
                "[&>*:not(:first-child):not(:last-child)]:rounded-none",
                "[&>*:first-child]:rounded-b-none",
                "[&>*:last-child]:rounded-t-none",
                "[&>*:not(:first-child)]:-mt-px",
              ].join(" "),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";

export { Button, IconButton, ButtonGroup, buttonVariants };
