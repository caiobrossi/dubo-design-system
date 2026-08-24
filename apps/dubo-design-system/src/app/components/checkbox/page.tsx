"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox";
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

/* ── Interactive: Indeterminate Demo ── */

function IndeterminateDemo() {
  const [items, setItems] = React.useState([true, false, false]);

  const allChecked = items.every(Boolean);
  const someChecked = items.some(Boolean);
  const parentChecked: boolean | "indeterminate" = allChecked
    ? true
    : someChecked
      ? "indeterminate"
      : false;

  function handleParent(checked: boolean | "indeterminate") {
    const newVal = checked === "indeterminate" ? false : Boolean(checked);
    setItems([newVal, newVal, newVal]);
  }

  function handleChild(index: number, checked: boolean | "indeterminate") {
    setItems((prev) => {
      const next = [...prev];
      next[index] = Boolean(checked);
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <Checkbox
        label="Select all services"
        checked={parentChecked}
        onCheckedChange={handleParent}
      />
      <div className="ml-6 flex flex-col gap-2">
        <Checkbox label="Cleaning" checked={items[0]} onCheckedChange={(c) => handleChild(0, c)} />
        <Checkbox label="Whitening" checked={items[1]} onCheckedChange={(c) => handleChild(1, c)} />
        <Checkbox label="Filling" checked={items[2]} onCheckedChange={(c) => handleChild(2, c)} />
      </div>
    </div>
  );
}

/* ── Page ── */

export default function CheckboxPage() {
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
              Checkbox
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Selection control for toggling options on and off. Built on Radix UI with support for
              checked, unchecked, indeterminate, disabled, and invalid states. Includes
              CheckboxGroup for grouping with shared labels and error handling.
            </p>
          </div>
        </div>
      </section>

      {/* ── States ── */}
      <DocsSection
        id="states"
        title="States"
        description="Basic checkbox states: unchecked, checked, and indeterminate. The checkbox uses brand color for the checked/indeterminate fill with a white checkmark."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Basic states">
            <Checkbox label="Unchecked" />
            <Checkbox label="Checked" defaultChecked />
            <Checkbox label="Indeterminate" checked="indeterminate" />
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── With Description ── */}
      <DocsSection
        id="description"
        title="With Description"
        description="Checkboxes can include helper text below the label to provide additional context."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Label + description">
            <Checkbox
              label="Marketing emails"
              description="Receive emails about new products, features, and special offers."
            />
            <Checkbox
              label="Security emails"
              description="Receive alerts about your account security and login activity."
              defaultChecked
            />
            <Checkbox
              label="Newsletter"
              description="Weekly digest of dental industry news and updates."
            />
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Group ── */}
      <DocsSection
        id="group"
        title="Checkbox Group"
        description="Use CheckboxGroup to group related checkboxes with a shared label, help text, and optional error state. Supports vertical (default) and horizontal layouts."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Vertical group (default)">
            <CheckboxGroup
              label="Notifications"
              helpText="Choose which notifications you want to receive."
            >
              <Checkbox label="Push notifications" defaultChecked />
              <Checkbox label="Email notifications" />
              <Checkbox label="SMS notifications" />
            </CheckboxGroup>
          </ShowcaseCard>

          <ShowcaseCard title="Horizontal group">
            <CheckboxGroup label="Specialties" horizontal>
              <Checkbox label="Orthodontics" defaultChecked />
              <Checkbox label="Endodontics" />
              <Checkbox label="Periodontics" />
              <Checkbox label="Prosthodontics" />
            </CheckboxGroup>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Indeterminate ── */}
      <DocsSection
        id="indeterminate"
        title="Indeterminate State"
        description="The indeterminate state is used for parent checkboxes when some (but not all) children are checked. It shows a horizontal dash instead of a checkmark."
      >
        <ShowcaseCard title="Parent / child pattern">
          <IndeterminateDemo />
        </ShowcaseCard>
      </DocsSection>

      {/* ── Invalid ── */}
      <DocsSection
        id="invalid"
        title="Invalid / Error State"
        description="When a checkbox or group is invalid, the border turns red (danger color) and an error message can be displayed below."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Single checkbox — invalid">
            <Checkbox
              label="I accept the Terms of Service"
              invalid
              errorMessage="You must accept the terms to continue."
            />
          </ShowcaseCard>

          <ShowcaseCard title="Group — error">
            <CheckboxGroup
              label="Required selections"
              error
              errorMessage="Please select at least one option."
            >
              <Checkbox label="Option A" invalid />
              <Checkbox label="Option B" invalid />
              <Checkbox label="Option C" invalid />
            </CheckboxGroup>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Disabled ── */}
      <DocsSection
        id="disabled"
        title="Disabled State"
        description="Disabled checkboxes are reduced to 40% opacity and block pointer events."
      >
        <ShowcaseCard title="Disabled variations">
          <ShowcaseRow label="Disabled states">
            <Checkbox label="Disabled unchecked" disabled />
            <Checkbox label="Disabled checked" disabled defaultChecked />
          </ShowcaseRow>
        </ShowcaseCard>
      </DocsSection>

      {/* ── API ── */}
      <DocsSection id="api" title="API Reference" description="Props and CSS custom properties.">
        {/* Checkbox Props */}
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
                ["checked", 'boolean | "indeterminate"', "undefined", "Controlled checked state"],
                ["defaultChecked", "boolean", "false", "Uncontrolled initial state"],
                [
                  "onCheckedChange",
                  '(checked: boolean | "indeterminate") => void',
                  "—",
                  "Called when checked state changes",
                ],
                ["label", "ReactNode", "undefined", "Label text next to the checkbox"],
                ["description", "ReactNode", "undefined", "Helper text below the label"],
                ["invalid", "boolean", "false", "Applies error border and styling"],
                ["errorMessage", "string", "undefined", "Error text shown when invalid"],
                ["disabled", "boolean", "false", "Disables the checkbox (40% opacity)"],
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

        {/* CheckboxGroup Props */}
        <div className="mt-6">
          <p className="mb-3 text-body-md font-medium text-default-font">CheckboxGroup Props</p>
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
                  ["label", "ReactNode", "undefined", "Group label"],
                  ["helpText", "ReactNode", "undefined", "Helper text below checkboxes"],
                  ["error", "boolean", "false", "Applies error state to the group"],
                  ["errorMessage", "string", "undefined", "Error text shown when error is true"],
                  ["horizontal", "boolean", "false", "Horizontal layout for checkboxes"],
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
              {componentTokenDocs["checkbox"].tokens.map(({ token, value, usage }) => (
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
