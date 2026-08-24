"use client";

import React from "react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Underline,
} from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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

export default function ToggleGroupPage() {
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
              Toggle Group
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Groups multiple pill-shaped toggle buttons for single or multiple selection. Built on
              Radix Toggle Group, items inherit variant and size from the parent via context.
              Supports horizontal and vertical orientations, with shared `--space-1` spacing between
              items.
            </p>
          </div>
        </div>
      </section>

      {/* ---- Single Selection ---- */}
      <DocsSection
        id="single"
        title="Single Selection"
        description={
          'Only one item can be active at a time (type="single"). Like a radio group, but with toggle button styling.'
        }
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Default variant">
            <ToggleGroup type="single" defaultValue="center">
              <ToggleGroupItem value="left" aria-label="Left">
                <AlignLeft />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Center">
                <AlignCenter />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Right">
                <AlignRight />
              </ToggleGroupItem>
              <ToggleGroupItem value="justify" aria-label="Justify">
                <AlignJustify />
              </ToggleGroupItem>
            </ToggleGroup>
          </ShowcaseCard>

          <ShowcaseCard title="Outline variant">
            <ToggleGroup type="single" variant="outline" defaultValue="center">
              <ToggleGroupItem value="left" aria-label="Left">
                <AlignLeft />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Center">
                <AlignCenter />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Right">
                <AlignRight />
              </ToggleGroupItem>
              <ToggleGroupItem value="justify" aria-label="Justify">
                <AlignJustify />
              </ToggleGroupItem>
            </ToggleGroup>
          </ShowcaseCard>

          <ShowcaseCard title="Choice variant">
            <ToggleGroup type="single" variant="choice" defaultValue="sim">
              <ToggleGroupItem value="sim">Sim</ToggleGroupItem>
              <ToggleGroupItem value="talvez">Talvez</ToggleGroupItem>
              <ToggleGroupItem value="nao">Nao</ToggleGroupItem>
            </ToggleGroup>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ---- Multiple Selection ---- */}
      <DocsSection
        id="multiple"
        title="Multiple Selection"
        description={
          'Multiple items can be active simultaneously (type="multiple"). Great for text formatting toolbars.'
        }
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Text formatting toolbar">
            <ToggleGroup type="multiple" defaultValue={["bold", "italic"]}>
              <ToggleGroupItem value="bold" aria-label="Bold">
                <Bold />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Italic">
                <Italic />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Underline">
                <Underline />
              </ToggleGroupItem>
              <ToggleGroupItem value="strikethrough" aria-label="Strikethrough">
                <Strikethrough />
              </ToggleGroupItem>
            </ToggleGroup>
          </ShowcaseCard>

          <ShowcaseCard title="Outline — text formatting">
            <ToggleGroup type="multiple" variant="outline" defaultValue={["bold"]}>
              <ToggleGroupItem value="bold" aria-label="Bold">
                <Bold />
              </ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Italic">
                <Italic />
              </ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Underline">
                <Underline />
              </ToggleGroupItem>
            </ToggleGroup>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ---- Sizes ---- */}
      <DocsSection
        id="sizes"
        title="Sizes"
        description="Three sizes (32px, 40px, 48px) inherited from Toggle. Set on the ToggleGroup parent and all items inherit."
      >
        <ShowcaseCard title="Size comparison">
          <div className="flex flex-col gap-4">
            <ShowcaseRow label="Small — 32px">
              <ToggleGroup type="single" size="sm" defaultValue="center">
                <ToggleGroupItem value="left" aria-label="Left">
                  <AlignLeft />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Center">
                  <AlignCenter />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Right">
                  <AlignRight />
                </ToggleGroupItem>
              </ToggleGroup>
            </ShowcaseRow>
            <ShowcaseRow label="Default — 40px">
              <ToggleGroup type="single" defaultValue="center">
                <ToggleGroupItem value="left" aria-label="Left">
                  <AlignLeft />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Center">
                  <AlignCenter />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Right">
                  <AlignRight />
                </ToggleGroupItem>
              </ToggleGroup>
            </ShowcaseRow>
            <ShowcaseRow label="Large — 48px">
              <ToggleGroup type="single" size="lg" defaultValue="center">
                <ToggleGroupItem value="left" aria-label="Left">
                  <AlignLeft />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Center">
                  <AlignCenter />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Right">
                  <AlignRight />
                </ToggleGroupItem>
              </ToggleGroup>
            </ShowcaseRow>
          </div>
        </ShowcaseCard>
      </DocsSection>

      {/* ---- With Text Labels ---- */}
      <DocsSection
        id="labels"
        title="With Text Labels"
        description="Items can include icon + text labels for better clarity."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Icon + text">
            <ToggleGroup type="single" defaultValue="unordered">
              <ToggleGroupItem value="unordered">
                <List /> Bullet list
              </ToggleGroupItem>
              <ToggleGroupItem value="ordered">
                <ListOrdered /> Numbered list
              </ToggleGroupItem>
            </ToggleGroup>
          </ShowcaseCard>

          <ShowcaseCard title="Outline — icon + text">
            <ToggleGroup type="single" variant="outline" defaultValue="left">
              <ToggleGroupItem value="left">
                <AlignLeft /> Left
              </ToggleGroupItem>
              <ToggleGroupItem value="center">
                <AlignCenter /> Center
              </ToggleGroupItem>
              <ToggleGroupItem value="right">
                <AlignRight /> Right
              </ToggleGroupItem>
            </ToggleGroup>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ---- Vertical ---- */}
      <DocsSection
        id="vertical"
        title="Vertical Orientation"
        description="Vertical stacking for sidebar or toolbar layouts."
      >
        <div className="flex gap-8">
          <ShowcaseCard title="Default">
            <ToggleGroup type="single" orientation="vertical" defaultValue="left">
              <ToggleGroupItem value="left" aria-label="Left">
                <AlignLeft />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Center">
                <AlignCenter />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Right">
                <AlignRight />
              </ToggleGroupItem>
            </ToggleGroup>
          </ShowcaseCard>

          <ShowcaseCard title="Outline">
            <ToggleGroup
              type="single"
              variant="outline"
              orientation="vertical"
              defaultValue="center"
            >
              <ToggleGroupItem value="left" aria-label="Left">
                <AlignLeft />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Center">
                <AlignCenter />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Right">
                <AlignRight />
              </ToggleGroupItem>
            </ToggleGroup>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ---- Disabled ---- */}
      <DocsSection
        id="disabled"
        title="Disabled"
        description="The entire group or individual items can be disabled."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Entire group disabled">
            <ToggleGroup type="single" disabled defaultValue="center">
              <ToggleGroupItem value="left" aria-label="Left">
                <AlignLeft />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Center">
                <AlignCenter />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Right">
                <AlignRight />
              </ToggleGroupItem>
            </ToggleGroup>
          </ShowcaseCard>

          <ShowcaseCard title="Single item disabled">
            <ToggleGroup type="single" defaultValue="left">
              <ToggleGroupItem value="left" aria-label="Left">
                <AlignLeft />
              </ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Center" disabled>
                <AlignCenter />
              </ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Right">
                <AlignRight />
              </ToggleGroupItem>
            </ToggleGroup>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ---- API ---- */}
      <DocsSection
        id="api"
        title="API Reference"
        description="Props for ToggleGroup and ToggleGroupItem."
      >
        {/* ToggleGroup props */}
        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-2">
            <p className="font-mono text-body-md font-medium text-subtext-color">ToggleGroup</p>
          </div>
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
                <td className="px-4 py-3 font-mono text-body-sm">type</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"single" | "multiple"`}</td>
                <td className="px-4 py-3 font-mono text-body-sm">-</td>
                <td className="px-4 py-3">Selection mode (required)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">variant</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"default" | "outline"`}</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"default"`}</td>
                <td className="px-4 py-3">Visual style inherited by items</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">size</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"sm" | "default" | "lg"`}</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"default"`}</td>
                <td className="px-4 py-3">Size inherited by items</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">orientation</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"horizontal" | "vertical"`}</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"horizontal"`}</td>
                <td className="px-4 py-3">Layout direction</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">disabled</td>
                <td className="px-4 py-3 font-mono text-body-sm">boolean</td>
                <td className="px-4 py-3 font-mono text-body-sm">false</td>
                <td className="px-4 py-3">Disables all items in the group</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">value</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`string | string[]`}</td>
                <td className="px-4 py-3 font-mono text-body-sm">-</td>
                <td className="px-4 py-3">Controlled value(s)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">defaultValue</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`string | string[]`}</td>
                <td className="px-4 py-3 font-mono text-body-sm">-</td>
                <td className="px-4 py-3">Uncontrolled initial value(s)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">onValueChange</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`(value) => void`}</td>
                <td className="px-4 py-3 font-mono text-body-sm">-</td>
                <td className="px-4 py-3">Callback when selection changes</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ToggleGroupItem props */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-2">
            <p className="font-mono text-body-md font-medium text-subtext-color">ToggleGroupItem</p>
          </div>
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
                <td className="px-4 py-3 font-mono text-body-sm">value</td>
                <td className="px-4 py-3 font-mono text-body-sm">string</td>
                <td className="px-4 py-3 font-mono text-body-sm">-</td>
                <td className="px-4 py-3">Unique value for this item (required)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">variant</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"default" | "outline"`}</td>
                <td className="px-4 py-3 font-mono text-body-sm">inherited</td>
                <td className="px-4 py-3">Override parent variant</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">size</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"sm" | "default" | "lg"`}</td>
                <td className="px-4 py-3 font-mono text-body-sm">inherited</td>
                <td className="px-4 py-3">Override parent size</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">disabled</td>
                <td className="px-4 py-3 font-mono text-body-sm">boolean</td>
                <td className="px-4 py-3 font-mono text-body-sm">false</td>
                <td className="px-4 py-3">Disables this specific item</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CSS Variables */}
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
              {componentTokenDocs["toggle-group"].tokens.map(({ token, value, usage }) => (
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
