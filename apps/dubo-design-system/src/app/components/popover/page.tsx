import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { DocsSection } from "@/components/docs/section";
import { PopoverDemo } from "./demo";
import { componentTokenDocs } from "@/lib/component-token-docs";

export const metadata: Metadata = {
  title: "Popover — Dubo Design System",
  description:
    "Floating content panel with frosted glass background, 4 side positions, 3 alignments, optional arrow, and smooth animations.",
};

/* ── Page ── */

export default function PopoverPage() {
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
              Popover
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Floating content panel built on @radix-ui/react-popover. Frosted glass background with
              backdrop blur, shared overlay glass recipe tokens, 4 side positions, 3 alignment
              options, optional arrow, and smooth enter/exit animations. All styles come from the
              shared overlay glass tokens.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive demos (client) */}
      <PopoverDemo />

      {/* ── API ── */}
      <DocsSection id="api" title="API Reference" description="Props and CSS custom properties.">
        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Prop</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Type</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Default</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {[
                [
                  "side",
                  '"top" | "right" | "bottom" | "left"',
                  '"bottom"',
                  "Which side of the trigger the popover appears on",
                ],
                [
                  "align",
                  '"start" | "center" | "end"',
                  '"center"',
                  "Horizontal alignment relative to the trigger",
                ],
                ["sideOffset", "number", "8", "Distance in px from the trigger"],
                ["showArrow", "boolean", "false", "Show an arrow pointing to the trigger"],
              ].map(([prop, type, def, description]) => (
                <tr key={prop}>
                  <td className="px-4 py-3 font-mono text-body-sm">{prop}</td>
                  <td className="px-4 py-3 font-mono text-body-sm">{type}</td>
                  <td className="px-4 py-3 font-mono text-body-sm">{def}</td>
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
              {componentTokenDocs["popover"].tokens.map(({ token, value, usage }) => (
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
