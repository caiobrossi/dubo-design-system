"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "dubo-design-system/lib/icons";

import { cn } from "dubo-design-system/lib/utils";

export const dropdownPanelClasses = [
  "z-50 overflow-hidden",
  "min-w-[var(--overlay-glass-min-width)]",
  "rounded-[var(--overlay-glass-radius)]",
  "border-solid [border-width:var(--overlay-glass-border-width)] [border-color:var(--overlay-glass-border)]",
  "bg-[var(--overlay-glass-bg)]",
  "[backdrop-filter:var(--overlay-glass-blur)_var(--overlay-glass-saturate)]",
  "[box-shadow:inset_0_0_0_var(--overlay-glass-border-width)_var(--overlay-glass-border),var(--overlay-glass-shadow)]",
  "p-[var(--space-2)]",
  "transform-gpu animate-dropdownScaleIn",
].join(" ");

const itemClasses = [
  "relative flex w-full cursor-pointer select-none items-center gap-[var(--space-2)]",
  "min-h-[var(--height-control-sm)] py-[calc(var(--space-3)/2)]",
  "px-[var(--space-3)]",
  "rounded-[var(--radius-control-pill)]",
  "text-body-lg [font-weight:var(--font-weight-400)]",
  "text-[color:var(--color-text-primary)]",
  "outline-none",
  "transition-colors duration-[var(--transition-fast)]",
  "focus:bg-[var(--color-hover)]",
  "data-[highlighted]:bg-[var(--color-hover)]",
  "data-[disabled]:pointer-events-none data-[disabled]:opacity-[var(--disabled-opacity)]",
].join(" ");

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(dropdownPanelClasses, className)}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    icon?: React.ReactNode;
    destructive?: boolean;
  }
>(({ className, icon, destructive = false, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      itemClasses,
      destructive && "text-[color:var(--color-danger)] focus:text-[color:var(--color-danger)]",
      className
    )}
    {...props}
  >
    {icon ? (
      <span
        className={cn(
          "shrink-0 [&_svg]:size-[var(--icon-size-md)]",
          destructive ? "text-[color:var(--color-danger)]" : "text-[color:var(--color-text-secondary)]"
        )}
      >
        {icon}
      </span>
    ) : null}
    {children}
  </DropdownMenuPrimitive.Item>
));
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    checked={checked}
    className={cn(
      itemClasses,
      "pl-[calc(var(--space-3)+var(--icon-size-md)+var(--space-1))]",
      className
    )}
    {...props}
  >
    <span className="absolute left-[var(--space-3)] flex size-[var(--icon-size-md)] items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="size-[var(--icon-size-md)] text-[color:var(--color-brand)]" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

const DropdownMenuRadioItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      itemClasses,
      "pl-[calc(var(--space-3)+var(--icon-size-md)+var(--space-1))]",
      className
    )}
    {...props}
  >
    <span className="absolute left-[var(--space-3)] flex size-[var(--icon-size-md)] items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="size-[var(--space-2)] fill-[var(--color-brand)] text-[color:var(--color-brand)]" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

const DropdownMenuLabel = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-[var(--space-3)] py-[var(--space-2)]",
      "text-body-sm [font-weight:var(--font-weight-400)]",
      "text-[color:var(--color-text-muted)]",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn(
      "mx-[var(--space-2)] my-[var(--space-1)] h-px bg-[var(--color-border)]",
      className
    )}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "ml-auto text-body-sm [font-weight:var(--font-weight-400)] text-[color:var(--color-text-muted)]",
        className
      )}
      {...props}
    />
  );
}

const DropdownMenuSubTrigger = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
    icon?: React.ReactNode;
  }
>(({ className, inset, icon, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(itemClasses, inset && "pl-8", className)}
    {...props}
  >
    {icon ? (
      <span className="shrink-0 [&_svg]:size-[var(--icon-size-md)] text-[color:var(--color-text-secondary)]">
        {icon}
      </span>
    ) : null}
    {children}
    <ChevronRight className="ml-auto size-[var(--icon-size-md)] text-[color:var(--color-text-secondary)]" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

const DropdownMenuSubContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(dropdownPanelClasses, className)}
    {...props}
  />
));
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
