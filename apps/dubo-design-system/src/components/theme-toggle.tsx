"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const options = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
  ] as const;

  return (
    <div className="flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-1">
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          aria-label={label}
          className={cn(
            "flex items-center justify-center rounded-full p-1.5 transition-colors duration-[var(--transition-fast)]",
            theme === value
              ? "bg-[var(--color-hover)] text-[color:var(--color-text-primary)]"
              : "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text-secondary)]",
          )}
        >
          <Icon className="size-4" />
        </button>
      ))}
    </div>
  );
}
