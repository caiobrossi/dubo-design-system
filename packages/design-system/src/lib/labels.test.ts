import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Badge } from "dubo-design-system/components/ui/badge";
import { PageHeader } from "dubo-design-system/components/ui/page-header";
import {
  Pagination,
  PaginationEllipsis,
  PaginationNext,
  PaginationPrevious,
} from "dubo-design-system/components/ui/pagination";
import { DesignSystemLabelsProvider } from "dubo-design-system/lib/labels";

/**
 * O `aria-label` destes botões nunca passa por quem os usa, por isso a única
 * forma de o ver errado é lê-lo no HTML — nem o TypeScript nem o `i18n:check`
 * distinguem uma chave ligada de uma chave esquecida. Estes testes montam dois
 * componentes que trazem etiquetas embutidas e leem o atributo que sai.
 *
 * O que protegem: um `aria-label` fixo reintroduzido no meio de uma edição
 * continua a compilar e a passar em todos os gates — mas deixa de responder ao
 * provider, e é isso que aqui falha.
 */

function renderWithLabels(labels: Parameters<typeof DesignSystemLabelsProvider>[0]["labels"], node: React.ReactNode) {
  return renderToStaticMarkup(createElement(DesignSystemLabelsProvider, { labels }, node));
}

describe("etiquetas embutidas do design system", () => {
  it("usa a tradução que o provider dá ao botão de retirar de um Badge", () => {
    const html = renderWithLabels(
      { remove: "Remover" },
      createElement(Badge, { onClose: () => {} }, "Ortodontia")
    );

    expect(html).toContain('aria-label="Remover"');
    expect(html).not.toContain('aria-label="Remove"');
  });

  it("usa a tradução que o provider dá ao botão de voltar do PageHeader", () => {
    const html = renderWithLabels(
      { goBack: "Voltar" },
      createElement(PageHeader, { title: "Pacientes", onBack: () => {} })
    );

    expect(html).toContain('aria-label="Voltar"');
    expect(html).not.toContain('aria-label="Go back"');
  });

  it("mantém o valor base em inglês fora do provider, para o Storybook renderizar", () => {
    const html = renderToStaticMarkup(
      createElement(Badge, { onClose: () => {} }, "Ortodontia")
    );

    expect(html).toContain('aria-label="Remove"');
  });

  it("deixa quem chama sobrepor o seu próprio aria-label", () => {
    // A etiqueta tem de ficar *antes* do `{...props}`; ao contrário, um ecrã que
    // passe o seu próprio nome acessível via `aria-label` era silenciosamente
    // ignorado. A paginação é onde isso se vê, porque é o único destes casos em
    // que a etiqueta assenta no mesmo elemento que recebe as props de fora.
    const html = renderWithLabels(
      { previousPage: "Página anterior" },
      createElement(PaginationPrevious, { "aria-label": "Consultas anteriores" })
    );

    expect(html).toContain('aria-label="Consultas anteriores"');
    expect(html).not.toContain('aria-label="Página anterior"');
  });

  it("separa o texto visível curto do nome acessível completo da paginação", () => {
    const previousHtml = renderWithLabels(
      { previousPage: "Página anterior", previousPageText: "Anterior" },
      createElement(PaginationPrevious)
    );
    const nextHtml = renderWithLabels(
      { nextPage: "Página seguinte", nextPageText: "Seguinte" },
      createElement(PaginationNext)
    );

    expect(previousHtml).toContain('aria-label="Página anterior"');
    expect(previousHtml).toContain(">Anterior</span>");
    expect(previousHtml).not.toContain(">Previous</span>");
    expect(nextHtml).toContain('aria-label="Página seguinte"');
    expect(nextHtml).toContain(">Seguinte</span>");
    expect(nextHtml).not.toContain(">Next</span>");
  });

  it("mantém os textos visíveis base em inglês fora do provider", () => {
    const previousHtml = renderToStaticMarkup(createElement(PaginationPrevious));
    const nextHtml = renderToStaticMarkup(createElement(PaginationNext));

    expect(previousHtml).toContain(">Previous</span>");
    expect(nextHtml).toContain(">Next</span>");
  });

  it("localiza a região de navegação da paginação, mantém o fallback e aceita override", () => {
    const localizedHtml = renderWithLabels(
      { paginationNavigation: "Paginação" },
      createElement(Pagination)
    );
    const overriddenHtml = renderWithLabels(
      { paginationNavigation: "Paginação" },
      createElement(Pagination, { "aria-label": "Resultados" })
    );
    const fallbackHtml = renderToStaticMarkup(createElement(Pagination));

    expect(localizedHtml).toContain('aria-label="Paginação"');
    expect(overriddenHtml).toContain('aria-label="Resultados"');
    expect(fallbackHtml).toContain('aria-label="Pagination"');
  });

  it("anuncia as reticências para leitores de ecrã sem expor o ícone", () => {
    const html = renderWithLabels(
      { morePages: "Páginas omitidas" },
      createElement(PaginationEllipsis)
    );

    expect(html).toContain("Páginas omitidas");
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('class="sr-only"');
  });
});
