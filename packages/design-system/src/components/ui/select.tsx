"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown, ChevronUp, Check, X } from "dubo-design-system/lib/icons";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "dubo-design-system/lib/utils";
import { useDesignSystemLabel } from "dubo-design-system/lib/labels";
import { dropdownPanelClasses } from "dubo-design-system/components/ui/dropdown-menu";
import { Label } from "./label";
import { useMobileNativeControl } from "./mobile-native-control";
import {
  fieldBodyLgClass,
  fieldClearActionClass,
  fieldClearActionVisibleClass,
  fieldDescriptionClass,
  fieldOpenFilledVariantClass,
  fieldOpenOutlineVariantClass,
  fieldTransitionClass,
  floatingLabelCompactClass,
  floatingLabelIdleClass,
} from "dubo-design-system/components/ui/field-styles";

/**
 * Dubo Design System — Select
 *
 * Matches Input component visually (same variants, sizes, tokens).
 *
 * Two styles:
 * 1. `Select` — standard select with label above (40px)
 * 2. `FloatingSelect` — floating label that animates inside→top (56px)
 *
 * Both reuse the same shared field, spacing, radius, and typography roles as Input.
 *
 * Variants: outline | filled
 * Features: clearable, icons, error state, disabled, groups, help text
 *
 * Dropdown uses Dubo frosted-glass style with scale-in animation.
 *
 * The trigger mirrors the Input family: 40px standard, 56px floating.
 * The dropdown keeps the shared frosted glass overlay recipe.
 */

/* ── Trigger container variants (matches Input exactly) ── */

const triggerContainerVariants = cva(
  [
    "group flex min-w-0 w-full items-center",
    "rounded-[var(--radius-control-input)]",
    "border",
    "px-[var(--space-2)] gap-[var(--space-1)]",
    fieldTransitionClass,
    "cursor-pointer",
  ].join(" "),
  {
    variants: {
      variant: {
        outline: fieldOpenOutlineVariantClass,
        filled: fieldOpenFilledVariantClass,
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
);

/* ── Floating trigger container variants ── */

const floatingTriggerVariants = cva(
  [
    "group relative flex min-w-0 w-full items-center",
    "rounded-[var(--radius-scale-xl)]",
    "border",
    "px-[var(--space-2)] gap-[var(--space-1)]",
    fieldTransitionClass,
    "cursor-pointer",
  ].join(" "),
  {
    variants: {
      variant: {
        outline: [
          "border-[var(--color-border-input)]",
          "bg-[var(--color-bg-surface)]",
          "data-[state=open]:border-2 data-[state=open]:border-[var(--color-border-focus)]",
        ].join(" "),
        filled: [
          "border-transparent",
          "bg-[var(--color-hover)]",
          "hover:bg-[var(--color-pressed)]",
          "data-[state=open]:border data-[state=open]:border-[var(--color-border-focus)]",
          "data-[state=open]:!bg-[var(--color-bg-surface)]",
          "data-[state=open]:hover:!bg-[var(--color-bg-surface)]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
);

/* ── Clear button (same as Input) ── */

function ClearButton({
  onClick,
  visible,
}: {
  onClick: (e: React.MouseEvent) => void;
  visible: boolean;
}) {
  const clearLabel = useDesignSystemLabel("clear");

  return (
    <span
      role="button"
      onPointerDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick(e);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.stopPropagation();
          onClick(e as unknown as React.MouseEvent);
        }
      }}
      className={cn(
        fieldClearActionClass,
        "cursor-pointer",
        visible && fieldClearActionVisibleClass
      )}
      title={clearLabel}
      aria-label={clearLabel}
      tabIndex={visible ? 0 : -1}
    >
      <X className="size-[var(--icon-size-sm)]" />
    </span>
  );
}

/* ── Dropdown content — reuses shared frosted glass panel from DropdownMenu ── */

const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      sideOffset={6}
      className={cn(
        dropdownPanelClasses,
        position === "popper" &&
          "max-h-[--radix-select-content-available-height] min-w-[var(--radix-select-trigger-width)]",
        className
      )}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          position === "popper" && "h-[var(--radix-select-content-available-height)] max-h-60"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = "SelectContent";

/* ── Select item ── */

const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    icon?: React.ReactNode;
  }
>(({ className, children, icon, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full min-w-0 cursor-pointer select-none items-center gap-2",
      "h-[var(--height-control-md)]",
      "px-[var(--space-3)]",
      "rounded-[var(--radius-control-pill)]",
      fieldBodyLgClass,
      "text-[color:var(--color-text-primary)]",
      "outline-none",
      fieldTransitionClass,
      "data-[highlighted]:bg-[var(--color-hover)]",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-[var(--disabled-opacity)]",
      className
    )}
    {...props}
  >
    {icon && (
      <span className="shrink-0 text-[color:var(--color-text-secondary)] [&_svg]:size-[var(--icon-size-md)]">
        {icon}
      </span>
    )}
    <SelectPrimitive.ItemText className="min-w-0 flex-1 overflow-hidden truncate">
      {children}
    </SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator className="shrink-0">
      <Check className="size-[var(--icon-size-md)] text-[color:var(--color-brand)]" />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
));
SelectItem.displayName = "SelectItem";

/* ── Select group ── */

const SelectGroup = SelectPrimitive.Group;

const SelectGroupLabel = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "px-[var(--space-3)] py-[var(--space-2)]",
      "text-body-sm [font-weight:var(--font-weight-400)] uppercase [letter-spacing:0em]",
      "text-[color:var(--color-text-muted)]",
      className
    )}
    {...props}
  />
));
SelectGroupLabel.displayName = "SelectGroupLabel";

