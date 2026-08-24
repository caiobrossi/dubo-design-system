"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { GripVertical, Maximize2, Minus, X } from "dubo-design-system/lib/icons";
import { cn } from "dubo-design-system/lib/utils";
import { useDesignSystemLabel } from "dubo-design-system/lib/labels";
import { Button } from "dubo-design-system/components/ui/button";

export type FloatingPanelPlacement = "bottom-left" | "bottom-right" | "bottom-center";
export type FloatingPanelStrategy = "fixed" | "absolute";

export interface FloatingPanelPosition {
  x: number;
  y: number;
}

type FloatingPanelStateProps =
  | {
      open?: boolean;
      defaultOpen?: boolean;
      onOpenChange?: (open: boolean) => void;
    }
  | {
      open?: boolean;
      defaultOpen?: never;
      onOpenChange?: (open: boolean) => void;
    };

type FloatingPanelMinimizedProps =
  | {
      minimized?: boolean;
      defaultMinimized?: boolean;
      onMinimizedChange?: (minimized: boolean) => void;
    }
  | {
      minimized?: boolean;
      defaultMinimized?: never;
      onMinimizedChange?: (minimized: boolean) => void;
    };

export type FloatingPanelProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> &
  FloatingPanelStateProps &
  FloatingPanelMinimizedProps & {
    title?: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    footer?: React.ReactNode;
    headerActions?: React.ReactNode;
    minimizedTitle?: React.ReactNode;
    minimizedDescription?: React.ReactNode;
    minimizedIcon?: React.ReactNode;
    minimizedContent?: React.ReactNode;
    showMinimizeButton?: boolean;
    showCloseButton?: boolean;
    showIcon?: boolean;
    showFooter?: boolean;
    size?: "default" | "tall";
    placement?: FloatingPanelPlacement;
    strategy?: FloatingPanelStrategy;
    draggable?: boolean;
    containerRef?: React.RefObject<HTMLElement | null>;
    position?: FloatingPanelPosition;
    defaultPosition?: FloatingPanelPosition;
    onPositionChange?: (position: FloatingPanelPosition) => void;
    contentClassName?: string;
  };

const expandedPanelVariants = cva(
  [
    "z-50 flex flex-col overflow-hidden",
    "rounded-[var(--surface-elevated-radius)]",
    "border border-[var(--surface-elevated-border)]",
    "bg-[var(--surface-elevated-bg)] shadow-[var(--surface-elevated-shadow)]",
    "transition-[width,height,opacity,transform,box-shadow]",
    "duration-[var(--transition-fast)]",
    "[transition-timing-function:var(--transition-easing)]",
    "w-[min(var(--floating-panel-width),calc(100vw-var(--space-8)))]",
    "max-h-[calc(100vh-var(--space-8))]",
  ].join(" ")
);

const minimizedPanelVariants = cva(
  [
    "z-50 flex items-center gap-[var(--space-3)] overflow-hidden",
    "rounded-[var(--radius-scale-2xl)]",
    "border border-[var(--surface-elevated-border)]",
    "bg-[var(--surface-elevated-bg)] shadow-[var(--surface-elevated-shadow)]",
    "transition-[width,opacity,transform,box-shadow]",
    "duration-[var(--transition-fast)]",
    "[transition-timing-function:var(--transition-easing)]",
    "w-[min(var(--floating-panel-minimized-width),calc(100vw-var(--space-8)))]",
    "px-[var(--space-4)] py-[var(--space-3)]",
  ].join(" ")
);

function useControllableBoolean(
  controlledValue: boolean | undefined,
  defaultValue: boolean,
  onChange?: (value: boolean) => void
) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const setValue = React.useCallback(
    (nextValue: boolean) => {
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
      onChange?.(nextValue);
    },
    [isControlled, onChange]
  );

  return [value, setValue] as const;
}

