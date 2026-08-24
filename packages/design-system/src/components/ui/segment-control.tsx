"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@dubo/design-system-shared/lib/utils";

const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 500,
  damping: 30,
  mass: 0.8,
};

const getOffsetLeftWithin = (element: HTMLElement, ancestor: HTMLElement) => {
  let left = 0;
  let current: HTMLElement | null = element;

  while (current && current !== ancestor) {
    left += current.offsetLeft;
    current = current.offsetParent as HTMLElement | null;
  }

  if (current !== ancestor) {
    const ancestorRect = ancestor.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    return elementRect.left - ancestorRect.left;
  }

  return left;
};

const segmentVariants = cva(
  [
    "relative flex items-center overflow-visible",
    "rounded-full",
    "p-[var(--segment-padding)]",
    "gap-[var(--space-1)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-[var(--color-hover)]",
        light: "bg-transparent",
        header: "bg-[var(--color-pressed)]",
      },
      size: {
        sm: "h-[var(--height-control-sm)]",
        default: "h-[var(--height-control-md)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface SegmentControlProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof segmentVariants> {}

const SegmentControl = React.forwardRef<HTMLDivElement, SegmentControlProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
    const [pillStyle, setPillStyle] = React.useState<{
      left: number;
      width: number;
    } | null>(null);
    const childArray = React.Children.toArray(children);
    const activeIndex = childArray.findIndex((child) => {
      if (!React.isValidElement(child)) return false;
      const childProps = child.props as SegmentItemProps;
      return Boolean(childProps.active);
    });
    const layoutSignature = childArray
      .map((child, index) => {
        if (!React.isValidElement(child)) return `x-${index}`;
        const childProps = child.props as SegmentItemProps;
        return `${child.key ?? index}:${childProps.active ? "1" : "0"}`;
      })
      .join("|");

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    const registerRef = React.useCallback((index: number, el: HTMLButtonElement | null) => {
      itemRefs.current[index] = el;
    }, []);

    const updatePillPosition = React.useCallback(() => {
      const container = containerRef.current;
      if (!container) return;

      const activeItem =
        container.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]') ??
        itemRefs.current[activeIndex];

      if (activeIndex < 0 || !activeItem) {
        setPillStyle((prev) => (prev === null ? prev : null));
        return;
      }

      const nextLeft = getOffsetLeftWithin(activeItem, container);
      const nextWidth = activeItem.offsetWidth;

      setPillStyle((prev) => {
        if (
          prev &&
          Math.abs(prev.left - nextLeft) < 0.5 &&
          Math.abs(prev.width - nextWidth) < 0.5
        ) {
          return prev;
        }

        return {
          left: nextLeft,
          width: nextWidth,
        };
      });
    }, [activeIndex]);

    React.useLayoutEffect(() => {
      updatePillPosition();
    }, [layoutSignature, updatePillPosition]);

    React.useEffect(() => {
      window.addEventListener("resize", updatePillPosition);
      const timeout = setTimeout(updatePillPosition, 50);

      return () => {
        window.removeEventListener("resize", updatePillPosition);
        clearTimeout(timeout);
      };
    }, [layoutSignature, updatePillPosition]);

    React.useEffect(() => {
      if (typeof ResizeObserver === "undefined") return;

      const observer = new ResizeObserver(() => {
        updatePillPosition();
      });
      const container = containerRef.current;
      const items = itemRefs.current.filter((item): item is HTMLButtonElement => Boolean(item));

      if (container) observer.observe(container);
      items.forEach((item) => observer.observe(item));

      return () => observer.disconnect();
    }, [childArray.length, updatePillPosition]);

    // eslint-disable-next-line react-hooks/refs
    const processedChildren = React.Children.map(childArray, (child, index) => {
      if (React.isValidElement(child) && child.type === SegmentItem) {
        return React.cloneElement(child, {
          _index: index,
          _registerRef: registerRef,
        } as Partial<SegmentItemProps>);
      }

      return child;
    });

    return (
      <div
        ref={setRefs}
        role="tablist"
        className={cn(segmentVariants({ variant, size }), className)}
        {...props}
      >
        {pillStyle ? (
          <motion.div
            className="absolute rounded-full border border-transparent bg-[var(--color-bg-surface)] dark:!border-[var(--color-border-interactive)] dark:![background:var(--color-pressed)] dark:[border-width:0.5px]"
            style={{
              top: "var(--segment-padding)",
              bottom: "var(--segment-padding)",
              boxShadow: "var(--segment-pill-shadow)",
            }}
            initial={false}
            animate={{
              left: pillStyle.left,
              width: pillStyle.width,
            }}
            transition={SPRING_CONFIG}
          />
        ) : null}

        <div className="relative z-10 flex h-full w-full items-center gap-[var(--space-1)]">
          {processedChildren}
        </div>
      </div>
    );
  }
);
SegmentControl.displayName = "SegmentControl";

export interface SegmentItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  fit?: boolean;
  _index?: number;
  _registerRef?: (index: number, el: HTMLButtonElement | null) => void;
}

const SegmentItem = React.forwardRef<HTMLButtonElement, SegmentItemProps>(
  (
    {
      className,
      active = false,
      disabled = false,
      icon,
      fit = false,
      children,
      _index,
      _registerRef,
      ...props
    },
    ref
  ) => {
    const internalRef = React.useRef<HTMLButtonElement | null>(null);

    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
        if (_registerRef !== undefined && _index !== undefined) {
          _registerRef(_index, node);
        }
      },
      [ref, _index, _registerRef]
    );

    return (
      <button
        ref={setRefs}
        type="button"
        role="tab"
        aria-selected={active}
        disabled={disabled}
        className={cn(
          "relative flex h-[calc(100%-var(--segment-padding)*2)] cursor-pointer items-center justify-center",
          "gap-[var(--space-1)]",
          "rounded-full",
          "px-[var(--space-4)]",
          "whitespace-nowrap",
          "transition-colors duration-[var(--transition-fast)]",
          "[transition-timing-function:var(--transition-easing-out)]",
          // min-w-0 on the flex-1 (non-fit) variant: without it, a flex item
          // whose content is `whitespace-nowrap` keeps `min-width: auto`,
          // which resolves to its full unshrunk text width — so on narrow
          // viewports the item refuses to shrink and overflows past its
          // container/the screen edge instead of truncating. `fit` items are
          // meant to hug their content, so they're left alone.
          fit ? "flex-none" : "min-w-0 flex-1",
          !active && "bg-transparent hover:bg-[var(--color-hover)]",
          active && "bg-transparent hover:bg-transparent",
          disabled && "pointer-events-none",
          className
        )}
        {...props}
      >
        {icon ? (
          <span
            className={cn(
              "text-body-lg transition-all [&_svg]:size-4",
              !active && !disabled && "text-[color:var(--color-text-secondary)]",
              active && !disabled && "text-[color:var(--color-text-primary)]",
              disabled && "text-[color:var(--color-text-muted)]"
            )}
          >
            {icon}
          </span>
        ) : null}

        {children ? (
          <span
            className={cn(
              "truncate text-body-lg transition-all",
              !active &&
                !disabled &&
                "[font-weight:var(--font-weight-300)] text-[color:var(--color-text-secondary)]",
              active &&
                !disabled &&
                "[font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]",
              disabled && "[font-weight:var(--font-weight-300)] text-[color:var(--color-text-muted)]"
            )}
          >
            {children}
          </span>
        ) : null}
      </button>
    );
  }
);
SegmentItem.displayName = "SegmentItem";

export { SegmentControl, SegmentItem };
