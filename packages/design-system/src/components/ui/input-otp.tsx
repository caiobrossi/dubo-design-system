"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "dubo-design-system/lib/icons";
import { cn } from "dubo-design-system/lib/utils";

/**
 * Dubo Design System — Input OTP
 *
 * One-time password input built on the `input-otp` package.
 * Supports 4-digit, 6-digit, with separator, and with dash variants.
 *
 * Tokens used:
 * - --height-control-md / --space-2
 * - --radius-control-input
 * - --type-body-sm-* + --font-weight-400
 * - --color-bg-input / --color-border-input / --color-text-primary
 * - --focus-ring / --focus-ring-offset / --disabled-opacity
 */

/* ── Root ── */

const InputOTP = React.forwardRef<
  React.ComponentRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-[var(--space-2)] has-[:disabled]:opacity-[var(--disabled-opacity)]",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

/* ── Group ── */

const InputOTPGroup = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center", className)} {...props} />
  )
);
InputOTPGroup.displayName = "InputOTPGroup";

/* ── Slot ── */

type OTPContextValue = {
  slots: Array<{
    char: string | null;
    hasFakeCaret: boolean;
    isActive: boolean;
  }>;
};

const InputOTPSlot = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(
    OTPInputContext as unknown as React.Context<OTPContextValue>
  );
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-[var(--height-control-md)] w-[var(--height-control-md)] items-center justify-center",
        "border-y border-r border-[var(--color-border-input)] bg-[var(--color-bg-input)]",
        "text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]",
        "transition-all duration-[var(--transition-fast)]",
        "first:rounded-l-[var(--radius-control-input)] first:border-l",
        "last:rounded-r-[var(--radius-control-input)]",
        isActive &&
          "z-10 ring-2 ring-[var(--focus-ring)] ring-offset-[var(--focus-ring-offset)] ring-offset-[var(--color-bg-input)]",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[var(--size-4)] w-px animate-caret-blink bg-[var(--color-text-primary)]" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

/* ── Separator ── */

const InputOTPSeparator = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      className="flex items-center text-[color:var(--color-text-muted)]"
      {...props}
    >
      <Minus className="size-[var(--icon-size-md)]" />
    </div>
  )
);
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
