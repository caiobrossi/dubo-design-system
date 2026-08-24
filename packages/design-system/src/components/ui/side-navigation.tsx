"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "dubo-design-system/lib/icons";

import { Avatar } from "dubo-design-system/components/ui/avatar";
import { Button } from "dubo-design-system/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "dubo-design-system/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "dubo-design-system/components/ui/tooltip";
import { cn } from "dubo-design-system/lib/utils";
import { useDesignSystemLabel } from "dubo-design-system/lib/labels";

const tooltipVariants = {
  hidden: {
    opacity: 0,
    x: -8,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    x: -4,
    scale: 0.96,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
} as const;

export interface SideNavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  active?: boolean;
  disabled?: boolean;
  badge?: React.ReactNode;
  onSelect?: () => void;
}

export interface SideNavigationSection {
  id?: string;
  label?: string;
  items: SideNavigationItem[];
}

export interface SideNavigationAction {
  label: string;
  icon: React.ReactNode;
  badge?: React.ReactNode;
  href?: string;
  onSelect?: () => void;
}

export interface SideNavigationProfileAction {
  label: string;
  href?: string;
  onSelect?: () => void;
  tone?: "default" | "danger";
}

export interface SideNavigationProfile {
  name: string;
  title?: string;
  avatarSrc?: string;
  avatarFallback?: string;
  onSelect?: () => void;
  actions?: SideNavigationProfileAction[];
}

export interface SideNavigationProps {
  id?: string;
  className?: string;
  bordered?: boolean;
  showSectionLabels?: boolean;
  logo?: React.ReactNode;
  collapsedLogo?: React.ReactNode;
  renderLogo?: (state: { collapsed: boolean }) => React.ReactNode;
  sections: SideNavigationSection[];
  topContent?: React.ReactNode;
  primaryActionNode?: React.ReactNode;
  primaryAction?: SideNavigationAction;
  secondaryAction?: SideNavigationAction;
  profile?: SideNavigationProfile;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export interface SideNavigationMobileProps {
  id?: string;
  className?: string;
  bordered?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  logo?: React.ReactNode;
  sections: SideNavigationSection[];
  primaryAction?: SideNavigationAction;
  secondaryAction?: SideNavigationAction;
  profile?: SideNavigationProfile;
  responsive?: boolean;
  position?: "fixed" | "absolute";
}

function useControllableBoolean(
  value: boolean | undefined,
  defaultValue: boolean | undefined,
  onChange?: (next: boolean) => void
) {
  const [internal, setInternal] = React.useState(defaultValue ?? false);
  const isControlled = typeof value === "boolean";
  const current = isControlled ? value : internal;

  const setValue = React.useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternal(next);
      }
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  return [current, setValue] as const;
}

function callNavigationAction(
  href: string | undefined,
  onSelect: (() => void) | undefined,
  event?: React.MouseEvent
) {
  if (onSelect) {
    event?.preventDefault();
    onSelect();
  }
  if (!href && event) {
    event.preventDefault();
  }
}

