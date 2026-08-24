"use client";

import * as React from "react";

/**
 * Dubo Design System — etiquetas embutidas
 *
 * Alguns componentes do design system trazem texto próprio que nunca passa por
 * quem os usa: o nome acessível do botão de fechar de um `Dialog` ou de um
 * `Sheet`, o "mais páginas" da paginação, o botão que abre as sugestões de um
 * `Autocomplete`. Esse texto estava escrito em inglês — num produto que é só
 * para Portugal, quem navega com leitor de ecrã ouvia "Close".
 *
 * Passá-lo por propriedade não servia: são 122 usos de `DialogContent` e 75 de
 * `SheetContent`, e nenhum deles tem razão para saber que o botão existe. Vive
 * aqui, num sítio só, e a aplicação preenche-o uma vez com as traduções.
 *
 * Sem `provider` os componentes continuam a funcionar com os valores em inglês
 * que já tinham — é o que mantém o Storybook e o site do design system a
 * renderizar sem dependerem do i18n da aplicação.
 */

export interface DesignSystemLabels {
  /** Nome acessível do botão de fechar de diálogos e painéis laterais. */
  close: string;
  /** Botão que abre e fecha a lista de sugestões de um campo de pesquisa. */
  toggleSuggestions: string;
  /** Botão que limpa o que está escrito num campo. */
  clear: string;
  /** Botão que retira uma etiqueta de uma lista de etiquetas. */
  remove: string;
  /** Botão que volta ao ecrã anterior, no cabeçalho de página. */
  goBack: string;

  /* ── Campos de data e hora ── */

  /** Botão que limpa a data escolhida. */
  clearDate: string;
  /** Botão que abre o calendário de um campo de data. */
  openCalendar: string;
  /** Botão que limpa a hora escolhida. */
  clearTime: string;
  /** Botão que abre o seletor de horas de um campo de hora. */
  openTimePicker: string;

  /* ── Paginação ── */

  /** Reticências da paginação, entre blocos de páginas. */
  morePages: string;
  /** Nome da região de navegação da paginação. */
  paginationNavigation: string;
  /** Primeira página, na paginação. */
  firstPage: string;
  /** Página anterior, na paginação. */
  previousPage: string;
  /** Texto visível do botão de página anterior. */
  previousPageText: string;
  /** Página seguinte, na paginação. */
  nextPage: string;
  /** Texto visível do botão de página seguinte. */
  nextPageText: string;
  /** Última página, na paginação. */
  lastPage: string;

  /* ── Navegação e painéis flutuantes ── */

  /** Fundo escurecido que fecha o menu de navegação em telemóvel. */
  closeNavigation: string;
  /** Pega que arrasta um painel flutuante. */
  dragPanel: string;
  /** Botão que volta a abrir um painel flutuante minimizado. */
  expandPanel: string;
  /** Botão que minimiza um painel flutuante. */
  minimizePanel: string;
  /** Botão que fecha um painel flutuante. */
  closePanel: string;
}

const FALLBACK_LABELS: DesignSystemLabels = {
  close: "Close",
  toggleSuggestions: "Toggle suggestions",
  clear: "Clear",
  remove: "Remove",
  goBack: "Go back",

  clearDate: "Clear date",
  openCalendar: "Open calendar",
  clearTime: "Clear time",
  openTimePicker: "Open time picker",

  morePages: "Pages omitted",
  paginationNavigation: "Pagination",
  firstPage: "Go to first page",
  previousPage: "Go to previous page",
  previousPageText: "Previous",
  nextPage: "Go to next page",
  nextPageText: "Next",
  lastPage: "Go to last page",

  closeNavigation: "Close navigation",
  dragPanel: "Drag floating panel",
  expandPanel: "Expand floating panel",
  minimizePanel: "Minimize floating panel",
  closePanel: "Close floating panel",
};

const LabelsContext = React.createContext<DesignSystemLabels>(FALLBACK_LABELS);

export interface DesignSystemLabelsProviderProps {
  /** Só as chaves que a aplicação traduz; as restantes ficam no valor base. */
  labels: Partial<DesignSystemLabels>;
  /**
   * Opcional, como o React declara em `PropsWithChildren`. Não é um detalhe de
   * gosto: com `children` obrigatório, `createElement(Provider, { labels }, node)`
   * deixa de compilar, porque a sobrecarga escolhida exige a prop mesmo quando os
   * filhos vão no terceiro argumento. E passá-los nas props para contornar isso
   * cai na regra `react/no-children-prop` do eslint — ou seja, obrigatório aqui
   * torna impossível montar este provider fora de JSX, que é como os testes deste
   * pacote o fazem.
   */
  children?: React.ReactNode;
}

export function DesignSystemLabelsProvider({
  labels,
  children,
}: DesignSystemLabelsProviderProps) {
  const value = React.useMemo(() => ({ ...FALLBACK_LABELS, ...labels }), [labels]);

  return <LabelsContext.Provider value={value}>{children}</LabelsContext.Provider>;
}

/** Lê uma etiqueta embutida. Fora do provider devolve o valor base, em inglês. */
export function useDesignSystemLabel(key: keyof DesignSystemLabels): string {
  return React.useContext(LabelsContext)[key];
}
