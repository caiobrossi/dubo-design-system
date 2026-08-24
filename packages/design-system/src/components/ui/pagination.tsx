import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "dubo-design-system/lib/icons";
import { cn } from "dubo-design-system/lib/utils";
import { fieldTransitionClass } from "dubo-design-system/components/ui/field-styles";
import { useDesignSystemLabel } from "../../lib/labels";

/**
 * Dubo Design System — Pagination
 *
 * Composable pagination controls with previous/next buttons, page numbers,
 * ellipsis, and first/last page buttons.
 *
 * Sizes: sm (32px) | default (40px)
 *
 * Reuses shared control height, radius, spacing, icon, and typography roles.
 */

/* ── Container ── */

type PaginationProps = React.ComponentProps<"nav">;

function Pagination({ className, ...props }: PaginationProps) {
  const paginationNavigationLabel = useDesignSystemLabel("paginationNavigation");

  return (
    <nav
      aria-label={paginationNavigationLabel}
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}
Pagination.displayName = "Pagination";

/* ── Content List ── */

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("flex flex-row items-center gap-[var(--space-1)]", className)}
      {...props}
    />
  )
);
PaginationContent.displayName = "PaginationContent";

/* ── Item Wrapper ── */

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn("", className)} {...props} />
);
PaginationItem.displayName = "PaginationItem";

/* ── Link / Button ── */

type PaginationSize = "sm" | "default";

interface PaginationLinkProps extends React.ComponentProps<"button"> {
  isActive?: boolean;
  size?: PaginationSize;
}

const sizeClasses: Record<PaginationSize, string> = {
  sm: "h-[var(--height-control-sm)] min-w-[var(--height-control-sm)] text-body-sm [&_svg]:size-[14px]",
  default:
    "h-[var(--height-control-md)] min-w-[var(--height-control-md)] text-body-md [&_svg]:size-[var(--icon-size-md)]",
};

const PaginationLink = React.forwardRef<HTMLButtonElement, PaginationLinkProps>(
  ({ className, isActive, size = "default", ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--radius-control-input)] px-[var(--space-3)]",
        "select-none [font-weight:var(--font-weight-400)]",
        fieldTransitionClass,
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-[var(--focus-ring-offset)]",
        "disabled:pointer-events-none disabled:opacity-[var(--disabled-opacity)]",
        sizeClasses[size],
        isActive
          ? "bg-[var(--color-brand)] text-[color:var(--color-text-on-brand)] shadow-sm"
          : [
              "text-[color:var(--color-text-primary)]",
              "hover:bg-[var(--color-hover)]",
              "active:translate-y-px",
            ].join(" "),
        className
      )}
      {...props}
    />
  )
);
PaginationLink.displayName = "PaginationLink";

/* ── Previous Button ── */

type PaginationPreviousProps = PaginationLinkProps;

const PaginationPrevious = React.forwardRef<HTMLButtonElement, PaginationPreviousProps>(
  ({ className, size = "default", ...props }, ref) => {
    const previousLabel = useDesignSystemLabel("previousPage");
    const previousText = useDesignSystemLabel("previousPageText");

    return (
      <PaginationLink
        ref={ref}
        aria-label={previousLabel}
        size={size}
        className={cn("gap-[var(--space-1)] pl-[10px]", className)}
        {...props}
      >
        <ChevronLeft />
        <span className="whitespace-nowrap">{previousText}</span>
      </PaginationLink>
    );
  }
);
PaginationPrevious.displayName = "PaginationPrevious";

/* ── Next Button ── */

type PaginationNextProps = PaginationLinkProps;

const PaginationNext = React.forwardRef<HTMLButtonElement, PaginationNextProps>(
  ({ className, size = "default", ...props }, ref) => {
    const nextLabel = useDesignSystemLabel("nextPage");
    const nextText = useDesignSystemLabel("nextPageText");

    return (
      <PaginationLink
        ref={ref}
        aria-label={nextLabel}
        size={size}
        className={cn("gap-[var(--space-1)] pr-[10px]", className)}
        {...props}
      >
        <span className="whitespace-nowrap">{nextText}</span>
        <ChevronRight />
      </PaginationLink>
    );
  }
);
PaginationNext.displayName = "PaginationNext";

/* ── First Button ── */

type PaginationFirstProps = PaginationLinkProps;

