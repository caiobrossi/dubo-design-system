import type { Metadata } from "next";
import { CalendarDays, MapPin } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Avatar } from "@/components/ui/avatar";
import { DocsSection } from "@/components/docs/section";
import { componentTokenDocs } from "@/lib/component-token-docs";

export const metadata: Metadata = {
  title: "HoverCard — Dubo Design System",
  description:
    "Rich preview popup on hover with solid and frosted glass variants. Built on Radix HoverCard.",
};

/* ── Helpers ── */

function ShowcaseCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      <div className="flex flex-wrap items-center gap-6">{children}</div>
    </div>
  );
}

function ProfilePreview() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Avatar size="lg" src="/avatar-placeholder.webp" alt="Dr. Ana Silva" name="Ana Silva" />
        <div>
          <p className="text-body-md font-medium text-[color:var(--color-text-primary)]">Dr. Ana Silva</p>
          <p className="text-body-sm text-[color:var(--color-text-secondary)]">@anasilva</p>
        </div>
      </div>
      <p className="text-body-md text-[color:var(--color-text-secondary)]">
        Orthodontist specialized in invisible aligners. Board certified with 12 years of clinical
        experience.
      </p>
      <div className="flex items-center gap-4 text-body-sm text-[color:var(--color-text-muted)]">
        <span className="flex items-center gap-1">
          <MapPin className="size-3" /> Lisbon, PT
        </span>
        <span className="flex items-center gap-1">
          <CalendarDays className="size-3" /> Joined Jan 2024
        </span>
      </div>
    </div>
  );
}

/* ── Page ── */

export default function HoverCardPage() {
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
              HoverCard
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Rich preview popup that appears on hover over a trigger element. HoverCard reuses the
              shared overlay surface recipe, optional frosted glass recipe, spacing scale, and text
              roles while supporting all four sides and configurable delays.
            </p>
          </div>
        </div>
      </section>

      {/* ── Solid ── */}
      <DocsSection
        id="solid"
        title="Solid Background"
        description="Default variant with the shared overlay surface recipe. Best for most use cases."
      >
        <ShowcaseCard title="Profile preview on hover">
          <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <a
                href="https://dubo.pt"
                className="text-body-md font-medium text-[color:var(--color-brand)] underline underline-offset-4"
              >
                @anasilva
              </a>
            </HoverCardTrigger>
            <HoverCardContent>
              <ProfilePreview />
            </HoverCardContent>
          </HoverCard>
        </ShowcaseCard>
      </DocsSection>

      {/* ── Glass ── */}
      <DocsSection
        id="glass"
        title="Frosted Glass"
        description="Glass variant with the shared frosted surface recipe for a layered feel. Use the glass prop."
      >
        <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-[var(--p-brand-100)] to-[var(--p-slate-100)] p-8">
          <p className="text-body-md font-medium text-default-font">
            Glass variant over gradient background
          </p>
          <HoverCard openDelay={200} closeDelay={100}>
            <HoverCardTrigger asChild>
              <a
                href="https://dubo.pt"
                className="text-body-md font-medium text-[color:var(--color-brand)] underline underline-offset-4"
              >
                Hover for glass card
              </a>
            </HoverCardTrigger>
            <HoverCardContent glass>
              <ProfilePreview />
            </HoverCardContent>
          </HoverCard>
        </div>
      </DocsSection>

      {/* ── Positions ── */}
      <DocsSection
        id="positions"
        title="Positioning"
        description="The hover card can appear on any side while preserving the same shared surface and spacing language."
      >
        <ShowcaseCard title="All four sides">
          <div className="flex flex-wrap items-center gap-8">
            {(["top", "right", "bottom", "left"] as const).map((side) => (
              <HoverCard key={side} openDelay={100} closeDelay={50}>
                <HoverCardTrigger asChild>
                  <button className="rounded-full border border-neutral-200 bg-white/90 px-3 py-1.5 text-body-md capitalize text-default-font transition-colors hover:border-brand-200 hover:bg-brand-50">
                    {side}
                  </button>
                </HoverCardTrigger>
                <HoverCardContent side={side} className="w-64">
                  <p className="text-body-md text-[color:var(--color-text-secondary)]">
                    Content on the <strong>{side}</strong> side.
                  </p>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </ShowcaseCard>
      </DocsSection>

      {/* ── API ── */}
      <DocsSection
        id="api"
        title="API Reference"
        description="Props and the shared tokens that drive surface, glass, spacing, and text treatment."
      >
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
                ["openDelay", "number", "700", "Ms before card opens"],
                ["closeDelay", "number", "300", "Ms before card closes"],
                ["glass", "boolean", "false", "Use frosted glass background"],
                [
                  "side",
                  '"top" | "right" | "bottom" | "left"',
                  '"bottom"',
                  "Preferred placement side",
                ],
                ["align", '"start" | "center" | "end"', '"center"', "Alignment along the side"],
                ["sideOffset", "number", "6", "Px offset from trigger"],
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

        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  CSS Variable
                </th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Light value
                </th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {componentTokenDocs["hover-card"].tokens.map(({ token, value, usage }) => (
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
