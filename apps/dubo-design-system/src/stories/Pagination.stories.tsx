"use client";

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { DesignSystemLabelsProvider } from "@dubo-design/lib/labels";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  ResponsivePagination,
} from "@/components/ui/pagination";

const totalPages = 20;

const meta: Meta<typeof ResponsivePagination> = {
  title: "Components/Pagination",
  component: ResponsivePagination,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Pagination** — componente do Dubo Design System.

\`ResponsivePagination\` é o compositor controlado e aditivo para intervalos de páginas. Recebe \`currentPage\` (sempre 1-based), \`totalPages\` e \`onPageChange\`; preserva os primitives compostos \`Pagination\`, \`PaginationContent\`, \`PaginationLink\` e afins para casos que precisem de composição manual.

### Política responsiva

| Largura | Composição |
| --- | --- |
| 320 px | Anterior, página atual e seguinte. As setas são icon-only e o controlo usa \`size="sm"\`. |
| 375 px | No máximo sete controlos: primeira/última página, janela compacta e reticências quando há páginas omitidas. As setas são icon-only e o controlo usa \`size="sm"\`. |
| Desktop | Primeiro, anterior, páginas/reticências, seguinte e último, com os rótulos visíveis dos controlos de direção. |

### Acessibilidade e localização

- O landmark obtém o nome do \`DesignSystemLabelsProvider\` através de \`paginationNavigation\`. O consumidor pode sobrepor esse nome com o atributo normal \`aria-label\` do \`nav\`.
- A página atual usa \`aria-current="page"\`; os limites desativam os botões anterior/seguinte.
- As reticências anunciam páginas omitidas; apenas o ícone fica oculto para tecnologias de apoio.

### Tokens

Não há tokens exclusivos de \`ResponsivePagination\`. A composição reutiliza os papéis existentes de controlos, seleção, tipografia, foco, estado desativado e espaçamento.
        `,
      },
    },
  },
};

export default meta;

function ResponsiveCase({ currentPage }: { currentPage: number }) {
  return (
    <ResponsivePagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={() => undefined}
    />
  );
}

function ResponsiveStates() {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex w-full flex-col items-center gap-2">
        <span className="text-body-sm text-[color:var(--color-text-secondary)]">Início — página 1</span>
        <ResponsiveCase currentPage={1} />
      </div>
      <div className="flex w-full flex-col items-center gap-2">
        <span className="text-body-sm text-[color:var(--color-text-secondary)]">Meio — página 10</span>
        <ResponsiveCase currentPage={10} />
      </div>
      <div className="flex w-full flex-col items-center gap-2">
        <span className="text-body-sm text-[color:var(--color-text-secondary)]">Fim — página 20</span>
        <ResponsiveCase currentPage={20} />
      </div>
    </div>
  );
}

export const ResponsiveAt320: StoryObj<typeof ResponsivePagination> = {
  name: "Responsivo — 320 px",
  render: () => <ResponsiveStates />,
  parameters: {
    layout: "fullscreen",
    chromatic: { viewports: [320] },
  },
};

export const ResponsiveAt375: StoryObj<typeof ResponsivePagination> = {
  name: "Responsivo — 375 px",
  render: () => <ResponsiveStates />,
  parameters: {
    layout: "fullscreen",
    chromatic: { viewports: [375] },
  },
};

export const ResponsiveAt1024: StoryObj<typeof ResponsivePagination> = {
  name: "Responsivo — desktop (1024 px)",
  render: () => <ResponsiveStates />,
  parameters: {
    layout: "fullscreen",
    chromatic: { viewports: [1024] },
  },
};

export const LocalizedPortuguese: StoryObj<typeof ResponsivePagination> = {
  render: () => (
    <DesignSystemLabelsProvider
      labels={{
        paginationNavigation: "Paginação",
        previousPage: "Página anterior",
        previousPageText: "Anterior",
        nextPage: "Página seguinte",
        nextPageText: "Seguinte",
        firstPage: "Ir para a primeira página",
        lastPage: "Ir para a última página",
        morePages: "Páginas omitidas",
      }}
    >
      <ResponsivePagination
        currentPage={10}
        totalPages={totalPages}
        onPageChange={() => undefined}
      />
    </DesignSystemLabelsProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "O nome do landmark e os controlos embutidos vêm do provider. Para um contexto mais específico, passe `aria-label` diretamente ao componente, como em qualquer `nav`.",
      },
    },
  },
};

export const Controlled: StoryObj<typeof ResponsivePagination> = {
  render: function ControlledPagination() {
    const [page, setPage] = useState(10);

    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-body-md text-[color:var(--color-text-secondary)]">
          Página {page} de {totalPages}
        </p>
        <ResponsivePagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    );
  },
};

export const ComposablePrimitives: StoryObj = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>20</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Os primitives existentes permanecem disponíveis e sem alteração de contrato. Prefira `ResponsivePagination` quando o intervalo tem de adaptar-se à largura disponível.",
      },
    },
  },
};

export const DesignTokens: StoryObj = {
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["pagination"].title}
      tokens={componentTokenDocs["pagination"].tokens}
    />
  ),
};
