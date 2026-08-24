/**
 * Dubo Design System — metadados de coluna
 *
 * As tabelas do produto declaravam `meta: { className }` e mais nada, pelo que
 * nem o cartão de telemóvel nem a decisão de que coluna sacrificar quando o ecrã
 * aperta tinham onde viver: cada ecrã reinventava a resposta em JSX. Estes
 * metadados dão um sítio só a essas duas decisões, ao lado da definição da
 * coluna, que é onde se sabe o que a coluna significa.
 *
 * Ver `data-cards.tsx` (cartões) e `resolveColumnVisibility` (largura apertada).
 */

/** Papel que a coluna assume dentro do cartão de telemóvel. */
export type ColumnMobileRole =
  /** Linha grande no topo do cartão. Uma por cartão. */
  | "title"
  /** Linha secundária debaixo do título (data, código, referência). */
  | "subtitle"
  /** Menu ou botões, encostados ao canto superior direito. */
  | "actions"
  /** Par etiqueta/valor na grelha de dois campos por linha. */
  | "field"
  /** Não entra no cartão. */
  | "hidden";

export interface ColumnMobileMeta {
  role?: ColumnMobileRole;
  /**
   * Etiqueta a mostrar no cartão. O `header` da coluna pode ser um componente
   * (botão de ordenação, checkbox), e um componente não serve de etiqueta.
   */
  label?: string;
}

export interface DuboColumnMeta {
  /** Classes aplicadas à célula e ao cabeçalho na vista de tabela. */
  className?: string;
  /** Comportamento da coluna no cartão de telemóvel. */
  mobile?: ColumnMobileMeta;
  /**
   * Ordem de sacrifício quando a tabela não cabe na largura disponível:
   * 1 nunca se esconde, e o número mais alto é o primeiro a sair.
   * Sem valor, a coluna conta como prioridade 1 — nunca se esconde.
   */
  priority?: number;
}

/** Lê os metadados Dubo de uma coluna TanStack sem espalhar `as` pelos ecrãs. */
export function getColumnMeta(columnDef: { meta?: unknown } | undefined): DuboColumnMeta {
  return (columnDef?.meta as DuboColumnMeta | undefined) ?? {};
}

/**
 * Decide que colunas ficam visíveis numa largura dada.
 *
 * Serve o caso em que a tabela não cabe mas também não é telemóvel — um portátil
 * a 1280 px, onde "Estado" e "Ações" saíam da área visível sem aviso (DUB-111).
 * Esconder por prioridade declarada é uma escolha; deixar a coluna cair fora do
 * ecrã por acidente de largura não é.
 *
 * Devolve um `VisibilityState` do TanStack: `{ [columnId]: false }` para as que
 * saem. Colunas sem `priority` nunca saem.
 */
export function resolveColumnVisibility(
  columns: Array<{ id: string; priority?: number; minWidth: number }>,
  availableWidth: number
): Record<string, boolean> {
  const hidden: Record<string, boolean> = {};
  if (!Number.isFinite(availableWidth) || availableWidth <= 0) return hidden;

  let required = columns.reduce((total, column) => total + column.minWidth, 0);
  if (required <= availableWidth) return hidden;

  // Sacrificar da prioridade mais alta para a mais baixa, e parar assim que cabe:
  // esconder mais do que o necessário custa informação sem ganhar largura.
  const sacrificable = columns
    .filter((column) => (column.priority ?? 1) > 1)
    .toSorted((a, b) => (b.priority ?? 1) - (a.priority ?? 1));

  for (const column of sacrificable) {
    if (required <= availableWidth) break;
    hidden[column.id] = false;
    required -= column.minWidth;
  }

  return hidden;
}
