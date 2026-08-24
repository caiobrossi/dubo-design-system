"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";

const meta: Meta = {
  title: "Components/Tabs",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Tabs** — Inline underline tabs for page-level content switching.

Built on Radix UI Tabs with an animated sliding underline indicator (spring animation).

### Sizes
- \`sm\` → 32px height
- \`default\` → 40px height

### Design Tokens
Tabs reuse shared border and text tokens. Component-specific tokens are limited to spacing, typography, and the 2px indicator geometry.
        `,
      },
    },
  },
};

export default meta;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: StoryObj = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content goes here.</TabsContent>
      <TabsContent value="analytics">Analytics content goes here.</TabsContent>
      <TabsContent value="reports">Reports content goes here.</TabsContent>
      <TabsContent value="notifications">Notifications content goes here.</TabsContent>
    </Tabs>
  ),
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Small: 32px
        </p>
        <Tabs defaultValue="tab1">
          <TabsList size="sm">
            <TabsTrigger value="tab1">This Week</TabsTrigger>
            <TabsTrigger value="tab2">Recently Accessed</TabsTrigger>
            <TabsTrigger value="tab3">All</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Default: 40px
        </p>
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">This Week</TabsTrigger>
            <TabsTrigger value="tab2">Recently Accessed</TabsTrigger>
            <TabsTrigger value="tab3">All</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  ),
};

// ─── With Content ─────────────────────────────────────────────────────────────

export const WithContent: StoryObj = {
  name: "With Content",
  render: () => (
    <Tabs defaultValue="patients">
      <TabsList>
        <TabsTrigger value="patients">Patients</TabsTrigger>
        <TabsTrigger value="appointments">Appointments</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="patients">
        <div className="rounded-lg border border-[var(--color-border)] p-6">
          <h3 className="text-heading-3 font-semibold">Patients</h3>
          <p className="mt-2 text-body-md text-[color:var(--color-text-secondary)]">
            Manage your patient records and history.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="appointments">
        <div className="rounded-lg border border-[var(--color-border)] p-6">
          <h3 className="text-heading-3 font-semibold">Appointments</h3>
          <p className="mt-2 text-body-md text-[color:var(--color-text-secondary)]">
            View and manage upcoming appointments.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="billing">
        <div className="rounded-lg border border-[var(--color-border)] p-6">
          <h3 className="text-heading-3 font-semibold">Billing</h3>
          <p className="mt-2 text-body-md text-[color:var(--color-text-secondary)]">
            Invoices, payments and financial reports.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const WithDisabled: StoryObj = {
  name: "With Disabled Tab",
  render: () => (
    <Tabs defaultValue="active">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="archived" disabled>
          Archived
        </TabsTrigger>
        <TabsTrigger value="deleted" disabled>
          Deleted
        </TabsTrigger>
      </TabsList>
    </Tabs>
  ),
};

// ─── Many Tabs ────────────────────────────────────────────────────────────────

export const ManyTabs: StoryObj = {
  name: "Many Tabs",
  render: () => (
    <Tabs defaultValue="t1">
      <TabsList>
        <TabsTrigger value="t1">Overview</TabsTrigger>
        <TabsTrigger value="t2">Patients</TabsTrigger>
        <TabsTrigger value="t3">Calendar</TabsTrigger>
        <TabsTrigger value="t4">Billing</TabsTrigger>
        <TabsTrigger value="t5">Reports</TabsTrigger>
        <TabsTrigger value="t6">Settings</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
};

// ─── Design Tokens ───────────────────────────────────────────────────────────

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["tabs"].title}
      tokens={componentTokenDocs["tabs"].tokens}
    />
  ),
};
