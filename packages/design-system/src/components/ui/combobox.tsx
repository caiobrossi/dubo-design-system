"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Command as CommandPrimitive } from "cmdk";
import { Check, ChevronDown, Search } from "dubo-design-system/lib/icons";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "dubo-design-system/lib/utils";
import { Label } from "dubo-design-system/components/ui/label";
import {
  fieldBodyLgClass,
  fieldDescriptionClass,
  fieldTransitionClass,
  floatingLabelCompactClass,
  floatingLabelIdleClass,
} from "dubo-design-system/components/ui/field-styles";

/**
 * Dubo Design System — Combobox
 *
 * Composable combobox built on Popover + cmdk (Command).
 *
 * Supports:
 * - Single select with search
 * - Multi-select with checkbox indicators
 * - Grouped options with headings
 * - Configurable trigger sizes (sm, default, lg)
 *
 * Sub-components:
 * - Combobox — root context provider
 * - ComboboxTrigger — button that opens the dropdown
 * - ComboboxContent — floating dropdown panel (Popover + Command)
 * - ComboboxInput — search input inside dropdown
 * - ComboboxEmpty — empty state when no results match
 * - ComboboxGroup — group with heading label
 * - ComboboxItem — selectable option (check or checkbox indicator)
 *
 * Tokens used:
 * - --color-bg-surface (trigger bg, dropdown bg)
 * - --color-border (trigger border, input border)
 * - --color-border-strong (trigger hover border)
 * - --color-text-primary (selected text, item text)
 * - --color-text-secondary (trigger selected text)
 * - --color-text-muted (placeholder, search icon, empty state)
 * - --color-hover (item hover bg)
 * - --color-pressed (item active bg)
 * - --color-brand (selected indicator bg in multi)
 * - --color-brand-hover (active checkbox bg)
 * - --color-text-on-brand (checkmark color)
 * - --height-control-sm (32px trigger)
 * - --height-control-md (40px trigger)
 * - --height-control-lg (48px trigger)
 * - --focus-ring (focus ring color)
 * - --disabled-opacity (disabled state)
 * - --transition-fast (animation duration)
 * - --glass-bg-light, --glass-border-light, --glass-blur-md,
 *   --glass-saturate, --shadow-lg (glass dropdown effect)
 */

// ─── Context ─────────────────────────────────────────────────────────────────

interface ComboboxContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
  multiple: boolean;
  onSelect: (itemValue: string) => void;
  isSelected: (itemValue: string) => boolean;
}

const ComboboxContext = React.createContext<ComboboxContextValue | null>(null);

function useCombobox() {
  const ctx = React.useContext(ComboboxContext);
  if (!ctx) {
    throw new Error("Combobox sub-components must be used within <Combobox>");
  }
  return ctx;
}

// ─── Combobox (Root) ─────────────────────────────────────────────────────────

interface ComboboxSingleProps {
  /** Single-select mode */
  multiple?: false;
  value: string;
  onValueChange: (value: string) => void;
}

interface ComboboxMultipleProps {
  /** Multi-select mode */
  multiple: true;
  value: string[];
  onValueChange: (value: string[]) => void;
}

type ComboboxProps = (ComboboxSingleProps | ComboboxMultipleProps) & {
  /** Controlled open state */
  open?: boolean;
  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Disable the combobox */
  disabled?: boolean;
  children: React.ReactNode;
};

const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      multiple = false,
      value,
      onValueChange,
      open: controlledOpen,
      onOpenChange: controlledOnOpenChange,
      disabled = false,
      children,
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
    const open = controlledOpen ?? uncontrolledOpen;
    const setOpen = controlledOnOpenChange ?? setUncontrolledOpen;

    const onSelect = React.useCallback(
      (itemValue: string) => {
        if (multiple) {
          const arr = value as string[];
          const next = arr.includes(itemValue)
            ? arr.filter((v) => v !== itemValue)
            : [...arr, itemValue];
          (onValueChange as (v: string[]) => void)(next);
        } else {
          (onValueChange as (v: string) => void)(itemValue === (value as string) ? "" : itemValue);
          setOpen(false);
        }
      },
      [multiple, value, onValueChange, setOpen]
    );

    const isSelected = React.useCallback(
      (itemValue: string) => {
        if (multiple) {
          return (value as string[]).includes(itemValue);
        }
        return (value as string) === itemValue;
      },
      [multiple, value]
    );

    const ctx = React.useMemo<ComboboxContextValue>(
      () => ({
        open,
        onOpenChange: setOpen,
        value,
        onValueChange: onValueChange as (v: string | string[]) => void,
        multiple,
        onSelect,
        isSelected,
      }),
      [open, setOpen, value, onValueChange, multiple, onSelect, isSelected]
    );

    return (
      <ComboboxContext.Provider value={ctx}>
        <PopoverPrimitive.Root
          open={disabled ? false : open}
          onOpenChange={disabled ? undefined : setOpen}
        >
          <div ref={ref} data-disabled={disabled || undefined}>
            {children}
          </div>
        </PopoverPrimitive.Root>
      </ComboboxContext.Provider>
    );
  }
);
Combobox.displayName = "Combobox";

