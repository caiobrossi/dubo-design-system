"use client";

import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type Row,
} from "@tanstack/react-table";
import { cn } from "dubo-design-system/lib/utils";
import { getColumnMeta, type ColumnMobileRole } from "dubo-design-system/lib/table-meta";

/**
 * Dubo Design System — DataCards
 *
 * A mesma linha de uma `DataTable`, mostrada como cartão em vez de linha. Serve
 * o telemóvel, onde seis colunas de desktop não cabem em 375 px e o resultado é
 * scroll horizontal — que não é solução, é o sintoma.
 *
 * **Porque existe.** Seis ecrãs (movimentos de stock, stock, pedidos ao
 * laboratório, pacientes, fornecedores, detalhe de grupo) já escreviam este
 * cartão à mão, com o mesmo desenho copiado. Este componente é essa cópia
 * extraída, para os ecrãs seguintes não a reescreverem outra vez.
 *
 * **Como usar.** Não decide sozinho se é telemóvel — quem chama já sabe, com o
 * `useIsMobile()` que o resto do produto usa, e esse é o único sítio onde a
 * media query vive:
 *
 * ```tsx
 * const isMobile = useIsMobile();
 * if (isMobile) return <DataCards columns={columns} data={rows} getRowId={...} />;
 * return <DataTable columns={columns} data={rows} />;
 * ```
 *
 * As mesmas `columns` servem os dois: os `cell` renderers (badges, avatares,
 * menus) reaproveitam-se tal como estão. O papel de cada coluna no cartão
 * declara-se em `meta.mobile` — ver `lib/table-meta.ts`. Sem `meta.mobile`, a
 * primeira coluna é o título e as restantes são campos.
 */

export interface DataCardsProps<TData, TValue> {
  /** As mesmas definições de coluna da `DataTable`. */
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  getRowId?: (row: TData) => string;
  /** Abre o registo. Torna o cartão focável e activável por teclado. */
  onRowClick?: (row: Row<TData>) => void;
  /** Nome acessível do cartão, já que o título pode ser um componente. */
  getRowAriaLabel?: (row: Row<TData>) => string;
  /** Mostrado quando não há linhas. */
  emptyMessage?: string;
  className?: string;
  /** Rodapé da lista: normalmente o botão "Carregar mais". */
  footer?: React.ReactNode;
}

const labelClass = [
  "text-body-sm",
  "[font-weight:var(--font-weight-400)]",
  "text-[color:var(--color-text-secondary)]",
].join(" ");

const valueClass = [
  "text-body-md",
  "[font-weight:var(--font-weight-400)]",
  "text-[color:var(--color-text-primary)]",
].join(" ");

function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(
    target.closest(
      'button, a, input, select, textarea, [role="button"], [role="checkbox"], [role="menu"], [role="menuitem"], [data-no-row-click="true"]'
    )
  );
}

function resolveRole(role: ColumnMobileRole | undefined, index: number): ColumnMobileRole {
  if (role) return role;
  return index === 0 ? "title" : "field";
}

/**
 * Encontra a etiqueta de uma coluna cujo `header` é um componente.
 *
 * Quase nenhuma tabela do produto tem `header` em texto: são botões de
 * ordenação, checkboxes, cabeçalhos com tooltip de ajuda. O texto que serve de
 * etiqueta está lá dentro, mas não é o único — o cabeçalho de "Estado" dos
 * relatórios traz também as cinco linhas de ajuda do tooltip.
 *
 * Por isso a procura é em largura e pára na primeira string: num cabeçalho
 * `<div><span>Estado</span><Tooltip>…</Tooltip></div>` a primeira string é
 * "Estado", e o tooltip fica onde está. Quando a heurística falhar, a coluna
 * declara `meta.mobile.label` e essa ganha sempre.
 */
function firstTextOf(node: React.ReactNode): string {
  let queue: React.ReactNode[] = [node];

  while (queue.length > 0) {
    const next: React.ReactNode[] = [];

    for (const current of queue) {
      if (current == null || typeof current === "boolean") continue;
      if (typeof current === "string") {
        const text = current.trim();
        if (text) return text;
        continue;
      }
      if (typeof current === "number") return String(current);
      if (Array.isArray(current)) {
        next.push(...current);
        continue;
      }
      if (React.isValidElement(current)) {
        next.push((current.props as { children?: React.ReactNode }).children);
      }
    }

    queue = next;
  }

  return "";
}

