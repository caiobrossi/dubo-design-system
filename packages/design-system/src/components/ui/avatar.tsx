"use client";

/* eslint-disable @next/next/no-img-element */

import React from "react";

import { cn } from "dubo-design-system/lib/utils";

const SIZE_CONFIG = {
  xs: { size: "24px", fontSize: "0.625rem" },
  sm: { size: "32px", fontSize: "0.75rem" },
  default: { size: "40px", fontSize: "0.875rem" },
  lg: { size: "48px", fontSize: "1rem" },
  xl: { size: "64px", fontSize: "1.25rem" },
} as const;

type AvatarSize = keyof typeof SIZE_CONFIG;

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  name?: string;
  variant?: "brand" | "neutral";
  size?: AvatarSize;
  showPlaceholder?: boolean;
  status?: "online" | "offline" | "busy";
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  children: React.ReactNode;
}

export interface AvatarGroupCountProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
  size?: AvatarSize;
}

function getInitialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

const VARIANT_STYLES = {
  brand: {
    bg: "var(--color-brand-subtle)",
    text: "var(--color-brand)",
  },
  neutral: {
    bg: "var(--color-bg-subtle)",
    text: "var(--color-text-primary)",
  },
} as const;

const STATUS_COLORS = {
  online: "var(--color-success)",
  offline: "var(--color-border-strong)",
  busy: "var(--color-danger)",
} as const;

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  {
    className,
    variant = "brand",
    size = "default",
    src,
    alt,
    initials,
    name,
    showPlaceholder = false,
    status,
    style,
    ...props
  },
  ref
) {
  const config = SIZE_CONFIG[size];
  const resolvedInitials = initials || (name ? getInitialsFromName(name) : undefined);
  const variantStyle = VARIANT_STYLES[variant];

  const [imgError, setImgError] = React.useState(false);
  const showImage = src && !imgError;
  const showIllustration = !showImage && showPlaceholder;

  return (
    <div
      ref={ref}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-visible select-none rounded-full",
        className
      )}
      style={{
        width: config.size,
        height: config.size,
        minWidth: config.size,
        minHeight: config.size,
        backgroundColor: showImage
          ? "transparent"
          : showIllustration
            ? "color-mix(in srgb, var(--color-brand) 16%, var(--color-bg-surface))"
            : variantStyle.bg,
        boxShadow: showIllustration
          ? "inset 0 0 0 1px color-mix(in srgb, var(--color-brand) 24%, transparent)"
          : undefined,
        ...style,
      }}
      {...props}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt ?? name ?? "Avatar"}
          onError={() => setImgError(true)}
          className="h-full w-full rounded-full object-cover"
        />
      ) : showIllustration ? (
        <img
          src="/avatar-placeholder.webp"
          alt="Avatar placeholder"
          className="h-full w-full rounded-full object-contain p-[8%]"
        />
      ) : resolvedInitials ? (
        <span
          aria-hidden="true"
          className="select-none"
          style={{
            fontSize: config.fontSize,
            fontWeight: 500,
            lineHeight: 1,
            color: variantStyle.text,
          }}
        >
          {resolvedInitials}
        </span>
      ) : (
        <span
          aria-hidden="true"
          className="select-none"
          style={{
            fontSize: config.fontSize,
            fontWeight: 500,
            lineHeight: 1,
            color: variantStyle.text,
          }}
        >
          ?
        </span>
      )}

      {status ? (
        <span
          aria-label={status}
          className="absolute bottom-0 right-0 rounded-full"
          style={{
            width: "var(--size-3)",
            height: "var(--size-3)",
            backgroundColor: STATUS_COLORS[status],
            border: "2px solid var(--color-bg-surface)",
            boxSizing: "content-box",
            transform: "translate(15%, 15%)",
          }}
        />
      ) : null}
    </div>
  );
});

Avatar.displayName = "Avatar";

const AvatarGroupCount = React.forwardRef<HTMLDivElement, AvatarGroupCountProps>(
  function AvatarGroupCount({ className, count, size = "default", ...props }, ref) {
    return (
      <Avatar
        ref={ref}
        variant="neutral"
        size={size}
        initials={`+${count}`}
        className={className}
        {...props}
      />
    );
  }
);

AvatarGroupCount.displayName = "AvatarGroupCount";

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(function AvatarGroup(
  { className, max, children, ...props },
  ref
) {
  const childArray = React.Children.toArray(children);
  const visibleChildren = max ? childArray.slice(0, max) : childArray;
  const extraCount = max ? Math.max(0, childArray.length - max) : 0;

  return (
    <div ref={ref} className={cn("flex items-center", className)} {...props}>
      {visibleChildren.map((child, index) => (
        <div
          key={index}
          className="rounded-full"
          style={{
            marginLeft: index === 0 ? 0 : "var(--avatar-group-overlap)",
            zIndex: visibleChildren.length - index,
            boxShadow: "0 0 0 2px var(--color-bg-surface)",
          }}
        >
          {child}
        </div>
      ))}
      {extraCount > 0 ? (
        <div
          className="rounded-full"
          style={{
            marginLeft: "var(--avatar-group-overlap)",
            zIndex: 0,
            boxShadow: "0 0 0 2px var(--color-bg-surface)",
          }}
        >
          <AvatarGroupCount
            count={extraCount}
            size={
              (React.isValidElement(childArray[0]) &&
                (childArray[0].props as AvatarProps).size) ||
              "default"
            }
          />
        </div>
      ) : null}
    </div>
  );
});

AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarGroup, AvatarGroupCount };