// ─── ComboboxTrigger ─────────────────────────────────────────────────────────

const comboboxTriggerVariants = cva(
  [
    "inline-flex w-full items-center justify-between gap-2",
    "rounded-lg border",
    "bg-[var(--color-bg-surface)]",
    "border-[var(--color-border)]",
    "text-body-md",
    "transition-all duration-[var(--transition-fast)]",
    "[transition-timing-function:var(--transition-easing)]",
    "outline-none",
    "hover:border-[var(--color-border-strong)]",
    "focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
    "focus-visible:ring-offset-[var(--focus-ring-offset)]",
    "disabled:pointer-events-none disabled:opacity-[var(--disabled-opacity)]",
    "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-[var(--disabled-opacity)]",
    "cursor-pointer",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-[var(--height-control-sm)] px-3 text-body-sm",
        default: "h-[var(--height-control-md)] px-3 text-body-md",
        lg: "h-[var(--height-control-lg)] px-4 text-body-md",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const floatingTriggerVariants = cva(
  [
    "group relative flex w-full items-center",
    "rounded-[var(--radius-scale-xl)] border",
    "px-[var(--space-2)] gap-[var(--space-1)]",
    fieldTransitionClass,
  ].join(" "),
  {
    variants: {
      variant: {
        outline: [
          "cursor-pointer bg-[var(--color-bg-surface)]",
          "border-[var(--color-border-input)]",
          "data-[state=open]:border-2 data-[state=open]:border-[var(--color-border-focus)]",
        ].join(" "),
        filled: [
          "cursor-pointer border-transparent bg-[var(--color-hover)]",
          "hover:bg-[var(--color-pressed)]",
          "data-[state=open]:border data-[state=open]:border-[var(--color-border-focus)]",
          "data-[state=open]:bg-[var(--color-bg-surface)]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
);

interface ComboboxTriggerProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>, "asChild">,
    VariantProps<typeof comboboxTriggerVariants> {
  /** Placeholder text when nothing is selected */
  placeholder?: string;
  /** Labels for selected values — map value → display label */
  labels?: Record<string, string>;
  /** How multi-select values should be rendered in the trigger */
  multipleDisplay?: "summary" | "all";
}

function getComboboxDisplayLabel(
  value: string | string[],
  multiple: boolean,
  placeholder: string,
  labels?: Record<string, string>,
  multipleDisplay: "summary" | "all" = "summary"
) {
  if (multiple) {
    const arr = value as string[];
    if (arr.length === 0) {
      return <span className="truncate text-[color:var(--color-text-muted)]">{placeholder}</span>;
    }
    if (multipleDisplay === "all") {
      return (
        <span className="truncate text-[color:var(--color-text-primary)]">
          {arr.map((item) => labels?.[item] ?? item).join(", ")}
        </span>
      );
    }
    if (arr.length === 1) {
      return (
        <span className="truncate text-[color:var(--color-text-primary)]">
          {labels?.[arr[0]] ?? arr[0]}
        </span>
      );
    }
    return (
      <span className="flex items-center gap-2 text-[color:var(--color-text-primary)]">
        <span className="truncate">{labels?.[arr[0]] ?? arr[0]}</span>
        <span
          className={cn(
            "inline-flex items-center justify-center",
            "h-5 min-w-5 rounded-full px-1.5",
            "bg-[var(--color-brand)] text-[color:var(--color-text-on-brand)]",
            "text-body-sm font-medium"
          )}
        >
          +{arr.length - 1}
        </span>
      </span>
    );
  }

  const str = value as string;
  if (!str) {
    return <span className="truncate text-[color:var(--color-text-muted)]">{placeholder}</span>;
  }

  return (
    <span className="truncate text-[color:var(--color-text-primary)]">{labels?.[str] ?? str}</span>
  );
}

const ComboboxTrigger = React.forwardRef<HTMLButtonElement, ComboboxTriggerProps>(
  (
    { className, placeholder = "Select...", labels, multipleDisplay = "summary", size, ...props },
    ref
  ) => {
    const { value, multiple } = useCombobox();

    return (
      <PopoverPrimitive.Trigger
        ref={ref}
        className={cn(comboboxTriggerVariants({ size }), className)}
        {...props}
      >
        {getComboboxDisplayLabel(value, multiple, placeholder, labels, multipleDisplay)}
        <ChevronDown className="size-4 shrink-0 text-[color:var(--color-text-muted)] transition-transform duration-[var(--transition-fast)] [[data-state=open]_&]:rotate-180" />
      </PopoverPrimitive.Trigger>
    );
  }
);
ComboboxTrigger.displayName = "ComboboxTrigger";

// ─── ComboboxContent ─────────────────────────────────────────────────────────

interface ComboboxContentProps extends Omit<
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>,
  "children"
> {
  children: React.ReactNode;
  /** Custom scoring function for cmdk's built-in filter (does NOT disable filtering — see `shouldFilter`) */
  filter?: (value: string, search: string) => number;
  /**
   * Set to `false` to turn off cmdk's automatic filtering/sorting entirely — e.g. when the
   * options are already filtered server-side and `ComboboxItem` values aren't human-readable
   * (such as an id) for cmdk to match against. Defaults to cmdk's default (`true`).
   */
  shouldFilter?: boolean;
  /** Optional portal container to keep the content inside parent overlays such as dialogs */
  container?: HTMLElement | null;
}

const CommandRoot = CommandPrimitive as unknown as React.ComponentType<
  React.ComponentProps<typeof CommandPrimitive>
>;

const ComboboxContent = React.forwardRef<HTMLDivElement, ComboboxContentProps>(
  (
    {
      className,
      children,
      align = "start",
      sideOffset = 8,
      filter,
      shouldFilter,
      container,
      ...props
    },
    ref
  ) => {
    return (
      <PopoverPrimitive.Portal container={container ?? undefined}>
        <PopoverPrimitive.Content
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            "z-[60] w-[var(--radix-popover-trigger-width)] min-w-[220px] pointer-events-auto",
            "overflow-hidden",
            "rounded-xl",
            "border-[0.5px] border-[var(--glass-border-light)]",
            "bg-[var(--glass-bg-light)]",
            "[backdrop-filter:var(--glass-blur-md)_var(--glass-saturate)]",
            "shadow-[var(--shadow-lg)]",
            "p-0",
            /* Animation */
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
            "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
            className
          )}
          {...props}
        >
          <CommandRoot
            filter={filter}
            shouldFilter={shouldFilter}
            className="w-full pointer-events-auto"
          >
            {children}
          </CommandRoot>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    );
  }
);
ComboboxContent.displayName = "ComboboxContent";

// ─── ComboboxInput ───────────────────────────────────────────────────────────

const ComboboxInput = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b border-[var(--color-border)] px-3">
    <Search className="mr-2 size-4 shrink-0 text-[color:var(--color-text-muted)]" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-10 w-full bg-transparent py-3",
        "text-body-md outline-none",
        "text-[color:var(--color-text-primary)]",
        "placeholder:text-[color:var(--color-text-muted)]",
        "disabled:cursor-not-allowed disabled:opacity-[var(--disabled-opacity)]",
        className
      )}
      {...props}
    />
  </div>
));
ComboboxInput.displayName = "ComboboxInput";

