import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "dubo-design-system/lib/icons";
import { cva } from "class-variance-authority";
import { cn } from "dubo-design-system/lib/utils";
import {
  fieldBodyMdClass,
  fieldTransitionClass,
} from "dubo-design-system/components/ui/field-styles";

/**
 * Dubo Design System — Navigation Menu
 *
 * Built on @radix-ui/react-navigation-menu with dropdown content,
 * links, icons, and sub-menu items with descriptions.
 *
 * Reuses shared control, overlay, surface, spacing, icon, and typography roles.
 */

/* ── Root ── */

const NavigationMenu = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

/* ── List ── */

const NavigationMenuList = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center gap-[var(--space-1)]",
      className
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

/* ── Item ── */

const NavigationMenuItem = NavigationMenuPrimitive.Item;

/* ── Trigger styles (shared with Link) ── */

const navigationMenuTriggerStyle = cva(
  [
    "group inline-flex h-[var(--height-control-md)] w-max items-center justify-center gap-[var(--space-2)] rounded-[var(--radius-control-input)] px-[var(--space-4)] py-[var(--space-2)]",
    fieldBodyMdClass,
    "[font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]",
    fieldTransitionClass,
    "hover:bg-[var(--color-hover)] hover:text-[color:var(--color-text-primary)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-[var(--focus-ring-offset)]",
    "disabled:pointer-events-none disabled:opacity-[var(--disabled-opacity)]",
    "data-[active]:bg-[var(--color-hover)]",
    "data-[state=open]:bg-[var(--color-hover)]",
  ].join(" ")
);

/* ── Trigger ── */

const NavigationMenuTrigger = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}
    <ChevronDown
      className="relative top-px ml-[var(--space-1)] size-[var(--icon-size-sm)] transition-transform duration-[var(--transition-fast)] group-data-[state=open]:rotate-180"
      aria-hidden
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

/* ── Content ── */

const NavigationMenuContent = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out",
      "data-[motion^=from-]:fade-in-0 data-[motion^=to-]:fade-out-0",
      "data-[motion=from-end]:slide-in-from-right-2 data-[motion=from-start]:slide-in-from-left-2",
      "data-[motion=to-end]:slide-in-from-right-2 data-[motion=to-start]:slide-in-from-left-2",
      "md:absolute md:w-auto",
      className
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

/* ── Link ── */

const NavigationMenuLink = NavigationMenuPrimitive.Link;

/* ── Viewport ── */

const NavigationMenuViewport = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className="absolute left-0 top-full flex justify-center">
    <NavigationMenuPrimitive.Viewport
      ref={ref}
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)]",
        "w-full overflow-hidden rounded-[var(--radius-control-input)]",
        "border border-[var(--color-border)] bg-[var(--color-bg-surface)]",
        "shadow-[var(--shadow-md)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

/* ── Indicator ── */

const NavigationMenuIndicator = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
      "data-[state=visible]:animate-in data-[state=hidden]:animate-out",
      "data-[state=hidden]:fade-out-0 data-[state=visible]:fade-in-0",
      className
    )}
    {...props}
  >
    <div className="relative top-[calc(50%+var(--space-1))] size-[var(--space-2)] rotate-45 rounded-tl-[var(--radius-scale-xs)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] shadow-[var(--shadow-md)]" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

/* ── ListItem (sub-menu item with description) ── */

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string;
  icon?: React.ReactNode;
}

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, icon, children, ...props }, ref) => (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-[var(--radius-control-input)] p-[var(--space-3)]",
            "no-underline outline-none",
            fieldTransitionClass,
            "hover:bg-[var(--color-hover)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-[var(--space-2)]">
            {icon && (
              <span className="flex size-[var(--size-5)] shrink-0 items-center justify-center text-[color:var(--color-brand)]">
                {icon}
              </span>
            )}
            <div className="[font-weight:var(--font-weight-400)] text-body-md text-[color:var(--color-text-primary)]">
              {title}
            </div>
          </div>
          {children && (
            <p className="mt-[var(--space-2)] line-clamp-2 text-body-sm text-[color:var(--color-text-secondary)]">
              {children}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  )
);
ListItem.displayName = "ListItem";

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
  NavigationMenuIndicator,
  ListItem,
  navigationMenuTriggerStyle,
};
