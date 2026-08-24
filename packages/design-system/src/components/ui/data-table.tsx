"use client";

import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
  type Row,
  type VisibilityState,
  type Updater,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "dubo-design-system/lib/icons";
import { cn } from "dubo-design-system/lib/utils";
import { getColumnMeta, resolveColumnVisibility } from "dubo-design-system/lib/table-meta";

function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(
    target.closest(
      'button, a, input, select, textarea, [role="button"], [role="checkbox"], [role="menu"], [role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"], [data-no-row-click="true"]'
    )
  );
}

/**
 * Dubo Design System --- DataTable
 *
 * TanStack React Table wrapper with built-in sorting, filtering, and row selection.
 * Uses div-based flex layout (not HTML `<table>`) for maximum styling flexibility.
 *
 * **When to use DataTable vs Table:**
 *
 * Use **DataTable** when you need:
 * - Sorting, filtering, or pagination logic
 * - Large datasets (100+ rows)
 * - Row selection with checkboxes
 * - Server-side operations (manual sorting/filtering)
 * - Column visibility controls
 * - Future: virtualization for 1000+ rows (via @tanstack/react-virtual)
 *
 * Use **Table** (static) when you need:
 * - Simple static tables (<100 rows)
 * - No sorting/filtering needed
 * - Settings pages, small data displays
 * - Full HTML semantics (`<table>`, `<tr>`, `<td>`)
 *
 * All colors use shared semantic CSS variables.
 */

/* ---- Props ---- */

export interface DataTableProps<TData, TValue> {
  /** Column definitions (TanStack React Table ColumnDef) */
  columns: ColumnDef<TData, TValue>[];
  /** Data array */
  data: TData[];
  /** Enable sorting (default: true) */
  enableSorting?: boolean;
  /** Server-side sorting — disables client-side sort model */
  manualSorting?: boolean;
  /** Controlled sorting state */
  sorting?: SortingState;
  /** Sorting change handler */
  onSortingChange?: (sorting: SortingState) => void;
  /** Enable row selection */
  enableRowSelection?: boolean;
  /** Row selection state */
  rowSelection?: RowSelectionState;
  /** Row selection change handler */
  onRowSelectionChange?: (selection: RowSelectionState) => void;
  /** Column visibility state */
  columnVisibility?: VisibilityState;
  /** Column visibility change handler */
  onColumnVisibilityChange?: (visibility: Updater<VisibilityState>) => void;
  /** Row click handler */
  onRowClick?: (row: Row<TData>) => void;
  /** Custom row ID getter */
  getRowId?: (row: TData) => string;
  /** Empty state message */
  emptyMessage?: string;
  /** Loading state */
  loading?: boolean;
  /** Additional className for the container */
  className?: string;
  /** Fit the table and rows to the available container width */
  fitContainer?: boolean;
  /** Use min widths but let columns grow to fill available horizontal space */
  fluidColumns?: boolean;
  /** Minimum width used when fluidColumns is enabled */
  minColumnWidth?: number;
  /** Accessible label for the table role */
  ariaLabel?: string;
  /** Total rows exposed to assistive technology */
  ariaRowCount?: number;
  /** Total columns exposed to assistive technology */
  ariaColCount?: number;
  /** Accessible row label builder */
  getRowAriaLabel?: (row: Row<TData>) => string;
  /**
   * Esconde colunas quando a tabela não cabe na largura disponível, pela ordem
   * declarada em `meta.priority` (o número mais alto sai primeiro).
   *
   * Existe porque a alternativa era a coluna cair fora da área visível sem
   * aviso: a 1280 px — a largura de um portátil comum — "Estado" e "Ações"
   * ficavam para lá da margem direita da lista de pacientes (DUB-111). Perder
   * uma coluna escolhida é uma decisão; perdê-la por acidente de largura não é.
   *
   * Não mexe no `columnVisibility` de quem chama: o que o utilizador escondeu
   * continua escondido, e esta camada só acrescenta.
   */
  autoHideByPriority?: boolean;
}

/** Mede a largura disponível para a tabela, e volta a medir quando ela muda. */
function useAvailableWidth(enabled: boolean) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const node = ref.current;
    if (!enabled || !node) return;

    const observer = new ResizeObserver((entries) => {
      const next = entries[0]?.contentRect.width ?? 0;
      setWidth((current) => (Math.abs(current - next) < 1 ? current : next));
    });

    observer.observe(node);
    setWidth(node.getBoundingClientRect().width);
    return () => observer.disconnect();
  }, [enabled]);

  return { ref, width };
}

