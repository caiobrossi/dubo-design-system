"use client";

import React, { useState } from "react";
import {
  Globe,
  Stethoscope,
  Clock,
  AlertCircle,
  Heart,
  Brain,
  Smile,
  Baby,
  Scissors,
  Shield,
} from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  FloatingSelect,
  SelectItem,
  SelectGroup,
  SelectGroupLabel,
  SelectSeparator,
} from "@/components/ui/select";
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

function ShowcaseRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-6 md:grid-cols-2">{children}</div>;
}

/* ── Page ── */

export default function SelectPage() {
  const [country, setCountry] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [clearableValue, setClearableValue] = useState("pt");
  const [floatingOutline, setFloatingOutline] = useState("");
  const [floatingFilled, setFloatingFilled] = useState("");
  const [groupedValue, setGroupedValue] = useState("");
  const [iconValue, setIconValue] = useState("");

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
              Select
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Dropdown selection that reuses the same field recipe as Input. The trigger shares the
              same spacing, radius, helper, and state tokens, while the menu uses the shared
              frosted-glass overlay recipe for grouped and icon-rich option lists.
            </p>
          </div>
        </div>
      </section>

      {/* ── Variants ── */}
      <DocsSection
        id="variants"
        title="Variants"
        description="Standard Select uses the shared 40px field trigger with the same outline and filled variants as Input."
      >
        <ShowcaseRow>
          <ShowcaseCard title="Outline variant (default)">
            <Select
              label="Country"
              placeholder="Select a country..."
              icon={<Globe />}
              value={country}
              onValueChange={setCountry}
            >
              <SelectItem value="pt">Portugal</SelectItem>
              <SelectItem value="br">Brazil</SelectItem>
              <SelectItem value="es">Spain</SelectItem>
              <SelectItem value="fr">France</SelectItem>
              <SelectItem value="de">Germany</SelectItem>
            </Select>
          </ShowcaseCard>

          <ShowcaseCard title="Filled variant">
            <Select
              variant="filled"
              label="Dental Specialty"
              placeholder="Choose specialty..."
              icon={<Stethoscope />}
              value={specialty}
              onValueChange={setSpecialty}
            >
              <SelectItem value="general">General Dentistry</SelectItem>
              <SelectItem value="ortho">Orthodontics</SelectItem>
              <SelectItem value="endo">Endodontics</SelectItem>
              <SelectItem value="perio">Periodontics</SelectItem>
              <SelectItem value="prostho">Prosthodontics</SelectItem>
            </Select>
          </ShowcaseCard>
        </ShowcaseRow>
      </DocsSection>

      {/* ── Floating Label ── */}
      <DocsSection
        id="floating"
        title="Floating Label"
        description="The floating version moves to the shared 56px field surface and keeps the same selection and helper tokens as the standard trigger."
      >
        <ShowcaseRow>
          <ShowcaseCard title="Floating outline">
            <FloatingSelect
              label="Appointment Time"
              icon={<Clock />}
              value={floatingOutline}
              onValueChange={setFloatingOutline}
            >
              <SelectItem value="09:00">09:00 AM</SelectItem>
              <SelectItem value="09:30">09:30 AM</SelectItem>
              <SelectItem value="10:00">10:00 AM</SelectItem>
              <SelectItem value="10:30">10:30 AM</SelectItem>
              <SelectItem value="11:00">11:00 AM</SelectItem>
              <SelectItem value="14:00">02:00 PM</SelectItem>
              <SelectItem value="14:30">02:30 PM</SelectItem>
              <SelectItem value="15:00">03:00 PM</SelectItem>
            </FloatingSelect>
          </ShowcaseCard>

          <ShowcaseCard title="Floating filled">
            <FloatingSelect
              variant="filled"
              label="Country"
              icon={<Globe />}
              value={floatingFilled}
              onValueChange={setFloatingFilled}
            >
              <SelectItem value="pt">Portugal</SelectItem>
              <SelectItem value="br">Brazil</SelectItem>
              <SelectItem value="es">Spain</SelectItem>
              <SelectItem value="fr">France</SelectItem>
              <SelectItem value="it">Italy</SelectItem>
              <SelectItem value="de">Germany</SelectItem>
            </FloatingSelect>
          </ShowcaseCard>
        </ShowcaseRow>
      </DocsSection>

      {/* ── With Groups ── */}
      <DocsSection
        id="groups"
        title="With Groups"
        description="Use SelectGroup with SelectGroupLabel to organize options into labelled sections, separated by SelectSeparator."
      >
        <ShowcaseRow>
          <ShowcaseCard title="Grouped specialties">
            <Select
              label="Dental Department"
              placeholder="Select department..."
              value={groupedValue}
              onValueChange={setGroupedValue}
            >
              <SelectGroup>
                <SelectGroupLabel>Preventive</SelectGroupLabel>
                <SelectItem value="general">General Dentistry</SelectItem>
                <SelectItem value="hygiene">Dental Hygiene</SelectItem>
                <SelectItem value="pediatric">Pediatric Dentistry</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectGroupLabel>Restorative</SelectGroupLabel>
                <SelectItem value="endo">Endodontics</SelectItem>
                <SelectItem value="prostho">Prosthodontics</SelectItem>
                <SelectItem value="implant">Implantology</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectGroupLabel>Surgical</SelectGroupLabel>
                <SelectItem value="oral-surgery">Oral Surgery</SelectItem>
                <SelectItem value="perio">Periodontics</SelectItem>
              </SelectGroup>
            </Select>
          </ShowcaseCard>

          <ShowcaseCard title="Floating grouped">
            <FloatingSelect label="Time Slot" icon={<Clock />}>
              <SelectGroup>
                <SelectGroupLabel>Morning</SelectGroupLabel>
                <SelectItem value="08:00">08:00 AM</SelectItem>
                <SelectItem value="09:00">09:00 AM</SelectItem>
                <SelectItem value="10:00">10:00 AM</SelectItem>
                <SelectItem value="11:00">11:00 AM</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectGroupLabel>Afternoon</SelectGroupLabel>
                <SelectItem value="14:00">02:00 PM</SelectItem>
                <SelectItem value="15:00">03:00 PM</SelectItem>
                <SelectItem value="16:00">04:00 PM</SelectItem>
                <SelectItem value="17:00">05:00 PM</SelectItem>
              </SelectGroup>
            </FloatingSelect>
          </ShowcaseCard>
        </ShowcaseRow>
      </DocsSection>

      {/* ── With Icons ── */}
      <DocsSection
        id="icons"
        title="With Icons"
        description="SelectItem accepts an icon prop to display an icon before the label text. Icons are 16px."
      >
        <ShowcaseRow>
          <ShowcaseCard title="Standard with item icons">
            <Select
              label="Specialty"
              placeholder="Select specialty..."
              value={iconValue}
              onValueChange={setIconValue}
            >
              <SelectItem value="general" icon={<Heart />}>
                General Dentistry
              </SelectItem>
              <SelectItem value="ortho" icon={<Smile />}>
                Orthodontics
              </SelectItem>
              <SelectItem value="endo" icon={<Brain />}>
                Endodontics
              </SelectItem>
              <SelectItem value="pediatric" icon={<Baby />}>
                Pediatric Dentistry
              </SelectItem>
              <SelectItem value="surgery" icon={<Scissors />}>
                Oral Surgery
              </SelectItem>
              <SelectItem value="perio" icon={<Shield />}>
                Periodontics
              </SelectItem>
            </Select>
          </ShowcaseCard>

          <ShowcaseCard title="Floating with item icons">
            <FloatingSelect label="Select Treatment" icon={<Stethoscope />}>
              <SelectItem value="cleaning" icon={<Heart />}>
                Teeth Cleaning
              </SelectItem>
              <SelectItem value="filling" icon={<Shield />}>
                Dental Filling
              </SelectItem>
              <SelectItem value="extraction" icon={<Scissors />}>
                Extraction
              </SelectItem>
              <SelectItem value="root-canal" icon={<Brain />}>
                Root Canal
              </SelectItem>
              <SelectItem value="braces" icon={<Smile />}>
                Braces
              </SelectItem>
            </FloatingSelect>
          </ShowcaseCard>
        </ShowcaseRow>
      </DocsSection>

      {/* ── Clearable ── */}
      <DocsSection
        id="clearable"
        title="Clearable"
        description="When clearable={true}, an X button appears after a value is selected to reset the field."
      >
        <ShowcaseRow>
          <ShowcaseCard title="Standard clearable (pre-filled)">
            <Select
              label="Country"
              placeholder="Select a country..."
              icon={<Globe />}
              clearable
              value={clearableValue}
              onValueChange={setClearableValue}
            >
              <SelectItem value="pt">Portugal</SelectItem>
              <SelectItem value="br">Brazil</SelectItem>
              <SelectItem value="es">Spain</SelectItem>
              <SelectItem value="fr">France</SelectItem>
              <SelectItem value="de">Germany</SelectItem>
            </Select>
          </ShowcaseCard>

          <ShowcaseCard title="Floating clearable">
            <FloatingSelect
              label="Time Slot"
              icon={<Clock />}
              clearable
              value={timeSlot}
              onValueChange={setTimeSlot}
            >
              <SelectItem value="09:00">09:00 AM</SelectItem>
              <SelectItem value="10:00">10:00 AM</SelectItem>
              <SelectItem value="11:00">11:00 AM</SelectItem>
              <SelectItem value="14:00">02:00 PM</SelectItem>
              <SelectItem value="15:00">03:00 PM</SelectItem>
            </FloatingSelect>
          </ShowcaseCard>
        </ShowcaseRow>
      </DocsSection>

      {/* ── States ── */}
      <DocsSection
        id="states"
        title="States"
        description="Disabled reduces to 40% opacity and blocks pointer events. Error state applies a red border and colors helpText red."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseRow>
            <ShowcaseCard title="Disabled">
              <div className="flex flex-col gap-4">
                <Select label="Country" placeholder="Select a country..." icon={<Globe />} disabled>
                  <SelectItem value="pt">Portugal</SelectItem>
                </Select>
                <FloatingSelect label="Appointment Time" icon={<Clock />} disabled>
                  <SelectItem value="09:00">09:00 AM</SelectItem>
                </FloatingSelect>
              </div>
            </ShowcaseCard>

            <ShowcaseCard title="Error">
              <div className="flex flex-col gap-4">
                <Select
                  label="Specialty"
                  placeholder="Select specialty..."
                  error
                  helpText="Please select a dental specialty"
                  icon={<AlertCircle />}
                >
                  <SelectItem value="general">General Dentistry</SelectItem>
                  <SelectItem value="ortho">Orthodontics</SelectItem>
                </Select>
                <FloatingSelect
                  label="Country"
                  icon={<Globe />}
                  error
                  helpText="Country is required"
                >
                  <SelectItem value="pt">Portugal</SelectItem>
                  <SelectItem value="br">Brazil</SelectItem>
                </FloatingSelect>
              </div>
            </ShowcaseCard>
          </ShowcaseRow>
        </div>
      </DocsSection>

      {/* ── API Reference ── */}
      <DocsSection
        id="api"
        title="API Reference"
        description="Props and shared semantic design tokens."
      >
        {/* Select props */}
        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Prop (Select)
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
                ["label", "ReactNode", "—", "Label text above the select"],
                ["placeholder", "string", '"Select..."', "Placeholder text when no value"],
                ["helpText", "ReactNode", "—", "Help text or error message below"],
                ["error", "boolean", "false", "Error state — red border + error helpText color"],
                ["icon", "ReactNode", "—", "Icon on the left side (16px)"],
                ["clearable", "boolean", "false", "Show X button to clear selected value"],
                ["disabled", "boolean", "false", "Disables the select (40% opacity)"],
                ["value", "string", "—", "Controlled value"],
                ["defaultValue", "string", "—", "Default value (uncontrolled)"],
                ["onValueChange", "(value: string) => void", "—", "Callback when value changes"],
                ["children", "ReactNode", "— (required)", "SelectItem, SelectGroup, etc."],
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

        {/* FloatingSelect props */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Prop (FloatingSelect)
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
                ["placeholder", "string", "—", "Placeholder shown when open but no value"],
                ["helpText", "ReactNode", "—", "Help text or error message below"],
                ["error", "boolean", "false", "Error state — red border + error label color"],
                ["icon", "ReactNode", "—", "Icon on the left side (16px)"],
                ["clearable", "boolean", "false", "Show X button to clear selected value"],
                ["disabled", "boolean", "false", "Disables the select (40% opacity)"],
                ["value", "string", "—", "Controlled value"],
                ["defaultValue", "string", "—", "Default value (uncontrolled)"],
                ["onValueChange", "(value: string) => void", "—", "Callback when value changes"],
                ["children", "ReactNode", "— (required)", "SelectItem, SelectGroup, etc."],
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

        {/* SelectItem props */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Prop (SelectItem)
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
                ["value", "string", "— (required)", "Item value"],
                ["icon", "ReactNode", "—", "Icon before item text (16px)"],
                ["disabled", "boolean", "false", "Disables the item"],
                ["children", "ReactNode", "— (required)", "Item label text"],
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

        {/* SelectGroup + SelectGroupLabel props */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Prop (SelectGroup / SelectGroupLabel)
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
                [
                  "children (SelectGroup)",
                  "ReactNode",
                  "— (required)",
                  "SelectGroupLabel + SelectItem children",
                ],
                [
                  "children (SelectGroupLabel)",
                  "ReactNode",
                  "— (required)",
                  "Group label text (uppercase, xs, semibold)",
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

        {/* CSS Variables / Design Tokens */}
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
              {componentTokenDocs["select"].tokens.map(({ token, value, usage }) => (
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
