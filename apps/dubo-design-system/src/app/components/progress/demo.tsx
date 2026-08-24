"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { DocsSection } from "@/components/docs/section";

function ShowcaseCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      {children}
    </div>
  );
}

function ShowcaseRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-body-md font-medium text-subtext-color">{label}</p>
      {children}
    </div>
  );
}

export function ProgressDemo() {
  return (
    <>
      {/* Indeterminate */}
      <DocsSection
        id="indeterminate"
        title="Indeterminate"
        description="Shimmer animation for unknown progress duration."
      >
        <ShowcaseCard title="Indeterminate shimmer — all variants">
          <div className="flex max-w-md flex-col gap-5">
            {(
              [
                ["default", "Default"],
                ["success", "Success"],
                ["warning", "Warning"],
                ["danger", "Danger"],
              ] as const
            ).map(([variant, label]) => (
              <ShowcaseRow key={variant} label={label}>
                <Progress indeterminate variant={variant} />
              </ShowcaseRow>
            ))}
          </div>
        </ShowcaseCard>
      </DocsSection>

      {/* Animated */}
      <DocsSection
        id="animated"
        title="Animated Fill"
        description="Live animated progress demonstration with automatic fill."
      >
        <AnimatedProgress />
      </DocsSection>
    </>
  );
}

function AnimatedProgress() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      <p className="text-body-md font-medium text-default-font">Auto-incrementing progress</p>
      <div className="max-w-md">
        <Progress
          value={value}
          showPercentage
          label="Uploading file..."
          variant="brand"
          size="lg"
        />
      </div>
    </div>
  );
}
