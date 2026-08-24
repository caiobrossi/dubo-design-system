"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  type DialogContentProps,
} from "@dubo/design-system-shared/components/ui/dialog";
import { cn } from "@dubo/design-system-shared/lib/utils";

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export interface AdaptiveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  breakpoint?: string;
  desktopSize?: DialogContentProps["size"];
  allowOverflow?: boolean;
  showCloseButton?: boolean;
  desktopContentClassName?: string;
  mobileContentClassName?: string;
  desktopContentStyle?: React.CSSProperties;
  mobileContentStyle?: React.CSSProperties;
  desktopContentProps?: AdaptiveContentProps;
  mobileContentProps?: AdaptiveContentProps;
}

type AdaptiveContentAttributes = {
  [K in `data-${string}`]?: string;
} & {
  [K in `aria-${string}`]?: string;
};

type AdaptiveContentProps = Omit<
  DialogContentProps,
  "children" | "className" | "style" | "showCloseButton" | "allowOverflow" | "size"
> &
  AdaptiveContentAttributes;

const mobileBaseClassName = [
  "left-0 right-0 top-auto bottom-0",
  "h-[90dvh] max-h-[calc(100dvh-40px)] w-full max-w-none",
  "translate-x-0 translate-y-0",
  "rounded-b-none rounded-t-[var(--radius-scale-3xl)]",
  "data-[state=open]:animate-none data-[state=closed]:animate-none",
  "p-0",
].join(" ");

export function AdaptiveModal({
  open,
  onOpenChange,
  children,
  breakpoint = "(max-width: 768px)",
  desktopSize = "default",
  allowOverflow = false,
  showCloseButton = true,
  desktopContentClassName,
  mobileContentClassName,
  desktopContentStyle,
  mobileContentStyle,
  desktopContentProps,
  mobileContentProps,
}: AdaptiveModalProps) {
  const isMobile = useMediaQuery(breakpoint);
  const activeContentProps = isMobile ? mobileContentProps : desktopContentProps;

  React.useEffect(() => {
    if (!(open && isMobile)) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobile, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        {...activeContentProps}
        allowOverflow={allowOverflow}
        showCloseButton={showCloseButton}
        size={isMobile ? undefined : desktopSize}
        className={cn(
          isMobile ? mobileBaseClassName : desktopContentClassName,
          isMobile ? mobileContentClassName : undefined,
        )}
        style={isMobile ? mobileContentStyle : desktopContentStyle}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