function readCssPxVar(name: string, fallback: number) {
  if (typeof window === "undefined") return fallback;
  const value = window.getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function getBoundary(
  strategy: FloatingPanelStrategy,
  panel: HTMLDivElement | null,
  containerRef?: React.RefObject<HTMLElement | null>
) {
  if (typeof window === "undefined") {
    return { width: 0, height: 0 };
  }

  if (strategy === "fixed") {
    return { width: window.innerWidth, height: window.innerHeight };
  }

  const container = containerRef?.current ?? panel?.parentElement;
  const rect = container?.getBoundingClientRect();

  return {
    width: rect?.width ?? window.innerWidth,
    height: rect?.height ?? window.innerHeight,
  };
}

function getAnchoredPosition(
  placement: FloatingPanelPlacement,
  panelWidth: number,
  panelHeight: number,
  boundaryWidth: number,
  boundaryHeight: number,
  edgeOffset: number
) {
  const bottomY = Math.max(edgeOffset, boundaryHeight - panelHeight - edgeOffset);

  if (placement === "bottom-left") {
    return { x: edgeOffset, y: bottomY };
  }

  if (placement === "bottom-center") {
    return {
      x: Math.max(edgeOffset, (boundaryWidth - panelWidth) / 2),
      y: bottomY,
    };
  }

  return {
    x: Math.max(edgeOffset, boundaryWidth - panelWidth - edgeOffset),
    y: bottomY,
  };
}

function clampPosition(
  position: FloatingPanelPosition,
  panelWidth: number,
  panelHeight: number,
  boundaryWidth: number,
  boundaryHeight: number,
  edgeOffset: number
) {
  const maxX = Math.max(edgeOffset, boundaryWidth - panelWidth - edgeOffset);
  const maxY = Math.max(edgeOffset, boundaryHeight - panelHeight - edgeOffset);

  return {
    x: Math.min(Math.max(edgeOffset, position.x), maxX),
    y: Math.min(Math.max(edgeOffset, position.y), maxY),
  };
}

function positionsEqual(
  first: FloatingPanelPosition | null | undefined,
  second: FloatingPanelPosition | null | undefined
) {
  return first?.x === second?.x && first?.y === second?.y;
}

const FloatingPanel = React.forwardRef<HTMLDivElement, FloatingPanelProps>(
  (
    {
      className,
      contentClassName,
      title,
      description,
      icon,
      footer,
      headerActions,
      minimizedTitle,
      minimizedDescription,
      minimizedIcon,
      minimizedContent,
      showMinimizeButton = true,
      showCloseButton = true,
      showIcon = true,
      showFooter = true,
      size = "default",
      placement = "bottom-right",
      strategy = "fixed",
      draggable = true,
      containerRef,
      position,
      defaultPosition,
      onPositionChange,
      open,
      defaultOpen,
      onOpenChange,
      minimized,
      defaultMinimized,
      onMinimizedChange,
      children,
      ...props
    },
    ref
  ) => {
    const dragLabel = useDesignSystemLabel("dragPanel");
    const expandLabel = useDesignSystemLabel("expandPanel");
    const minimizeLabel = useDesignSystemLabel("minimizePanel");
    const closeLabel = useDesignSystemLabel("closePanel");
    const panelRef = React.useRef<HTMLDivElement | null>(null);
    const [resolvedOpen, setResolvedOpen] = useControllableBoolean(
      open,
      defaultOpen ?? true,
      onOpenChange
    );
    const [resolvedMinimized, setResolvedMinimized] = useControllableBoolean(
      minimized,
      defaultMinimized ?? false,
      onMinimizedChange
    );
    const [internalPosition, setInternalPosition] = React.useState<FloatingPanelPosition | null>(
      defaultPosition ?? null
    );
    const [isPositioned, setIsPositioned] = React.useState(false);
    const dragStateRef = React.useRef<{
      startX: number;
      startY: number;
      originX: number;
      originY: number;
    } | null>(null);
    const [isDragging, setIsDragging] = React.useState(false);

    const resolvedPosition = position ?? internalPosition;

    const assignRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        panelRef.current = node;

        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    const edgeOffset = readCssPxVar("--space-4", 16);

    const updatePosition = React.useCallback(
      (nextPosition: FloatingPanelPosition) => {
        if (position === undefined) {
          setInternalPosition(nextPosition);
        }
        onPositionChange?.(nextPosition);
      },
      [onPositionChange, position]
    );

    React.useLayoutEffect(() => {
      if (!resolvedOpen) return;

      const frame = window.requestAnimationFrame(() => {
        const panel = panelRef.current;
        if (!panel) return;

        const boundary = getBoundary(strategy, panel, containerRef);
        const nextRect = panel.getBoundingClientRect();

        const nextPosition = resolvedPosition
          ? clampPosition(
              resolvedPosition,
              nextRect.width,
              nextRect.height,
              boundary.width,
              boundary.height,
              edgeOffset
            )
          : getAnchoredPosition(
              placement,
              nextRect.width,
              nextRect.height,
              boundary.width,
              boundary.height,
              edgeOffset
            );

        if (!positionsEqual(resolvedPosition, nextPosition)) {
          updatePosition(nextPosition);
        }

        setIsPositioned(true);
      });

      return () => window.cancelAnimationFrame(frame);
    }, [
      containerRef,
      edgeOffset,
      placement,
      resolvedMinimized,
      resolvedOpen,
      resolvedPosition,
      strategy,
      updatePosition,
    ]);

    React.useEffect(() => {
      if (!resolvedOpen) return;

      const handleResize = () => {
        const panel = panelRef.current;
        if (!panel || !resolvedPosition) return;

        const boundary = getBoundary(strategy, panel, containerRef);
        const rect = panel.getBoundingClientRect();
        const clamped = clampPosition(
          resolvedPosition,
          rect.width,
          rect.height,
          boundary.width,
          boundary.height,
          edgeOffset
        );

        if (!positionsEqual(resolvedPosition, clamped)) {
          updatePosition(clamped);
        }
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [containerRef, edgeOffset, resolvedOpen, resolvedPosition, strategy, updatePosition]);

    React.useEffect(() => {
      if (!isDragging) return;

      const handlePointerMove = (event: PointerEvent) => {
        const panel = panelRef.current;
        const dragState = dragStateRef.current;
        if (!panel || !dragState) return;

        const boundary = getBoundary(strategy, panel, containerRef);
        const rect = panel.getBoundingClientRect();
        const nextPosition = clampPosition(
          {
            x: dragState.originX + (event.clientX - dragState.startX),
            y: dragState.originY + (event.clientY - dragState.startY),
          },
          rect.width,
          rect.height,
          boundary.width,
          boundary.height,
          edgeOffset
        );

        updatePosition(nextPosition);
      };

      const handlePointerUp = () => {
        dragStateRef.current = null;
        setIsDragging(false);
      };

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);

      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };
    }, [containerRef, edgeOffset, isDragging, strategy, updatePosition]);

    const handleDragStart = React.useCallback(
      (event: React.PointerEvent) => {
        if (!draggable || !resolvedPosition) return;

        event.preventDefault();
        dragStateRef.current = {
          startX: event.clientX,
          startY: event.clientY,
          originX: resolvedPosition.x,
          originY: resolvedPosition.y,
        };
        setIsDragging(true);
      },
      [draggable, resolvedPosition]
    );

    const handleClose = React.useCallback(() => {
      setResolvedOpen(false);
    }, [setResolvedOpen]);

    const handleExpand = React.useCallback(() => {
      setResolvedMinimized(false);
    }, [setResolvedMinimized]);

    const handleMinimize = React.useCallback(() => {
      setResolvedMinimized(true);
    }, [setResolvedMinimized]);

    if (!resolvedOpen) return null;

    const sharedPositionStyle =
      resolvedPosition && isPositioned
        ? {
            left: resolvedPosition.x,
            top: resolvedPosition.y,
            position: strategy,
          }
        : {
            left: 0,
            top: 0,
            position: strategy,
            opacity: 0,
          };

    const resolvedMinimizedTitle = minimizedTitle ?? title;
    const resolvedMinimizedDescription = minimizedDescription ?? description;

    if (resolvedMinimized) {
      return (
        <div
          ref={assignRefs}
          className={cn(
            minimizedPanelVariants(),
            isDragging ? "cursor-grabbing select-none" : "cursor-default",
            className
          )}
          style={sharedPositionStyle}
          {...props}
        >
          <button
            type="button"
            onPointerDown={handleDragStart}
            className={cn(
              "flex min-w-0 flex-1 items-center gap-[var(--space-3)] text-left",
              draggable ? "cursor-grab" : "cursor-default"
            )}
            aria-label={dragLabel}
          >
            <div className="flex size-[var(--height-control-md)] shrink-0 items-center justify-center rounded-[var(--radius-control-soft)] bg-[var(--color-hover)] text-[color:var(--color-text-secondary)]">
              {minimizedIcon ?? icon ?? <GripVertical className="size-[var(--icon-size-md)]" />}
            </div>
            {minimizedContent ? (
              <div className="min-w-0 flex-1">{minimizedContent}</div>
            ) : (
              <div className="min-w-0 flex-1">
                {resolvedMinimizedTitle ? (
                  <p className="truncate text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
                    {resolvedMinimizedTitle}
                  </p>
                ) : null}
                {resolvedMinimizedDescription ? (
                  <p className="truncate text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
                    {resolvedMinimizedDescription}
                  </p>
                ) : null}
              </div>
            )}
          </button>

          <div className="flex shrink-0 items-center gap-[var(--space-2)]">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              rounded={false}
              onClick={handleExpand}
              aria-label={expandLabel}
            >
              <Maximize2 />
            </Button>
            {showCloseButton ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                rounded={false}
                onClick={handleClose}
                aria-label={closeLabel}
              >
                <X />
              </Button>
            ) : null}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={assignRefs}
        className={cn(
          expandedPanelVariants(),
          size === "tall" &&
            "h-[min(var(--floating-panel-tall-height,640px),calc(100vh-var(--space-8)))]",
          isDragging ? "cursor-grabbing select-none" : "cursor-default",
          className
        )}
        style={sharedPositionStyle}
        {...props}
      >
        <div className="flex items-start gap-[var(--space-3)] border-b border-[var(--color-border)] px-[var(--space-4)] py-[var(--space-3)]">
          <button
            type="button"
            onPointerDown={handleDragStart}
            className={cn(
              "mt-0.5 flex size-[var(--height-control-sm)] shrink-0 items-center justify-center rounded-[var(--radius-control-soft)] bg-[var(--color-hover)] text-[color:var(--color-text-secondary)]",
              draggable ? "cursor-grab" : "cursor-default"
            )}
            aria-label={dragLabel}
          >
            <GripVertical className="size-[var(--icon-size-sm)]" />
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-start gap-[var(--space-3)]">
              {showIcon && icon ? (
                <div className="flex size-[var(--height-control-md)] shrink-0 items-center justify-center rounded-[var(--radius-control-soft)] bg-[var(--color-brand-subtle)] text-[color:var(--color-brand)]">
                  {icon}
                </div>
              ) : null}
              <div className="min-w-0 flex-1">
                {title ? (
                  <p className="text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
                    {title}
                  </p>
                ) : null}
                {description ? (
                  <p className="mt-[var(--space-1)] text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
                    {description}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-[var(--space-2)]">
            {headerActions}
            {showMinimizeButton ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                rounded={false}
                onClick={handleMinimize}
                aria-label={minimizeLabel}
              >
                <Minus />
              </Button>
            ) : null}
            {showCloseButton ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                rounded={false}
                onClick={handleClose}
                aria-label={closeLabel}
              >
                <X />
              </Button>
            ) : null}
          </div>
        </div>

        <div className={cn("min-h-0 flex-1 overflow-y-auto p-[var(--space-4)]", contentClassName)}>
          {children}
        </div>

        {showFooter && footer ? (
          <div className="border-t border-[var(--color-border)] px-[var(--space-4)] py-[var(--space-3)]">
            {footer}
          </div>
        ) : null}
      </div>
    );
  }
);

FloatingPanel.displayName = "FloatingPanel";

export { FloatingPanel };
