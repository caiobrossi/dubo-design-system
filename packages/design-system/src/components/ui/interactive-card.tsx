"use client";

import * as React from "react";
import { Check } from "@dubo/design-system-shared/lib/icons";
import { cn } from "@dubo/design-system-shared/lib/utils";

/**
 * Dubo Design System — InteractiveCard
 *
 * Unified interactive card with three behaviors:
 * 1. Single select — radio semantics (inside InteractiveCardGroup mode="single")
 * 2. Multi select  — checkbox semantics (inside InteractiveCardGroup mode="multiple")
 * 3. Link card     — clickable navigation card with hover gradient + scale
 *
 * Composable sub-components: Header, Content, Footer.
 * Replaces the former SelectableCard component.
 *
 * Uses shared card, selection, surface, focus, and motion tokens.
 * The token contract documents which shared tokens the component consumes.
 */

// ─── Types ──────────────────────────────────────────────────────────────────

type SelectionMode = "single" | "multiple";

// ─── Group Context ──────────────────────────────────────────────────────────

interface GroupContextValue {
  mode: SelectionMode;
  selected: string[];
  toggle: (value: string) => void;
  disabled: boolean;
}

const GroupCtx = React.createContext<GroupContextValue | null>(null);

// ─── InteractiveCardGroup ───────────────────────────────────────────────────

export interface InteractiveCardGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Selection mode — "single" (radio) or "multiple" (checkbox) */
  mode?: SelectionMode;
  /** Currently selected value(s) */
  value?: string | string[];
  /** Called when selection changes */
  onValueChange?: (value: string | string[]) => void;
  /** Disable all cards in group */
  disabled?: boolean;
}

const InteractiveCardGroup = React.forwardRef<HTMLDivElement, InteractiveCardGroupProps>(
  (
    { className, mode = "single", value, onValueChange, disabled = false, children, ...props },
    ref
  ) => {
    const selected = React.useMemo(() => {
      if (value === undefined) return [];
      return Array.isArray(value) ? value : [value];
    }, [value]);

    const toggle = React.useCallback(
      (val: string) => {
        if (disabled) return;
        if (mode === "single") {
          onValueChange?.(val);
        } else {
          const next = selected.includes(val)
            ? selected.filter((v) => v !== val)
            : [...selected, val];
          onValueChange?.(next);
        }
      },
      [mode, selected, onValueChange, disabled]
    );

    const ctx = React.useMemo(
      () => ({ mode, selected, toggle, disabled }),
      [mode, selected, toggle, disabled]
    );

    return (
      <GroupCtx.Provider value={ctx}>
        <div
          ref={ref}
          role={mode === "single" ? "radiogroup" : "group"}
          className={cn("flex flex-col gap-[var(--space-3)]", className)}
          {...props}
        >
          {children}
        </div>
      </GroupCtx.Provider>
    );
  }
);

InteractiveCardGroup.displayName = "InteractiveCardGroup";

// ─── InteractiveCard ────────────────────────────────────────────────────────

export interface InteractiveCardProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onSelect" | "onClick"
> {
  /** Unique value (required inside InteractiveCardGroup) */
  value?: string;
  /** Set to "link" for clickable navigation card with hover gradient + scale */
  mode?: "link";
  /** Controlled selected state (standalone select, no group) */
  selected?: boolean;
  /** Selection callback (standalone select, no group) */
  onSelect?: (value: string) => void;
  /** Click handler (link mode) */
  onClick?: (e: React.MouseEvent) => void;
  /** Show check badge when selected (select modes only) */
  showCheck?: boolean;
  /** Disable interactions */
  disabled?: boolean;
}

