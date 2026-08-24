import { Inbox, Search } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface EmptyStateIllustrationProps {
  tone?: "search" | "tasks";
  className?: string;
}

export function EmptyStateIllustration({
  tone = "search",
  className,
}: EmptyStateIllustrationProps) {
  const Icon = tone === "tasks" ? Inbox : Search;

  return (
    <div className={cn("relative flex size-full items-center justify-center", className)}>
      <div className="absolute inset-[18%] rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg-surface)]" />
      <div className="absolute right-[18%] top-[16%] size-[18%] rounded-full bg-[var(--color-brand-subtle)]" />
      <div className="absolute left-[16%] top-[24%] h-[12%] w-[28%] rounded-full bg-[var(--color-hover)]" />
      <div className="absolute bottom-[18%] left-[20%] h-[10%] w-[60%] rounded-full bg-[var(--color-hover)]" />
      <div className="relative z-10 flex size-[56%] items-center justify-center rounded-[24px] bg-[var(--color-brand-subtle)] text-[color:var(--color-brand)]">
        <Icon className="size-[52%]" strokeWidth={1.8} />
      </div>
    </div>
  );
}
