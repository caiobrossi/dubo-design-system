"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "dubo-design-system/lib/icons";
import { cn } from "dubo-design-system/lib/utils";
import {
  fieldBodyMdClass,
  fieldTransitionClass,
} from "dubo-design-system/components/ui/field-styles";
import { modalTitleClass } from "dubo-design-system/components/ui/modal-typography";
import { useDesignSystemLabel } from "dubo-design-system/lib/labels";

/**
 * Dubo Design System — Sheet (side panel / drawer)
 *
 * Floating panel style matching Dubo's SupplierDetailsDrawer pattern:
 * - Outer container with 16px padding (panel floats without touching edges)
 * - Inner panel with rounded-2xl (16px), white bg, shadow-xl
 * - Overlay: bg-black/20 + backdrop-blur-sm
 * - Animation: slideInRight (0.35s)
 *
 * Directions: top | right | bottom | left
 *
 * Reuses shared overlay, surface, spacing, icon, and typography roles.
 */

/* ── Exports for compound API ── */
const Sheet = Dialog.Root;
const SheetTrigger = Dialog.Trigger;
const SheetClose = Dialog.Close;
const SheetPortal = Dialog.Portal;
const SheetSideContext =
  React.createContext<VariantProps<typeof sheetContentVariants>["side"]>("right");

/* ── Overlay ── */
const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => (
  <Dialog.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50",
      "bg-[var(--overlay-bg)]",
      "[backdrop-filter:var(--overlay-blur)]",
      "transition-opacity duration-[var(--overlay-transition)]",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      className
    )}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

/* ── Floating container variants (outer wrapper with padding) ── */
const sheetContainerVariants = cva("fixed z-50", {
  variants: {
    side: {
      top: "inset-x-0 top-0 p-[var(--space-4)]",
      right: "inset-y-0 right-0 p-[var(--space-4)]",
      bottom: "inset-x-0 bottom-0 p-0",
      left: "inset-y-0 left-0 p-[var(--space-4)]",
    },
  },
  defaultVariants: {
    side: "right",
  },
});

