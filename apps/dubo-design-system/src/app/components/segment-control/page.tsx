"use client";

import { useState } from "react";
import { List, LayoutGrid, Calendar, BarChart3, Settings } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { SegmentControl, SegmentItem } from "@/components/ui/segment-control";
import { DocsSection } from "@/components/docs/section";
import { componentTokenDocs } from "@/lib/component-token-docs";

/* ── Helpers ── */

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

/* ── Variant Demos ── */

function VariantDemo({
  variant,
  label,
}: {
  variant: "default" | "light" | "header";
  label: string;
}) {
  const [active, setActive] = useState(0);
  const items = ["Day", "Week", "Month"];

  return (
    <ShowcaseCard title={label}>
      <SegmentControl variant={variant}>
        {items.map((item, i) => (
          <SegmentItem key={item} active={active === i} onClick={() => setActive(i)}>
            {item}
          </SegmentItem>
        ))}
      </SegmentControl>
    </ShowcaseCard>
  );
}

/* ── Size Demos ── */

function SizeDemo({ size, label }: { size: "sm" | "default"; label: string }) {
  const [active, setActive] = useState(0);
  const items = ["List", "Grid", "Calendar"];

  return (
    <ShowcaseRow label={label}>
      <SegmentControl size={size}>
        {items.map((item, i) => (
          <SegmentItem key={item} active={active === i} onClick={() => setActive(i)}>
            {item}
          </SegmentItem>
        ))}
      </SegmentControl>
    </ShowcaseRow>
  );
}

/* ── Icons Demo ── */

function IconsDemo() {
  const [active, setActive] = useState(0);
  const items = [
    { label: "List", icon: <List /> },
    { label: "Grid", icon: <LayoutGrid /> },
    { label: "Calendar", icon: <Calendar /> },
    { label: "Charts", icon: <BarChart3 /> },
    { label: "Settings", icon: <Settings /> },
  ];

  return (
    <SegmentControl>
      {items.map((item, i) => (
        <SegmentItem
          key={item.label}
          active={active === i}
          onClick={() => setActive(i)}
          icon={item.icon}
        >
          {item.label}
        </SegmentItem>
      ))}
    </SegmentControl>
  );
}

function IconOnlyDemo() {
  const [active, setActive] = useState(0);
  const icons = [<List key="list" />, <LayoutGrid key="grid" />, <Calendar key="cal" />];

  return (
    <SegmentControl>
      {icons.map((icon, i) => (
        <SegmentItem key={i} active={active === i} onClick={() => setActive(i)} icon={icon} />
      ))}
    </SegmentControl>
  );
}

/* ── Disabled Demo ── */

function DisabledDemo() {
  const [active, setActive] = useState(0);
  const items = ["Active", "Normal", "Disabled"];

  return (
    <SegmentControl>
      {items.map((item, i) => (
        <SegmentItem
          key={item}
          active={active === i}
          onClick={() => setActive(i)}
          disabled={i === 2}
        >
          {item}
        </SegmentItem>
      ))}
    </SegmentControl>
  );
}

/* ── Fit Content Demo ── */

function FitContentDemo() {
  const [active, setActive] = useState(0);
  const items = ["All", "Active", "Archived"];

  return (
    <SegmentControl>
      {items.map((item, i) => (
        <SegmentItem key={item} active={active === i} onClick={() => setActive(i)} fit>
          {item}
        </SegmentItem>
      ))}
    </SegmentControl>
  );
}

/* ── Page ── */

export default function SegmentControlPage() {
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
              Segment Control
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              iOS-style segmented control with an animated spring pill indicator. 3 variants, 2
              sizes, icon support, fit-content mode, and all visual properties driven by CSS custom
              properties.
            </p>
          </div>
        </div>
      </section>

      {/* ── Variants ── */}
      <DocsSection
        id="variants"
        title="Variants"
        description="Three variants for different contexts. Default has a solid gray background, light is transparent, and header uses a dedicated header background token."
      >
        <div className="flex flex-col gap-6">
          <VariantDemo variant="default" label="Default — solid background" />
          <VariantDemo variant="light" label="Light — transparent background" />
          <VariantDemo variant="header" label="Header — header background token" />
        </div>
      </DocsSection>

      {/* ── Sizes ── */}
      <DocsSection
        id="sizes"
        title="Sizes"
        description="Two sizes (32px and 40px) for compact or standard density contexts."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Size comparison">
            <div className="flex w-full flex-col gap-4">
              <SizeDemo size="sm" label="Small — 32px" />
              <SizeDemo size="default" label="Default — 40px" />
            </div>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── With Icons ── */}
      <DocsSection
        id="icons"
        title="With Icons"
        description="Items accept an icon prop displayed before the label. Icon-only items work by omitting children."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Icon + label">
            <IconsDemo />
          </ShowcaseCard>

          <ShowcaseCard title="Icon only (no children)">
            <IconOnlyDemo />
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── States ── */}
      <DocsSection
        id="states"
        title="States"
        description="Disabled items block pointer events. Fit-content items hug their content instead of stretching."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Disabled item (third item is disabled)">
            <DisabledDemo />
          </ShowcaseCard>

          <ShowcaseCard title="Fit content — items hug their text width">
            <FitContentDemo />
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── API Reference ── */}
      <DocsSection id="api" title="API Reference" description="Props and CSS custom properties.">
        {/* Props table */}
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
                <td className="px-4 py-3 font-mono text-body-sm" colSpan={4}>
                  <strong>SegmentControl</strong>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">variant</td>
                <td className="px-4 py-3 font-mono text-body-sm">
                  {`"default" | "light" | "header"`}
                </td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"default"`}</td>
                <td className="px-4 py-3">Visual style of the container</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">size</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"sm" | "default"`}</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"default"`}</td>
                <td className="px-4 py-3">Size: sm=32px, default=40px</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm" colSpan={4}>
                  <strong>SegmentItem</strong>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">active</td>
                <td className="px-4 py-3 font-mono text-body-sm">boolean</td>
                <td className="px-4 py-3 font-mono text-body-sm">false</td>
                <td className="px-4 py-3">Whether this item is active</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">disabled</td>
                <td className="px-4 py-3 font-mono text-body-sm">boolean</td>
                <td className="px-4 py-3 font-mono text-body-sm">false</td>
                <td className="px-4 py-3">Disables the item (blocks pointer events)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">icon</td>
                <td className="px-4 py-3 font-mono text-body-sm">ReactNode</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">Icon element displayed before the label</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">fit</td>
                <td className="px-4 py-3 font-mono text-body-sm">boolean</td>
                <td className="px-4 py-3 font-mono text-body-sm">false</td>
                <td className="px-4 py-3">Hug content width instead of flex-1</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CSS Variables table */}
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
              {componentTokenDocs["segment-control"].tokens.map(({ token, value, usage }) => (
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
