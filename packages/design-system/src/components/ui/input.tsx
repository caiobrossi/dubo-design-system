"use client";

import * as React from "react";
import { X } from "@dubo/design-system-shared/lib/icons";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@dubo/design-system-shared/lib/utils";
import { useDesignSystemLabel } from "@dubo/design-system-shared/lib/labels";
import { Label } from "./label";
import {
  fieldBodyLgClass,
  fieldClearActionClass,
  fieldClearActionVisibleClass,
  fieldDescriptionClass,
  fieldFilledVariantClass,
  fieldOutlineVariantClass,
  fieldTransitionClass,
  floatingLabelCompactFilledClass,
  floatingLabelCompactFocusClass,
  floatingLabelIdleClass,
} from "@dubo/design-system-shared/components/ui/field-styles";

/**
 * Dubo Design System — Input
 *
 * Two styles:
 * 1. `Input` — standard text input with label above (40px)
 * 2. `FloatingInput` — floating label that animates inside→top (56px)
 *
 * Both reuse the shared field, spacing, radius, and typography roles.
 *
 * Variants: outline | filled
 * Features: icons (left/right), clearable (X button), error, disabled, help text
 *
 * Floating label uses pure CSS (peer selectors) — no useState needed.
 */

/* ── Shared input field classes ── */

const inputFieldBase = [
  "h-full w-full border-none bg-transparent outline-none",
  fieldBodyLgClass,
  "text-[color:var(--color-text-primary)]",
  "placeholder:text-[color:var(--color-text-muted)]",
  "[&::-webkit-search-cancel-button]:appearance-none",
  "[&::-webkit-search-decoration]:appearance-none",
  "[&::-webkit-search-results-button]:appearance-none",
  "[&::-webkit-search-results-decoration]:appearance-none",
  "focus:placeholder:text-transparent",
  "focus:outline-none focus:ring-0",
  "disabled:cursor-not-allowed",
  "[&_svg]:size-[var(--icon-size-md)]",
].join(" ");

/* ── Clear button ── */

function ClearButton({ onClick, visible }: { onClick: () => void; visible: boolean }) {
  const clearLabel = useDesignSystemLabel("clear");

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(fieldClearActionClass, visible && fieldClearActionVisibleClass)}
      title={clearLabel}
      aria-label={clearLabel}
      tabIndex={visible ? 0 : -1}
    >
      <X className="size-[var(--icon-size-sm)]" />
    </button>
  );
}

/* ── Standard Input ── */

const inputContainerVariants = cva(
  [
    "group flex w-full items-center",
    "rounded-[var(--radius-control-input)]",
    "border",
    "px-[var(--space-2)] gap-[var(--space-1)]",
    fieldTransitionClass,
  ].join(" "),
  {
    variants: {
      variant: {
        outline: fieldOutlineVariantClass,
        filled: fieldFilledVariantClass,
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
);

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputContainerVariants> {
  /** Label text above the input */
  label?: React.ReactNode;
  /** Help text or error message below the input */
  helpText?: React.ReactNode;
  /** Error state — red border + error helpText color */
  error?: boolean;
  /** Icon on the left side */
  icon?: React.ReactNode;
  /** Icon on the right side */
  iconRight?: React.ReactNode;
  /** Static suffix rendered after the input value */
  suffix?: React.ReactNode;
  /** Show clear (X) button when input has value */
  clearable?: boolean;
  /** Called when clear button is clicked */
  onClear?: () => void;
  /** Additional className for the inner input element */
  inputClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      label,
      helpText,
      error = false,
      icon,
      iconRight,
      suffix,
      clearable = false,
      onClear,
      inputClassName,
      disabled,
      id,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const internalRef = React.useRef<HTMLInputElement | null>(null);
    const [internalHasValue, setInternalHasValue] = React.useState(false);
    const hasValue = value !== undefined ? value !== "" : internalHasValue;

    const setRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
        if (node) setInternalHasValue(node.value !== "");
      },
      [ref]
    );

    const handleClear = React.useCallback(() => {
      if (onClear) {
        onClear();
      }
      if (internalRef.current) {
        // For uncontrolled inputs, clear the DOM value directly
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        )?.set;
        nativeInputValueSetter?.call(internalRef.current, "");
        internalRef.current.dispatchEvent(new Event("input", { bubbles: true }));
        internalRef.current.focus();
      }
      setInternalHasValue(false);
    }, [onClear]);

    // Track value changes for uncontrolled inputs
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalHasValue(e.target.value !== "");
        onChange?.(e);
      },
      [onChange]
    );

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <Label
            htmlFor={inputId}
            className={cn(disabled && "opacity-[var(--disabled-opacity)] cursor-not-allowed")}
            disabled={disabled}
          >
            {label}
          </Label>
        )}
        <div
          className={cn(
            inputContainerVariants({ variant }),
            "h-[var(--height-control-md)]",
            error && "border-[var(--color-danger)] focus-within:border-[var(--color-danger)]",
            disabled && "opacity-[var(--disabled-opacity)] cursor-not-allowed",
            className
          )}
        >
          {icon && (
            <span className="shrink-0 text-[color:var(--color-text-secondary)] [&_svg]:size-[var(--icon-size-md)]">
              {icon}
            </span>
          )}
          <input
            ref={setRefs}
            id={inputId}
            disabled={disabled}
            value={value}
            suppressHydrationWarning
            className={cn(inputFieldBase, "min-w-0 flex-1", inputClassName)}
            {...props}
            onChange={handleChange}
          />
          {suffix && (
            <span
              className={cn(
                "shrink-0 whitespace-nowrap",
                error
                  ? "text-[color:var(--color-danger)]"
                  : "text-[color:var(--color-text-secondary)]",
                fieldBodyLgClass
              )}
            >
              {suffix}
            </span>
          )}
          {clearable && !disabled && <ClearButton onClick={handleClear} visible={hasValue} />}
          {iconRight && (
            <span
              className={cn(
                "shrink-0 [&_svg]:size-[var(--icon-size-md)]",
                error
                  ? "text-[color:var(--color-danger)]"
                  : "text-[color:var(--color-text-secondary)]"
              )}
            >
              {iconRight}
            </span>
          )}
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
);

