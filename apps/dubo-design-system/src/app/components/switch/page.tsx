"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { DocsSection } from "@/components/docs/section";
import { componentTokenDocs } from "@/lib/component-token-docs";

/* ── Helpers ── */

function ShowcaseRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-body-md font-medium text-subtext-color">{label}</p>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </div>
  );
}

function ShowcaseCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

/* ── Interactive demos ── */

function ControlledDemo() {
  const [airplane, setAirplane] = React.useState(false);
  const [wifi, setWifi] = React.useState(true);
  const [bluetooth, setBluetooth] = React.useState(true);

  return (
    <div className="flex flex-col gap-4">
      <Switch
        label="Airplane mode"
        description="Disable all wireless connections."
        checked={airplane}
        onCheckedChange={setAirplane}
      />
      <Switch
        label="Wi-Fi"
        description={airplane ? "Disabled by airplane mode." : "Connected to clinic-5G."}
        checked={!airplane && wifi}
        onCheckedChange={setWifi}
        disabled={airplane}
      />
      <Switch
        label="Bluetooth"
        description={airplane ? "Disabled by airplane mode." : "Connected to scanner."}
        checked={!airplane && bluetooth}
        onCheckedChange={setBluetooth}
        disabled={airplane}
      />
    </div>
  );
}

/* ── Page ── */

export default function SwitchPage() {
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
              Switch
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Toggle control for binary on/off settings. Built on Radix UI with 3 sizes, label and
              description support, smooth thumb animation, and the Dubo signature 3D inner shadow.
            </p>
          </div>
        </div>
      </section>

      {/* ── States ── */}
      <DocsSection
        id="states"
        title="States"
        description="The two toggle states: unchecked (muted track) and checked (success-colored green track with the Dubo 3D inner shadow)."
      >
        <ShowcaseCard title="Basic states">
          <div className="flex items-center gap-6">
            <Switch />
            <Switch defaultChecked />
          </div>
        </ShowcaseCard>
      </DocsSection>

      {/* ── Sizes ── */}
      <DocsSection
        id="sizes"
        title="Sizes"
        description="Three sizes matching track heights of 16px (sm), 20px (default), and 24px (lg). The thumb scales proportionally."
      >
        <ShowcaseCard title="Size comparison">
          <ShowcaseRow label="Small (16px)">
            <Switch size="sm" />
            <Switch size="sm" defaultChecked />
          </ShowcaseRow>
          <ShowcaseRow label="Default (20px)">
            <Switch size="default" />
            <Switch size="default" defaultChecked />
          </ShowcaseRow>
          <ShowcaseRow label="Large (24px)">
            <Switch size="lg" />
            <Switch size="lg" defaultChecked />
          </ShowcaseRow>
        </ShowcaseCard>
      </DocsSection>

      {/* ── With Label ── */}
      <DocsSection
        id="label"
        title="With Label"
        description="Pair the switch with a label using shared label tokens. Clicking the label toggles the switch."
      >
        <ShowcaseCard title="Label examples">
          <Switch label="Dark mode" defaultChecked />
          <Switch label="Auto-save documents" />
          <Switch label="Show online status" size="sm" defaultChecked />
        </ShowcaseCard>
      </DocsSection>

      {/* ── With Description ── */}
      <DocsSection
        id="description"
        title="With Description"
        description="Add helper text below the label using shared description tokens."
      >
        <ShowcaseCard title="Label + description">
          <Switch
            label="Email notifications"
            description="Receive emails about new appointments and cancellations."
            defaultChecked
          />
          <Switch
            label="SMS reminders"
            description="Send text message reminders 24 hours before appointments."
          />
          <Switch
            label="Marketing emails"
            description="Receive promotional content and special offers."
          />
        </ShowcaseCard>
      </DocsSection>

      {/* ── Controlled ── */}
      <DocsSection
        id="controlled"
        title="Controlled Example"
        description="Switches can be controlled with state. Here, airplane mode disables and unchecks Wi-Fi and Bluetooth."
      >
        <ShowcaseCard title="Airplane mode pattern">
          <ControlledDemo />
        </ShowcaseCard>
      </DocsSection>

      {/* ── Disabled ── */}
      <DocsSection
        id="disabled"
        title="Disabled State"
        description="Disabled switches are reduced to 40% opacity and block pointer events."
      >
        <ShowcaseCard title="Disabled variations">
          <ShowcaseRow label="Disabled states">
            <Switch label="Disabled off" disabled />
            <Switch label="Disabled on" disabled defaultChecked />
          </ShowcaseRow>
          <ShowcaseRow label="Disabled with description">
            <Switch
              label="Managed setting"
              description="This setting is managed by your administrator."
              disabled
              defaultChecked
            />
          </ShowcaseRow>
        </ShowcaseCard>
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
              {[
                ["checked", "boolean", "undefined", "Controlled checked state"],
                ["defaultChecked", "boolean", "false", "Uncontrolled initial state"],
                [
                  "onCheckedChange",
                  "(checked: boolean) => void",
                  "---",
                  "Called when checked state changes",
                ],
                [
                  "size",
                  '"sm" | "default" | "lg"',
                  '"default"',
                  "Track size: 16px, 20px, or 24px height",
                ],
                ["label", "ReactNode", "undefined", "Label text next to the switch"],
                ["description", "ReactNode", "undefined", "Helper text below the label"],
                ["disabled", "boolean", "false", "Disables the switch (40% opacity)"],
                ["name", "string", "undefined", "Form field name"],
                ["value", "string", "undefined", "Form field value"],
                ["required", "boolean", "false", "Required form validation"],
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

        {/* CSS Variables table */}
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
              {componentTokenDocs["switch"].tokens.map(({ token, value, usage }) => (
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
