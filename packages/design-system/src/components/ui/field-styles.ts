"use client";

export const fieldTransitionClass = [
  "transition-all",
  "duration-[var(--transition-fast)]",
  "[transition-timing-function:var(--transition-easing)]",
].join(" ");

export const fieldClearActionClass = [
  "inline-flex shrink-0 items-center justify-center",
  "rounded-[var(--radius-control-pill)] p-0.5",
  "text-[color:var(--color-text-muted)]",
  fieldTransitionClass,
  "pointer-events-none scale-75 opacity-0",
  "hover:bg-[var(--color-hover)] hover:text-[color:var(--color-text-secondary)]",
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--focus-ring)]",
].join(" ");

export const fieldClearActionVisibleClass = [
  "group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100",
  "group-focus-within:pointer-events-auto group-focus-within:scale-100 group-focus-within:opacity-100",
  "focus-visible:pointer-events-auto focus-visible:scale-100 focus-visible:opacity-100",
].join(" ");

export const fieldLabelClass = [
  "text-body-md",
  "[font-weight:var(--font-weight-400)]",
  "text-[color:var(--color-text-secondary)]",
].join(" ");

export const fieldDescriptionClass = [
  "text-body-sm",
  "[font-weight:var(--font-weight-400)]",
  "text-[color:var(--color-text-secondary)]",
].join(" ");

export const fieldBodyLgClass = ["text-body-lg", "[font-weight:var(--font-weight-400)]"].join(" ");

export const fieldBodyMdClass = ["text-body-md", "[font-weight:var(--font-weight-400)]"].join(" ");

export const floatingLabelIdleClass = fieldLabelClass;

export const floatingLabelCompactClass = [
  "text-body-md",
  "[font-weight:var(--font-weight-400)]",
].join(" ");

export const floatingLabelCompactFocusClass = [
  "peer-focus:text-body-md",
  "peer-focus:[font-weight:var(--font-weight-400)]",
].join(" ");

export const floatingLabelCompactFilledClass = [
  "peer-[:not(:placeholder-shown)]:text-body-md",
  "peer-[:not(:placeholder-shown)]:[font-weight:var(--font-weight-400)]",
].join(" ");

export const fieldOutlineVariantClass = [
  "border-[var(--color-border-interactive)]",
  "bg-[var(--color-bg-surface)]",
  "focus-within:border-2",
  "focus-within:border-[var(--color-border-focus)]",
].join(" ");

export const fieldFilledVariantClass = [
  "border-transparent",
  "bg-[var(--color-hover)]",
  "hover:bg-[var(--color-pressed)]",
  "focus-within:border",
  "focus-within:border-[var(--color-border-focus)]",
  "focus-within:!bg-[var(--color-bg-surface)]",
  "focus-within:hover:!bg-[var(--color-bg-surface)]",
].join(" ");

export const fieldOpenOutlineVariantClass = [
  "border-[var(--color-border-interactive)]",
  "bg-[var(--color-bg-surface)]",
  "data-[state=open]:border-2",
  "data-[state=open]:border-[var(--color-border-focus)]",
  "focus-within:border-2",
  "focus-within:border-[var(--color-border-focus)]",
].join(" ");

export const fieldOpenFilledVariantClass = [
  "border-transparent",
  "bg-[var(--color-hover)]",
  "hover:bg-[var(--color-pressed)]",
  "data-[state=open]:border",
  "data-[state=open]:border-[var(--color-border-focus)]",
  "data-[state=open]:!bg-[var(--color-bg-surface)]",
  "focus-within:border",
  "focus-within:border-[var(--color-border-focus)]",
  "focus-within:!bg-[var(--color-bg-surface)]",
].join(" ");
