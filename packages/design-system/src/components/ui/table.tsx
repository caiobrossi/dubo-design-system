"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowDown, ArrowUp, ArrowUpDown } from "dubo-design-system/lib/icons";
import { cn } from "dubo-design-system/lib/utils";

/**
 * Dubo Design System — Table
 *
 * Variants: default | outline | card | striped
 *
 * Sub-components (shadcn pattern):
 * - Table — root `<table>` with variant via cva
 * - TableHeader — `<thead>`
 * - TableBody — `<tbody>`
 * - TableFooter — `<tfoot>`
 * - TableRow — `<tr>` with hover state
 * - TableHead — `<th className="text-body-md font-normal">` header cell with optional sorting
 * - TableCell — `<td>` data cell
 * - TableCaption — `<caption>`
 *
 * The variant applies at the Table (root) level and cascades via context to children.
 * All colors use shared semantic CSS variables.
 */

/* ── Variant context ── */

type TableVariant = "default" | "outline" | "card" | "striped";

const TableContext = React.createContext<{ variant: TableVariant }>({
  variant: "default",
});

function useTableVariant() {
  return React.useContext(TableContext);
}

/* ── Table variants (cva) ── */

const tableVariants = cva("w-full caption-bottom text-body-md", {
  variants: {
    variant: {
      default: "",
      outline: ["border border-[var(--color-border)]", "rounded-lg overflow-hidden"].join(" "),
      card: "flex flex-col gap-0",
      striped: "border-separate border-spacing-y-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

/* ── Table ── */

export interface TableProps
  extends React.HTMLAttributes<HTMLTableElement>, VariantProps<typeof tableVariants> {}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const resolvedVariant = (variant ?? "default") as TableVariant;

    if (resolvedVariant === "card") {
      return (
        <TableContext.Provider value={{ variant: resolvedVariant }}>
          <div
            ref={ref as React.Ref<HTMLDivElement>}
            className={cn(tableVariants({ variant: resolvedVariant }), className)}
            role="table"
            {...(props as React.HTMLAttributes<HTMLDivElement>)}
          >
            {children}
          </div>
        </TableContext.Provider>
      );
    }

    return (
      <TableContext.Provider value={{ variant: resolvedVariant }}>
        <div className="relative w-full overflow-auto">
          <table
            ref={ref}
            className={cn(tableVariants({ variant: resolvedVariant }), className)}
            {...props}
          >
            {children}
          </table>
        </div>
      </TableContext.Provider>
    );
  }
);
Table.displayName = "Table";

/* ── TableHeader ── */

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => {
  const { variant } = useTableVariant();

  if (variant === "card") {
    return null;
  }

  return (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props}>
      {children}
    </thead>
  );
});
TableHeader.displayName = "TableHeader";

/* ── TableBody ── */

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => {
  const { variant } = useTableVariant();

  if (variant === "card") {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn("flex flex-col", className)}
        role="rowgroup"
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  }

  return (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props}>
      {children}
    </tbody>
  );
});
TableBody.displayName = "TableBody";

/* ── TableFooter ── */

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => {
  const { variant } = useTableVariant();

  if (variant === "card") {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(
          "border-t border-[var(--color-border)] bg-[var(--color-hover)] font-medium",
          className
        )}
        role="rowgroup"
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  }

  return (
    <tfoot
      ref={ref}
      className={cn(
        "border-t border-[var(--color-border)] bg-[var(--color-hover)] font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    >
      {children}
    </tfoot>
  );
});
TableFooter.displayName = "TableFooter";

