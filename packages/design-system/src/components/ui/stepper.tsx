"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { Check } from "@dubo/design-system-shared/lib/icons";
import { cn } from "@dubo/design-system-shared/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Context                                                                   */
/* -------------------------------------------------------------------------- */

interface StepperContextValue {
  activeStep: number;
  orientation: "horizontal" | "vertical";
  totalSteps: number;
}

const StepperContext = React.createContext<StepperContextValue>({
  activeStep: 0,
  orientation: "horizontal",
  totalSteps: 0,
});

function useStepperContext() {
  return React.useContext(StepperContext);
}

/* -------------------------------------------------------------------------- */
/*  CVA — Step indicator                                                      */
/* -------------------------------------------------------------------------- */

const stepIndicatorVariants = cva(
  [
    "flex items-center justify-center rounded-full shrink-0",
    "text-body-md font-medium",
    "transition-all duration-[var(--transition-fast)]",
  ].join(" "),
  {
    variants: {
      status: {
        default: "size-8 bg-[var(--color-hover)] text-[color:var(--color-text-muted)]",
        active:
          "size-8 bg-[var(--color-brand-subtle)] text-[color:var(--color-brand)] ring-2 ring-[var(--color-brand)]",
        completed: "size-8 bg-[var(--color-brand)] text-[color:var(--color-text-on-brand)]",
      },
    },
    defaultVariants: {
      status: "default",
    },
  }
);

/* -------------------------------------------------------------------------- */
/*  CVA — Connector line                                                      */
/* -------------------------------------------------------------------------- */

const connectorVariants = cva("transition-colors duration-[var(--transition-fast)]", {
  variants: {
    orientation: {
      horizontal: "h-0.5 flex-1",
      vertical: "w-0.5 min-h-[24px] flex-1",
    },
    completed: {
      true: "bg-[var(--color-brand)]",
      false: "bg-[var(--color-border)]",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    completed: false,
  },
});

/* -------------------------------------------------------------------------- */
/*  CVA — Label text                                                          */
/* -------------------------------------------------------------------------- */

const labelVariants = cva("transition-colors duration-[var(--transition-fast)] text-body-md", {
  variants: {
    status: {
      default: "text-[color:var(--color-text-muted)]",
      active: "text-[color:var(--color-text-primary)] font-medium",
      completed: "text-[color:var(--color-text-secondary)]",
    },
  },
  defaultVariants: {
    status: "default",
  },
});

/* -------------------------------------------------------------------------- */
/*  StepperItem                                                               */
/* -------------------------------------------------------------------------- */

interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Step label displayed next to the indicator. */
  label: React.ReactNode;
  /** Optional description (only rendered in vertical orientation). */
  description?: React.ReactNode;
  /** Optional content (only rendered in vertical orientation for the active step). */
  children?: React.ReactNode;
  className?: string;
  /** @internal Injected by Stepper — do not set manually. */
  _index?: number;
}

const StepperItem = React.forwardRef<HTMLDivElement, StepperItemProps>(function StepperItem(
  { label, description, children, className, _index = 0, ...otherProps },
  ref
) {
  const { activeStep, orientation, totalSteps } = useStepperContext();

  const status: "default" | "active" | "completed" =
    _index < activeStep ? "completed" : _index === activeStep ? "active" : "default";

  const isFirst = _index === 0;
  const isLast = _index === totalSteps - 1;

  /* ---- Horizontal layout ---- */
  if (orientation === "horizontal") {
    return (
      <div ref={ref} className={cn("flex flex-1 items-center", className)} {...otherProps}>
        {/* Left connector */}
        {!isFirst && (
          <div
            className={connectorVariants({
              orientation: "horizontal",
              completed: _index <= activeStep,
            })}
          />
        )}

        {/* Step circle + label column */}
        <div className="flex flex-col items-center gap-1">
          <div className={stepIndicatorVariants({ status })}>
            {status === "completed" ? <Check className="size-4" /> : <span>{_index + 1}</span>}
          </div>
          <span className={labelVariants({ status })}>{label}</span>
        </div>

        {/* Right connector */}
        {!isLast && (
          <div
            className={connectorVariants({
              orientation: "horizontal",
              completed: _index < activeStep,
            })}
          />
        )}
      </div>
    );
  }

  /* ---- Vertical layout ---- */
  return (
    <div ref={ref} className={cn("flex gap-3", className)} {...otherProps}>
      {/* Indicator column */}
      <div className="flex flex-col items-center">
        {/* Top connector */}
        {!isFirst ? (
          <div
            className={cn(
              connectorVariants({
                orientation: "vertical",
                completed: _index <= activeStep,
              }),
              "min-h-[8px]"
            )}
          />
        ) : (
          <div className="min-h-[8px]" />
        )}

        {/* Circle */}
        <div className={stepIndicatorVariants({ status })}>
          {status === "completed" ? <Check className="size-4" /> : <span>{_index + 1}</span>}
        </div>

        {/* Bottom connector */}
        {!isLast ? (
          <div
            className={cn(
              connectorVariants({
                orientation: "vertical",
                completed: _index < activeStep,
              }),
              "min-h-[8px]"
            )}
          />
        ) : (
          <div className="min-h-[8px]" />
        )}
      </div>

      {/* Content column */}
      <div className="flex flex-col gap-1 pb-4 pt-1">
        {/* Top spacer to align with first connector */}
        {!isFirst && <div className="min-h-[8px]" />}
        {isFirst && <div className="min-h-[8px]" />}

        <span className={labelVariants({ status })}>{label}</span>

        {description && (
          <span className="text-body-md text-[color:var(--color-text-muted)]">{description}</span>
        )}

        {status === "active" && children && <div className="mt-2">{children}</div>}
      </div>
    </div>
  );
});

StepperItem.displayName = "StepperItem";

/* -------------------------------------------------------------------------- */
/*  Stepper (root)                                                            */
/* -------------------------------------------------------------------------- */

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Layout direction. @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  /** 0-based index of the currently active step. */
  activeStep: number;
  children: React.ReactNode;
  className?: string;
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(function Stepper(
  { orientation = "horizontal", activeStep, children, className, ...otherProps },
  ref
) {
  const childArray = React.Children.toArray(children);
  const totalSteps = childArray.length;

  const contextValue: StepperContextValue = { activeStep, orientation, totalSteps };

  return (
    <StepperContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={cn(
          orientation === "horizontal" ? "flex w-full items-start" : "flex w-full flex-col",
          className
        )}
        {...otherProps}
      >
        {childArray.map((child, index) => {
          if (React.isValidElement<StepperItemProps>(child)) {
            return React.cloneElement(child, { _index: index });
          }
          return child;
        })}
      </div>
    </StepperContext.Provider>
  );
});

Stepper.displayName = "Stepper";

/* -------------------------------------------------------------------------- */
/*  Exports                                                                   */
/* -------------------------------------------------------------------------- */

export { Stepper, StepperItem, stepIndicatorVariants, connectorVariants, labelVariants };

export type { StepperProps, StepperItemProps };