/* ── Separator ── */

const SelectSeparator = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("mx-2 my-1 h-px bg-[var(--color-border)]", className)}
    {...props}
  />
));
SelectSeparator.displayName = "SelectSeparator";

type NativeSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type NativeSelectEntry =
  | {
      type: "option";
      option: NativeSelectOption;
    }
  | {
      type: "group";
      label: string;
      options: NativeSelectOption[];
    };

function extractTextContent(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map((child) => extractTextContent(child)).join("");
  }

  if (React.isValidElement(node)) {
    return extractTextContent((node.props as { children?: React.ReactNode }).children);
  }

  return "";
}

function isNativeOptionElement(
  element: React.ReactElement<{ value?: string; children?: React.ReactNode }>
) {
  return typeof element.props.value === "string";
}

function extractNativeSelectEntries(children: React.ReactNode): NativeSelectEntry[] {
  const entries: NativeSelectEntry[] = [];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    const childElement = child as React.ReactElement<{
      value?: string;
      disabled?: boolean;
      children?: React.ReactNode;
    }>;

    if (isNativeOptionElement(childElement)) {
      entries.push({
        type: "option",
        option: {
          value: childElement.props.value ?? "",
          label: extractTextContent(childElement.props.children).trim(),
          disabled: Boolean(childElement.props.disabled),
        },
      });
      return;
    }

    const nestedChildren = React.Children.toArray(childElement.props.children);
    const groupLabelChild = nestedChildren.find(
      (nestedChild) => React.isValidElement(nestedChild) && nestedChild.type === SelectGroupLabel
    );
    const nestedEntries = extractNativeSelectEntries(childElement.props.children);

    if (groupLabelChild && nestedEntries.length > 0) {
      const groupLabelElement = groupLabelChild as React.ReactElement<{
        children?: React.ReactNode;
      }>;
      entries.push({
        type: "group",
        label: extractTextContent(groupLabelElement.props.children).trim(),
        options: nestedEntries
          .filter(
            (entry): entry is Extract<NativeSelectEntry, { type: "option" }> =>
              entry.type === "option"
          )
          .map((entry) => entry.option),
      });
      return;
    }

    entries.push(...nestedEntries);
  });

  return entries;
}