const InteractiveCard = React.forwardRef<HTMLDivElement, InteractiveCardProps>(
  (
    {
      value = "",
      mode: modeProp,
      selected: selectedProp,
      onSelect,
      onClick,
      showCheck = true,
      disabled: disabledProp = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const group = React.useContext(GroupCtx);

    // Resolve mode
    const isLink = modeProp === "link";
    const isGrouped = !!group;

    // Selection state
    const isSelected = isGrouped ? group.selected.includes(value) : (selectedProp ?? false);

    const isDisabled = isGrouped ? group.disabled || disabledProp : disabledProp;

    // Resolve ARIA role
    const role = isLink
      ? ("button" as const)
      : isGrouped
        ? group.mode === "single"
          ? ("radio" as const)
          : ("checkbox" as const)
        : ("checkbox" as const);

    const handleClick = (e: React.MouseEvent) => {
      if (isDisabled) return;
      if (isLink) {
        onClick?.(e);
      } else if (isGrouped) {
        group.toggle(value);
      } else {
        onSelect?.(value);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleClick(e as unknown as React.MouseEvent);
      }
    };

    return (
      <div
        ref={ref}
        {...props}
        role={role ?? (isLink ? "link" : group?.mode === "single" ? "radio" : "checkbox")}
        aria-checked={!isLink ? isSelected : undefined}
        aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          // ─── Base ───
          "group/card relative flex cursor-pointer select-none flex-col overflow-hidden",
          "rounded-[var(--radius-scale-xl)]",
          "border-[1.5px]",
          "outline-none",
          "transition-all duration-[var(--transition-fast)] [transition-timing-function:var(--transition-easing)]",
          // Focus
          "focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-[var(--focus-ring-offset)]",
          // Disabled
          isDisabled && "pointer-events-none opacity-[var(--disabled-opacity)]",

          // ─── Select modes ───
          !isLink && [
            "p-[var(--space-4)]",
            "border-[var(--color-border)] bg-[var(--color-bg-surface)]",
            !isSelected && !isDisabled && "hover:bg-[var(--color-hover)]",
            isSelected && "border-[var(--color-brand)] bg-[var(--color-brand-subtle)]",
          ],

          // ─── Link mode ───
          isLink && [
            "p-[var(--space-5)]",
            "border-[var(--color-border)] bg-[var(--color-bg-surface)]",
            !isDisabled && "hover:scale-[1.02] hover:shadow-[var(--shadow-md)]",
          ],

          className
        )}
      >
        {/* Hover gradient overlay — link mode only */}
        {isLink && !isDisabled && (
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[var(--transition-normal)] group-hover/card:opacity-100"
            style={{
              background: "linear-gradient(to top, var(--color-hover), transparent)",
            }}
          />
        )}

        {/* Check badge — select modes only */}
        {!isLink && showCheck && isSelected && (
          <span
            className={cn(
              "absolute right-[var(--space-3)] top-[var(--space-3)] z-10",
              "flex size-[var(--size-5)] items-center justify-center",
              "rounded-full bg-[var(--color-brand)]"
            )}
          >
            <Check className="size-[var(--icon-size-sm)] text-[color:var(--color-text-on-brand)]" />
          </span>
        )}

        {/* Content wrapper — above gradient overlay */}
        <div className="relative z-[1] flex flex-1 flex-col">{children}</div>
      </div>
    );
  }
);

InteractiveCard.displayName = "InteractiveCard";

// ─── InteractiveCardHeader ──────────────────────────────────────────────────

export type InteractiveCardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const InteractiveCardHeader = React.forwardRef<HTMLDivElement, InteractiveCardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-between gap-[var(--space-2)]", className)}
      {...props}
    >
      {children}
    </div>
  )
);

InteractiveCardHeader.displayName = "InteractiveCardHeader";

// ─── InteractiveCardContent ─────────────────────────────────────────────────

export type InteractiveCardContentProps = React.HTMLAttributes<HTMLDivElement>;

const InteractiveCardContent = React.forwardRef<HTMLDivElement, InteractiveCardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1", className)} {...props}>
      {children}
    </div>
  )
);

InteractiveCardContent.displayName = "InteractiveCardContent";

// ─── InteractiveCardFooter ──────────────────────────────────────────────────

export type InteractiveCardFooterProps = React.HTMLAttributes<HTMLDivElement>;

const InteractiveCardFooter = React.forwardRef<HTMLDivElement, InteractiveCardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mt-auto pt-[var(--space-2)]",
        "text-body-sm [font-weight:var(--font-weight-400)]",
        "text-[color:var(--color-text-muted)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

InteractiveCardFooter.displayName = "InteractiveCardFooter";

// ─── Exports ────────────────────────────────────────────────────────────────

export {
  InteractiveCardGroup,
  InteractiveCard,
  InteractiveCardHeader,
  InteractiveCardContent,
  InteractiveCardFooter,
};