// ─── ComboboxEmpty ───────────────────────────────────────────────────────────

const ComboboxEmpty = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={cn("py-6 text-center text-body-md text-[color:var(--color-text-muted)]", className)}
    {...props}
  />
));
ComboboxEmpty.displayName = "ComboboxEmpty";

// ─── ComboboxGroup ───────────────────────────────────────────────────────────

const ComboboxGroup = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn("overflow-hidden p-1 text-[color:var(--color-text-primary)]", className)}
    {...props}
  />
));
ComboboxGroup.displayName = "ComboboxGroup";

// ─── ComboboxItem ────────────────────────────────────────────────────────────

interface ComboboxItemProps extends Omit<
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>,
  "onSelect"
> {
  /** The value for this item */
  value: string;
}

const ComboboxItem = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Item>,
  ComboboxItemProps
>(({ className, children, value, ...props }, ref) => {
  const { multiple, onSelect, isSelected } = useCombobox();
  const selected = isSelected(value);

  return (
    <CommandPrimitive.Item
      ref={ref}
      value={value}
      onSelect={() => onSelect(value)}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center gap-2",
        "h-[var(--height-control-md)]",
        "rounded-[var(--radius-control-pill)] px-[var(--space-3)]",
        fieldBodyLgClass,
        "text-[color:var(--color-text-primary)]",
        "outline-none",
        fieldTransitionClass,
        "aria-selected:bg-[var(--color-hover)]",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-[var(--disabled-opacity)]",
        className
      )}
      {...props}
    >
      {/* Indicator: checkbox for multi, check for single */}
      {multiple ? (
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center",
            "size-4 rounded-[3px] border-[1.5px]",
            fieldTransitionClass,
            selected
              ? "border-[var(--color-brand-hover)] bg-[var(--color-brand-hover)] text-[color:var(--color-text-on-brand)]"
              : "border-[var(--color-border)] bg-transparent"
          )}
        >
          {selected && (
            <svg
              className="size-2.5 text-[color:var(--color-text-on-brand)]"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 3L4.5 8.5L2 6"
                stroke="var(--color-text-on-brand)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      ) : (
        <span className="inline-flex size-[var(--icon-size-md)] shrink-0 items-center justify-center">
          {selected && (
            <Check className="size-[var(--icon-size-md)] text-[color:var(--color-brand)]" />
          )}
        </span>
      )}

      {/* Label */}
      <span className="flex-1 truncate">{children}</span>
    </CommandPrimitive.Item>
  );
});
ComboboxItem.displayName = "ComboboxItem";

