"use client";

import * as React from "react";
import { GripVertical } from "dubo-design-system/lib/icons";
import { Group, Panel, Separator } from "react-resizable-panels";
import { cn } from "dubo-design-system/lib/utils";

/**
 * Dubo Design System — Resizable
 *
 * Resizable panel layout using react-resizable-panels v4.
 *
 * Sub-components:
 * - ResizablePanelGroup — container with horizontal or vertical orientation
 * - ResizablePanel — individual panel
 * - ResizableHandle — drag handle between panels
 *
 * Props:
 * - ResizablePanelGroup: orientation ("horizontal" | "vertical"), plus all GroupProps
 * - ResizablePanel: defaultSize, minSize, maxSize, collapsible, etc.
 * - ResizableHandle: withHandle (shows grip icon)
 *
 * Tokens used:
 * - --color-border / --color-border-strong
 * - --color-hover
 * - --color-bg-surface / --color-text-muted
 * - --radius-scale-xs
 * - --size-3 / --size-4 / --icon-size-sm
 * - --focus-ring / --focus-ring-offset
 * - --transition-fast
 */

type GroupProps = React.ComponentPropsWithoutRef<typeof Group>;

function ResizablePanelGroup({ className, ...props }: GroupProps) {
  return (
    <Group
      className={cn(
        "flex h-full w-full",
        props.orientation === "vertical" && "flex-col",
        className
      )}
      {...props}
    />
  );
}
ResizablePanelGroup.displayName = "ResizablePanelGroup";

const ResizablePanel = Panel;

type SeparatorProps = React.ComponentPropsWithoutRef<typeof Separator>;

interface ResizableHandleProps extends SeparatorProps {
  /** Show a visible grip icon on the handle */
  withHandle?: boolean;
  /** Orientation context (passed from parent layout) */
  orientation?: "horizontal" | "vertical";
}

const ResizableHandle = ({
  withHandle,
  className,
  orientation,
  ...props
}: ResizableHandleProps) => (
  <Separator
    className={cn(
      "relative flex items-center justify-center",
      "bg-[var(--color-border)]",
      "transition-colors duration-[var(--transition-fast)]",
      "hover:bg-[var(--color-hover)]",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-[var(--focus-ring-offset)]",
      "[&[data-resize-handle-active]]:bg-[var(--color-border-strong)]",
      orientation === "vertical" ? "h-px w-full" : "w-px",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div
        className={cn(
          "z-10 flex items-center justify-center",
          "rounded-[var(--radius-scale-xs)] border border-[var(--color-border)]",
          "bg-[var(--color-bg-surface)]",
          "transition-colors duration-[var(--transition-fast)]",
          orientation === "vertical"
            ? "h-[var(--size-3)] w-[var(--size-4)]"
            : "h-[var(--size-4)] w-[var(--size-3)]"
        )}
      >
        <GripVertical
          className={cn(
            "text-[color:var(--color-text-muted)]",
            orientation === "vertical" && "rotate-90"
          )}
          style={{ width: "var(--icon-size-sm)", height: "var(--icon-size-sm)" }}
        />
      </div>
    )}
  </Separator>
);
ResizableHandle.displayName = "ResizableHandle";

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
