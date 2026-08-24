import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  getCompactPaginationItems,
  getDesktopPaginationItems,
  getMobilePaginationItems,
  ResponsivePagination,
} from "@dubo/design-system-shared/components/ui/pagination";
import { DesignSystemLabelsProvider } from "@dubo/design-system-shared/lib/labels";

function renderPagination(currentPage: number, totalPages: number) {
  return renderToStaticMarkup(
    createElement(
      DesignSystemLabelsProvider,
      { labels: { paginationNavigation: "Paginação", morePages: "Páginas omitidas" } },
      createElement(ResponsivePagination, {
        currentPage,
        totalPages,
        onPageChange: () => {},
        size: "sm",
      })
    )
  );
}

describe("ResponsivePagination", () => {
  it("não apresenta navegação para uma página e compõe duas páginas", () => {
    expect(renderPagination(1, 1)).toBe("");

    const html = renderPagination(1, 2);
    expect(html).toContain('aria-label="Paginação"');
    expect(html).toContain('aria-current="page"');
    expect(html).toContain('disabled=""');
    expect(html).toContain(">1</button>");
    expect(html).toContain(">2</button>");
  });

  it("usa as sequências exactas em 320 px e 375 px", () => {
    expect(getMobilePaginationItems(5)).toEqual(["previous", 5, "next"]);
    expect(getCompactPaginationItems(1, 10)).toEqual(["previous", 1, 2, 3, "ellipsis-right", "last", "next"]);
    expect(getCompactPaginationItems(5, 10)).toEqual(["previous", "first", "ellipsis-left", 5, "ellipsis-right", "last", "next"]);
    expect(getCompactPaginationItems(10, 10)).toEqual(["previous", "first", "ellipsis-left", 8, 9, 10, "next"]);
  });

  it("mantém a janela completa no desktop e os limites disabled", () => {
    const start = renderPagination(1, 10);
    const end = renderPagination(10, 10);

    expect(getDesktopPaginationItems(1, 10)).toEqual([1, 2, 3, 4, 5, "ellipsis-right", 10]);
    expect(getDesktopPaginationItems(5, 10)).toEqual([1, "ellipsis-left", 4, 5, 6, "ellipsis-right", 10]);
    expect(getDesktopPaginationItems(10, 10)).toEqual([1, "ellipsis-left", 6, 7, 8, 9, 10]);
    expect(start).toContain('aria-current="page"');
    expect(start).toContain("Páginas omitidas");
    expect(end).toContain('aria-current="page"');
    expect(end).toContain('disabled=""');
  });

  it("separa 320, 375 e desktop em árvores mutuamente exclusivas", () => {
    const html = renderPagination(5, 10);

    expect(html).toContain('data-pagination-layout="mobile"');
    expect(html).toContain('data-pagination-layout="compact"');
    expect(html).toContain('data-pagination-layout="desktop"');
    expect(html).toContain("w-full justify-between min-[360px]:hidden");
    expect(html).toContain("hidden w-full justify-between min-[360px]:flex sm:hidden");
    expect(html).toContain("hidden sm:flex sm:w-auto sm:justify-start");
    expect(html).toContain("[&amp;&gt;span]:sr-only");
    expect(html.match(/data-pagination-layout=/g) ?? []).toHaveLength(3);
    expect(html).not.toContain("overflow-x-auto");
  });
});
