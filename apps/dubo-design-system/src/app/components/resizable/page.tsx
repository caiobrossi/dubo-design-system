import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { DocsSection } from "@/components/docs/section";
import { ResizableDemo } from "./demo";
import { componentTokenDocs } from "@/lib/component-token-docs";

export const metadata: Metadata = {
  title: "Resizable — Dubo Design System",
  description:
    "Resizable panel layout with drag handles, horizontal/vertical orientations, collapsible panels, and nested groups.",
};

/* ── Page ── */

export default function ResizablePage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-[1120px] flex-col gap-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-8 lg:px-8">
        <div className="relative z-10 flex flex-col gap-6">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <Badge variant="success">Ready</Badge>
              <Badge variant="info1">Component</Badge>
            </div>
            <h1 className="text-hero font-medium tracking-[0em] text-default-font lg:text-hero">
              Resizable
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Resizable panel layout built on react-resizable-panels. Supports horizontal and
              vertical directions, collapsible panels, nested groups, and an optional grip icon
              handle. All styles from shared design tokens.
            </p>
          </div>
        </div>
      </section>

      {/* Demos (client component) */}
      <ResizableDemo />

      {/* ── API ── */}
      <DocsSection id="api" title="API Reference" description="Props and CSS custom properties.">
        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Component</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Prop</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Type</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {[
                [
                  "ResizablePanelGroup",
                  "orientation",
                  '"horizontal" | "vertical"',
                  "Layout orientation of the panels",
                ],
                ["ResizablePanel", "defaultSize", "number", "Initial size as a percentage (0-100)"],
                ["ResizablePanel", "minSize", "number", "Minimum size as a percentage"],
                ["ResizablePanel", "maxSize", "number", "Maximum size as a percentage"],
                [
                  "ResizablePanel",
                  "collapsible",
                  "boolean",
                  "Whether the panel can collapse to zero",
                ],
                [
                  "ResizableHandle",
                  "withHandle",
                  "boolean",
                  "Show a visible grip icon on the handle",
                ],
              ].map(([component, prop, type, description]) => (
                <tr key={`${component}-${prop}`}>
                  <td className="px-4 py-3 font-mono text-body-sm">{component}</td>
                  <td className="px-4 py-3 font-mono text-body-sm">{prop}</td>
                  <td className="px-4 py-3 font-mono text-body-sm">{type}</td>
                  <td className="px-4 py-3">{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  CSS Variable
                </th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Value</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {componentTokenDocs["resizable"].tokens.map(({ token, value, usage }) => (
                <tr key={token}>
                  <td className="px-4 py-3 font-mono text-body-sm">{token}</td>
                  <td className="px-4 py-3 font-mono text-body-sm">{value}</td>
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
