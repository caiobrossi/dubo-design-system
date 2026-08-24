"use client";

import React, { useState } from "react";
import { Mail, Search, AlertCircle, User, Lock, Calendar } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Input, FloatingInput } from "@/components/ui/input";
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

function ShowcaseCardWide({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      <div>{children}</div>
    </div>
  );
}

/* ── Interactive Floating Demo ── */

function FloatingDemo({ variant = "outline" }: { variant?: "outline" | "filled" }) {
  const [values, setValues] = useState({ name: "", email: "", phone: "" });
  const update = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((p) => ({ ...p, [field]: e.target.value }));

  return (
    <div className="flex max-w-md flex-col gap-4">
      <FloatingInput
        variant={variant}
        label="Full name"
        icon={<User />}
        value={values.name}
        onChange={update("name")}
      />
      <FloatingInput
        variant={variant}
        label="Email address"
        type="email"
        icon={<Mail />}
        value={values.email}
        onChange={update("email")}
      />
      <FloatingInput
        variant={variant}
        label="Phone number"
        type="tel"
        value={values.phone}
        onChange={update("phone")}
      />
    </div>
  );
}

function FloatingFormDemo() {
  const [values, setValues] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    city: "",
    zip: "",
  });
  const update = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((p) => ({ ...p, [field]: e.target.value }));

  return (
    <div className="grid max-w-2xl grid-cols-2 gap-4">
      <FloatingInput label="First name" value={values.first} onChange={update("first")} />
      <FloatingInput label="Last name" value={values.last} onChange={update("last")} />
      <FloatingInput
        label="Email"
        icon={<Mail />}
        value={values.email}
        onChange={update("email")}
      />
      <FloatingInput label="Phone" value={values.phone} onChange={update("phone")} />
      <FloatingInput label="City" value={values.city} onChange={update("city")} />
      <FloatingInput label="ZIP code" type="number" value={values.zip} onChange={update("zip")} />
    </div>
  );
}

function DurationDemo({ variant = "filled" }: { variant?: "outline" | "filled" }) {
  const [value, setValue] = useState("45");

  return (
    <div className="max-w-sm">
      <FloatingInput
        label="Duração"
        variant={variant}
        value={value}
        onChange={(event) => setValue(event.target.value.replace(/\D/g, "").slice(0, 3))}
        inputMode="numeric"
        suffix="min"
      />
    </div>
  );
}

/* ── Page ── */

export default function InputPage() {
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
              Input
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Two input styles built from the shared field recipe. The standard Input uses the 40px
              control height with the shared input radius, while FloatingInput moves to the 56px
              surface and reuses the same typography, spacing, helper, and state tokens.
            </p>
          </div>
        </div>
      </section>

      {/* ── Standard Input ── */}
      <DocsSection
        id="standard"
        title="Standard Input"
        description="40px height using the shared field trigger recipe. Two variants: outline (default) and filled."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Outline variant (default)">
            <div className="flex flex-col gap-4">
              <Input label="Full name" placeholder="John Doe" />
              <Input label="Email" placeholder="you@example.com" icon={<Mail />} />
              <Input
                label="Search"
                placeholder="Search patients..."
                icon={<Search />}
                helpText="Type at least 3 characters"
              />
            </div>
          </ShowcaseCard>

          <ShowcaseCard title="Filled variant">
            <div className="flex flex-col gap-4">
              <Input variant="filled" label="Full name" placeholder="John Doe" />
              <Input variant="filled" label="Email" placeholder="you@example.com" icon={<Mail />} />
              <Input
                variant="filled"
                label="Search"
                placeholder="Search patients..."
                icon={<Search />}
                helpText="Type at least 3 characters"
              />
            </div>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Floating Label ── */}
      <DocsSection
        id="floating"
        title="Floating Label Input"
        description="56px height using the shared floating field surface. The label animates from center to top on focus or when the input has a value, while keeping the same field tokens as the standard style."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Outline variant — click into each field">
            <FloatingDemo variant="outline" />
          </ShowcaseCard>

          <ShowcaseCard title="Filled variant — click into each field">
            <FloatingDemo variant="filled" />
          </ShowcaseCard>

          <ShowcaseCardWide title="Registration form — grid layout">
            <FloatingFormDemo />
          </ShowcaseCardWide>
        </div>
      </DocsSection>

      {/* ── With Icons ── */}
      <DocsSection
        id="icons"
        title="With Icons"
        description="Icons can be placed on the left, right, or both sides. Standard icons are 16px, floating icons are 20px."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Standard — icon positions">
            <div className="flex flex-col gap-4">
              <Input label="Icon left" placeholder="Search..." icon={<Search />} />
              <Input label="Icon right" placeholder="you@example.com" iconRight={<Mail />} />
              <Input
                label="Both sides"
                placeholder="Search patients..."
                icon={<Search />}
                iconRight={<AlertCircle />}
              />
            </div>
          </ShowcaseCard>

          <ShowcaseCard title="Floating — icon positions">
            <div className="flex flex-col gap-4">
              <FloatingInput label="Search" icon={<Search />} />
              <FloatingInput label="Email address" iconRight={<Mail />} />
              <FloatingInput label="Username" icon={<User />} iconRight={<AlertCircle />} />
            </div>
          </ShowcaseCard>
        </div>
      </DocsSection>

      <DocsSection
        id="suffix"
        title="Suffix / Duration"
        description="Use suffix when the unit should stay visually coupled to the value, like appointment duration in minutes. This keeps the input generic while making the meaning obvious."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Filled floating field — duration">
            <DurationDemo variant="filled" />
          </ShowcaseCard>

          <ShowcaseCard title="Outline floating field — duration">
            <DurationDemo variant="outline" />
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Error States ── */}
      <DocsSection
        id="error"
        title="Error States"
        description="Error state applies a red border (--color-danger) and colors the helpText red. Use with iconRight={<AlertCircle />} for visual emphasis."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Standard — error">
            <div className="flex flex-col gap-4">
              <Input
                label="Email"
                placeholder="you@example.com"
                error
                helpText="Please enter a valid email address"
                iconRight={<AlertCircle />}
              />
              <Input
                label="Password"
                type="password"
                error
                helpText="Password must be at least 8 characters"
                icon={<Lock />}
              />
            </div>
          </ShowcaseCard>

          <ShowcaseCard title="Floating — error">
            <div className="flex flex-col gap-4">
              <FloatingInput
                label="Email"
                error
                helpText="Please enter a valid email address"
                iconRight={<AlertCircle />}
              />
              <FloatingInput
                label="Password"
                error
                helpText="Password must be at least 8 characters"
                icon={<Lock />}
              />
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
              <Input label="Full name" placeholder="John Doe" disabled />
              <Input
                variant="filled"
                label="Email"
                placeholder="you@example.com"
                disabled
                icon={<Mail />}
              />
            </div>
          </ShowcaseCard>

          <ShowcaseCard title="Floating — disabled">
            <div className="flex flex-col gap-4">
              <FloatingInput label="Full name" disabled />
              <FloatingInput variant="filled" label="Email address" disabled icon={<Mail />} />
            </div>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Input Types ── */}
      <DocsSection
        id="types"
        title="Input Types"
        description="Both input styles support all HTML input types."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Standard — various types">
            <div className="flex flex-col gap-4">
              <Input label="Text" type="text" placeholder="Enter text..." />
              <Input label="Email" type="email" placeholder="you@example.com" icon={<Mail />} />
              <Input
                label="Password"
                type="password"
                placeholder="Enter password..."
                icon={<Lock />}
              />
              <Input label="Number" type="number" placeholder="0" />
              <Input label="Date" type="date" icon={<Calendar />} />
            </div>
          </ShowcaseCard>

          <ShowcaseCard title="Floating — various types">
            <div className="flex flex-col gap-4">
              <FloatingInput label="Text" type="text" />
              <FloatingInput label="Email" type="email" icon={<Mail />} />
              <FloatingInput label="Password" type="password" icon={<Lock />} />
              <FloatingInput label="Number" type="number" />
              <FloatingInput label="Date" type="date" icon={<Calendar />} />
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
        {/* Input props */}
        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Prop (Input)
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
                ["label", "ReactNode", "—", "Label text above the input"],
                ["helpText", "ReactNode", "—", "Help text or error message below"],
                ["error", "boolean", "false", "Error state — red border + error helpText color"],
                ["icon", "ReactNode", "—", "Icon on the left side (16px)"],
                ["iconRight", "ReactNode", "—", "Icon on the right side (16px)"],
                ["disabled", "boolean", "false", "Disables the input (40% opacity)"],
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

        {/* FloatingInput props */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Prop (FloatingInput)
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
                ["label", "string", "— (required)", "Floating label text"],
                ["helpText", "ReactNode", "—", "Help text or error message below"],
                ["error", "boolean", "false", "Error state — red border + error label color"],
                ["icon", "ReactNode", "—", "Icon on the left side (20px)"],
                ["iconRight", "ReactNode", "—", "Icon on the right side (20px)"],
                ["disabled", "boolean", "false", "Disables the input (40% opacity)"],
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
              {componentTokenDocs["input"].tokens.map(({ token, value, usage }) => (
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