Input.displayName = "Input";

/* ── Floating Label Input ── */

const floatingContainerVariants = cva(
  [
    "group relative flex w-full items-center",
    "rounded-[var(--radius-scale-xl)]",
    "border",
    "px-[var(--space-2)] gap-[var(--space-1)]",
    fieldTransitionClass,
  ].join(" "),
  {
    variants: {
      variant: {
        outline: fieldOutlineVariantClass,
        filled: fieldFilledVariantClass,
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
);

export interface FloatingInputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof floatingContainerVariants> {
  /** Floating label text (required) */
  label: string;
  /** Help text or error message below the input */
  helpText?: React.ReactNode;
  /** Error state */
  error?: boolean;
  /** Icon on the left side */
  icon?: React.ReactNode;
  /** Icon on the right side */
  iconRight?: React.ReactNode;
  /** Static suffix rendered after the input value */
  suffix?: React.ReactNode;
  /** Show clear (X) button when input has value */
  clearable?: boolean;
  /** Called when clear button is clicked */
  onClear?: () => void;
  /** Additional className for the inner input element */
  inputClassName?: string;
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  (
    {
      className,
      variant,
      label,
      helpText,
      error = false,
      icon,
      iconRight,
      suffix,
      clearable = false,
      onClear,
      inputClassName,
      disabled,
      id,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const internalRef = React.useRef<HTMLInputElement | null>(null);
    const [internalHasValue, setInternalHasValue] = React.useState(false);
    const hasValue = value !== undefined ? value !== "" : internalHasValue;

    const setRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
        if (node) setInternalHasValue(node.value !== "");
      },
      [ref]
    );

    const handleClear = React.useCallback(() => {
      if (onClear) {
        onClear();
      }
      if (internalRef.current) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        )?.set;
        nativeInputValueSetter?.call(internalRef.current, "");
        internalRef.current.dispatchEvent(new Event("input", { bubbles: true }));
        internalRef.current.focus();
      }
      setInternalHasValue(false);
    }, [onClear]);

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalHasValue(e.target.value !== "");
        onChange?.(e);
      },
      [onChange]
    );

    return (
      <div className="flex flex-col gap-1.5">
        <div
          className={cn(
            floatingContainerVariants({ variant }),
            "h-[var(--size-14)]",
            error && "border-[var(--color-danger)] focus-within:border-[var(--color-danger)]",
            disabled && "opacity-[var(--disabled-opacity)] cursor-not-allowed",
            className
          )}
        >
          {icon && (
            <span className="z-10 shrink-0 text-[color:var(--color-text-secondary)] [&_svg]:size-[var(--icon-size-md)]">
              {icon}
            </span>
          )}

          {/* Input + floating label container */}
          <div className="relative flex-1 h-full px-1">
            <input
              ref={setRefs}
              id={inputId}
              disabled={disabled}
              placeholder=" "
              value={value}
              suppressHydrationWarning
              className={cn(
                inputFieldBase,
                "peer min-w-0 flex-1",
                "pt-[var(--space-5)] pb-[var(--space-1)]",
                "placeholder:text-transparent focus:placeholder:text-[color:var(--color-text-muted)]",
                inputClassName
              )}
              {...props}
              onChange={handleChange}
            />

            {/* Floating label — pure CSS animation via peer selectors */}
            <label
              htmlFor={inputId}
              className={cn(
                "absolute left-1 pointer-events-none select-none",
                "transition-all duration-200 ease-out",
                /* Idle state — centered vertically */
                "top-1/2 -translate-y-1/2",
                floatingLabelIdleClass,
                /* Floating state — on focus OR when input has value */
                "peer-focus:top-1 peer-focus:-translate-y-0",
                floatingLabelCompactFocusClass,
                "peer-[:not(:placeholder-shown)]:top-1",
                "peer-[:not(:placeholder-shown)]:-translate-y-0",
                floatingLabelCompactFilledClass,
                /* Color states */
                error
                  ? "text-[color:var(--color-danger)]"
                  : [
                      "text-[color:var(--color-text-secondary)]",
                      "peer-focus:text-[color:var(--color-border-focus)]",
                      "peer-[:not(:placeholder-shown)]:text-[color:var(--color-text-secondary)]",
                    ].join(" "),
                disabled && "opacity-50"
              )}
            >
              {label}
            </label>
          </div>

          {suffix && (
            <span
              className={cn(
                "z-10 shrink-0 whitespace-nowrap",
                error
                  ? "text-[color:var(--color-danger)]"
                  : "text-[color:var(--color-text-secondary)]",
                fieldBodyLgClass
              )}
            >
              {suffix}
            </span>
          )}

          {clearable && !disabled && <ClearButton onClick={handleClear} visible={hasValue} />}

          {iconRight && (
            <span
              className={cn(
                "z-10 shrink-0 [&_svg]:size-[var(--icon-size-md)]",
                error
                  ? "text-[color:var(--color-danger)]"
                  : "text-[color:var(--color-text-secondary)]"
              )}
            >
              {iconRight}
            </span>
          )}
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
);

FloatingInput.displayName = "FloatingInput";

export { Input, FloatingInput };
