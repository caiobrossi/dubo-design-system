"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { MoreVertical, Users, Star, Heart, Zap, Folder, ArrowRight } from "@/lib/icons";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import {
  InteractiveCardGroup,
  InteractiveCard,
  InteractiveCardHeader,
  InteractiveCardContent,
  InteractiveCardFooter,
} from "@/components/ui/interactive-card";
import { Button } from "@/components/ui/button";

const meta: Meta = {
  title: "Components/InteractiveCard",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**InteractiveCard** — Unified interactive card with three behaviors.

| Mode | Use |
|---|---|
| Single select | Radio card within a group |
| Multi select | Checkbox card within a group |
| Link | Clickable navigation card with hover gradient + scale |

### Composable Sub-components
- \`InteractiveCardHeader\` — Top row (title + actions)
- \`InteractiveCardContent\` — Main content area
- \`InteractiveCardFooter\` — Bottom info (small text, muted color)

### Design Tokens
Uses shared card, selection, surface, focus, and motion tokens. The token contract documents which shared tokens the component consumes.
        `,
      },
    },
  },
};

export default meta;

// ─── Single Select ───────────────────────────────────────────────────────────

function SingleSelectDemo() {
  const [value, setValue] = useState("essential");

  return (
    <InteractiveCardGroup mode="single" value={value} onValueChange={(v) => setValue(v as string)}>
      {[
        {
          value: "essential",
          title: "Essencial",
          price: "€39/mês",
          desc: "Para clínicas pequenas",
        },
        {
          value: "professional",
          title: "Profissional",
          price: "€69/mês",
          desc: "Multi-profissional",
        },
        { value: "premium", title: "Premium", price: "€99/mês", desc: "Todas as funcionalidades" },
      ].map((plan) => (
        <InteractiveCard key={plan.value} value={plan.value}>
          <InteractiveCardHeader>
            <span className="text-body-lg [font-weight:var(--font-weight-500)] text-[color:var(--color-text-primary)]">
              {plan.title}
            </span>
            <span className="text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-brand)]">
              {plan.price}
            </span>
          </InteractiveCardHeader>
          <InteractiveCardFooter>{plan.desc}</InteractiveCardFooter>
        </InteractiveCard>
      ))}
    </InteractiveCardGroup>
  );
}

export const SingleSelect: StoryObj = {
  name: "Single Select",
  render: () => <SingleSelectDemo />,
};

// ─── Multi Select ────────────────────────────────────────────────────────────

function MultiSelectDemo() {
  const [value, setValue] = useState<string[]>(["sms"]);

  return (
    <InteractiveCardGroup
      mode="multiple"
      value={value}
      onValueChange={(v) => setValue(v as string[])}
    >
      {[
        { value: "sms", title: "SMS", desc: "Lembretes por mensagem" },
        { value: "email", title: "Email", desc: "Comunicações por email" },
        { value: "whatsapp", title: "WhatsApp", desc: "Mensagens WhatsApp" },
      ].map((channel) => (
        <InteractiveCard key={channel.value} value={channel.value}>
          <InteractiveCardContent>
            <p className="text-body-lg [font-weight:var(--font-weight-500)] text-[color:var(--color-text-primary)]">
              {channel.title}
            </p>
            <p className="mt-1 text-body-md text-[color:var(--color-text-secondary)]">{channel.desc}</p>
          </InteractiveCardContent>
        </InteractiveCard>
      ))}
    </InteractiveCardGroup>
  );
}

export const MultiSelect: StoryObj = {
  name: "Multi Select",
  render: () => <MultiSelectDemo />,
};

// ─── Link Card ───────────────────────────────────────────────────────────────

function LinkCardDemo() {
  const groups = [
    { name: "VIP", count: 24, icon: <Star /> },
    { name: "Ortodontia", count: 89, icon: <Heart /> },
    { name: "Urgências", count: 12, icon: <Zap /> },
    { name: "Todos", count: 340, icon: <Users /> },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {groups.map((group) => (
        <InteractiveCard key={group.name} mode="link" onClick={() => {}} className="h-[154px]">
          <InteractiveCardHeader>
            <span className="text-[color:var(--color-text-muted)]">{group.icon}</span>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={(e) => e.stopPropagation()}
              aria-label="Menu"
            >
              <MoreVertical />
            </Button>
          </InteractiveCardHeader>
          <InteractiveCardContent className="mt-auto">
            <p className="text-heading-4 [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
              {group.name}
            </p>
          </InteractiveCardContent>
          <InteractiveCardFooter>{group.count} pacientes</InteractiveCardFooter>
        </InteractiveCard>
      ))}
    </div>
  );
}