/* ── Inner panel variants ── */
const sheetContentVariants = cva(
  [
    "relative flex h-full flex-col",
    "bg-[var(--color-bg-surface)]",
    "rounded-[var(--radius-scale-3xl)]",
    "overflow-hidden",
    "outline-none",
    "shadow-[var(--shadow-lg)]",
  ].join(" "),
  {
    variants: {
      side: {
        top: "max-h-[85vh]",
        right: "w-[min(450px,calc(100vw-32px))]",
        bottom:
          "h-[90dvh] max-h-[calc(100dvh-40px)] w-full max-w-none rounded-b-none rounded-t-[var(--radius-scale-3xl)] pt-[var(--space-2)]",
        left: "w-[min(450px,calc(100vw-32px))]",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

/* ── Slide animation classes ── */
const slideAnimationClasses: Record<string, string> = {
  top: "animate-in slide-in-from-top",
  right: "animate-[slideInFromRight_360ms_ease-out_both]",
  bottom: "animate-[slideInFromBottom_300ms_ease-out_both]",
  left: "animate-in slide-in-from-left",
};

export interface SheetContentProps
  extends
    React.ComponentPropsWithoutRef<typeof Dialog.Content>,
    VariantProps<typeof sheetContentVariants> {
  showCloseButton?: boolean;
  showHandle?: boolean;
  /**
   * Nome acessível do botão de fechar. Sem isto o botão anuncia-se em inglês
   * num produto que é só para Portugal.
   */
  closeLabel?: string;
}

const SheetContent = React.forwardRef<React.ComponentRef<typeof Dialog.Content>, SheetContentProps>(
  (
    {
      className,
      side = "right",
      children,
      showCloseButton = true,
      showHandle = true,
      closeLabel: closeLabelProp,
      ...props
    },
    ref
  ) => {
    // Dois PR resolveram isto ao mesmo tempo e cada um tinha metade da razão: o
    // #123 acrescentou a propriedade, e há chamadores que já a passam; o #126 pôs
    // a etiqueta a vir do provider, que é o que evita ter de a passar em todo o
    // lado. Quem passa ganha; quem não passa recebe a tradução do provider, em
    // vez do "Close" fixo em inglês que era o valor por omissão.
    // O hook corre sempre; escolher com `??` na mesma linha punha-o dentro de um
    // curto-circuito, e um hook condicional é erro de React, não de estilo.
    const closeLabelDoProvider = useDesignSystemLabel("close");
    const closeLabel = closeLabelProp ?? closeLabelDoProvider;

    return (
      <SheetPortal>
        <SheetOverlay />
        <Dialog.Content
          ref={ref}
          className={cn(sheetContainerVariants({ side }), "outline-none")}
          {...props}
        >
          {/* Inner floating panel with rounded corners and shadow */}
          <div
            className={cn(
              sheetContentVariants({ side }),
              slideAnimationClasses[side ?? "right"],
              className
            )}
          >
            <SheetSideContext.Provider value={side}>
              {side === "bottom" && showHandle ? (
                <div className="pointer-events-none flex justify-center px-[var(--space-4)] pb-[var(--space-2)] pt-[var(--space-3)]">
                  <div className="h-1.5 w-12 rounded-full bg-[var(--color-border)]/70" />
                </div>
              ) : null}
              {showCloseButton ? (
                <Dialog.Close
                  className={cn(
                    // `z-20`: a pega de arrastar do painel inferior é `z-10` e
                    // vem depois na árvore, pelo que com o mesmo nível pintava
                    // por cima do botão — que existia mas não se via (DUB-031).
                    "absolute right-[var(--space-4)] top-[var(--space-4)] z-20",
                    "flex size-[var(--size-8)] items-center justify-center rounded-[var(--radius-control-soft)]",
                    "text-[color:var(--color-text-muted)]",
                    fieldTransitionClass,
                    "hover:bg-[var(--color-hover)] hover:text-[color:var(--color-text-primary)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                  )}
                >
                  <X className="size-[var(--icon-size-md)]" />
                  <span className="sr-only">{closeLabel}</span>
                </Dialog.Close>
              ) : null}
              {children}
            </SheetSideContext.Provider>
          </div>
        </Dialog.Content>
      </SheetPortal>
    );
  }
);
SheetContent.displayName = "SheetContent";

/* ── Header ── */
const SheetHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const side = React.useContext(SheetSideContext);

    return (
      <div
        ref={ref}
        className={cn(
          "text-left",
          "border-b border-[var(--color-border)]",
          side === "bottom"
            ? "flex flex-col gap-[var(--space-1)] px-[var(--space-4)] pb-[var(--space-4)] pt-0"
            : "flex flex-col gap-[var(--space-1)] px-[var(--space-6)] py-[var(--space-5)] pr-[calc(var(--space-4)+var(--size-8)+var(--space-2))]",
          className
        )}
        {...props}
      />
    );
  }
);
SheetHeader.displayName = "SheetHeader";

/* ── Footer ── */
const SheetFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const side = React.useContext(SheetSideContext);

    return (
      <div
        ref={ref}
        className={cn(
          "mt-auto flex items-center gap-[var(--space-2)]",
          "border-t border-[var(--color-border)]",
          side === "bottom"
            ? "justify-center px-[var(--space-4)] pb-[calc(var(--space-4)+env(safe-area-inset-bottom,0px))] pt-[var(--space-4)]"
            : "justify-end px-[var(--space-6)] py-[var(--space-4)]",
          className
        )}
        {...props}
      />
    );
  }
);
SheetFooter.displayName = "SheetFooter";

/* ── Title ── */
const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof Dialog.Title>,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
  <Dialog.Title ref={ref} className={cn(modalTitleClass, className)} {...props} />
));
SheetTitle.displayName = "SheetTitle";

/* ── Description ── */
const SheetDescription = React.forwardRef<
  React.ComponentRef<typeof Dialog.Description>,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn(fieldBodyMdClass, "text-[color:var(--color-text-secondary)]", className)}
    {...props}
  />
));
SheetDescription.displayName = "SheetDescription";

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  sheetContentVariants,
};