function SideNavigationCollapsedTooltip({
  content,
  children,
}: {
  content: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          sideOffset={10}
          showArrow={false}
          className="z-[60] border-0 bg-transparent p-0 shadow-none overflow-visible"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={tooltipVariants}
            className="rounded-[var(--radius-control-soft)] border border-[var(--color-bg-inverted)] bg-[var(--color-bg-inverted)] px-[var(--space-3)] py-[calc(var(--space-3)/2)] text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-inverted)] shadow-[var(--shadow-md)]"
          >
            {content}
          </motion.div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function SideNavigationLink({ item, collapsed }: { item: SideNavigationItem; collapsed: boolean }) {
  const content = (
    <motion.div
      whileHover={{ scale: collapsed ? 1.04 : 1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "transition-all duration-[var(--transition-fast)] [transition-timing-function:var(--transition-easing)]",
        collapsed ? "flex justify-center overflow-visible" : "w-full"
      )}
    >
      <a
        href={item.href ?? "#"}
        onClick={(event) => callNavigationAction(item.href, item.onSelect, event)}
        aria-label={collapsed ? item.label : undefined}
        aria-current={item.active ? "page" : undefined}
        aria-disabled={item.disabled || undefined}
        className={cn(
          "group relative flex select-none items-center transition-all duration-[var(--transition-fast)] [transition-timing-function:var(--transition-easing)]",
          "text-[color:var(--color-text-primary)]",
          item.disabled && "pointer-events-none opacity-[var(--disabled-opacity)]",
          collapsed
            ? "size-[var(--height-control-md)] justify-center rounded-[var(--radius-control-soft)] [&_svg]:size-[var(--icon-size-lg)]"
            : "w-full gap-3 rounded-[var(--radius-scale-xl)] px-5 py-3",
          item.active
            ? "bg-[var(--color-bg-surface)] text-[color:var(--color-brand)] shadow-[var(--side-nav-item-shadow)]"
            : "hover:bg-[var(--color-hover)]"
        )}
      >
        <span
          className={cn(
            "shrink-0 text-[color:var(--color-text-secondary)]",
            item.active && "text-[color:var(--color-brand)]"
          )}
        >
          {item.icon}
        </span>
        {!collapsed ? (
          <>
            <span className="min-w-0 flex-1 truncate text-body-md [font-weight:var(--font-weight-regular)]">
              {item.label}
            </span>
            {item.badge ? <span className="shrink-0">{item.badge}</span> : null}
          </>
        ) : item.badge ? (
          <span className="absolute -right-1 -top-1">{item.badge}</span>
        ) : null}
      </a>
    </motion.div>
  );

  if (!collapsed) return content;

  return (
    <SideNavigationCollapsedTooltip content={item.label}>{content}</SideNavigationCollapsedTooltip>
  );
}

function SideNavigationActionButton({
  action,
  collapsed,
  tone = "default",
}: {
  action: SideNavigationAction;
  collapsed: boolean;
  tone?: "default" | "surface-outline" | "ghost";
}) {
  const surfaceOutlineClassName = "shadow-none";

  const isGhost = tone === "ghost";

  const trigger = (
    <a
      href={action.href ?? "#"}
      onClick={(event) => callNavigationAction(action.href, action.onSelect, event)}
      aria-label={collapsed ? action.label : undefined}
      className={collapsed ? "inline-flex" : "block w-full"}
    >
      {collapsed ? (
        <Button
          variant={isGhost ? "ghost" : tone === "surface-outline" ? "outline" : "secondary"}
          size="icon"
          rounded
          aria-label={action.label}
          className={cn(
            "relative",
            "[&_svg]:size-[var(--icon-size-lg)]",
            tone === "surface-outline" && surfaceOutlineClassName,
            isGhost && "text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
          )}
        >
          {action.icon}
          {action.badge ? <span className="absolute -right-1 -top-1">{action.badge}</span> : null}
        </Button>
      ) : (
        <Button
          variant={isGhost ? "ghost" : tone === "surface-outline" ? "outline" : "secondary"}
          size="lg"
          rounded
          className={cn(
            isGhost ? "w-full justify-start px-5" : "w-full justify-center",
            tone === "surface-outline" && surfaceOutlineClassName,
            isGhost && "text-[color:var(--color-text-primary)]"
          )}
        >
          {action.icon}
          {action.label}
          {action.badge}
        </Button>
      )}
    </a>
  );

  if (!collapsed) return trigger;

  return (
    <SideNavigationCollapsedTooltip content={action.label}>
      <div className="flex justify-center">{trigger}</div>
    </SideNavigationCollapsedTooltip>
  );
}

function SideNavigationProfileButton({
  profile,
  collapsed,
}: {
  profile: SideNavigationProfile;
  collapsed: boolean;
}) {
  const fallback = profile.avatarFallback ?? profile.name.charAt(0).toUpperCase();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          onClick={profile.onSelect}
          className={cn(
            "transition-all duration-[var(--transition-fast)] [transition-timing-function:var(--transition-easing)]",
            collapsed
              ? "mx-auto flex size-[var(--height-control-md)] items-center justify-center rounded-full p-0"
              : "flex items-center justify-between gap-2 rounded-[var(--radius-control-soft)] px-2 py-2.5 hover:bg-[var(--color-hover)]"
          )}
          aria-label={profile.name}
        >
          <div className="flex min-w-0 items-center gap-2">
            <Avatar
              variant="brand"
              src={profile.avatarSrc}
              name={profile.name}
              initials={fallback}
              showPlaceholder
              size="default"
            />
            {!collapsed ? (
              <div className="min-w-0 flex-1 text-left">
                <div className="truncate text-body-lg [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
                  {profile.name}
                </div>
                {profile.title ? (
                  <div className="truncate text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
                    {profile.title}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
          {!collapsed ? <ChevronRight className="size-4 text-[color:var(--color-text-muted)]" /> : null}
        </button>
      </PopoverTrigger>
      {profile.actions?.length ? (
        <PopoverContent
          align="end"
          side="right"
          sideOffset={8}
          className="w-[248px] rounded-[var(--radius-scale-3xl)] border border-[var(--glass-border-light)] bg-[var(--glass-bg-light)] p-3 shadow-[var(--shadow-lg)] backdrop-blur-[16px] backdrop-saturate-[180%]"
        >
          <div className="flex flex-col gap-1">
            <div className="mb-1 flex items-center gap-3 border-b border-[var(--color-border)] p-2">
              <Avatar
                variant="brand"
                src={profile.avatarSrc}
                name={profile.name}
                initials={fallback}
                showPlaceholder
                size="default"
              />
              <div className="min-w-0 flex-1">
                <div className="truncate text-body-lg [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
                  {profile.name}
                </div>
                {profile.title ? (
                  <div className="truncate text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
                    {profile.title}
                  </div>
                ) : null}
              </div>
            </div>
            {profile.actions.map((action) => (
              <a
                key={action.label}
                href={action.href ?? "#"}
                onClick={(event) => callNavigationAction(action.href, action.onSelect, event)}
                className={cn(
                  "rounded-[10px] px-3 py-2 text-body-lg [font-weight:var(--font-weight-400)] transition-colors",
                  action.tone === "danger"
                    ? "text-[color:var(--color-danger)] hover:bg-[var(--status-danger-subtle-bg)]"
                    : "text-[color:var(--color-text-primary)] hover:bg-[var(--color-hover)]"
                )}
              >
                {action.label}
              </a>
            ))}
          </div>
        </PopoverContent>
      ) : null}
    </Popover>
  );
}

export const SideNavigation = React.forwardRef<HTMLElement, SideNavigationProps>(
  (
    {
      id,
      className,
      bordered = true,
      showSectionLabels = false,
      logo,
      collapsedLogo,
      renderLogo,
      sections,
      topContent,
      primaryActionNode,
      primaryAction,
      secondaryAction,
      profile,
      collapsed: collapsedProp,
      defaultCollapsed = false,
      onCollapsedChange,
    },
    ref
  ) => {
    const [collapsed, setCollapsed] = useControllableBoolean(
      collapsedProp,
      defaultCollapsed,
      onCollapsedChange
    );

    return (
      <motion.nav
        ref={ref}
        id={id}
        className={cn(
          "flex h-full flex-col bg-[var(--color-bg-page)] px-3 pb-0 pt-6 text-[color:var(--color-text-primary)]",
          bordered && "border-r border-[var(--color-border)]",
          className
        )}
        animate={{
          width: collapsed ? "var(--side-nav-collapsed-width)" : "var(--side-nav-width)",
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <div
          className={cn(
            "flex items-center",
            collapsed ? "flex-col justify-center gap-3" : "justify-between gap-3"
          )}
        >
          <div className={cn("min-w-0", collapsed ? "flex items-center justify-center" : "flex-1")}>
            {renderLogo ? (
              <div>{renderLogo({ collapsed })}</div>
            ) : (
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={collapsed ? "collapsed-logo" : "expanded-logo"}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                >
                  <div>{collapsed ? (collapsedLogo ?? logo) : logo}</div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
          <motion.button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "flex size-[var(--height-control-md)] items-center justify-center rounded-[var(--radius-control-soft)] text-[color:var(--color-text-muted)] transition-colors hover:bg-[var(--color-hover)] hover:text-[color:var(--color-text-primary)]",
              !collapsed && "ml-auto"
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={collapsed ? "expand" : "collapse"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {collapsed ? (
                  <PanelLeftOpen className="size-[var(--icon-size-lg)]" />
                ) : (
                  <PanelLeftClose className="size-[var(--icon-size-lg)]" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

        {topContent ? (
          <div className={cn(collapsed ? "flex justify-center overflow-visible" : "")}>
            {topContent}
          </div>
        ) : null}

        <div
          className={cn(
            "mt-6 flex min-h-0 flex-1 flex-col",
            "overflow-x-hidden",
            collapsed ? "overflow-y-hidden" : "overflow-y-visible"
          )}
        >
          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {sections.map((section, index) => (
              <div key={section.id ?? `section-${index}`} className="flex flex-col gap-1">
                {!collapsed && showSectionLabels && section.label ? (
                  <div className="px-2 pb-1 text-body-sm [font-weight:var(--font-weight-400)] text-[color:var(--color-text-muted)]">
                    {section.label}
                  </div>
                ) : null}
                {section.items.map((item) => (
                  <SideNavigationLink key={item.id} item={item} collapsed={collapsed} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-3 border-t border-[var(--color-border)] pb-6 pt-4">
          {primaryActionNode ? (
            primaryActionNode
          ) : primaryAction ? (
            <SideNavigationActionButton
              action={primaryAction}
              collapsed={collapsed}
              tone="surface-outline"
            />
          ) : null}
          {secondaryAction ? (
            <SideNavigationActionButton
              action={secondaryAction}
              collapsed={collapsed}
              tone="surface-outline"
            />
          ) : null}
          {profile ? <SideNavigationProfileButton profile={profile} collapsed={collapsed} /> : null}
        </div>
      </motion.nav>
    );
  }
);
SideNavigation.displayName = "SideNavigation";

export const SideNavigationMobile = React.forwardRef<HTMLDivElement, SideNavigationMobileProps>(
  (
    {
      className,
      id,
      bordered = true,
      open,
      onOpenChange,
      logo,
      sections,
      primaryAction,
      secondaryAction,
      profile,
      responsive = true,
      position = "fixed",
    },
    ref
  ) => {
    const closeNavigationLabel = useDesignSystemLabel("closeNavigation");
    const positioningClass = position === "absolute" ? "absolute" : "fixed";
    const responsiveClass = responsive ? "md:hidden" : "";

    return (
      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label={closeNavigationLabel}
              className={cn(positioningClass, "inset-0 z-40 bg-black/50", responsiveClass)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => onOpenChange(false)}
            />
            <motion.div
              ref={ref}
              id={id}
              className={cn(
                positioningClass,
                "bottom-0 left-0 right-0 z-50 max-h-[95vh] overflow-hidden rounded-t-[var(--radius-scale-3xl)] bg-[var(--color-bg-surface)] shadow-[var(--shadow-lg)]",
                bordered && "border border-b-0 border-[var(--color-border)]",
                responsiveClass,
                className
              )}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="flex h-full max-h-[95vh] flex-col">
                <div className="flex items-center justify-between border-b border-[var(--color-border)] p-4">
                  <div>{logo}</div>
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    className="flex size-8 items-center justify-center rounded-[var(--radius-control-soft)] text-[color:var(--color-text-muted)] transition-colors hover:bg-[var(--color-hover)] hover:text-[color:var(--color-text-primary)]"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  <div className="flex flex-col gap-1">
                    {sections
                      .flatMap((section) => section.items)
                      .map((item) => (
                        <a
                          key={item.id}
                          href={item.href ?? "#"}
                          onClick={(event) => {
                            callNavigationAction(item.href, item.onSelect, event);
                            onOpenChange(false);
                          }}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-[var(--radius-control-soft)] px-4 py-3 text-left transition-colors",
                            item.active
                              ? "bg-[var(--color-brand-subtle)] text-[color:var(--color-brand)]"
                              : "text-[color:var(--color-text-primary)] hover:bg-[var(--color-hover)]"
                          )}
                        >
                          <span
                            className={cn(
                              item.active
                                ? "text-[color:var(--color-brand)]"
                                : "text-[color:var(--color-text-muted)]"
                            )}
                          >
                            {item.icon}
                          </span>
                          <span className="flex-1 text-body-md [font-weight:var(--font-weight-regular)]">
                            {item.label}
                          </span>
                          {item.badge}
                        </a>
                      ))}
                  </div>
                </div>

                {primaryAction || secondaryAction || profile ? (
                  <div className="border-t border-[var(--color-border)] p-4">
                    <div className="flex flex-col gap-3">
                      {primaryAction ? (
                        <a
                          href={primaryAction.href ?? "#"}
                          onClick={(event) => {
                            callNavigationAction(primaryAction.href, primaryAction.onSelect, event);
                            onOpenChange(false);
                          }}
                        >
                          <Button
                            variant="outline"
                            size="lg"
                            rounded
                            className="w-full justify-center border-[var(--color-bg-surface)] bg-[var(--color-bg-surface)] shadow-[var(--shadow-md)] hover:border-[var(--color-bg-surface)] hover:bg-[var(--color-bg-surface)] active:border-[var(--color-bg-surface)] active:bg-[var(--color-bg-surface)]"
                          >
                            {primaryAction.icon}
                            {primaryAction.label}
                            {primaryAction.badge}
                          </Button>
                        </a>
                      ) : null}
                      {secondaryAction ? (
                        <a
                          href={secondaryAction.href ?? "#"}
                          onClick={(event) => {
                            callNavigationAction(
                              secondaryAction.href,
                              secondaryAction.onSelect,
                              event
                            );
                            onOpenChange(false);
                          }}
                          className="flex w-full items-center gap-3 rounded-[var(--radius-control-soft)] px-4 py-3 transition-colors hover:bg-[var(--color-hover)]"
                        >
                          <span className="text-[color:var(--color-text-muted)]">
                            {secondaryAction.icon}
                          </span>
                          <span className="flex-1 text-body-md [font-weight:var(--font-weight-regular)] text-[color:var(--color-text-primary)]">
                            {secondaryAction.label}
                          </span>
                          {secondaryAction.badge}
                        </a>
                      ) : null}
                      {profile ? (
                        <div className="border-t border-[var(--color-border)] pt-3">
                          <button
                            type="button"
                            onClick={() => {
                              profile.onSelect?.();
                              onOpenChange(false);
                            }}
                            className="flex w-full items-center gap-3 rounded-[var(--radius-control-soft)] p-2 transition-colors hover:bg-[var(--color-hover)]"
                          >
                            <Avatar
                              variant="brand"
                              src={profile.avatarSrc}
                              name={profile.name}
                              initials={
                                profile.avatarFallback ?? profile.name.charAt(0).toUpperCase()
                              }
                              showPlaceholder
                              size="lg"
                            />
                            <div className="min-w-0 flex-1 text-left">
                              <div className="truncate text-body-lg [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
                                {profile.name}
                              </div>
                              {profile.title ? (
                                <div className="truncate text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
                                  {profile.title}
                                </div>
                              ) : null}
                            </div>
                            <ChevronRight className="size-5 text-[color:var(--color-text-muted)]" />
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    );
  }
);
SideNavigationMobile.displayName = "SideNavigationMobile";