/* ── Scroll buttons ── */

function SelectScrollUpButton() {
  return (
    <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
      <ChevronUp className="size-[var(--icon-size-md)] text-[color:var(--color-text-muted)]" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton() {
  return (
    <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
      <ChevronDown className="size-[var(--icon-size-md)] text-[color:var(--color-text-muted)]" />
    </SelectPrimitive.ScrollDownButton>
  );
}

/* ══════════════════════════════════════════════════ */
/* ── Standard Select ──                              */
/* ══════════════════════════════════════════════════ */

export interface SelectProps extends VariantProps<typeof triggerContainerVariants> {
  /** Label text above the select */
  label?: React.ReactNode;
  /** Accessible label for unlabeled selects */
  ariaLabel?: string;
  /** Help text or error message below */
  helpText?: React.ReactNode;
  /** Error state */
  error?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Icon on the left side */
  icon?: React.ReactNode;
  /** Show clear (X) button when value is selected */
  clearable?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Open state callback */
  onOpenChange?: (open: boolean) => void;
  /** Additional className for the trigger */
  className?: string;
  /** Controlled value */
  value?: string;
  /** Default value */
  defaultValue?: string;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Dropdown content (SelectItem, SelectGroup, etc.) */
  children: React.ReactNode;
}

function Select({
  variant,
  label,
  ariaLabel,
  helpText,
  error = false,
  placeholder = "Select...",
  icon,
  clearable = false,
  disabled = false,
  onOpenChange,
  className,
  value,
  defaultValue,
  onValueChange,
  children,
}: SelectProps) {
  const useNativeControl = useMobileNativeControl();
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const currentValue = value !== undefined ? value : internalValue;
  const hasValue = currentValue !== "";
  const normalizedPlaceholder = typeof placeholder === "string" ? placeholder.trim() : "";
  const nativeEntries = React.useMemo(() => extractNativeSelectEntries(children), [children]);
  const hasExplicitEmptyOption = React.useMemo(
    () =>
      nativeEntries.some(
        (entry) =>
          (entry.type === "option" && entry.option.value === "") ||
          (entry.type === "group" && entry.options.some((option) => option.value === ""))
      ),
    [nativeEntries]
  );
  const shouldRenderNativePlaceholderOption =
    !hasExplicitEmptyOption && (normalizedPlaceholder.length > 0 || currentValue === "");

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      setInternalValue(newValue);
      onValueChange?.(newValue);
    },
    [onValueChange]
  );

  const handleClear = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setInternalValue("");
      onValueChange?.("");
    },
    [onValueChange]
  );

  if (useNativeControl) {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <Label
            className={cn(disabled && "opacity-[var(--disabled-opacity)] cursor-not-allowed")}
            disabled={disabled}
          >
            {label}
          </Label>
        )}

        <div
          className={cn(
            triggerContainerVariants({ variant }),
            "h-[var(--height-control-md)]",
            error && "border-[var(--color-danger)]",
            disabled && "opacity-[var(--disabled-opacity)] cursor-not-allowed",
            className
          )}
        >
          {icon && (
            <span className="shrink-0 text-[color:var(--color-text-secondary)] [&_svg]:size-[var(--icon-size-md)]">
              {icon}
            </span>
          )}

          <select
            aria-label={ariaLabel}
            disabled={disabled}
            value={currentValue}
            className={cn(
              "min-w-0 flex-1 appearance-none truncate border-none bg-transparent outline-none",
              fieldBodyLgClass,
              currentValue
                ? "text-[color:var(--color-text-primary)]"
                : "text-[color:var(--color-text-muted)]",
              "focus:outline-none focus:ring-0"
            )}
            onFocus={() => onOpenChange?.(true)}
            onBlur={() => onOpenChange?.(false)}
            onChange={(event) => handleValueChange(event.target.value)}
          >
            {shouldRenderNativePlaceholderOption && <option value="">{placeholder}</option>}
            {nativeEntries.map((entry, index) =>
              entry.type === "group" ? (
                <optgroup key={`${entry.label}-${index}`} label={entry.label}>
                  {entry.options.map((option) => (
                    <option key={option.value} value={option.value} disabled={option.disabled}>
                      {option.label}
                    </option>
                  ))}
                </optgroup>
              ) : (
                <option
                  key={entry.option.value || `empty-option-${index}`}
                  value={entry.option.value}
                  disabled={entry.option.disabled}
                >
                  {entry.option.label}
                </option>
              )
            )}
          </select>

          {clearable && !disabled && <ClearButton onClick={handleClear} visible={hasValue} />}
          <ChevronDown
            className={cn(
              "size-[var(--icon-size-md)] shrink-0 text-[color:var(--color-text-muted)]",
              fieldTransitionClass
            )}
          />
        </div>

        {helpText && (
          <p
            className={cn(
              fieldDescriptionClass,
              error
                ? "text-[color:var(--color-danger)]"
                : "text-[color:var(--color-text-secondary)]"
            )}
          >
            {helpText}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label
          className={cn(disabled && "opacity-[var(--disabled-opacity)] cursor-not-allowed")}
          disabled={disabled}
        >
          {label}
        </Label>
      )}

      <SelectPrimitive.Root
        value={currentValue}
        onValueChange={handleValueChange}
        onOpenChange={onOpenChange}
        disabled={disabled}
      >
        <SelectPrimitive.Trigger
          aria-label={ariaLabel}
          className={cn(
            triggerContainerVariants({ variant }),
            "h-[var(--height-control-md)]",
            error && "border-[var(--color-danger)] data-[state=open]:border-[var(--color-danger)]",
            disabled && "opacity-[var(--disabled-opacity)] cursor-not-allowed",
            className
          )}
        >
          {icon && (
            <span className="shrink-0 text-[color:var(--color-text-secondary)] [&_svg]:size-[var(--icon-size-md)]">
              {icon}
            </span>
          )}
          <span
            className={cn(
              "min-w-0 flex-1 overflow-hidden truncate text-left [&>span]:block [&>span]:truncate",
              fieldBodyLgClass
            )}
          >
            <SelectPrimitive.Value
              placeholder={
                <span className="block truncate text-[color:var(--color-text-muted)]">
                  {placeholder}
                </span>
              }
            />
          </span>
          {clearable && !disabled && <ClearButton onClick={handleClear} visible={hasValue} />}
          <SelectPrimitive.Icon asChild>
            <ChevronDown
              className={cn(
                "size-[var(--icon-size-md)] shrink-0 text-[color:var(--color-text-muted)]",
                fieldTransitionClass
              )}
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectContent>{children}</SelectContent>
      </SelectPrimitive.Root>

      {helpText && (
        <p
          className={cn(
            fieldDescriptionClass,
            error ? "text-[color:var(--color-danger)]" : "text-[color:var(--color-text-secondary)]"
          )}
        >
          {helpText}
        </p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════ */
/* ── Floating Label Select ──                        */
/* ══════════════════════════════════════════════════ */

export interface FloatingSelectProps extends VariantProps<typeof floatingTriggerVariants> {
  /** Floating label text (required) */
  label: string;
  /** Help text or error message below */
  helpText?: React.ReactNode;
  /** Error state */
  error?: boolean;
  /** Placeholder — shown when idle (disappears on open/value) */
  placeholder?: string;
  /** Icon on the left side */
  icon?: React.ReactNode;
  /** Show clear (X) button when value is selected */
  clearable?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Open state callback */
  onOpenChange?: (open: boolean) => void;
  /** Controlled open state */
  open?: boolean;
  /** Additional className for the trigger */
  className?: string;
  /** Controlled value */
  value?: string;
  /** Default value */
  defaultValue?: string;
  /** Callback when value changes */
  onValueChange?: (value: string) => void;
  /** Dropdown content */
  children: React.ReactNode;
  /** Keep a field-specific dropdown on a stable side when required by the form layout. */
  contentSide?: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>["side"];
  /** Disable collision flipping for fields that must remain anchored to one side. */
  contentAvoidCollisions?: boolean;
}

function FloatingSelect({
  variant,
  label,
  helpText,
  error = false,
  placeholder,
  icon,
  clearable = false,
  disabled = false,
  onOpenChange,
  open,
  className,
  value,
  defaultValue,
  onValueChange,
  children,
  contentSide,
  contentAvoidCollisions,
}: FloatingSelectProps) {
  const useNativeControl = useMobileNativeControl();
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const [isOpen, setIsOpen] = React.useState(false);
  const currentValue = value !== undefined ? value : internalValue;
  const currentOpen = open !== undefined ? open : isOpen;
  const hasValue = currentValue !== "";
  const normalizedPlaceholder = typeof placeholder === "string" ? placeholder.trim() : "";
  const isFloating =
    currentOpen || hasValue || (useNativeControl && normalizedPlaceholder.length > 0);
  const nativeEntries = React.useMemo(() => extractNativeSelectEntries(children), [children]);
  const hasExplicitEmptyOption = React.useMemo(
    () =>
      nativeEntries.some(
        (entry) =>
          (entry.type === "option" && entry.option.value === "") ||
          (entry.type === "group" && entry.options.some((option) => option.value === ""))
      ),
    [nativeEntries]
  );
  const shouldRenderNativePlaceholderOption =
    !hasExplicitEmptyOption && (normalizedPlaceholder.length > 0 || currentValue === "");

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      setInternalValue(newValue);
      onValueChange?.(newValue);
    },
    [onValueChange]
  );

  const handleClear = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setInternalValue("");
      onValueChange?.("");
    },
    [onValueChange]
  );

  if (useNativeControl) {
    return (
      <div className="flex flex-col gap-1.5">
        <div
          className={cn(
            floatingTriggerVariants({ variant }),
            "h-[var(--size-14)]",
            error && "border-[var(--color-danger)]",
            disabled && "opacity-[var(--disabled-opacity)] cursor-not-allowed",
            className
          )}
        >
          {icon && (
            <span className="z-10 shrink-0 text-[color:var(--color-text-secondary)] [&_svg]:size-[var(--icon-size-md)]">
              {icon}
            </span>
          )}

          <div className="relative flex h-full min-w-0 flex-1 items-center px-1">
            <span
              className={cn(
                "absolute left-1 pointer-events-none select-none transition-all duration-200 ease-out",
                isFloating
                  ? `top-1 -translate-y-0 ${floatingLabelCompactClass}`
                  : `top-1/2 -translate-y-1/2 ${floatingLabelIdleClass}`,
                error
                  ? "text-[color:var(--color-danger)]"
                  : "text-[color:var(--color-text-secondary)]",
                disabled && "opacity-50"
              )}
            >
              {label}
            </span>

            <select
              disabled={disabled}
              value={currentValue}
              className={cn(
                "h-full w-full min-w-0 appearance-none truncate border-none bg-transparent outline-none",
                fieldBodyLgClass,
                "pt-[var(--space-5)] pb-[var(--space-1)]",
                currentValue
                  ? "text-[color:var(--color-text-primary)]"
                  : "text-[color:var(--color-text-muted)]",
                "focus:outline-none focus:ring-0"
              )}
              aria-label={label}
              onFocus={() => {
                setIsOpen(true);
                onOpenChange?.(true);
              }}
              onBlur={() => {
                setIsOpen(false);
                onOpenChange?.(false);
              }}
              onChange={(event) => handleValueChange(event.target.value)}
            >
              {shouldRenderNativePlaceholderOption && <option value="">{placeholder}</option>}
              {nativeEntries.map((entry, index) =>
                entry.type === "group" ? (
                  <optgroup key={`${entry.label}-${index}`} label={entry.label}>
                    {entry.options.map((option) => (
                      <option key={option.value} value={option.value} disabled={option.disabled}>
                        {option.label}
                      </option>
                    ))}
                  </optgroup>
                ) : (
                  <option
                    key={entry.option.value || `empty-option-${index}`}
                    value={entry.option.value}
                    disabled={entry.option.disabled}
                  >
                    {entry.option.label}
                  </option>
                )
              )}
            </select>
          </div>

          {clearable && !disabled && <ClearButton onClick={handleClear} visible={hasValue} />}
          <ChevronDown
            className={cn(
              "size-[var(--icon-size-md)] shrink-0 text-[color:var(--color-text-muted)]",
              fieldTransitionClass
            )}
          />
        </div>

        {helpText && (
          <p
            className={cn(
              fieldDescriptionClass,
              error
                ? "text-[color:var(--color-danger)]"
                : "text-[color:var(--color-text-secondary)]"
            )}
          >
            {helpText}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <SelectPrimitive.Root
        value={currentValue}
        onValueChange={handleValueChange}
        onOpenChange={(nextOpen) => {
          setIsOpen(nextOpen);
          onOpenChange?.(nextOpen);
        }}
        open={currentOpen}
        disabled={disabled}
      >
        <SelectPrimitive.Trigger
          className={cn(
            floatingTriggerVariants({ variant }),
            "h-[var(--size-14)]",
            error && "border-[var(--color-danger)] data-[state=open]:border-[var(--color-danger)]",
            disabled && "opacity-[var(--disabled-opacity)] cursor-not-allowed",
            className
          )}
        >
          {icon && (
            <span className="z-10 shrink-0 text-[color:var(--color-text-secondary)] [&_svg]:size-[var(--icon-size-md)]">
              {icon}
            </span>
          )}

          {/* Value + floating label container */}
          <div className="relative flex h-full min-w-0 flex-1 items-center px-1">
            {/* Floating label */}
            <span
              className={cn(
                "absolute left-1 pointer-events-none select-none",
                "transition-all duration-200 ease-out",
                isFloating
                  ? `top-1 -translate-y-0 ${floatingLabelCompactClass}`
                  : `top-1/2 -translate-y-1/2 ${floatingLabelIdleClass}`,
                error
                  ? "text-[color:var(--color-danger)]"
                  : currentOpen
                    ? "text-[color:var(--color-border-focus)]"
                    : hasValue
                      ? "text-[color:var(--color-text-secondary)]"
                      : "text-[color:var(--color-text-secondary)]",
                disabled && "opacity-50"
              )}
            >
              {label}
            </span>

            {/* Value display */}
            <span
              className={cn(
                "block min-w-0 w-full overflow-hidden truncate text-left [&>span]:block [&>span]:truncate",
                fieldBodyLgClass,
                "text-[color:var(--color-text-primary)]",
                isFloating ? "pt-[var(--space-5)] pb-[var(--space-1)]" : "opacity-0"
              )}
            >
              {hasValue ? (
                <SelectPrimitive.Value />
              ) : (
                placeholder &&
                isOpen && (
                  <span className="text-[color:var(--color-text-muted)]">{placeholder}</span>
                )
              )}
            </span>
          </div>

          {clearable && !disabled && <ClearButton onClick={handleClear} visible={hasValue} />}
          <SelectPrimitive.Icon asChild>
            <ChevronDown
              className={cn(
                "size-[var(--icon-size-md)] shrink-0 text-[color:var(--color-text-muted)]",
                fieldTransitionClass,
                currentOpen && "rotate-180"
              )}
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectContent side={contentSide} avoidCollisions={contentAvoidCollisions}>
          {children}
        </SelectContent>
      </SelectPrimitive.Root>

      {helpText && (
        <p
          className={cn(
            fieldDescriptionClass,
            error ? "text-[color:var(--color-danger)]" : "text-[color:var(--color-text-secondary)]"
          )}
        >
          {helpText}
        </p>
      )}
    </div>
  );
}

export {
  Select,
  FloatingSelect,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectGroupLabel,
  SelectSeparator,
};
