"use client";

import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { DocsSection } from "@/components/docs/section";

function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-[color:var(--color-text-secondary)]"
      style={{ fontSize: "0.75rem", fontWeight: 500 }}
    >
      {children}
    </span>
  );
}

function PanelContainer({
  title,
  height = "250px",
  children,
}: {
  title?: string;
  height?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      <div style={{ height }} className="overflow-hidden rounded-xl border border-neutral-200">
        {children}
      </div>
    </div>
  );
}

export function ResizableDemo() {
  return (
    <>
      {/* Horizontal */}
      <DocsSection
        id="horizontal"
        title="Horizontal Layout"
        description="Two-panel horizontal split. Drag the handle to resize. Panels respect minimum size constraints."
      >
        <PanelContainer title="Sidebar + Content">
          <ResizablePanelGroup orientation="horizontal">
            <ResizablePanel defaultSize={30} minSize={15}>
              <div className="flex h-full items-center justify-center bg-[var(--color-hover)] p-4">
                <PanelLabel>Sidebar (30%)</PanelLabel>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={70}>
              <div className="flex h-full items-center justify-center p-4">
                <PanelLabel>Content (70%)</PanelLabel>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </PanelContainer>
      </DocsSection>

      {/* Vertical */}
      <DocsSection
        id="vertical"
        title="Vertical Layout"
        description="Two-panel vertical split. Works the same way but stacked top-to-bottom."
      >
        <PanelContainer title="Header + Content" height="350px">
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel defaultSize={30} minSize={15}>
              <div className="flex h-full items-center justify-center bg-[var(--color-hover)] p-4">
                <PanelLabel>Header (30%)</PanelLabel>
              </div>
            </ResizablePanel>
            <ResizableHandle orientation="vertical" />
            <ResizablePanel defaultSize={70}>
              <div className="flex h-full items-center justify-center p-4">
                <PanelLabel>Content (70%)</PanelLabel>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </PanelContainer>
      </DocsSection>

      {/* With Handle */}
      <DocsSection
        id="with-handle"
        title="With Grip Handle"
        description="Pass withHandle to show a visible grip icon on the drag handle. Use for three-panel layouts."
      >
        <PanelContainer title="Three-panel layout" height="280px">
          <ResizablePanelGroup orientation="horizontal">
            <ResizablePanel defaultSize={25} minSize={15}>
              <div className="flex h-full items-center justify-center bg-[var(--color-hover)] p-4">
                <PanelLabel>Left</PanelLabel>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-4">
                <PanelLabel>Center</PanelLabel>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={25} minSize={15}>
              <div className="flex h-full items-center justify-center bg-[var(--color-hover)] p-4">
                <PanelLabel>Right</PanelLabel>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </PanelContainer>
      </DocsSection>

      {/* Nested */}
      <DocsSection
        id="nested"
        title="Nested Panels"
        description="Nest a vertical group inside a horizontal group for IDE-style layouts."
      >
        <PanelContainer title="IDE layout — sidebar + editor + console" height="380px">
          <ResizablePanelGroup orientation="horizontal">
            <ResizablePanel defaultSize={25} minSize={15}>
              <div className="flex h-full items-center justify-center bg-[var(--color-hover)] p-4">
                <PanelLabel>Sidebar</PanelLabel>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75}>
              <ResizablePanelGroup orientation="vertical">
                <ResizablePanel defaultSize={65}>
                  <div className="flex h-full items-center justify-center p-4">
                    <PanelLabel>Editor</PanelLabel>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle orientation="vertical" />
                <ResizablePanel defaultSize={35} minSize={20}>
                  <div className="flex h-full items-center justify-center bg-[var(--color-hover)] p-4">
                    <PanelLabel>Console</PanelLabel>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </PanelContainer>
      </DocsSection>
    </>
  );
}
