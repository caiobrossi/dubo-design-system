"use client";

import * as React from "react";
import { FileText, Sparkles } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { FloatingPanel } from "@/components/ui/floating-panel";

export function FloatingPanelShowcase({
  placement = "bottom-right",
  defaultMinimized = false,
  size = "default",
  showIcon = true,
  showFooter = true,
  title = "Clinical Notes",
  description = "Keep a secondary workflow available while the page stays usable.",
}: {
  placement?: "bottom-left" | "bottom-right" | "bottom-center";
  defaultMinimized?: boolean;
  size?: "default" | "tall";
  showIcon?: boolean;
  showFooter?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
}) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[680px] overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-bg-page)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-docs-grid bg-[size:28px_28px] opacity-40" />
      <FloatingPanel
        strategy="absolute"
        containerRef={containerRef}
        placement={placement}
        defaultMinimized={defaultMinimized}
        size={size}
        showIcon={showIcon}
        showFooter={showFooter}
        icon={<FileText className="size-[var(--icon-size-md)]" />}
        title={title}
        description={description}
        minimizedIcon={<Sparkles className="size-[var(--icon-size-md)]" />}
        footer={
          <div className="flex items-center justify-between gap-[var(--space-3)]">
            <span className="text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
              Last updated just now
            </span>
            <div className="flex items-center gap-[var(--space-2)]">
              <Button variant="ghost" size="sm">
                Dismiss
              </Button>
              <Button size="sm">Save</Button>
            </div>
          </div>
        }
      >
        <div className="flex flex-col gap-[var(--space-4)]">
          <div className="rounded-[var(--radius-control-soft)] border border-[var(--color-border)] bg-[var(--color-bg-input)] p-[var(--space-4)]">
            <p className="text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
              Why it exists
            </p>
            <p className="mt-[var(--space-2)] text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
              Floating panels are useful for sticky side workflows like notes, messaging, AI
              helpers, or quick capture that should stay available without fully blocking the
              screen.
            </p>
          </div>
          <div className="rounded-[var(--radius-control-soft)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-[var(--space-4)]">
            <p className="text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
              Core behaviors
            </p>
            <ul className="mt-[var(--space-2)] space-y-[var(--space-2)] text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
              <li>Drag with the grip handle to reposition the panel.</li>
              <li>Minimize to preserve context without taking over the page.</li>
              <li>Use the footer for stable actions and recovery steps.</li>
            </ul>
          </div>
        </div>
      </FloatingPanel>
    </div>
  );
}
