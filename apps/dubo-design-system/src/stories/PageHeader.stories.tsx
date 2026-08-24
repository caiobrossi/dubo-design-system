"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Plus, Download, Settings, Bell } from "@/lib/icons";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { PageHeader, PageHeaderMobile } from "@/components/ui/page-header";
import { SegmentControl, SegmentItem } from "@/components/ui/segment-control";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const meta: Meta = {
  title: "Components/PageHeader",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**PageHeader** — Consistent page-level header used across the Dubo app.

Layout: 3-column CSS Grid — left (title), center (navigation), right (actions).
The center column is **always truly centered** regardless of left/right content widths.

### Variants
| Pattern | Use |
|---|---|
| Default | Title + navigation + actions |
| With back button | Sub-page without side navigation |
| Sticky | Stays fixed at top on scroll |
| Bordered | Shows bottom border separator |
| Minimal | Title + actions only (no navigation) |

### Typography
- All page headers: 28px / weight 300

### Design Tokens
PageHeader is a layout component that uses shared semantic tokens only. The token contract below documents which shared tokens it consumes.
        `,
      },
    },
  },
};

export default meta;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function DemoNavigation({ items = ["Pacientes", "Grupos", "Alertas"] }: { items?: string[] }) {
  const [active, setActive] = useState(0);
  return (
    <SegmentControl variant="light">
      {items.map((item, i) => (
        <SegmentItem key={item} active={active === i} onClick={() => setActive(i)}>
          {item}
        </SegmentItem>
      ))}
    </SegmentControl>
  );
}

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: StoryObj = {
  render: () => (
    <div className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-page)]">
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
    </div>
  ),
};

// ─── With Back Button ────────────────────────────────────────────────────────

export const WithBackButton: StoryObj = {
  name: "With Back Button",
  render: () => (
    <div className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-page)]">
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
    </div>
  ),
};

// ─── With Subtitle ───────────────────────────────────────────────────────────

export const WithSubtitle: StoryObj = {
  name: "With Subtitle",
  render: () => (
    <div className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-page)]">
      <PageHeader
        title="Dashboard"
        subtitle="Visão geral da clínica"
        navigation={<DemoNavigation items={["Tarefas", "Insights"]} />}
      />
    </div>
  ),
};

// ─── Bordered ────────────────────────────────────────────────────────────────

export const Bordered: StoryObj = {
  render: () => (
    <div className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-page)]">
      <PageHeader
        title="Configurações"
        onBack={() => {}}
        bordered
        navigation={<DemoNavigation items={["Geral", "Equipa", "Permissões"]} />}
        actions={
          <Button variant="ghost" size="icon">
            <Settings />
          </Button>
        }
      />
      <div className="h-40 px-8 py-6">
        <p className="text-[color:var(--color-text-muted)]">Page content below bordered header</p>
      </div>
    </div>
  ),
};

// ─── Sticky ──────────────────────────────────────────────────────────────────

export const Sticky: StoryObj = {
  render: () => (
    <div className="h-[300px] w-full overflow-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-page)]">
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
      <div className="flex flex-col gap-4 px-8 py-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="h-12 rounded-xl bg-[var(--color-hover)]" />
        ))}
      </div>
    </div>
  ),
};

// ─── Minimal (No Navigation) ─────────────────────────────────────────────────

export const Minimal: StoryObj = {
  name: "Minimal (No Navigation)",
  render: () => (
    <div className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-page)]">
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
    </div>
  ),
};

// ─── With Custom Right Content ───────────────────────────────────────────────

export const CustomRightContent: StoryObj = {
  name: "Custom Right Content",
  render: () => (
    <div className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-page)]">
      <PageHeader
        title="Inventário"
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
    </div>
  ),
};

// ─── Mobile ──────────────────────────────────────────────────────────────────

export const Mobile: StoryObj = {
  render: () => (
    <div className="w-[375px] rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-page)]">
      {/* Force mobile variant visible by removing md:hidden */}
      <PageHeaderMobile
        title="Pacientes"
        navigation={<DemoNavigation />}
        actions={
          <Button size="sm">
            <Plus />
            Novo
          </Button>
        }
        className="flex" /* override md:hidden for demo */
      />
    </div>
  ),
};

// ─── Responsive Pair ─────────────────────────────────────────────────────────

export const ResponsivePair: StoryObj = {
  name: "Responsive Pair",
  parameters: {
    docs: {
      description: {
        story:
          "Desktop header is hidden on mobile, mobile header is hidden on desktop. Resize the viewport to see the switch.",
      },
    },
  },
  render: () => (
    <div className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-page)]">
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
      />
    </div>
  ),
};

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["page-header"].title}
      tokens={componentTokenDocs["page-header"].tokens}
    />
  ),
};