// ─── ComboboxList (internal wrapper around CommandPrimitive.List) ────────────

const ComboboxList = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(
      "max-h-[300px] overflow-y-auto overflow-x-hidden overscroll-contain touch-pan-y pointer-events-auto",
      className
    )}
    onWheelCapture={(event) => {
      event.stopPropagation();
      props.onWheelCapture?.(event);
    }}
    onTouchMoveCapture={(event) => {
      event.stopPropagation();
      props.onTouchMoveCapture?.(event);
    }}
    {...props}
  />
));
ComboboxList.displayName = "ComboboxList";

interface ComboboxFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  htmlFor?: string;
  helpText?: React.ReactNode;
  required?: boolean;
  optional?: boolean;
  info?: string | React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
}

function ComboboxField({
  label,
  htmlFor,
  helpText,
  required = false,
  optional = false,
  info,
  disabled = false,
  className,
  children,
  ...props
}: ComboboxFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props}>
      <Label
        htmlFor={htmlFor}
        required={required}
        optional={optional}
        info={info}
        disabled={disabled}
      >
        {label}
      </Label>
      {children}
      {helpText ? <p className={fieldDescriptionClass}>{helpText}</p> : null}
    </div>
  );
}

interface FloatingComboboxTriggerProps
  extends Omit<ComboboxTriggerProps, "size">, VariantProps<typeof floatingTriggerVariants> {
  label: string;
}

const FloatingComboboxTrigger = React.forwardRef<HTMLButtonElement, FloatingComboboxTriggerProps>(
  (
    {
      className,
      label,
      placeholder = "Select...",
      labels,
      multipleDisplay = "summary",
      variant,
      ...props
    },
    ref
  ) => {
    const { value, multiple, open } = useCombobox();
    const hasValue = multiple ? (value as string[]).length > 0 : Boolean(value as string);
    const isFloating = open || hasValue;

    return (
      <PopoverPrimitive.Trigger
        ref={ref}
        className={cn(
          floatingTriggerVariants({ variant }),
          "relative h-[var(--size-14)] w-full",
          className
        )}
        {...props}
      >
        <div className="relative flex h-full flex-1 items-center px-1 text-left">
          <span
            className={cn(
              "absolute left-1 pointer-events-none select-none",
              fieldTransitionClass,
              isFloating
                ? `top-1 -translate-y-0 ${floatingLabelCompactClass}`
                : `top-1/2 -translate-y-1/2 ${floatingLabelIdleClass} text-[color:var(--color-text-secondary)]`,
              isFloating && "text-[color:var(--color-text-secondary)]"
            )}
          >
            {label}
          </span>
          <span
            className={cn(
              "w-full truncate pt-[var(--space-5)] pb-[var(--space-1)] text-left text-[color:var(--color-text-primary)]",
              !isFloating && "opacity-0"
            )}
          >
            {getComboboxDisplayLabel(value, multiple, placeholder, labels, multipleDisplay)}
          </span>
        </div>
        <ChevronDown className="size-4 shrink-0 text-[color:var(--color-text-muted)] transition-transform duration-[var(--transition-fast)] [[data-state=open]_&]:rotate-180" />
      </PopoverPrimitive.Trigger>
    );
  }
);
FloatingComboboxTrigger.displayName = "FloatingComboboxTrigger";

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  Combobox,
  ComboboxField,
  ComboboxTrigger,
  FloatingComboboxTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxList,
  comboboxTriggerVariants,
};

export type {
  ComboboxProps,
  ComboboxTriggerProps,
  ComboboxFieldProps,
  FloatingComboboxTriggerProps,
  ComboboxItemProps,
  ComboboxContentProps,
};
