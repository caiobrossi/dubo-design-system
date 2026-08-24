import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CalloutProps {
  tone?: "brand" | "neutral" | "warning";
  title: string;
  children: ReactNode;
}

export function Callout({ tone = "neutral", title, children }: CalloutProps) {
  return (
    <div
      className={cn(
        "rounded-[18px] border-l-[3px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-5 py-4",
        tone === "brand" && "border-l-[var(--color-brand)]",
        tone === "neutral" && "border-l-[var(--color-border-strong)]",
        tone === "warning" && "border-l-[var(--color-warning)]"
      )}
    >
      <p className="mb-2 text-body-md font-medium text-subtext-color">{title}</p>
      <div className="text-body-md text-subtext-color">{children}</div>
    </div>
  );
}