/* ── TableRow ── */

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, children, ...props }, ref) => {
    const { variant } = useTableVariant();

    if (variant === "card") {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          className={cn(
            "rounded-xl border border-[var(--color-border)]",
            "bg-[var(--color-bg-surface)] p-4 mb-3",
            "shadow-[var(--shadow-xs)]",
            "transition-all duration-[var(--transition-fast)]",
            "hover:shadow-[var(--shadow-sm)] hover:border-[var(--color-border-strong)]",
            className
          )}
          role="row"
          {...(props as React.HTMLAttributes<HTMLDivElement>)}
        >
          {children}
        </div>
      );
    }

    if (variant === "striped") {
      return (
        <tr
          ref={ref}
          className={cn(
            "bg-[var(--color-bg-subtle)]",
            "transition-colors duration-[var(--transition-fast)]",
            "hover:bg-[var(--color-bg-subtle-hover)]",
            "cursor-pointer",
            className
          )}
          {...props}
        >
          {children}
        </tr>
      );
    }

    return (
      <tr
        ref={ref}
        className={cn(
          "border-b border-[var(--color-border)]",
          "transition-colors duration-[var(--transition-fast)]",
          "hover:bg-[var(--color-hover)]",
          "data-[state=selected]:bg-[var(--color-hover)]",
          className
        )}
        {...props}
      >
        {children}
      </tr>
    );
  }
);
TableRow.displayName = "TableRow";

/* ── TableHead ── */

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Enable sorting behavior on this header */
  sortable?: boolean;
  /** Current sort direction — null means unsorted */
  sortDirection?: "asc" | "desc" | null;
  /** Callback when the header is clicked for sorting */
  onSort?: () => void;
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sortable, sortDirection, onSort, children, ...props }, ref) => {
    const { variant } = useTableVariant();

    const sortIcon = sortable ? (
      <span
        className={cn(
          "ml-1 inline-flex",
          !sortDirection && "opacity-0 group-hover/th:opacity-40 transition-opacity"
        )}
      >
        {sortDirection === "asc" ? (
          <ArrowUp size={14} />
        ) : sortDirection === "desc" ? (
          <ArrowDown size={14} />
        ) : (
          <ArrowUpDown size={14} />
        )}
      </span>
    ) : null;

    if (variant === "outline") {
      return (
        <th
          ref={ref}
          className={cn(
            "h-10 px-3 text-left align-middle text-body-md font-normal",
            "text-[color:var(--color-text-primary)]",
            "border-x border-[var(--color-border)] bg-[var(--color-hover)]",
            sortable && "cursor-pointer select-none group/th",
            className
          )}
          onClick={sortable ? onSort : undefined}
          {...props}
        >
          <div className="flex items-center gap-1">
            {children}
            {sortIcon}
          </div>
        </th>
      );
    }

    return (
      <th
        ref={ref}
        className={cn(
          "h-10 px-3 text-left align-middle text-body-md font-normal",
          "text-[color:var(--color-text-primary)]",
          sortable && "cursor-pointer select-none group/th",
          className
        )}
        onClick={sortable ? onSort : undefined}
        {...props}
      >
        <div className="flex items-center gap-1">
          {children}
          {sortIcon}
        </div>
      </th>
    );
  }
);
TableHead.displayName = "TableHead";

/* ── TableCell ── */

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, children, ...props }, ref) => {
  const { variant } = useTableVariant();

  if (variant === "card") {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn("py-1 text-body-md text-[color:var(--color-text-primary)]", className)}
        role="cell"
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  }

  if (variant === "outline") {
    return (
      <td
        ref={ref}
        className={cn(
          "px-3 py-3 align-middle text-body-md",
          "border-x border-[var(--color-border)]",
          "[color:var(--color-text-primary)]",
          className
        )}
        {...props}
      >
        {children}
      </td>
    );
  }

  if (variant === "striped") {
    return (
      <td
        ref={ref}
        className={cn(
          "px-4 py-4 align-middle text-body-lg",
          "[color:var(--color-text-primary)]",
          "first:rounded-l-2xl last:rounded-r-2xl",
          "first:pl-6 last:pr-6",
          className
        )}
        {...props}
      >
        {children}
      </td>
    );
  }

  return (
    <td
      ref={ref}
      className={cn(
        "px-3 py-3 align-middle text-body-md",
        "[color:var(--color-text-primary)]",
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
});
TableCell.displayName = "TableCell";

/* ── TableCaption ── */

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, children, ...props }, ref) => {
  const { variant } = useTableVariant();

  if (variant === "card") {
    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn("mt-2 text-body-md text-[color:var(--color-text-muted)]", className)}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        {children}
      </div>
    );
  }

  return (
    <caption
      ref={ref}
      className={cn("mt-4 text-body-md text-[color:var(--color-text-muted)]", className)}
      {...props}
    >
      {children}
    </caption>
  );
});
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  tableVariants,
};