/* ---- Component ---- */

function DataTable<TData, TValue>({
  columns,
  data,
  enableSorting = true,
  manualSorting,
  sorting,
  onSortingChange,
  enableRowSelection = false,
  rowSelection,
  onRowSelectionChange,
  columnVisibility,
  onColumnVisibilityChange,
  onRowClick,
  getRowId,
  emptyMessage,
  loading,
  className,
  fitContainer = false,
  fluidColumns = false,
  minColumnWidth = 144,
  ariaLabel,
  ariaRowCount,
  ariaColCount,
  getRowAriaLabel,
  autoHideByPriority = false,
}: DataTableProps<TData, TValue>) {
  // Internal state for uncontrolled mode
  const [internalSorting, setInternalSorting] = React.useState<SortingState>([]);
  const [internalRowSelection, setInternalRowSelection] = React.useState<RowSelectionState>({});
  const [internalColumnVisibility, setInternalColumnVisibility] = React.useState<VisibilityState>(
    {}
  );

  const { ref: measureRef, width: availableWidth } = useAvailableWidth(autoHideByPriority);

  const priorityVisibility = React.useMemo(() => {
    if (!autoHideByPriority || availableWidth <= 0) return {};

    const measured = columns
      .map((column, index) => {
        const id =
          (column as { id?: string }).id ??
          (column as { accessorKey?: string }).accessorKey ??
          String(index);
        const size = (column as { size?: number }).size;
        return {
          id,
          priority: getColumnMeta(column).priority,
          // 150 é o `size` por omissão do TanStack, que é também o que a tabela
          // assume quando a coluna não declara largura.
          minWidth: size ?? 150,
        };
      })
      // Uma coluna que o utilizador já escondeu não ocupa largura nenhuma:
      // contá-la faria sacrificar outra que ainda cabia.
      .filter((column) => columnVisibility?.[column.id] !== false);

    return resolveColumnVisibility(measured, availableWidth);
  }, [autoHideByPriority, availableWidth, columns, columnVisibility]);

  const effectiveColumnVisibility = React.useMemo(
    () => ({ ...(columnVisibility ?? internalColumnVisibility), ...priorityVisibility }),
    [columnVisibility, internalColumnVisibility, priorityVisibility]
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sorting ?? internalSorting,
      rowSelection: rowSelection ?? internalRowSelection,
      columnVisibility: effectiveColumnVisibility,
    },
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function" ? updater(sorting ?? internalSorting) : updater;
      onSortingChange?.(newSorting);
      if (!sorting) setInternalSorting(newSorting);
    },
    onRowSelectionChange: (updater) => {
      const newSelection =
        typeof updater === "function" ? updater(rowSelection ?? internalRowSelection) : updater;
      onRowSelectionChange?.(newSelection);
      if (!rowSelection) setInternalRowSelection(newSelection);
    },
    onColumnVisibilityChange: (updater) => {
      onColumnVisibilityChange?.(updater);
      if (!columnVisibility) {
        setInternalColumnVisibility((current) =>
          typeof updater === "function" ? updater(current) : updater
        );
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: manualSorting ? undefined : getSortedRowModel(),
    enableSorting,
    enableRowSelection,
    getRowId,
  });

  const table_ = (
    <div
      className={cn(fitContainer ? "w-full min-w-0" : "w-max min-w-full", className)}
      role="table"
      aria-label={ariaLabel}
      aria-rowcount={ariaRowCount}
      aria-colcount={ariaColCount}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 mb-2" role="rowgroup">
        {table.getHeaderGroups().map((headerGroup) => (
          <div
            key={headerGroup.id}
            className={cn("flex min-w-full", fitContainer ? "w-full" : "w-max")}
            role="row"
          >
            {headerGroup.headers.map((header) => (
              <div
                key={header.id}
                className={cn(
                  "px-4 py-3 text-left text-body-md [font-weight:var(--font-weight-400)]",
                  "text-[color:var(--color-text-secondary)]",
                  "first:pl-6 last:pr-6",
                  "min-w-0 flex-1",
                  header.column.getCanSort() && "cursor-pointer select-none group/th",
                  (header.column.columnDef.meta as { className?: string } | undefined)?.className
                )}
                style={
                  fluidColumns
                    ? {
                        minWidth:
                          header.column.getSize() !== 150
                            ? Math.max(header.column.getSize(), minColumnWidth)
                            : minColumnWidth,
                        flex: "1 1 0",
                      }
                    : header.column.getSize() !== 150
                      ? { width: header.column.getSize(), flex: "none" }
                      : undefined
                }
                role="columnheader"
                aria-sort={
                  header.column.getCanSort()
                    ? header.column.getIsSorted() === "asc"
                      ? "ascending"
                      : header.column.getIsSorted() === "desc"
                        ? "descending"
                        : "none"
                    : undefined
                }
              >
                <div
                  className={cn(
                    "flex items-start gap-1.5",
                    header.column.getCanSort() && "cursor-pointer select-none"
                  )}
                  onClick={
                    header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined
                  }
                  onKeyDown={
                    header.column.getCanSort()
                      ? (event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            header.column.getToggleSortingHandler()?.(event);
                          }
                        }
                      : undefined
                  }
                  tabIndex={header.column.getCanSort() ? 0 : -1}
                  role={header.column.getCanSort() ? "button" : "presentation"}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getCanSort() && (
                    <span
                      className={cn(
                        "ml-1 inline-flex",
                        !header.column.getIsSorted() &&
                          "opacity-0 group-hover/th:opacity-40 transition-opacity"
                      )}
                    >
                      {header.column.getIsSorted() === "asc" ? (
                        <ArrowUp size={14} />
                      ) : header.column.getIsSorted() === "desc" ? (
                        <ArrowDown size={14} />
                      ) : (
                        <ArrowUpDown size={14} />
                      )}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Body */}
      <div role="rowgroup">
        {loading ? (
          <div className="flex items-center justify-center py-12 text-body-md text-[color:var(--color-text-muted)]">
            Loading&hellip;
          </div>
        ) : table.getRowModel().rows.length === 0 ? (
          <div className="flex items-center justify-center py-12 text-body-md text-[color:var(--color-text-muted)]">
            {emptyMessage || "No results."}
          </div>
        ) : (
          table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className={cn(
                "flex min-w-full items-center min-h-20",
                fitContainer ? "w-full" : "w-max",
                "bg-[var(--color-bg-subtle)]",
                "rounded-2xl mb-2",
                "transition-colors duration-[var(--transition-fast)]",
                "hover:bg-[var(--color-bg-subtle-hover)]",
                onRowClick && "cursor-pointer",
                row.getIsSelected() && "bg-[var(--color-bg-subtle-hover)]"
              )}
              role="row"
              aria-label={getRowAriaLabel?.(row)}
              onClick={(event) => {
                if (isInteractiveTarget(event.target)) return;
                onRowClick?.(row);
              }}
              onKeyDown={(event) => {
                if (isInteractiveTarget(event.target)) return;
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onRowClick?.(row);
                }
              }}
              tabIndex={onRowClick ? 0 : -1}
            >
              {row.getVisibleCells().map((cell) => (
                <div
                  key={cell.id}
                  className={cn(
                    "px-4 py-4 text-body-lg [font-weight:var(--font-weight-400)]",
                    "text-[color:var(--color-text-primary)]",
                    "first:pl-6 last:pr-6",
                    "min-w-0 flex-1 overflow-visible",
                    (cell.column.columnDef.meta as { className?: string } | undefined)?.className
                  )}
                  style={
                    fluidColumns
                      ? {
                          minWidth:
                            cell.column.getSize() !== 150
                              ? Math.max(cell.column.getSize(), minColumnWidth)
                              : minColumnWidth,
                          flex: "1 1 0",
                        }
                      : cell.column.getSize() !== 150
                        ? { width: cell.column.getSize(), flex: "none" }
                        : undefined
                  }
                  role="cell"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );

  // Sem `autoHideByPriority` a árvore fica exactamente como estava — a medição
  // precisa de um elemento com a largura disponível, e a raiz da tabela tem a
  // largura do conteúdo (`w-max`), que é precisamente o que transborda.
  if (!autoHideByPriority) return table_;

  return (
    <div ref={measureRef} className="w-full min-w-0">
      {table_}
    </div>
  );
}

DataTable.displayName = "DataTable";

export { DataTable };