const PaginationFirst = React.forwardRef<HTMLButtonElement, PaginationFirstProps>(
  ({ className, size = "default", ...props }, ref) => {
    const firstLabel = useDesignSystemLabel("firstPage");

    return (
      <PaginationLink
        ref={ref}
        aria-label={firstLabel}
        size={size}
        className={cn("gap-[var(--space-1)] pl-[10px]", className)}
        {...props}
      >
        <ChevronsLeft />
        <span className="sr-only">{firstLabel}</span>
      </PaginationLink>
    );
  }
);
PaginationFirst.displayName = "PaginationFirst";

/* ── Last Button ── */

type PaginationLastProps = PaginationLinkProps;

const PaginationLast = React.forwardRef<HTMLButtonElement, PaginationLastProps>(
  ({ className, size = "default", ...props }, ref) => {
    const lastLabel = useDesignSystemLabel("lastPage");

    return (
      <PaginationLink
        ref={ref}
        aria-label={lastLabel}
        size={size}
        className={cn("gap-[var(--space-1)] pr-[10px]", className)}
        {...props}
      >
        <ChevronsRight />
        <span className="sr-only">{lastLabel}</span>
      </PaginationLink>
    );
  }
);
PaginationLast.displayName = "PaginationLast";

/* ── Ellipsis ── */

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  const morePagesLabel = useDesignSystemLabel("morePages");

  return (
    <span
      className={cn(
        "flex h-[var(--height-control-md)] w-[var(--height-control-md)] items-center justify-center text-[color:var(--color-text-muted)]",
        className
      )}
      {...props}
    >
      <MoreHorizontal aria-hidden="true" className="size-[var(--icon-size-md)]" />
      <span className="sr-only">{morePagesLabel}</span>
    </span>
  );
}
PaginationEllipsis.displayName = "PaginationEllipsis";

/* ── Responsive composer ── */

type ResponsivePaginationProps = Omit<PaginationProps, "children"> & {
  /** Página actual, indexada a partir de 1. */
  currentPage: number;
  /** Número total de páginas disponíveis. */
  totalPages: number;
  /** Recebe a página escolhida, indexada a partir de 1. */
  onPageChange: (page: number) => void;
  /** Mantém os tamanhos dos primitives de paginação. */
  size?: PaginationSize;
};

type DesktopPaginationItem = number | "ellipsis-left" | "ellipsis-right";
type CompactPaginationItem =
  | number
  | "previous"
  | "next"
  | "first"
  | "last"
  | "ellipsis-left"
  | "ellipsis-right";

function getMobilePaginationItems(currentPage: number): CompactPaginationItem[] {
  return ["previous", currentPage, "next"];
}

function getDesktopPaginationItems(
  currentPage: number,
  totalPages: number
): DesktopPaginationItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis-right", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "ellipsis-left",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis-left",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis-right",
    totalPages,
  ];
}

/** A composição de sete controlos que cabe entre 360 px e 639 px. */
function getCompactPaginationItems(
  currentPage: number,
  totalPages: number
): CompactPaginationItem[] {
  if (totalPages <= 5) {
    return ["previous", ...Array.from({ length: totalPages }, (_, index) => index + 1), "next"];
  }

  if (currentPage <= 3) {
    return ["previous", 1, 2, 3, "ellipsis-right", "last", "next"];
  }

  if (currentPage >= totalPages - 2) {
    return [
      "previous",
      "first",
      "ellipsis-left",
      totalPages - 2,
      totalPages - 1,
      totalPages,
      "next",
    ];
  }

  return ["previous", "first", "ellipsis-left", currentPage, "ellipsis-right", "last", "next"];
}

