"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "dubo-design-system/lib/utils";

/**
 * Dubo Design System — Tabs (Inline)
 *
 * Underline-style tabs for page-level content switching.
 * Built on Radix UI Tabs with an animated sliding underline indicator.
 *
 * Sizes: sm (32px) | default (40px)
 * Reuses shared semantic tokens for spacing, surfaces, text, disabled states, and typography.
 * Tabs do not require a component token family beyond the shared semantic layer.
 */

// ─── TabsList ────────────────────────────────────────────────────────────────

const tabsListVariants = cva(
  [
    "relative flex items-center",
    "border-b border-[var(--color-border)]",
    "gap-[var(--space-8)]",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-[var(--height-control-sm)]",
        default: "h-[var(--height-control-md)]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface TabsListProps
  extends
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<React.ComponentRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, size, children, ...props }, ref) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const [indicator, setIndicator] = React.useState<{
      left: number;
      width: number;
    } | null>(null);

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    const updateIndicator = React.useCallback(() => {
      const container = containerRef.current;
      if (!container) return;

      const activeTab = container.querySelector<HTMLButtonElement>('[data-state="active"]');
      if (!activeTab) {
        setIndicator(null);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();

      setIndicator({
        left: tabRect.left - containerRect.left,
        width: tabRect.width,
      });
    }, []);

    React.useEffect(() => {
      updateIndicator();

      const container = containerRef.current;
      if (!container) return;

      const observer = new MutationObserver(updateIndicator);
      observer.observe(container, {
        attributes: true,
        subtree: true,
        attributeFilter: ["data-state"],
      });

      window.addEventListener("resize", updateIndicator);

      return () => {
        observer.disconnect();
        window.removeEventListener("resize", updateIndicator);
      };
    }, [updateIndicator]);

    return (
      <TabsPrimitive.List
        ref={setRefs}
        className={cn(tabsListVariants({ size }), className)}
        {...props}
      >
        {children}

        {/* Animated underline indicator */}
        {indicator && (
          <motion.div
            className="absolute bottom-0 rounded-full bg-[var(--color-text-primary)]"
            style={{
              height: "2px",
              translateY: "50%",
            }}
            initial={false}
            animate={{
              left: indicator.left,
              width: indicator.width,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 35,
              mass: 0.8,
            }}
          />
        )}
      </TabsPrimitive.List>
    );
  }
);
TabsList.displayName = TabsPrimitive.List.displayName;

// ─── TabsTrigger ─────────────────────────────────────────────────────────────

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative inline-flex h-full cursor-pointer select-none items-center",
      "pb-0",
      "text-body-lg",
      "[font-weight:var(--font-weight-400)]",
      "transition-colors duration-[var(--transition-fast)]",
      "text-[color:var(--color-text-secondary)]",
      "hover:text-[color:var(--color-text-primary)]",
      "data-[state=active]:text-[color:var(--color-text-primary)]",
      "disabled:pointer-events-none disabled:opacity-[var(--disabled-opacity)]",
      "focus-visible:outline-none",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

// ─── TabsContent ─────────────────────────────────────────────────────────────

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("mt-[var(--space-4)] focus-visible:outline-none", className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// ─── Tabs Root ───────────────────────────────────────────────────────────────

const Tabs = TabsPrimitive.Root;

export { Tabs, TabsList, TabsTrigger, TabsContent };