export const LinkCard: StoryObj = {
  name: "Link Card",
  render: () => <LinkCardDemo />,
};

// ─── Link Card with Rich Content ─────────────────────────────────────────────

function RichLinkCardDemo() {
  const items = [
    { title: "Relatório Financeiro", desc: "Janeiro 2026", count: "€12,450" },
    { title: "Relatório Operacional", desc: "Janeiro 2026", count: "342 consultas" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <InteractiveCard key={item.title} mode="link" onClick={() => {}}>
          <InteractiveCardHeader>
            <div>
              <p className="text-body-lg [font-weight:var(--font-weight-500)] text-[color:var(--color-text-primary)]">
                {item.title}
              </p>
              <p className="text-body-md text-[color:var(--color-text-secondary)]">{item.desc}</p>
            </div>
            <ArrowRight className="size-[var(--icon-size-md)] shrink-0 text-[color:var(--color-text-muted)]" />
          </InteractiveCardHeader>
          <InteractiveCardFooter>{item.count}</InteractiveCardFooter>
        </InteractiveCard>
      ))}
    </div>
  );
}

export const RichLinkCard: StoryObj = {
  name: "Link Card — Rich Content",
  render: () => <RichLinkCardDemo />,
};

// ─── Disabled ────────────────────────────────────────────────────────────────

function DisabledDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Disabled select card
        </p>
        <InteractiveCard value="disabled" disabled>
          <InteractiveCardContent>
            <p className="text-body-lg text-[color:var(--color-text-primary)]">Disabled card</p>
          </InteractiveCardContent>
        </InteractiveCard>
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Disabled link card
        </p>
        <InteractiveCard mode="link" disabled onClick={() => {}}>
          <InteractiveCardContent>
            <p className="text-body-lg text-[color:var(--color-text-primary)]">Disabled link card</p>
          </InteractiveCardContent>
        </InteractiveCard>
      </div>
    </div>
  );
}

export const Disabled: StoryObj = {
  render: () => <DisabledDemo />,
};

// ─── Composable Sub-components ───────────────────────────────────────────────

export const SubComponents: StoryObj = {
  name: "Sub-components",
  parameters: {
    docs: {
      description: {
        story:
          "All three modes support Header, Content, and Footer sub-components for consistent structure.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Select card with all sub-components
        </p>
        <InteractiveCard value="demo" selected>
          <InteractiveCardHeader>
            <span className="text-body-lg [font-weight:var(--font-weight-500)] text-[color:var(--color-text-primary)]">
              Card Title
            </span>
          </InteractiveCardHeader>
          <InteractiveCardContent className="py-[var(--space-2)]">
            <p className="text-body-md text-[color:var(--color-text-secondary)]">
              This is the main content area. It grows to fill available space.
            </p>
          </InteractiveCardContent>
          <InteractiveCardFooter>Footer info: 12 items</InteractiveCardFooter>
        </InteractiveCard>
      </div>

      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Link card with all sub-components
        </p>
        <InteractiveCard mode="link" onClick={() => {}} className="h-[180px]">
          <InteractiveCardHeader>
            <Folder className="size-[var(--icon-size-lg)] text-[color:var(--color-text-muted)]" />
            <Button variant="ghost" size="icon-sm" onClick={(e) => e.stopPropagation()}>
              <MoreVertical />
            </Button>
          </InteractiveCardHeader>
          <InteractiveCardContent className="mt-auto">
            <p className="text-heading-4 [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
              Pasta de Documentos
            </p>
          </InteractiveCardContent>
          <InteractiveCardFooter>42 ficheiros</InteractiveCardFooter>
        </InteractiveCard>
      </div>
    </div>
  ),
};

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["interactive-card"].title}
      tokens={componentTokenDocs["interactive-card"].tokens}
    />
  ),
};
