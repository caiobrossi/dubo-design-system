"use client";

import * as React from "react";
import { ChevronRight } from "@dubo/design-system-shared/lib/icons";

import { cn } from "@dubo/design-system-shared/lib/utils";

const Breadcrumb = React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<"nav">>(
  ({ className, "aria-label": ariaLabel = "Breadcrumb", ...props }, ref) => (
    <nav ref={ref} aria-label={ariaLabel} className={cn("w-full", className)} {...props} />
  )
);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-2 text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]",
        className
      )}
      {...props}
    />
  )
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("inline-flex items-center gap-2", className)} {...props} />
  )
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ className, type = "button", ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    className={cn(
      "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[color:var(--color-brand)] transition-colors hover:text-[color:var(--color-brand-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
      className
    )}
    {...props}
  />
));
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-current="page"
      className={cn("text-[color:var(--color-text-primary)]", className)}
      {...props}
    />
  )
);
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li"> & { children?: React.ReactNode }
>(({ children, className, ...props }, ref) => (
  <li
    ref={ref}
    role="presentation"
    aria-hidden="true"
    className={cn("text-[color:var(--color-text-muted)]", className)}
    {...props}
  >
    {children ?? <ChevronRight className="size-4" />}
  </li>
));
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
