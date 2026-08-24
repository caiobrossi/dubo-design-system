"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DocsSection } from "@/components/docs/section";
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

function ShowcaseCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      <p className="text-body-md font-medium text-default-font">{title}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

function InteractiveDemo() {
  const [currentPage, setCurrentPage] = useState(10);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-body-md text-subtext-color">
        Página {currentPage} de {totalPages}
      </p>
      <ResponsivePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default function PaginationPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-[1120px] flex-col gap-12">
      <section className="relative overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-8 lg:px-8">
        <div className="relative z-10 flex flex-col gap-6">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <Badge variant="success">Ready</Badge>
              <Badge variant="info1">Component</Badge>
            </div>
            <h1 className="text-hero font-medium tracking-[0em] text-default-font lg:text-hero">
              Pagination
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Um compositor controlado para navegar intervalos longos sem transbordar em ecrãs
              estreitos. Reutiliza os primitives de paginação e os papéis partilhados de controlo,
              seleção, foco e estado desativado — sem tokens exclusivos.
            </p>
          </div>
        </div>
      </section>

      <DocsSection
        id="responsive"
        title="Comportamento responsivo"
        description="ResponsivePagination recebe currentPage (1-based), totalPages e onPageChange. Redimensione a janela para observar a composição ativa na largura atual."
      >
        <ShowcaseCard title="Demonstração na largura atual">
          <InteractiveDemo />
        </ShowcaseCard>
        <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-left text-body-md">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-hover)]">
                <th className="text-body-md font-normal px-4 py-3 text-default-font">Largura</th>
                <th className="text-body-md font-normal px-4 py-3 text-default-font">Composição</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] text-subtext-color">
              <tr>
                <td className="px-4 py-3 font-mono">320 px</td>
                <td className="px-4 py-3">
                  Anterior, página atual e seguinte; setas icon-only e tamanho pequeno.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">375 px</td>
                <td className="px-4 py-3">
                  Máximo de sete controlos: limites, janela compacta e reticências para lacunas.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">Desktop</td>
                <td className="px-4 py-3">
                  Primeiro, anterior, páginas/reticências, seguinte e último; setas com rótulos
                  visíveis.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DocsSection>

      <DocsSection
        id="controlled"
        title="Uso controlado"
        description="Use o mesmo índice apresentado à pessoa: a primeira página é sempre 1, nunca 0."
      >
        <ShowcaseCard title="Página atual controlada">
          <InteractiveDemo />
        </ShowcaseCard>
      </DocsSection>

      <DocsSection
        id="accessibility"
        title="Acessibilidade e localização"
        description="O compositor conserva a semântica nativa de navegação e usa o provider partilhado para o texto embutido."
      >
        <ShowcaseCard title="Etiquetas em PT-PT">
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
              aria-label="Paginação de pacientes"
              currentPage={10}
              totalPages={totalPages}
              onPageChange={() => undefined}
            />
          </DesignSystemLabelsProvider>
        </ShowcaseCard>
        <ul className="mt-5 list-disc space-y-2 pl-5 text-body-md text-subtext-color">
          <li>
            O landmark usa <code>paginationNavigation</code>; <code>aria-label</code> permite
            contextualizá-lo no consumidor.
          </li>
          <li>
            A página atual expõe <code>aria-current=&quot;page&quot;</code> e os limites desativam
            anterior/seguinte.
          </li>
          <li>
            As reticências comunicam páginas omitidas; o ícone é decorativo para tecnologias de
            apoio.
          </li>
        </ul>
      </DocsSection>

      <DocsSection
        id="primitives"
        title="Primitives preservados"
        description="A API composta existente continua disponível para cenários que exigem uma sequência totalmente manual. Prefira ResponsivePagination para intervalos responsivos."
      >
        <ShowcaseCard title="Composição manual">
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
        </ShowcaseCard>
      </DocsSection>

      <DocsSection
        id="api"
        title="Referência da API"
        description="ResponsivePagination é aditivo: não substitui os primitives existentes."
      >
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-left text-body-md">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-hover)]">
                <th className="text-body-md font-normal px-4 py-3 text-default-font">Prop</th>
                <th className="text-body-md font-normal px-4 py-3 text-default-font">Tipo</th>
                <th className="text-body-md font-normal px-4 py-3 text-default-font">Descrição</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] text-subtext-color">
              <tr>
                <td className="px-4 py-3 font-mono">currentPage</td>
                <td className="px-4 py-3 font-mono">number</td>
                <td className="px-4 py-3">Página atual, sempre 1-based.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">totalPages</td>
                <td className="px-4 py-3 font-mono">number</td>
                <td className="px-4 py-3">Número total de páginas disponíveis.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">onPageChange</td>
                <td className="px-4 py-3 font-mono">(page: number) =&gt; void</td>
                <td className="px-4 py-3">Recebe a próxima página 1-based.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">size</td>
                <td className="px-4 py-3 font-mono">&quot;sm&quot; | &quot;default&quot;</td>
                <td className="px-4 py-3">
                  Opcional; no modo móvel, o compositor usa o tamanho compacto.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono">…nav props</td>
                <td className="px-4 py-3 font-mono">React.ComponentProps&lt;&quot;nav&quot;&gt;</td>
                <td className="px-4 py-3">
                  Inclui className e aria-label para contexto específico.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DocsSection>

      <DocsSection
        id="tokens"
        title="Tokens partilhados"
        description="A composição responsiva não introduz tokens próprios; usa os mesmos papéis da paginação composta."
      >
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-left text-body-md">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-hover)]">
                <th className="text-body-md font-normal px-4 py-3 text-default-font">Token</th>
                <th className="text-body-md font-normal px-4 py-3 text-default-font">Uso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] text-subtext-color">
              {componentTokenDocs["pagination"].tokens.map(({ token, usage }) => (
                <tr key={token}>
                  <td className="px-4 py-3 font-mono">{token}</td>
                  <td className="px-4 py-3">{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocsSection>
    </div>
  );
}
