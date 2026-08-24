"use client";

import React from "react";
import { Bold, Italic, Star, Heart, Bookmark, Pin, Bell, Eye } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import { DocsSection } from "@/components/docs/section";
import { componentTokenDocs } from "@/lib/component-token-docs";

/* ---- Helpers ---- */

function ShowcaseRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-body-md font-medium text-subtext-color">{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

function ShowcaseCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

/* ---- Page ---- */

export default function TogglePage() {
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
              Toggle
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              A pill-shaped two-state button (on/off) built on Radix Toggle. 3 variants (default,
              outline, and choice), 3 sizes, icon support, and both subtle and emphatic pressed
              states. Uses only shared control heights, spacing, label roles, and interaction
              tokens.
            </p>
          </div>
        </div>
      </section>

      {/* ---- Variants ---- */}
      <DocsSection
        id="variants"
        title="Variants"
        description="Default (ghost-like), outline, and choice. Choice is the stronger answer/filter pill variant."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Default variant (ghost-like)">
            <Toggle>
              <Bold /> Bold
            </Toggle>
            <Toggle>
              <Italic /> Italic
            </Toggle>
            <Toggle pressed>
              <Star /> Favorited
            </Toggle>
          </ShowcaseCard>

          <ShowcaseCard title="Outline variant (with border)">
            <Toggle variant="outline">
              <Bold /> Bold
            </Toggle>
            <Toggle variant="outline">
              <Italic /> Italic
            </Toggle>
            <Toggle variant="outline" pressed>
              <Star /> Favorited
            </Toggle>
          </ShowcaseCard>

          <ShowcaseCard title="Choice variant (selection pills)">
            <Toggle variant="choice">
              <Bold /> Sim
            </Toggle>
            <Toggle variant="choice" pressed>
              <Italic /> Nao
            </Toggle>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ---- Sizes ---- */}
      <DocsSection
        id="sizes"
        title="Sizes"
        description="Three sizes (32px, 40px, 48px) to match different density contexts."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Size comparison">
            <div className="flex flex-col gap-4">
              <ShowcaseRow label="Small — 32px">
                <Toggle size="sm">
                  <Bold /> Bold
                </Toggle>
                <Toggle size="sm" variant="outline">
                  <Italic /> Italic
                </Toggle>
                <Toggle size="sm" pressed>
                  <Star /> Star
                </Toggle>
              </ShowcaseRow>
              <ShowcaseRow label="Default — 40px">
                <Toggle>
                  <Bold /> Bold
                </Toggle>
                <Toggle variant="outline">
                  <Italic /> Italic
                </Toggle>
                <Toggle pressed>
                  <Star /> Star
                </Toggle>
              </ShowcaseRow>
              <ShowcaseRow label="Large — 48px">
                <Toggle size="lg">
                  <Bold /> Bold
                </Toggle>
                <Toggle size="lg" variant="outline">
                  <Italic /> Italic
                </Toggle>
                <Toggle size="lg" pressed>
                  <Star /> Star
                </Toggle>
              </ShowcaseRow>
            </div>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ---- Icons ---- */}
      <DocsSection
        id="icons"
        title="With Icons"
        description="Icons can be placed inline-start, inline-end, or used alone for icon-only toggles."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Icon start">
            <Toggle>
              <Star /> Favorite
            </Toggle>
            <Toggle variant="outline">
              <Heart /> Like
            </Toggle>
            <Toggle pressed>
              <Bookmark /> Saved
            </Toggle>
          </ShowcaseCard>

          <ShowcaseCard title="Icon end">
            <Toggle>
              Pin <Pin />
            </Toggle>
            <Toggle variant="outline">
              Notify <Bell />
            </Toggle>
          </ShowcaseCard>

          <ShowcaseCard title="Icon only">
            <div className="flex flex-col gap-4">
              <ShowcaseRow label="Small — 32px">
                <Toggle size="sm" aria-label="Bold">
                  <Bold />
                </Toggle>
                <Toggle size="sm" variant="outline" aria-label="Italic">
                  <Italic />
                </Toggle>
                <Toggle size="sm" pressed aria-label="Star">
                  <Star />
                </Toggle>
              </ShowcaseRow>
              <ShowcaseRow label="Default — 40px">
                <Toggle aria-label="Bold">
                  <Bold />
                </Toggle>
                <Toggle variant="outline" aria-label="Italic">
                  <Italic />
                </Toggle>
                <Toggle pressed aria-label="Star">
                  <Star />
                </Toggle>
              </ShowcaseRow>
              <ShowcaseRow label="Large — 48px">
                <Toggle size="lg" aria-label="Bold">
                  <Bold />
                </Toggle>
                <Toggle size="lg" variant="outline" aria-label="Eye">
                  <Eye />
                </Toggle>
                <Toggle size="lg" pressed aria-label="Star">
                  <Star />
                </Toggle>
              </ShowcaseRow>
            </div>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ---- Pressed State ---- */}
      <DocsSection
        id="pressed"
        title="Pressed State"
        description="When pressed/on, the toggle uses --color-brand-subtle background and --color-brand text. The outline variant also switches its border to brand."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Default — unpressed vs pressed">
            <Toggle>
              <Star /> Unpressed
            </Toggle>
            <Toggle pressed>
              <Star /> Pressed
            </Toggle>
          </ShowcaseCard>

          <ShowcaseCard title="Outline — unpressed vs pressed">
            <Toggle variant="outline">
              <Star /> Unpressed
            </Toggle>
            <Toggle variant="outline" pressed>
              <Star /> Pressed
            </Toggle>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ---- Disabled ---- */}
      <DocsSection
        id="disabled"
        title="Disabled"
        description="Disabled toggles have 40% opacity and block pointer events."
      >
        <ShowcaseCard>
          <Toggle disabled>
            <Bold /> Default
          </Toggle>
          <Toggle disabled pressed>
            <Bold /> Pressed
          </Toggle>
          <Toggle disabled variant="outline">
            <Bold /> Outline
          </Toggle>
          <Toggle disabled variant="outline" pressed>
            <Bold /> Outline Pressed
          </Toggle>
        </ShowcaseCard>
      </DocsSection>

      {/* ---- API ---- */}
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
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">variant</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"default" | "outline"`}</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"default"`}</td>
                <td className="px-4 py-3">Visual style of the toggle</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">size</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"sm" | "default" | "lg"`}</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"default"`}</td>
                <td className="px-4 py-3">Size: sm=32px, default=40px, lg=48px</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">pressed</td>
                <td className="px-4 py-3 font-mono text-body-sm">boolean</td>
                <td className="px-4 py-3 font-mono text-body-sm">false</td>
                <td className="px-4 py-3">Controlled pressed/on state</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">defaultPressed</td>
                <td className="px-4 py-3 font-mono text-body-sm">boolean</td>
                <td className="px-4 py-3 font-mono text-body-sm">false</td>
                <td className="px-4 py-3">Uncontrolled initial pressed state</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">onPressedChange</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`(pressed: boolean) => void`}</td>
                <td className="px-4 py-3 font-mono text-body-sm">-</td>
                <td className="px-4 py-3">Callback when pressed state changes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">disabled</td>
                <td className="px-4 py-3 font-mono text-body-sm">boolean</td>
                <td className="px-4 py-3 font-mono text-body-sm">false</td>
                <td className="px-4 py-3">Disables the toggle (40% opacity, no pointer events)</td>
              </tr>
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
              {componentTokenDocs["toggle"].tokens.map(({ token, value, usage }) => (
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
