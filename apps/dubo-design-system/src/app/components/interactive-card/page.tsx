"use client";
import { useState } from "react";
import { MoreVertical, Users, Star, Heart, Zap, ArrowRight, Folder } from "@/lib/icons";
import {
  InteractiveCard,
  InteractiveCardContent,
  InteractiveCardFooter,
  InteractiveCardGroup,
  InteractiveCardHeader,
} from "@/components/ui/interactive-card";
import { Button } from "@/components/ui/button";
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

const entry = getComponentDoc("interactive-card");

const interactionRows = [
  {
    item: "Single select",
    details:
      'Use inside InteractiveCardGroup with mode="single" for radio-style choice patterns such as plan pickers.',
  },
  {
    item: "Multi select",
    details:
      'Use inside InteractiveCardGroup with mode="multiple" for checkbox-style selection where more than one card can stay active.',
  },
  {
    item: "Link card",
    details:
      'Use mode="link" for navigational cards that open a detail screen, report, or grouped collection.',
  },
  {
    item: "Sub-components",
    details:
      "Header, Content, and Footer keep the internal structure consistent while letting the card hold richer content.",
  },
];

const propRows = [
  {
    prop: "mode",
    type: '"single" | "multiple" | "link"',
    default: '"single" in group / undefined standalone',
    description:
      'Selection mode comes from InteractiveCardGroup. Use mode="link" on the card itself for navigational behavior.',
  },
  {
    prop: "value",
    type: "string",
    default: '""',
    description: "Unique value used by InteractiveCardGroup to track selected cards.",
  },
  {
    prop: "selected",
    type: "boolean",
    default: "false",
    description: "Controlled selected state for standalone usage outside of InteractiveCardGroup.",
  },
  {
    prop: "onSelect",
    type: "(value: string) => void",
    default: "—",
    description: "Selection callback for standalone select usage.",
  },
  {
    prop: "onClick",
    type: "(event) => void",
    default: "—",
    description: 'Click handler used when mode="link".',
  },
  {
    prop: "showCheck",
    type: "boolean",
    default: "true",
    description: "Shows the selected check badge in the select variants.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables pointer and keyboard interactions and reduces visual emphasis.",
  },
];

const accessibilityRows = [
  {
    item: "Selection semantics",
    details:
      "Single-select groups render as radiogroup + radio. Multi-select groups use group + checkbox semantics with aria-checked.",
  },
  {
    item: "Keyboard support",
    details:
      "Space and Enter activate selection or click behavior, matching the chosen interaction mode.",
  },
  {
    item: "Focus visibility",
    details:
      "Focus treatment uses the shared focus ring tokens so card interactions remain visible on keyboard navigation.",
  },
  {
    item: "Nested actions",
    details:
      "Action buttons in the header should stop propagation to avoid accidentally triggering the card click.",
  },
];

function SingleSelectDemo() {
  const [value, setValue] = useState("professional");
  const plans = [
    {
      value: "essential",
      title: "Essencial",
      price: "€39/mês",
      description: "Para clínicas pequenas",
    },
    {
      value: "professional",
      title: "Profissional",
      price: "€69/mês",
      description: "Multi-profissional com analytics",
    },
    {
      value: "premium",
      title: "Premium",
      price: "€99/mês",
      description: "Todas as funcionalidades + AI",
    },
  ];

  return (
    <InteractiveCardGroup
      mode="single"
      value={value}
      onValueChange={(next) => setValue(next as string)}
    >
      {plans.map((plan) => (
        <InteractiveCard key={plan.value} value={plan.value}>
          <InteractiveCardHeader>
            <span className="text-body-lg [font-weight:var(--font-weight-500)] text-[color:var(--color-text-primary)]">
              {plan.title}
            </span>
            <span className="text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-brand)]">
              {plan.price}
            </span>
          </InteractiveCardHeader>
          <InteractiveCardFooter>{plan.description}</InteractiveCardFooter>
        </InteractiveCard>
      ))}
    </InteractiveCardGroup>
  );
}

function MultiSelectDemo() {
  const [value, setValue] = useState<string[]>(["sms", "email"]);
  const channels = [
    { value: "sms", title: "SMS", description: "Lembretes e confirmações por mensagem" },
    { value: "email", title: "Email", description: "Comunicações e relatórios por email" },
    { value: "push", title: "Push Notifications", description: "Notificações na app móvel" },
  ];

  return (
    <InteractiveCardGroup
      mode="multiple"
      value={value}
      onValueChange={(next) => setValue(next as string[])}
    >
      {channels.map((channel) => (
        <InteractiveCard key={channel.value} value={channel.value}>
          <InteractiveCardContent>
            <p className="text-body-lg [font-weight:var(--font-weight-500)] text-[color:var(--color-text-primary)]">
              {channel.title}
            </p>
            <p className="mt-1 text-body-md text-[color:var(--color-text-secondary)]">
              {channel.description}
            </p>
          </InteractiveCardContent>
        </InteractiveCard>
      ))}
    </InteractiveCardGroup>
  );
}

