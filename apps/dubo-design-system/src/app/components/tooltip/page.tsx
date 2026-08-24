"use client";

import {
  Plus,
  Copy,
  Settings,
  Trash2,
  Info,
  HelpCircle,
  Bold,
  Italic,
  Underline,
} from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { DocsSection } from "@/components/docs/section";
import { componentTokenDocs } from "@/lib/component-token-docs";

function ShowcaseCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

/* ── Page ── */

export default function TooltipPage() {
  return (
    <TooltipProvider delayDuration={200} skipDelayDuration={100}>
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
                Tooltip
              </h1>
              <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
                Contextual overlay triggered on hover or focus. Built on Radix Tooltip with 4
                positioning sides, optional arrow, configurable delay, and smooth enter/exit
                animations. Dark inverted surface with automatic dark mode inversion.
              </p>
            </div>
          </div>
        </section>

        {/* ── Positioning ── */}
        <DocsSection
          id="positioning"
          title="Positioning"
          description="Tooltips can appear on any of the 4 sides. The default is top. Radix handles collision detection and will flip to the opposite side if there is not enough space."
        >
          <ShowcaseCard title="All 4 sides">
            {(["top", "right", "bottom", "left"] as const).map((side) => (
              <Tooltip key={side}>
                <TooltipTrigger asChild>
                  <Button variant="outline">{side}</Button>
                </TooltipTrigger>
                <TooltipContent side={side}>
                  <p>Tooltip on {side}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </ShowcaseCard>
        </DocsSection>

        {/* ── Arrow ── */}
        <DocsSection
          id="arrow"
          title="Arrow"
          description="The arrow is shown by default and can be hidden with showArrow={false}. The arrow fill color matches the tooltip background via --color-bg-inverted."
        >
          <div className="flex flex-col gap-6">
            <ShowcaseCard title="With arrow (default)">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    <Info /> With arrow
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Arrow is visible</p>
                </TooltipContent>
              </Tooltip>
            </ShowcaseCard>
            <ShowcaseCard title="Without arrow — showArrow={false}">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    <Info /> No arrow
                  </Button>
                </TooltipTrigger>
                <TooltipContent showArrow={false}>
                  <p>No arrow</p>
                </TooltipContent>
              </Tooltip>
            </ShowcaseCard>
          </div>
        </DocsSection>

        {/* ── Icon Buttons ── */}
        <DocsSection
          id="icon-buttons"
          title="Icon Button Tooltips"
          description="The most common pattern: icon-only buttons with tooltip labels for accessibility and discoverability."
        >
          <div className="flex flex-col gap-6">
            <ShowcaseCard title="Toolbar pattern">
              <div className="flex items-center gap-1 rounded-xl border border-neutral-200 bg-white p-2">
                {[
                  { icon: <Bold />, label: "Bold" },
                  { icon: <Italic />, label: "Italic" },
                  { icon: <Underline />, label: "Underline" },
                ].map(({ icon, label }) => (
                  <Tooltip key={label}>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        {icon}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </ShowcaseCard>
            <ShowcaseCard title="Action icons">
              {[
                { icon: <Plus />, label: "Add patient" },
                { icon: <Copy />, label: "Copy to clipboard" },
                { icon: <Settings />, label: "Settings" },
                { icon: <Trash2 />, label: "Delete" },
              ].map(({ icon, label }) => (
                <Tooltip key={label}>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      {icon}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </ShowcaseCard>
          </div>
        </DocsSection>

        {/* ── Delay ── */}
        <DocsSection
          id="delay"
          title="Delay Control"
          description="The delay before a tooltip opens is configured via the TooltipProvider. The default is 200ms. Use skipDelayDuration for fast hopping between tooltips."
        >
          <div className="flex flex-col gap-6">
            <ShowcaseCard title="Default delay (200ms) — hover to see">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Default delay</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Opens after 200ms</p>
                </TooltipContent>
              </Tooltip>
            </ShowcaseCard>
            <ShowcaseCard title="Instant (0ms) — nested provider override">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Instant tooltip</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Opens immediately</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </ShowcaseCard>
          </div>
        </DocsSection>

        {/* ── Multiline ── */}
        <DocsSection
          id="multiline"
          title="Multiline Content"
          description="For longer descriptions, set a max-width on TooltipContent. The text will wrap naturally."
        >
          <ShowcaseCard title="Constrained width with wrapping text">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">
                  <HelpCircle /> What is this?
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-[240px]">
                <p>
                  This tooltip has longer content that wraps across multiple lines for detailed
                  descriptions or help text.
                </p>
              </TooltipContent>
            </Tooltip>
          </ShowcaseCard>
        </DocsSection>

        {/* ── API ── */}
        <DocsSection
          id="api"
          title="API Reference"
          description="Props, sub-components, and CSS custom properties."
        >
          {/* Sub-components */}
          <div className="overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full text-left text-body-md">
              <thead className="border-b border-neutral-200 bg-neutral-50">
                <tr>
                  <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                    Sub-component
                  </th>
                  <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {[
                  [
                    "TooltipProvider",
                    "Wraps the app or section. Controls delayDuration and skipDelayDuration.",
                  ],
                  [
                    "Tooltip",
                    "Root component. Manages open state. Accepts defaultOpen and open/onOpenChange.",
                  ],
                  [
                    "TooltipTrigger",
                    "The element that triggers the tooltip on hover/focus. Use asChild to render as child.",
                  ],
                  [
                    "TooltipContent",
                    "The floating content panel. Accepts side, sideOffset, showArrow.",
                  ],
                  [
                    "TooltipArrow",
                    "SVG arrow indicator. Rendered inside TooltipContent by default.",
                  ],
                ].map(([name, desc]) => (
                  <tr key={name}>
                    <td className="px-4 py-3 font-mono text-body-sm">{name}</td>
                    <td className="px-4 py-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TooltipContent props */}
          <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
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
                    '"top"',
                    "Preferred side for the tooltip",
                  ],
                  ["sideOffset", "number", "6", "Distance from trigger in px"],
                  ["showArrow", "boolean", "true", "Show/hide the arrow indicator"],
                  [
                    "align",
                    '"start" | "center" | "end"',
                    '"center"',
                    "Alignment along the side axis",
                  ],
                  ["className", "string", "—", "Additional CSS classes (e.g. max-w-[240px])"],
                ].map(([prop, type, def, desc]) => (
                  <tr key={prop}>
                    <td className="px-4 py-3 font-mono text-body-sm">{prop}</td>
                    <td className="px-4 py-3 font-mono text-body-sm">{type}</td>
                    <td className="px-4 py-3 font-mono text-body-sm">{def}</td>
                    <td className="px-4 py-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TooltipProvider props */}
          <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full text-left text-body-md">
              <thead className="border-b border-neutral-200 bg-neutral-50">
                <tr>
                  <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                    Provider Prop
                  </th>
                  <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Type</th>
                  <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Default</th>
                  <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {[
                  ["delayDuration", "number", "200", "Milliseconds before tooltip opens on hover"],
                  [
                    "skipDelayDuration",
                    "number",
                    "100",
                    "Milliseconds to skip delay when moving between tooltips",
                  ],
                  [
                    "disableHoverableContent",
                    "boolean",
                    "false",
                    "Prevent hovering over tooltip content from keeping it open",
                  ],
                ].map(([prop, type, def, desc]) => (
                  <tr key={prop}>
                    <td className="px-4 py-3 font-mono text-body-sm">{prop}</td>
                    <td className="px-4 py-3 font-mono text-body-sm">{type}</td>
                    <td className="px-4 py-3 font-mono text-body-sm">{def}</td>
                    <td className="px-4 py-3">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CSS Variables / Primitives */}
          <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full text-left text-body-md">
              <thead className="border-b border-neutral-200 bg-neutral-50">
                <tr>
                  <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Token</th>
                  <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Value</th>
                  <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {componentTokenDocs["tooltip"].tokens.map(({ token, value, usage }) => (
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
    </TooltipProvider>
  );
}
