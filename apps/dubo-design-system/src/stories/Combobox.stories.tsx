import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

// ─── Sample Data ─────────────────────────────────────────────────────────────

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "nextjs", label: "Next.js" },
  { value: "nuxt", label: "Nuxt" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

const frameworkLabels = Object.fromEntries(frameworks.map((f) => [f.value, f.label]));

const dentalProcedures = {
  preventive: [
    { value: "cleaning", label: "Teeth Cleaning" },
    { value: "sealants", label: "Dental Sealants" },
    { value: "fluoride", label: "Fluoride Treatment" },
    { value: "xrays", label: "X-Rays" },
  ],
  restorative: [
    { value: "filling", label: "Dental Filling" },
    { value: "crown", label: "Crown" },
    { value: "bridge", label: "Bridge" },
    { value: "implant", label: "Dental Implant" },
  ],
  cosmetic: [
    { value: "whitening", label: "Teeth Whitening" },
    { value: "veneer", label: "Porcelain Veneer" },
    { value: "bonding", label: "Dental Bonding" },
  ],
};

const allProcedureLabels = Object.fromEntries(
  Object.values(dentalProcedures)
    .flat()
    .map((p) => [p.value, p.label])
);

const countries = [
  { value: "br", label: "Brazil" },
  { value: "us", label: "United States" },
  { value: "de", label: "Germany" },
  { value: "jp", label: "Japan" },
  { value: "au", label: "Australia" },
  { value: "ca", label: "Canada" },
  { value: "fr", label: "France" },
  { value: "uk", label: "United Kingdom" },
  { value: "it", label: "Italy" },
  { value: "es", label: "Spain" },
];

const countryLabels = Object.fromEntries(countries.map((c) => [c.value, c.label]));

// ─── Meta ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: "Components/Combobox",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Combobox** — Dubo Design System component built on Popover + cmdk.

Composable combobox with search, single/multi-select, and grouped options.

### Features
| Feature | Description |
|---|---|
| \`Single select\` | Choose one value with search filtering |
| \`Multi-select\` | Select multiple values with checkbox indicators |
| \`Grouped options\` | Organize items under headings |
| \`Search / Filter\` | Built-in cmdk search — filters items as you type |

### Sub-components
| Component | Purpose |
|---|---|
| \`Combobox\` | Root context provider — manages value, open state, mode |
| \`ComboboxTrigger\` | Button that opens the dropdown — shows selection or placeholder |
| \`ComboboxContent\` | Floating panel with glass effect — wraps cmdk Command |
| \`ComboboxInput\` | Search input inside dropdown |
| \`ComboboxList\` | Scrollable list wrapper |
| \`ComboboxEmpty\` | Empty state when no results match |
| \`ComboboxGroup\` | Group with heading label |
| \`ComboboxItem\` | Selectable option — check icon (single) or checkbox (multi) |

### Sizes (trigger)
- \`sm\` — 32px
- \`default\` — 40px
- \`lg\` — 48px
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: "Interactive playground. Toggle between single and multi-select modes.",
      },
    },
  },
  render: function PlaygroundRender() {
    const [value, setValue] = useState("");
    return (
      <div className="w-[320px]">
        <Combobox value={value} onValueChange={setValue}>
          <ComboboxTrigger placeholder="Select framework..." labels={frameworkLabels} />
          <ComboboxContent>
            <ComboboxInput placeholder="Search frameworks..." />
            <ComboboxList>
              <ComboboxEmpty>No framework found.</ComboboxEmpty>
              {frameworks.map((fw) => (
                <ComboboxItem key={fw.value} value={fw.value}>
                  {fw.label}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    );
  },
};

// ─── Single Select ───────────────────────────────────────────────────────────

export const SingleSelect: Story = {
  name: "Single Select",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Basic single-select combobox. Selecting an item closes the dropdown and shows the label in the trigger.",
      },
    },
  },
  render: function SingleSelectRender() {
    const [value, setValue] = useState("");
    return (
      <div className="w-[320px]">
        <Combobox value={value} onValueChange={setValue}>
          <ComboboxTrigger placeholder="Select a country..." labels={countryLabels} />
          <ComboboxContent>
            <ComboboxInput placeholder="Search countries..." />
            <ComboboxList>
              <ComboboxEmpty>No country found.</ComboboxEmpty>
              {countries.map((c) => (
                <ComboboxItem key={c.value} value={c.value}>
                  {c.label}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        {value && (
          <p className="mt-3 text-body-md text-[color:var(--color-text-secondary)]">
            Selected: <strong>{countryLabels[value]}</strong>
          </p>
        )}
      </div>
    );
  },
};

// ─── Multi Select ────────────────────────────────────────────────────────────

export const MultiSelect: Story = {
  name: "Multi Select",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Multi-select with checkbox indicators. The trigger shows the first selected label and a count badge for additional selections. The dropdown stays open to allow multiple selections.",
      },
    },
  },
  render: function MultiSelectRender() {
    const [values, setValues] = useState<string[]>([]);
    return (
      <div className="w-[320px]">
        <Combobox multiple value={values} onValueChange={setValues}>
          <ComboboxTrigger placeholder="Select frameworks..." labels={frameworkLabels} />
          <ComboboxContent>
            <ComboboxInput placeholder="Search frameworks..." />
            <ComboboxList>
              <ComboboxEmpty>No framework found.</ComboboxEmpty>
              {frameworks.map((fw) => (
                <ComboboxItem key={fw.value} value={fw.value}>
                  {fw.label}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        {values.length > 0 && (
          <p className="mt-3 text-body-md text-[color:var(--color-text-secondary)]">
            Selected: {values.map((v) => frameworkLabels[v]).join(", ")}
          </p>
        )}
      </div>
    );
  },
};

// ─── With Search ─────────────────────────────────────────────────────────────

export const WithSearch: Story = {
  name: "With Search",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Demonstrates search/filter behavior powered by cmdk. Type to filter the list of countries in real time.",
      },
    },
  },
  render: function WithSearchRender() {
    const [value, setValue] = useState("");
    return (
      <div className="w-[320px]">
        <Combobox value={value} onValueChange={setValue}>
          <ComboboxTrigger placeholder="Search and select..." labels={countryLabels} />
          <ComboboxContent>
            <ComboboxInput placeholder="Type to search countries..." />
            <ComboboxList>
              <ComboboxEmpty>No matching country found.</ComboboxEmpty>
              {countries.map((c) => (
                <ComboboxItem key={c.value} value={c.value}>
                  {c.label}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    );
  },
};

// ─── Grouped Options ─────────────────────────────────────────────────────────

export const GroupedOptions: Story = {
  name: "Grouped Options",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Options organized under group headings. Uses dental procedure categories as an example of real-world grouped data.",
      },
    },
  },
  render: function GroupedOptionsRender() {
    const [values, setValues] = useState<string[]>([]);
    return (
      <div className="w-[320px]">
        <Combobox multiple value={values} onValueChange={setValues}>
          <ComboboxTrigger placeholder="Select procedures..." labels={allProcedureLabels} />
          <ComboboxContent>
            <ComboboxInput placeholder="Search procedures..." />
            <ComboboxList>
              <ComboboxEmpty>No procedure found.</ComboboxEmpty>
              <ComboboxGroup heading="Preventive">
                {dentalProcedures.preventive.map((p) => (
                  <ComboboxItem key={p.value} value={p.value}>
                    {p.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
              <ComboboxGroup heading="Restorative">
                {dentalProcedures.restorative.map((p) => (
                  <ComboboxItem key={p.value} value={p.value}>
                    {p.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
              <ComboboxGroup heading="Cosmetic">
                {dentalProcedures.cosmetic.map((p) => (
                  <ComboboxItem key={p.value} value={p.value}>
                    {p.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        {values.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {values.map((v) => (
              <span
                key={v}
                className="inline-flex items-center rounded-full bg-[var(--color-brand-subtle)] px-2.5 py-0.5 text-body-sm font-medium text-[color:var(--color-brand)]"
              >
                {allProcedureLabels[v]}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  },
};

// ─── Disabled ────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Disabled state. The trigger is visually dimmed and the dropdown cannot be opened.",
      },
    },
  },
  render: function DisabledRender() {
    return (
      <div className="flex flex-col gap-4 w-[320px]">
        <div>
          <p className="mb-2 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
            Disabled: empty
          </p>
          <Combobox value="" onValueChange={() => {}} disabled>
            <ComboboxTrigger placeholder="Select framework..." />
            <ComboboxContent>
              <ComboboxList>
                {frameworks.map((fw) => (
                  <ComboboxItem key={fw.value} value={fw.value}>
                    {fw.label}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
        <div>
          <p className="mb-2 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
            Disabled: with value
          </p>
          <Combobox value="react" onValueChange={() => {}} disabled>
            <ComboboxTrigger placeholder="Select framework..." labels={frameworkLabels} />
            <ComboboxContent>
              <ComboboxList>
                {frameworks.map((fw) => (
                  <ComboboxItem key={fw.value} value={fw.value}>
                    {fw.label}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </div>
    );
  },
};

// ─── Design Tokens ───────────────────────────────────────────────────────────

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      tokens={[
        { token: "--color-bg-surface", value: "bgSurface", usage: "Trigger background (shared)" },
        {
          token: "--color-border",
          value: "border",
          usage: "Trigger border, input divider, checkbox border (shared)",
        },
        {
          token: "--color-border-strong",
          value: "borderStrong",
          usage: "Trigger hover border (shared)",
        },
        {
          token: "--color-text-primary",
          value: "textPrimary",
          usage: "Selected value text, item text (shared)",
        },
        {
          token: "--color-text-muted",
          value: "textMuted",
          usage: "Placeholder, search icon, empty state, group heading (shared)",
        },
        { token: "--color-hover", value: "hover", usage: "Item hover/focused background (shared)" },
        {
          token: "--color-brand",
          value: "brand",
          usage: "Single-select check icon, multi count badge bg (shared)",
        },
        {
          token: "--color-brand-hover",
          value: "brandHover",
          usage: "Multi-select checkbox checked bg (shared)",
        },
        {
          token: "--color-text-on-brand",
          value: "textOnBrand",
          usage: "Checkbox checkmark, count badge text (shared)",
        },
        {
          token: "--height-control-sm",
          value: "component.button.heightSm",
          usage: "Small trigger height (shared)",
        },
        {
          token: "--height-control-md",
          value: "component.button.heightMd",
          usage: "Default trigger height (shared)",
        },
        {
          token: "--height-control-lg",
          value: "component.button.heightLg",
          usage: "Large trigger height (shared)",
        },
        {
          token: "--focus-ring",
          value: "interaction.focusRing",
          usage: "Focus ring color (shared)",
        },
        {
          token: "--focus-ring-offset",
          value: "interaction.focusRingOffset",
          usage: "Focus ring offset (shared)",
        },
        {
          token: "--disabled-opacity",
          value: "interaction.disabledOpacity",
          usage: "Disabled state opacity (shared)",
        },
        {
          token: "--transition-fast",
          value: "interaction.transitionFast",
          usage: "Animation/transition duration (shared)",
        },
        {
          token: "--transition-easing",
          value: "interaction.transitionEasing",
          usage: "Animation easing (shared)",
        },
        {
          token: "--glass-bg-light",
          value: "glass.bgLight",
          usage: "Dropdown frosted glass bg (shared)",
        },
        {
          token: "--glass-border-light",
          value: "glass.borderLight",
          usage: "Dropdown glass border (shared)",
        },
        {
          token: "--glass-blur-md",
          value: "glass.blurMd",
          usage: "Dropdown backdrop blur (shared)",
        },
        {
          token: "--glass-saturate",
          value: "glass.saturate",
          usage: "Dropdown backdrop saturate (shared)",
        },
        { token: "--shadow-lg", value: "shadow.lg", usage: "Dropdown shadow (shared)" },
      ]}
    />
  ),
};
