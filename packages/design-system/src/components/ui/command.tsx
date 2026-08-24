"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "dubo-design-system/lib/icons";
import { cn } from "dubo-design-system/lib/utils";

/**
 * Dubo Design System — Command
 *
 * Wrapper around cmdk primitives using DS semantic tokens.
 * Built for use inside Combobox, command palette, and search UIs.
 *
 * Sub-components:
 * - Command — root wrapper
 * - CommandInput — search input with icon
 * - CommandList — scrollable result list
 * - CommandEmpty — empty state
 * - CommandGroup — grouped items with heading
 * - CommandItem — selectable item
 * - CommandSeparator — visual divider
 * - CommandShortcut — right-aligned shortcut hint
 *
 * Tokens used:
 * - --color-bg-surface (root background)
 * - --color-text-primary (text)
 * - --color-text-muted (placeholder, shortcut, heading)
 * - --color-border (input border, separator)
 * - --color-hover (item hover/selected bg)
 * - --disabled-opacity (disabled items)
 * - --transition-fast (animation duration)
 */

const Command = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex size-full flex-col overflow-hidden rounded-md",
      "bg-[var(--color-bg-surface)] text-[color:var(--color-text-primary)]",
      className
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

const CommandInput = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b border-[var(--color-border)] px-3">
    <Search className="mr-2 size-4 shrink-0 text-[color:var(--color-text-muted)]" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md bg-transparent py-3",
        "text-body-md outline-none",
        "placeholder:text-[color:var(--color-text-muted)]",
        "disabled:cursor-not-allowed disabled:opacity-[var(--disabled-opacity)]",
        className
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));
CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={cn("py-6 text-center text-body-md text-[color:var(--color-text-muted)]", className)}
    {...props}
  />
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn("overflow-hidden p-1 text-[color:var(--color-text-primary)]", className)}
    {...props}
  />
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-[var(--color-border)]", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center",
      "rounded-lg px-2 py-1.5 text-body-md outline-none",
      "text-[color:var(--color-text-primary)]",
      "transition-colors duration-[var(--transition-fast)]",
      "aria-selected:bg-[var(--color-hover)]",
      "aria-disabled:pointer-events-none aria-disabled:opacity-[var(--disabled-opacity)]",
      className
    )}
    {...props}
  />
));
CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-body-sm tracking-normal text-[color:var(--color-text-muted)]",
        className
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
