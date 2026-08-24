import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@dubo/design-system-shared/lib/utils";

const cardVariants = cva(
  [
    "flex flex-col",
    "[border-width:0.5px] [border-style:solid]",
    "rounded-[var(--surface-card-radius)]",
    "p-6",
    "gap-2",
    "[color:var(--color-text-primary)]",
  ].join(" "),
  {
    variants: {
      variant: {
        base: [
          "[background:var(--card-bg,var(--surface-card-bg))]",
          "[border-color:var(--card-border,var(--surface-card-border))]",
        ].join(" "),
        muted: [
          "[background:var(--card-bg,var(--surface-card-muted-bg))]",
          "[border-color:var(--card-border,var(--surface-card-border))]",
        ].join(" "),
        faded: [
          "[background:var(--card-bg,var(--glass-bg-light))]",
          "[border-color:var(--card-border,var(--glass-border-light))]",
          "[backdrop-filter:var(--glass-blur-md)_var(--glass-saturate)]",
        ].join(" "),
      },
      shadow: {
        none: "shadow-none",
        sm: "shadow-[var(--shadow-sm)]",
        md: "shadow-[var(--shadow-md)]",
        lg: "shadow-[var(--shadow-lg)]",
        xl: "shadow-[var(--shadow-xl)]",
      },
      hoverEffect: {
        none: "",
        warmLift: [
          "relative overflow-hidden",
          "shadow-none hover:shadow-[var(--shadow-lg)]",
          "transition-transform duration-[var(--transition-fast)]",
          "[transition-timing-function:var(--transition-easing)]",
          "will-change-transform hover:scale-[1.03]",
          "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:rounded-[inherit]",
          "before:opacity-0 before:transition-opacity before:duration-[var(--transition-fast)]",
          "before:[transition-timing-function:var(--transition-easing)] before:content-['']",
          "before:[background:var(--surface-gradient-product-bg)]",
          "[&>*]:relative [&>*]:z-[1]",
          "hover:before:opacity-100",
        ].join(" "),
        sunriseLift: [
          "relative overflow-hidden",
          "shadow-none hover:shadow-[var(--shadow-lg)]",
          "transition-transform duration-[var(--transition-fast)]",
          "[transition-timing-function:var(--transition-easing)]",
          "will-change-transform hover:scale-[1.03]",
          "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:rounded-[inherit]",
          "before:opacity-0 before:transition-opacity before:duration-[var(--transition-fast)]",
          "before:[transition-timing-function:var(--transition-easing)] before:content-['']",
          "before:[background:var(--surface-gradient-sunrise-bg)]",
          "[&>*]:relative [&>*]:z-[1]",
          "hover:before:opacity-100",
        ].join(" "),
        groupTintLift: [
          "relative overflow-hidden",
          "shadow-none",
          "transition-transform duration-[var(--transition-fast)]",
          "[transition-timing-function:var(--transition-easing)]",
          "will-change-transform hover:scale-[1.05]",
          "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:rounded-[inherit]",
          "before:opacity-0 before:transition-opacity before:duration-300",
          "before:content-['']",
          "before:[background:var(--surface-gradient-warm-tint-bg)]",
          "[&>*]:relative [&>*]:z-[1]",
          "hover:before:opacity-100",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "base",
      shadow: "none",
      hoverEffect: "none",
    },
  }
);

type CardProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>;

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, shadow, hoverEffect, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, shadow, hoverEffect }), className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-heading-4 [font-weight:var(--font-weight-400)] [color:var(--color-text-primary)]",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-body-md [font-weight:var(--font-weight-400)] [color:var(--color-text-secondary)]",
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-2", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants };
