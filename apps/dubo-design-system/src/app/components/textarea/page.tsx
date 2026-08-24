"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { TextArea, FloatingTextArea } from "@/components/ui/textarea";
import { DocsSection } from "@/components/docs/section";
import { componentTokenDocs } from "@/lib/component-token-docs";

/* ── Helpers ── */

function ShowcaseCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      <div className="max-w-md">{children}</div>
    </div>
  );
}

/* ── Interactive Floating Demo ── */

function FloatingDemo({ variant = "outline" }: { variant?: "outline" | "filled" }) {
  const [values, setValues] = useState({
    notes: "",
    description: "",
    feedback: "",
  });
  const update = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValues((p) => ({ ...p, [field]: e.target.value }));

  return (
    <div className="flex max-w-md flex-col gap-4">
      <FloatingTextArea
        variant={variant}
        label="Clinical notes"
        value={values.notes}
        onChange={update("notes")}
      />
      <FloatingTextArea
        variant={variant}
        label="Treatment description"
        value={values.description}
        onChange={update("description")}
      />
      <FloatingTextArea
        variant={variant}
        label="Patient feedback"
        value={values.feedback}
        onChange={update("feedback")}
      />
    </div>
  );
}

/* ── Character Count Demo ── */

function CharCountDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="flex max-w-md flex-col gap-4">
      <TextArea
        label="Bio"
        placeholder="Tell us about yourself..."
        showCount
        maxLength={200}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <FloatingTextArea label="Bio" showCount maxLength={200} />
    </div>
  );
}

/* ── Auto-resize Demo ── */

function AutoResizeDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="flex max-w-md flex-col gap-4">
      <TextArea
        label="Auto-resize"
        placeholder="Start typing and the textarea will grow..."
        autoResize
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <FloatingTextArea label="Auto-resize floating" autoResize />
    </div>
  );
}

/* ── Clearable Demo ── */

function ClearableDemo() {
  const [value, setValue] = useState("Some pre-filled text that can be cleared");
  return (
    <div className="flex max-w-md flex-col gap-4">
      <TextArea
        label="Clearable standard"
        placeholder="Type something..."
        clearable
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue("")}
      />
      <FloatingTextArea label="Clearable floating" clearable />
    </div>
  );
}

/* ── Page ── */

export default function TextAreaPage() {
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
              TextArea
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Two textarea styles built from the same shared field recipe as Input. The standard
              version uses the shared input radius with a composed 120px minimum height, while the
              floating version reuses the same 56px field surface language for label motion, helper
              text, character count, and clearable behavior.
            </p>
          </div>
        </div>
      </section>

      {/* ── Standard TextArea ── */}
      <DocsSection
        id="standard"
        title="Standard TextArea"
        description="A 120px minimum surface composed from shared size and spacing tokens, with the same outline and filled variants as the rest of the field family."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Outline variant (default)">
            <div className="flex flex-col gap-4">
              <TextArea label="Notes" placeholder="Add clinical notes..." />
              <TextArea
                label="Description"
                placeholder="Describe the treatment..."
                helpText="Be as specific as possible"
              />
            </div>
          </ShowcaseCard>

          <ShowcaseCard title="Filled variant">
            <div className="flex flex-col gap-4">
              <TextArea variant="filled" label="Notes" placeholder="Add clinical notes..." />
              <TextArea
                variant="filled"
                label="Description"
                placeholder="Describe the treatment..."
                helpText="Be as specific as possible"
              />
            </div>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Floating Label ── */}
      <DocsSection
        id="floating"
        title="Floating Label TextArea"
        description="The floating label animates from inside the textarea to the top on focus or when the textarea has a value, while reusing the same shared label and helper roles."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Outline variant — click into each field">
            <FloatingDemo variant="outline" />
          </ShowcaseCard>

          <ShowcaseCard title="Filled variant — click into each field">
            <FloatingDemo variant="filled" />
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Character Count ── */}
      <DocsSection
        id="character-count"
        title="Character Count"
        description="Shows current character count and optional maxLength. The counter turns red when exceeding maxLength."
      >
        <ShowcaseCard title="With maxLength">
          <CharCountDemo />
        </ShowcaseCard>
      </DocsSection>

      {/* ── Auto Resize ── */}
      <DocsSection
        id="auto-resize"
        title="Auto Resize"
        description="The textarea automatically grows to fit its content. Uses a useEffect that resets height then reads scrollHeight."
      >
        <ShowcaseCard title="Type to see it grow">
          <AutoResizeDemo />
        </ShowcaseCard>
      </DocsSection>

      {/* ── Clearable ── */}
      <DocsSection
        id="clearable"
        title="Clearable"
        description="An X button appears when the textarea has content. Click it to clear."
      >
        <ShowcaseCard title="Click the X to clear">
          <ClearableDemo />
        </ShowcaseCard>
      </DocsSection>

      {/* ── Error States ── */}
      <DocsSection
        id="error"
        title="Error States"
        description="Error state applies a red border (--color-danger) and colors the helpText red."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Standard — error">
            <div className="flex flex-col gap-4">
              <TextArea
                label="Notes"
                placeholder="Add notes..."
                error
                helpText="This field is required"
              />
            </div>
          </ShowcaseCard>

          <ShowcaseCard title="Floating — error">
            <div className="flex flex-col gap-4">
              <FloatingTextArea label="Notes" error helpText="This field is required" />
            </div>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Disabled ── */}
      <DocsSection
        id="disabled"
        title="Disabled"
        description="Disabled reduces to 40% opacity and blocks pointer events. Label inherits the opacity."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Standard — disabled">
            <div className="flex flex-col gap-4">
              <TextArea label="Notes" placeholder="Add notes..." disabled />
              <TextArea variant="filled" label="Description" placeholder="Describe..." disabled />
            </div>
          </ShowcaseCard>

          <ShowcaseCard title="Floating — disabled">
            <div className="flex flex-col gap-4">
              <FloatingTextArea label="Notes" disabled />
              <FloatingTextArea variant="filled" label="Description" disabled />
            </div>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── API Reference ── */}
      <DocsSection
        id="api"
        title="API Reference"
        description="Props and shared semantic design tokens."
      >
        {/* TextArea props */}
        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Prop (TextArea)
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
                ["variant", '"outline" | "filled"', '"outline"', "Visual style"],
                ["label", "ReactNode", "\u2014", "Label text above the textarea"],
                ["helpText", "ReactNode", "\u2014", "Help text or error message below"],
                [
                  "error",
                  "boolean",
                  "false",
                  "Error state \u2014 red border + error helpText color",
                ],
                ["clearable", "boolean", "false", "Show clear (X) button when textarea has value"],
                ["onClear", "() => void", "\u2014", "Called when clear button is clicked"],
                ["showCount", "boolean", "false", "Show character count below"],
                ["maxLength", "number", "\u2014", "Maximum character limit (used with showCount)"],
                ["autoResize", "boolean", "false", "Auto-resize to fit content"],
                ["disabled", "boolean", "false", "Disables the textarea (40% opacity)"],
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

        {/* FloatingTextArea props */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Prop (FloatingTextArea)
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
                ["variant", '"outline" | "filled"', '"outline"', "Visual style"],
                ["label", "string", "\u2014 (required)", "Floating label text"],
                ["helpText", "ReactNode", "\u2014", "Help text or error message below"],
                ["error", "boolean", "false", "Error state \u2014 red border + error label color"],
                ["clearable", "boolean", "false", "Show clear (X) button when textarea has value"],
                ["onClear", "() => void", "\u2014", "Called when clear button is clicked"],
                ["showCount", "boolean", "false", "Show character count below"],
                ["maxLength", "number", "\u2014", "Maximum character limit (used with showCount)"],
                ["autoResize", "boolean", "false", "Auto-resize to fit content"],
                ["disabled", "boolean", "false", "Disables the textarea (40% opacity)"],
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

        {/* Design Tokens */}
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
              {componentTokenDocs["textarea"].tokens.map(({ token, value, usage }) => (
                <tr key={`${token}-${usage}`}>
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
