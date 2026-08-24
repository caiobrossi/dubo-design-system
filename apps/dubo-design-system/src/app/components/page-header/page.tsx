"use client";
import { useState } from "react";
import { Plus, Download, Bell } from "@/lib/icons";
import { PageHeader, PageHeaderMobile } from "@/components/ui/page-header";
import { SegmentControl, SegmentItem } from "@/components/ui/segment-control";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DesignTokensDocTable,
  NotesTable,
  PropsTable,
  ShowcaseCard,
} from "@/components/docs/component-doc-helpers";
import { ComponentHero } from "@/components/docs/component-hero";
import { DocsSection } from "@/components/docs/section";
import { getComponentDoc } from "@/lib/content-registry";
import { componentTokenDocs } from "@/lib/component-token-docs";

const entry = getComponentDoc("page-header");

const patternRows = [
  {
    item: "True center navigation",
    details:
      "The three-column grid keeps the navigation visually centered even when the title or action area changes width.",
  },
  {
    item: "Back-button mode",
    details:
      "When onBack is provided, the layout changes but the title keeps the same 24px / 400 page-header role.",
  },
  {
    item: "Sticky mode",
    details:
      "Use sticky for dashboard or reporting surfaces where the header should stay available while content scrolls underneath.",
  },
  {
    item: "Responsive pair",
    details:
      "Use PageHeader for desktop and PageHeaderMobile for smaller breakpoints when the layout needs to stack navigation above the title.",
  },
];

const propRows = [
  {
    prop: "title",
    type: "string | ReactNode",
    default: "required",
    description:
      "Page title. String values render as an h1 with the correct heading role for top-level or sub-page contexts.",
  },
  {
    prop: "subtitle",
    type: "string | ReactNode",
    default: "—",
    description: "Optional secondary line below the title.",
  },
  {
    prop: "navigation",
    type: "ReactNode",
    default: "—",
    description: "Centered navigation element, typically SegmentControl.",
  },
  {
    prop: "actions",
    type: "ReactNode",
    default: "—",
    description: "Right-aligned actions such as buttons, badges, or compact metadata.",
  },
  {
    prop: "onBack",
    type: "() => void",
    default: "—",
    description:
      "Shows the back button and switches the title to the sub-page hierarchy treatment.",
  },
  {
    prop: "sticky",
    type: "boolean",
    default: "false",
    description: "Keeps the header fixed at the top of the scrolling container.",
  },
  {
    prop: "bordered",
    type: "boolean",
    default: "false",
    description: "Adds the bottom divider for denser page layouts.",
  },
  {
    prop: "hideOnMobile",
    type: "boolean",
    default: "false",
    description:
      "Hides the desktop header on smaller breakpoints so it can pair with PageHeaderMobile.",
  },
];

const accessibilityRows = [
  {
    item: "Semantic landmark",
    details:
      "Both desktop and mobile variants render as header landmarks, helping assistive technologies understand the page structure.",
  },
  {
    item: "Heading structure",
    details:
      "When title is a string it renders as h1, so custom React nodes should preserve that semantic level when possible.",
  },
  {
    item: "Back action",
    details:
      'The back button exposes aria-label="Go back" and reuses the core Button focus treatment.',
  },
  {
    item: "Keyboard access",
    details:
      "Navigation items and actions are regular interactive controls, so they remain reachable through standard tab order.",
  },
];

function DemoNavigation({ items = ["Pacientes", "Grupos", "Alertas"] }: { items?: string[] }) {
  const [active, setActive] = useState(0);

  return (
    <SegmentControl variant="light">
      {items.map((item, index) => (
        <SegmentItem key={item} active={active === index} onClick={() => setActive(index)}>
          {item}
        </SegmentItem>
      ))}
    </SegmentControl>
  );
}

