"use client";

import * as React from "react";
import { ArrowLeft } from "dubo-design-system/lib/icons";

import { cn } from "dubo-design-system/lib/utils";
import { useDesignSystemLabel } from "dubo-design-system/lib/labels";
import { Button } from "dubo-design-system/components/ui/button";

export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  navigation?: React.ReactNode;
  actions?: React.ReactNode;
  onBack?: () => void;
  sticky?: boolean;
  bordered?: boolean;
  hideOnMobile?: boolean;
  mobileVariant?: "inherit" | "separate";
  mobileTitle?: string | React.ReactNode;
  mobileSubtitle?: string | React.ReactNode;
  mobileNavigation?: React.ReactNode;
  mobileActions?: React.ReactNode;
  mobileOnBack?: () => void;
  mobileNavigationPosition?: "above" | "below";
  mobileActionsPosition?: "inline" | "footer";
  mobileClassName?: string;
}

const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  (
    {
      title,
      subtitle,
      navigation,
      actions,
      onBack,
      sticky = false,
      bordered = false,
      hideOnMobile = false,
      mobileVariant = "inherit",
      mobileTitle,
      mobileSubtitle,
      mobileNavigation,
      mobileActions,
      mobileOnBack,
      mobileNavigationPosition = "above",
      mobileActionsPosition = "inline",
      mobileClassName,
      className,
      ...props
    },
    ref
  ) => {
    const goBackLabel = useDesignSystemLabel("goBack");
    const shouldRenderSeparateMobile = mobileVariant === "separate";

    const desktopHeader = (
      <header
        ref={ref}
        className={cn(
          "h-[var(--size-20)] w-full grid-cols-[1fr_auto_1fr] items-center",
          "px-[var(--space-8)]",
          "bg-transparent",
          sticky && "sticky top-0 z-40 backdrop-blur-sm",
          bordered && "border-b border-[var(--color-border)]",
          hideOnMobile || shouldRenderSeparateMobile ? "hidden md:grid" : "grid",
          className
        )}
        {...props}
      >
        <div className="flex min-w-0 items-center gap-[var(--space-4)] justify-self-start">
          {onBack ? (
            <Button
              variant="outline"
              size="icon"
              onClick={onBack}
              aria-label={goBackLabel}
              className="shrink-0"
            >
              <ArrowLeft />
            </Button>
          ) : null}
          <div className="flex min-w-0 flex-col gap-[var(--space-1)]">
            {typeof title === "string" ? (
              <h1
                className={cn(
                  "truncate [letter-spacing:0em] text-[color:var(--color-text-primary)]",
                  ["text-heading-1", "[font-weight:var(--font-weight-400)]"].join(" ")
                )}
              >
                {title}
              </h1>
            ) : (
              title
            )}
            {subtitle ? (
              typeof subtitle === "string" ? (
                <span className="truncate text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
                  {subtitle}
                </span>
              ) : (
                subtitle
              )
            ) : null}
          </div>
        </div>

        <div className="justify-self-center">{navigation}</div>

        <div className="flex items-center gap-[var(--space-3)] justify-self-end">{actions}</div>
      </header>
    );

    if (!shouldRenderSeparateMobile) {
      return desktopHeader;
    }

    const resolvedMobileTitle = mobileTitle !== undefined ? mobileTitle : title;
    const resolvedMobileSubtitle = mobileSubtitle !== undefined ? mobileSubtitle : subtitle;
    const resolvedMobileNavigation = mobileNavigation !== undefined ? mobileNavigation : navigation;
    const resolvedMobileActions = mobileActions !== undefined ? mobileActions : actions;
    const resolvedMobileOnBack = mobileOnBack !== undefined ? mobileOnBack : onBack;

    return (
      <>
        {desktopHeader}
        <header
          className={cn(
            "flex w-full flex-col gap-[var(--space-6)] px-[var(--space-3)] py-[var(--space-6)] bg-transparent md:hidden",
            mobileClassName
          )}
        >
          {mobileNavigationPosition === "above" && resolvedMobileNavigation ? (
            <div className="w-full">{resolvedMobileNavigation}</div>
          ) : null}

          <div className="flex w-full items-center justify-between gap-[var(--space-3)]">
            <div className="flex min-w-0 items-center gap-[var(--space-3)]">
              {resolvedMobileOnBack ? (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={resolvedMobileOnBack}
                  aria-label={goBackLabel}
                  className="shrink-0"
                >
                  <ArrowLeft />
                </Button>
              ) : null}
              <div className="flex min-w-0 flex-col gap-[var(--space-1)]">
                {typeof resolvedMobileTitle === "string" ? (
                  <h1 className="truncate text-heading-1 [font-weight:var(--font-weight-400)] [letter-spacing:0em] text-[color:var(--color-text-primary)]">
                    {resolvedMobileTitle}
                  </h1>
                ) : (
                  resolvedMobileTitle
                )}
                {resolvedMobileSubtitle ? (
                  typeof resolvedMobileSubtitle === "string" ? (
                    <span className="truncate text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
                      {resolvedMobileSubtitle}
                    </span>
                  ) : (
                    resolvedMobileSubtitle
                  )
                ) : null}
              </div>
            </div>

            {resolvedMobileActions && mobileActionsPosition === "inline" ? (
              <div className="shrink-0">{resolvedMobileActions}</div>
            ) : null}
          </div>

          {resolvedMobileActions && mobileActionsPosition === "footer" ? (
            <div className="w-full min-w-0">{resolvedMobileActions}</div>
          ) : null}

          {mobileNavigationPosition === "below" && resolvedMobileNavigation ? (
            <div className="w-full">{resolvedMobileNavigation}</div>
          ) : null}
        </header>
      </>
    );
  }
);

PageHeader.displayName = "PageHeader";

export interface PageHeaderMobileProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: string | React.ReactNode;
  navigation?: React.ReactNode;
  actions?: React.ReactNode;
}

const PageHeaderMobile = React.forwardRef<HTMLElement, PageHeaderMobileProps>(
  ({ title, navigation, actions, className, ...props }, ref) => {
    return (
      <PageHeader
        ref={ref}
        title={title}
        mobileVariant="separate"
        mobileNavigation={navigation}
        mobileActions={actions}
        mobileClassName={className}
        className="hidden"
        {...props}
      />
    );
  }
);

PageHeaderMobile.displayName = "PageHeaderMobile";

export { PageHeader, PageHeaderMobile };