function DataCards<TData, TValue>({
  columns,
  data,
  getRowId,
  onRowClick,
  getRowAriaLabel,
  emptyMessage,
  className,
  footer,
}: DataCardsProps<TData, TValue>) {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId,
  });

  const rows = table.getRowModel().rows;

  // Uma vez por render, não uma vez por cartão: o cabeçalho é o mesmo em todos.
  // Sem `useMemo` de propósito — a instância da `table` do TanStack é estável e
  // muda por dentro, pelo que memoizar por ela devolveria etiquetas velhas
  // quando as colunas mudam. São meia dúzia de cabeçalhos por render.
  const labels = new Map<string, string>();
  for (const headerGroup of table.getHeaderGroups()) {
    for (const header of headerGroup.headers) {
      const meta = getColumnMeta(header.column.columnDef);
      if (meta.mobile?.label != null) {
        labels.set(header.column.id, meta.mobile.label);
        continue;
      }
      const definition = header.column.columnDef.header;
      const node = typeof definition === "function" ? definition(header.getContext()) : definition;
      labels.set(header.column.id, firstTextOf(node));
    }
  }

  if (rows.length === 0) {
    return (
      <div className={cn("flex items-center justify-center py-12", labelClass, className)}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-[var(--space-3)]", className)} role="list">
      {rows.map((row) => {
        const cells = row.getVisibleCells();

        const title: React.ReactNode[] = [];
        const subtitle: React.ReactNode[] = [];
        const actions: React.ReactNode[] = [];
        const fields: Array<{ id: string; label: string; value: React.ReactNode }> = [];

        cells.forEach((cell, index) => {
          const meta = getColumnMeta(cell.column.columnDef);
          const role = resolveRole(meta.mobile?.role, index);
          if (role === "hidden") return;

          const rendered = flexRender(cell.column.columnDef.cell, cell.getContext());

          if (role === "title") {
            title.push(<React.Fragment key={cell.id}>{rendered}</React.Fragment>);
            return;
          }
          if (role === "subtitle") {
            subtitle.push(<React.Fragment key={cell.id}>{rendered}</React.Fragment>);
            return;
          }
          if (role === "actions") {
            actions.push(<React.Fragment key={cell.id}>{rendered}</React.Fragment>);
            return;
          }

          fields.push({
            id: cell.id,
            label: labels.get(cell.column.id) ?? "",
            value: rendered,
          });
        });

        const interactive = Boolean(onRowClick);

        return (
          <div
            key={row.id}
            role="listitem"
            aria-label={getRowAriaLabel?.(row)}
            tabIndex={interactive ? 0 : undefined}
            onClick={
              interactive
                ? (event) => {
                    if (isInteractiveTarget(event.target)) return;
                    onRowClick?.(row);
                  }
                : undefined
            }
            onKeyDown={
              interactive
                ? (event) => {
                    if (isInteractiveTarget(event.target)) return;
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onRowClick?.(row);
                    }
                  }
                : undefined
            }
            className={cn(
              "rounded-[var(--surface-card-radius)] border border-[var(--surface-card-border)]",
              "bg-[var(--color-bg-surface)] p-[var(--space-4)]",
              interactive &&
                "cursor-pointer transition-colors duration-[var(--transition-fast)] hover:bg-[var(--color-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
            )}
          >
            {title.length > 0 || subtitle.length > 0 || actions.length > 0 ? (
              <div className="flex items-start justify-between gap-[var(--space-3)]">
                <div className="min-w-0 flex-1">
                  {title.length > 0 ? (
                    <div
                      className={cn(
                        "min-w-0 truncate",
                        "text-heading-4",
                        "[font-weight:var(--font-weight-400)]",
                        "text-[color:var(--color-text-primary)]"
                      )}
                    >
                      {title}
                    </div>
                  ) : null}
                  {subtitle.length > 0 ? (
                    <div
                      className={cn(
                        "mt-[var(--space-1)] min-w-0",
                        "text-body-md",
                        "[font-weight:var(--font-weight-400)]",
                        "text-[color:var(--color-text-secondary)]"
                      )}
                    >
                      {subtitle}
                    </div>
                  ) : null}
                </div>
                {actions.length > 0 ? (
                  <div className="flex shrink-0 items-center gap-[var(--space-1)]">{actions}</div>
                ) : null}
              </div>
            ) : null}

            {fields.length > 0 ? (
              <dl
                className={cn(
                  "grid grid-cols-2 gap-x-[var(--space-4)] gap-y-[var(--space-3)]",
                  title.length > 0 || subtitle.length > 0 || actions.length > 0
                    ? "mt-[var(--space-4)]"
                    : undefined
                )}
              >
                {fields.map((field) => (
                  <div key={field.id} className="flex min-w-0 flex-col gap-[var(--space-1)]">
                    <dt className={labelClass}>{field.label}</dt>
                    <dd className={cn("min-w-0", valueClass)}>{field.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        );
      })}

      {footer}
    </div>
  );
}

DataCards.displayName = "DataCards";

export { DataCards };