function LinkCardGridDemo() {
  const groups = [
    { name: "VIP", count: 24, icon: <Star /> },
    { name: "Ortodontia", count: 89, icon: <Heart /> },
    { name: "Urgências", count: 12, icon: <Zap /> },
    { name: "Todos", count: 340, icon: <Users /> },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {groups.map((group) => (
        <InteractiveCard key={group.name} mode="link" onClick={() => {}} className="h-[154px]">
          <InteractiveCardHeader>
            <span className="text-[color:var(--color-text-muted)] [&_svg]:size-[var(--icon-size-lg)]">
              {group.icon}
            </span>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={(event) => event.stopPropagation()}
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

function LinkCardListDemo() {
  const items = [
    { title: "Relatório Financeiro", description: "Janeiro 2026", metric: "€12,450" },
    { title: "Relatório Operacional", description: "Janeiro 2026", metric: "342 consultas" },
    { title: "Relatório Clínico", description: "Janeiro 2026", metric: "89 tratamentos" },
  ];

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <InteractiveCard key={item.title} mode="link" onClick={() => {}}>
          <InteractiveCardHeader>
            <div>
              <p className="text-body-lg [font-weight:var(--font-weight-500)] text-[color:var(--color-text-primary)]">
                {item.title}
              </p>
              <p className="text-body-md text-[color:var(--color-text-secondary)]">{item.description}</p>
            </div>
            <ArrowRight className="size-[var(--icon-size-md)] shrink-0 text-[color:var(--color-text-muted)]" />
          </InteractiveCardHeader>
          <InteractiveCardFooter>{item.metric}</InteractiveCardFooter>
        </InteractiveCard>
      ))}
    </div>
  );
}

function SubComponentsDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
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

      <InteractiveCard mode="link" onClick={() => {}} className="h-[180px]">
        <InteractiveCardHeader>
          <Folder className="size-[var(--icon-size-lg)] text-[color:var(--color-text-muted)]" />
          <Button variant="ghost" size="icon-sm" onClick={(event) => event.stopPropagation()}>
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
  );
}

export default function InteractiveCardPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-[1120px] flex-col gap-12">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="InteractiveCard works for structured choice patterns and for navigational cards. The same composable shell keeps all three modes visually aligned."
        >
          <div className="flex flex-col gap-6">
            <ShowcaseCard
              title="Single select"
              description="Ideal for plan pickers, package selectors, or one-choice decision moments."
            >
              <SingleSelectDemo />
            </ShowcaseCard>
            <ShowcaseCard
              title="Multi select"
              description="Useful for communication preferences, filters, or grouped options where several choices can stay active."
            >
              <MultiSelectDemo />
            </ShowcaseCard>
          </div>
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="Link mode keeps the same shell but adds more expressive navigation behavior through shared motion and elevated hover treatment."
        >
          <div className="flex flex-col gap-6">
            <ShowcaseCard
              title="Link card grid"
              description="A strong fit for grouped destinations such as patient cohorts, collections, or dashboard shortcuts."
            >
              <LinkCardGridDemo />
            </ShowcaseCard>
            <ShowcaseCard
              title="Link card list"
              description="For report links or richer navigational rows with supporting detail."
            >
              <LinkCardListDemo />
            </ShowcaseCard>
            <ShowcaseCard
              title="Composable structure"
              description="Header, Content, and Footer can be combined in any mode without changing the outer card behavior."
            >
              <SubComponentsDemo />
            </ShowcaseCard>
          </div>
          <div className="mt-6">
            <NotesTable rows={interactionRows} />
          </div>
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="InteractiveCard keeps the outer API intentionally small. Most composition happens through the shared sub-components."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs["interactive-card"].tokens} />
          </div>
        </DocsSection>

        <DocsSection
          id="accessibility"
          title="Accessibility"
          description="The selection variants and the link variant map to different semantics, but they all keep a visible focus treatment and keyboard support."
        >
          <NotesTable rows={accessibilityRows} />
        </DocsSection>
      </div>
    </div>
  );
}