interface ResponsivePaginationControlsProps {
  item: CompactPaginationItem;
  activePage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function ResponsivePaginationControl({
  item,
  activePage,
  totalPages,
  onPageChange,
  className,
}: ResponsivePaginationControlsProps) {
  const iconOnlyClass = "[&>span]:sr-only";
  const compactEllipsisClass =
    "h-[var(--height-control-sm)] w-[var(--height-control-sm)] [&_svg]:size-[14px]";

  if (item === "previous") {
    return (
      <PaginationItem className={className}>
        <PaginationPrevious
          size="sm"
          onClick={() => onPageChange(activePage - 1)}
          disabled={activePage === 1}
          className={iconOnlyClass}
        />
      </PaginationItem>
    );
  }

  if (item === "next") {
    return (
      <PaginationItem className={className}>
        <PaginationNext
          size="sm"
          onClick={() => onPageChange(activePage + 1)}
          disabled={activePage === totalPages}
          className={iconOnlyClass}
        />
      </PaginationItem>
    );
  }

  if (item === "first") {
    return (
      <PaginationItem className={className}>
        <PaginationFirst size="sm" onClick={() => onPageChange(1)} disabled={activePage === 1} />
      </PaginationItem>
    );
  }

  if (item === "last") {
    return (
      <PaginationItem className={className}>
        <PaginationLast
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={activePage === totalPages}
        />
      </PaginationItem>
    );
  }

  if (item === "ellipsis-left" || item === "ellipsis-right") {
    return (
      <PaginationItem className={className}>
        <PaginationEllipsis className={compactEllipsisClass} />
      </PaginationItem>
    );
  }

  return (
    <PaginationItem className={className}>
      <PaginationLink size="sm" isActive={item === activePage} onClick={() => onPageChange(item)}>
        {item}
      </PaginationLink>
    </PaginationItem>
  );
}

/**
 * Paginação controlada que compõe os primitives existentes.
 *
 * Em 320 px mantém anterior, página actual e seguinte. Entre 360 px e 639 px
 * usa no máximo sete controlos. A partir de `sm`, apresenta o conjunto
 * completo de páginas, reticências e atalhos para o início e fim.
 */
function ResponsivePagination({
  currentPage,
  totalPages,
  onPageChange,
  size = "default",
  className,
  ...props
}: ResponsivePaginationProps) {
  if (totalPages <= 1) return null;

  const activePage = Math.min(Math.max(currentPage, 1), totalPages);
  const mobileItems = getMobilePaginationItems(activePage);
  const desktopItems = getDesktopPaginationItems(activePage, totalPages);
  const compactItems = getCompactPaginationItems(activePage, totalPages);
  const goToPage = (page: number) => {
    if (page !== activePage) onPageChange(page);
  };

  return (
    <Pagination className={cn("mx-0 w-full justify-center sm:w-auto", className)} {...props}>
      <PaginationContent
        data-pagination-layout="mobile"
        className="w-full justify-between min-[360px]:hidden"
      >
        {mobileItems.map((item, index) => (
          <ResponsivePaginationControl
            key={`${item}-${index}`}
            item={item}
            activePage={activePage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        ))}
      </PaginationContent>
      <PaginationContent
        data-pagination-layout="compact"
        className="hidden w-full justify-between min-[360px]:flex sm:hidden"
      >
        {compactItems.map((item, index) => (
          <ResponsivePaginationControl
            key={`${item}-${index}`}
            item={item}
            activePage={activePage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        ))}
      </PaginationContent>
      <PaginationContent
        data-pagination-layout="desktop"
        className="hidden sm:flex sm:w-auto sm:justify-start"
      >
        <PaginationItem className="hidden sm:list-item">
          <PaginationFirst size={size} onClick={() => goToPage(1)} disabled={activePage === 1} />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            size={size}
            onClick={() => goToPage(activePage - 1)}
            disabled={activePage === 1}
            className="max-sm:[&>span]:sr-only"
          />
        </PaginationItem>
        {desktopItems.map((item) =>
          item === "ellipsis-left" || item === "ellipsis-right" ? (
            <PaginationItem key={item}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                size={size}
                isActive={item === activePage}
                onClick={() => goToPage(item)}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        <PaginationItem>
          <PaginationNext
            size={size}
            onClick={() => goToPage(activePage + 1)}
            disabled={activePage === totalPages}
            className="max-sm:[&>span]:sr-only"
          />
        </PaginationItem>
        <PaginationItem className="hidden sm:list-item">
          <PaginationLast
            size={size}
            onClick={() => goToPage(totalPages)}
            disabled={activePage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
ResponsivePagination.displayName = "ResponsivePagination";

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis,
  ResponsivePagination,
  getMobilePaginationItems,
  getCompactPaginationItems,
  getDesktopPaginationItems,
};
export type {
  CompactPaginationItem,
  DesktopPaginationItem,
  PaginationLinkProps,
  PaginationSize,
  ResponsivePaginationProps,
};
