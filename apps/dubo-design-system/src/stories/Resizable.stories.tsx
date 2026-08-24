"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";

const meta: Meta = {
  title: "Components/Resizable",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Resizable** — Dubo Design System component (shadcn-based).

Resizable panel layout built on \`react-resizable-panels\`.

### Sub-components
- \`ResizablePanelGroup\` — container (\`orientation\`: horizontal | vertical)
- \`ResizablePanel\` — individual panel with min/max/default size
- \`ResizableHandle\` — drag handle between panels

### Features
- Horizontal and vertical layouts
- Grip icon handle (\`withHandle\` prop)
- Collapsible panels
- Nested panel groups
- Reuses shared separator, grip sizing, focus, and interaction tokens
        `,
      },
    },
  },
};

export default meta;

// ── Playground (Horizontal) ──

export const Playground: StoryObj = {
  render: () => (
    <div
      style={{
        height: "300px",
        border: "1px solid var(--color-border)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={50} minSize={20}>
          <div className="flex h-full items-center justify-center p-6">
            <span
              className="text-[color:var(--color-text-secondary)]"
              style={{ fontSize: "0.875rem", fontWeight: 500 }}
            >
              Panel A
            </span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={20}>
          <div className="flex h-full items-center justify-center p-6">
            <span
              className="text-[color:var(--color-text-secondary)]"
              style={{ fontSize: "0.875rem", fontWeight: 500 }}
            >
              Panel B
            </span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

// ── Horizontal ──

export const Horizontal: StoryObj = {
  render: () => (
    <div
      style={{
        height: "250px",
        border: "1px solid var(--color-border)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={30} minSize={15}>
          <div className="flex h-full items-center justify-center bg-[var(--color-hover)] p-4">
            <span className="text-[color:var(--color-text-secondary)]" style={{ fontSize: "0.75rem" }}>
              Sidebar
            </span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={70}>
          <div className="flex h-full items-center justify-center p-4">
            <span className="text-[color:var(--color-text-secondary)]" style={{ fontSize: "0.75rem" }}>
              Content
            </span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

// ── Vertical ──

export const Vertical: StoryObj = {
  render: () => (
    <div
      style={{
        height: "400px",
        border: "1px solid var(--color-border)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <ResizablePanelGroup orientation="vertical">
        <ResizablePanel defaultSize={30} minSize={15}>
          <div className="flex h-full items-center justify-center bg-[var(--color-hover)] p-4">
            <span className="text-[color:var(--color-text-secondary)]" style={{ fontSize: "0.75rem" }}>
              Header
            </span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle orientation="vertical" />
        <ResizablePanel defaultSize={70}>
          <div className="flex h-full items-center justify-center p-4">
            <span className="text-[color:var(--color-text-secondary)]" style={{ fontSize: "0.75rem" }}>
              Content
            </span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

// ── Three Panels ──

export const ThreePanels: StoryObj = {
  name: "Three Panels",
  render: () => (
    <div
      style={{
        height: "300px",
        border: "1px solid var(--color-border)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={25} minSize={15}>
          <div className="flex h-full items-center justify-center bg-[var(--color-hover)] p-4">
            <span className="text-[color:var(--color-text-secondary)]" style={{ fontSize: "0.75rem" }}>
              Left
            </span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-4">
            <span className="text-[color:var(--color-text-secondary)]" style={{ fontSize: "0.75rem" }}>
              Center
            </span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25} minSize={15}>
          <div className="flex h-full items-center justify-center bg-[var(--color-hover)] p-4">
            <span className="text-[color:var(--color-text-secondary)]" style={{ fontSize: "0.75rem" }}>
              Right
            </span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

// ── Nested ──

export const Nested: StoryObj = {
  render: () => (
    <div
      style={{
        height: "400px",
        border: "1px solid var(--color-border)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={30} minSize={15}>
          <div className="flex h-full items-center justify-center bg-[var(--color-hover)] p-4">
            <span className="text-[color:var(--color-text-secondary)]" style={{ fontSize: "0.75rem" }}>
              Sidebar
            </span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel defaultSize={60}>
              <div className="flex h-full items-center justify-center p-4">
                <span
                  className="text-[color:var(--color-text-secondary)]"
                  style={{ fontSize: "0.75rem" }}
                >
                  Main
                </span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle orientation="vertical" />
            <ResizablePanel defaultSize={40} minSize={20}>
              <div className="flex h-full items-center justify-center bg-[var(--color-hover)] p-4">
                <span
                  className="text-[color:var(--color-text-secondary)]"
                  style={{ fontSize: "0.75rem" }}
                >
                  Console
                </span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

// ─── Design Tokens ───

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["resizable"].title}
      tokens={componentTokenDocs["resizable"].tokens}
    />
  ),
};