function StickyDemo() {
  return (
    <div className="h-[250px] overflow-auto">
      <PageHeader
        title="Relatórios"
        sticky
        navigation={<DemoNavigation items={["Financeiro", "Operacional", "Clínico"]} />}
        actions={
          <Button variant="outline">
            <Download />
            Exportar
          </Button>
        }
      />
      <div className="flex flex-col gap-3 px-8 py-4">
        {Array.from({ length: 15 }).map((_, index) => (
          <div
            key={index}
            className="flex h-10 items-center rounded-xl bg-[var(--color-hover)] px-4"
          >
            <span className="text-body-md text-[color:var(--color-text-muted)]">Row {index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PageHeaderPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-[1120px] flex-col gap-12">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="PageHeader gives page-level screens a consistent frame: title on the left, centered navigation, and actions on the right."
        >
          <div className="flex flex-col gap-6">
            <ShowcaseCard
              title="Default"
              description="Top-level page with centered navigation and one primary action."
            >
              <PageHeader
                title="Pacientes"
                navigation={<DemoNavigation />}
                actions={
                  <Button>
                    <Plus />
                    Novo Paciente
                  </Button>
                }
              />
            </ShowcaseCard>
            <ShowcaseCard
              title="Minimal"
              description="Use when the page has actions but no centered navigation."
            >
              <PageHeader
                title="Fornecedores"
                actions={
                  <div className="flex items-center gap-[var(--space-2)]">
                    <Button variant="ghost" size="icon">
                      <Bell />
                    </Button>
                    <Button>
                      <Plus />
                      Adicionar
                    </Button>
                  </div>
                }
              />
            </ShowcaseCard>
          </div>
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="The same layout shell supports top-level pages, sub-pages with back navigation, and richer action clusters."
        >
          <div className="flex flex-col gap-6">
            <ShowcaseCard
              title="With back button"
              description="Sub-page treatment for views that sit outside the main side-navigation depth."
            >
              <PageHeader
                title="Plano de Tratamento"
                onBack={() => {}}
                navigation={<DemoNavigation items={["Procedimentos", "Orçamento", "Histórico"]} />}
                actions={
                  <Button variant="outline">
                    <Download />
                    Exportar
                  </Button>
                }
              />
            </ShowcaseCard>
            <ShowcaseCard
              title="With subtitle"
              description="Use the secondary line for contextual help or page framing, not for long explanatory copy."
            >
              <PageHeader
                title="Dashboard"
                subtitle="Visão geral da clínica"
                navigation={<DemoNavigation items={["Tarefas", "Insights"]} />}
              />
            </ShowcaseCard>
            <ShowcaseCard
              title="Bordered + richer actions"
              description="Works well when the page needs a divider and several action affordances on the right."
            >
              <PageHeader
                title="Inventário"
                bordered
                navigation={<DemoNavigation items={["Stock", "Movimentos", "Alertas"]} />}
                actions={
                  <div className="flex items-center gap-[var(--space-3)]">
                    <Badge variant="warning">3 alertas</Badge>
                    <Button variant="outline">
                      <Download />
                      Exportar
                    </Button>
                    <Button>
                      <Plus />
                      Novo Item
                    </Button>
                  </div>
                }
              />
            </ShowcaseCard>
            <ShowcaseCard
              title="Mobile pair"
              description="Desktop and mobile variants can be paired when the mobile layout needs the navigation stacked above the title."
            >
              <div className="flex flex-col gap-4">
                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-page)]">
                  <PageHeader
                    title="Pacientes"
                    hideOnMobile
                    navigation={<DemoNavigation />}
                    actions={
                      <Button>
                        <Plus />
                        Novo Paciente
                      </Button>
                    }
                  />
                  <PageHeaderMobile
                    title="Pacientes"
                    navigation={<DemoNavigation />}
                    actions={
                      <Button size="sm">
                        <Plus />
                        Novo
                      </Button>
                    }
                    className="flex"
                  />
                </div>
              </div>
            </ShowcaseCard>
          </div>
          <div className="mt-6">
            <NotesTable rows={patternRows} />
          </div>
        </DocsSection>

        <DocsSection
          id="sticky"
          title="Sticky Mode"
          description="Sticky mode is useful for dashboards and reporting screens where the primary page controls need to remain visible while content scrolls."
        >
          <ShowcaseCard
            title="Sticky header"
            description="Scroll the inner container to see the header stay pinned at the top."
          >
            <StickyDemo />
          </ShowcaseCard>
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="PageHeader keeps a small API surface and relies on composition for navigation and action areas."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs["page-header"].tokens} />
          </div>
        </DocsSection>

        <DocsSection
          id="accessibility"
          title="Accessibility"
          description="Because the component is layout-oriented, the main accessibility work is semantic structure and making sure the nested controls are labeled and focusable."
        >
          <NotesTable rows={accessibilityRows} />
        </DocsSection>
      </div>
    </div>
  );
}
