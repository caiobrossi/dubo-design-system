"use client";

import * as React from "react";
import { X } from "dubo-design-system/lib/icons";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "dubo-design-system/lib/utils";
import { useDesignSystemLabel } from "dubo-design-system/lib/labels";
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
} from "dubo-design-system/components/ui/field-styles";

/**
 * Dubo Design System — TextArea
 *
 * Two styles (mirrors Input exactly):
 * 1. `TextArea` — standard textarea with label above (min 120px)
 * 2. `FloatingTextArea` — floating label that animates inside→top
 *
 * Both reuse the shared field, spacing, radius, and typography roles.
 *
 * Variants: outline | filled
 * Features: clearable (X button), error, disabled, help text, character count, auto-resize
 *
 * Floating label uses pure CSS (peer selectors) — no useState needed for animation.
 */

/* ── Shared textarea field classes ── */

const textareaFieldBase = [
  "w-full border-none bg-transparent outline-none resize-none",
  fieldBodyLgClass,
  "text-[color:var(--color-text-primary)]",
  "placeholder:text-[color:var(--color-text-muted)]",
  "focus:placeholder:text-transparent",
  "focus:outline-none focus:ring-0",
  "disabled:cursor-not-allowed",
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

/* ── Auto-resize hook ── */

function useAutoResize(
  ref: React.RefObject<HTMLTextAreaElement | null>,
  autoResize: boolean,
  value?: string | number | readonly string[]
) {
  React.useEffect(() => {
    if (!autoResize || !ref.current) return;
    const el = ref.current;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [autoResize, ref, value]);
}

/* ── Standard TextArea ── */

const textareaContainerVariants = cva(
  [
    "group flex w-full",
    "rounded-[var(--radius-control-input)]",
    "border",
    "px-[var(--space-2)]",
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

export interface TextAreaProps
  extends
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaContainerVariants> {
  /** Label text above the textarea */
  label?: React.ReactNode;
  /** Help text or error message below the textarea */
  helpText?: React.ReactNode;
  /** Error state — red border + error helpText color */
  error?: boolean;
  /** Show clear (X) button when textarea has value */
  clearable?: boolean;
  /** Called when clear button is clicked */
  onClear?: () => void;
  /** Show character count (current / maxLength) */
  showCount?: boolean;
  /** Auto-resize textarea to fit content */
  autoResize?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      variant,
      label,
      helpText,
      error = false,
      clearable = false,
      onClear,
      showCount = false,
      autoResize = false,
      disabled,
      id,
      value,
      maxLength,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;
    const internalRef = React.useRef<HTMLTextAreaElement | null>(null);
    const [internalValue, setInternalValue] = React.useState("");
    const currentValue = value !== undefined ? String(value) : internalValue;
    const hasValue = currentValue !== "";

    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
        if (node && value === undefined) setInternalValue(node.value);
      },
      [ref, value]
    );

    useAutoResize(internalRef, autoResize, value ?? internalValue);

    const handleClear = React.useCallback(() => {
      if (onClear) {
        onClear();
      }
      if (internalRef.current) {
        const nativeSetter = Object.getOwnPropertyDescriptor(
          window.HTMLTextAreaElement.prototype,
          "value"
        )?.set;
        nativeSetter?.call(internalRef.current, "");
        internalRef.current.dispatchEvent(new Event("input", { bubbles: true }));
        internalRef.current.focus();
      }
      setInternalValue("");
    }, [onClear]);

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInternalValue(e.target.value);
        onChange?.(e);
      },
      [onChange]
    );

    const charCount = currentValue.length;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <Label
            htmlFor={textareaId}
            className={cn(disabled && "opacity-[var(--disabled-opacity)] cursor-not-allowed")}
            disabled={disabled}
          >
            {label}
          </Label>
        )}
        <div
          className={cn(
            textareaContainerVariants({ variant }),
            "min-h-[calc(var(--size-24)+var(--space-6))] py-[var(--space-2)]",
            error && "border-[var(--color-danger)] focus-within:border-[var(--color-danger)]",
            disabled && "opacity-[var(--disabled-opacity)] cursor-not-allowed",
            className
          )}
        >
          <textarea
            ref={setRefs}
            id={textareaId}
            disabled={disabled}
            value={value}
            maxLength={maxLength}
            className={cn(textareaFieldBase, "min-h-[var(--size-24)] py-[var(--space-1)]")}
            {...props}
            onChange={handleChange}
          />
          {clearable && !disabled && (
            <div className="flex flex-col justify-start pt-[var(--space-1)]">
              <ClearButton onClick={handleClear} visible={hasValue} />
            </div>
          )}
        </div>
        {(helpText || showCount) && (
          <div className="flex items-start justify-between gap-2">
            {helpText ? (
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
            ) : (
              <span />
            )}
            {showCount && (
              <span
                className={cn(
                  fieldDescriptionClass,
                  "shrink-0 tabular-nums",
                  maxLength && charCount > maxLength
                    ? "text-[color:var(--color-danger)]"
                    : "text-[color:var(--color-text-secondary)]"
                )}
              >
                {charCount}
                {maxLength !== undefined && `/${maxLength}`}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

/* ── Floating Label TextArea ── */

const floatingTextareaContainerVariants = cva(
  [
    "group relative flex w-full",
    "rounded-[var(--radius-scale-xl)]",
    "border",
    "px-[var(--space-2)]",
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

export interface FloatingTextAreaProps
  extends
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size" | "placeholder">,
    VariantProps<typeof floatingTextareaContainerVariants> {
  /** Floating label text (required) */
  label: string;
  /** Help text or error message below the textarea */
  helpText?: React.ReactNode;
  /** Error state */
  error?: boolean;
  /** Show clear (X) button when textarea has value */
  clearable?: boolean;
  /** Called when clear button is clicked */
  onClear?: () => void;
  /** Show character count (current / maxLength) */
  showCount?: boolean;
  /** Auto-resize textarea to fit content */
  autoResize?: boolean;
}

const FloatingTextArea = React.forwardRef<HTMLTextAreaElement, FloatingTextAreaProps>(
  (
    {
      className,
      variant,
      label,
      helpText,
      error = false,
      clearable = false,
      onClear,
      showCount = false,
      autoResize = false,
      disabled,
      id,
      value,
      maxLength,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;
    const internalRef = React.useRef<HTMLTextAreaElement | null>(null);
    const [internalValue, setInternalValue] = React.useState("");
    const currentValue = value !== undefined ? String(value) : internalValue;
    const hasValue = currentValue !== "";

    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
        if (node && value === undefined) setInternalValue(node.value);
      },
      [ref, value]
    );

    useAutoResize(internalRef, autoResize, value ?? internalValue);

    const handleClear = React.useCallback(() => {
      if (onClear) {
        onClear();
      }
      if (internalRef.current) {
        const nativeSetter = Object.getOwnPropertyDescriptor(
          window.HTMLTextAreaElement.prototype,
          "value"
        )?.set;
        nativeSetter?.call(internalRef.current, "");
        internalRef.current.dispatchEvent(new Event("input", { bubbles: true }));
        internalRef.current.focus();
      }
      setInternalValue("");
    }, [onClear]);

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInternalValue(e.target.value);
        onChange?.(e);
      },
      [onChange]
    );

    const charCount = currentValue.length;

    return (
      <div className="flex flex-col gap-1.5">
        <div
          className={cn(
            floatingTextareaContainerVariants({ variant }),
            "min-h-[calc(var(--size-24)+var(--space-6))]",
            error && "border-[var(--color-danger)] focus-within:border-[var(--color-danger)]",
            disabled && "opacity-[var(--disabled-opacity)] cursor-not-allowed",
            className
          )}
        >
          {/* Textarea + floating label container */}
          <div className="relative flex-1 px-1">
            <textarea
              ref={setRefs}
              id={textareaId}
              disabled={disabled}
              placeholder=" "
              value={value}
              maxLength={maxLength}
              className={cn(
                textareaFieldBase,
                "peer",
                "pt-[var(--space-6)] pb-[var(--space-2)] min-h-[var(--size-24)] resize-none"
              )}
              {...props}
              onChange={handleChange}
            />

            {/* Floating label — pure CSS animation via peer selectors */}
            <label
              htmlFor={textareaId}
              className={cn(
                "absolute left-1 top-3 pointer-events-none select-none",
                "transition-all duration-200 ease-out",
                /* Idle state — near top of textarea */
                "translate-y-0",
                floatingLabelIdleClass,
                /* Floating state — on focus OR when textarea has value */
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

          {clearable && !disabled && (
            <div className="flex flex-col justify-start pt-[var(--space-2)]">
              <ClearButton onClick={handleClear} visible={hasValue} />
            </div>
          )}
        </div>
        {(helpText || showCount) && (
          <div className="flex items-start justify-between gap-2">
            {helpText ? (
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
            ) : (
              <span />
            )}
            {showCount && (
              <span
                className={cn(
                  fieldDescriptionClass,
                  "shrink-0 tabular-nums",
                  maxLength && charCount > maxLength
                    ? "text-[color:var(--color-danger)]"
                    : "text-[color:var(--color-text-secondary)]"
                )}
              >
                {charCount}
                {maxLength !== undefined && `/${maxLength}`}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

FloatingTextArea.displayName = "FloatingTextArea";

export { TextArea, FloatingTextArea };
