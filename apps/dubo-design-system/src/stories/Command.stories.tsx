"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const meta: Meta = {
  title: "Components/Command",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Command** — Dubo Design System searchable command surface.

Built on \`cmdk\`. Command now uses the same dropdown panel recipe as Select, so searchable overlays and command palettes share the same surface, spacing, and option-row language.

### Best for
| Use case | Why |
|---|---|
| Command palettes | Keeps grouped actions searchable and scannable |
| Searchable overlay lists | Reuses the same visual language as Combobox |
| Internal action menus | Supports shortcuts, grouping, and empty states |

### Sub-components
| Component | Purpose |
|---|---|
| \`Command\` | Root surface |
| \`CommandInput\` | Search field with leading icon |
| \`CommandList\` | Scrollable result list |
| \`CommandEmpty\` | Empty state for no results |
| \`CommandGroup\` | Group wrapper with heading |
| \`CommandItem\` | Selectable row |
| \`CommandSeparator\` | Divider between sections |
| \`CommandShortcut\` | Right-aligned keyboard hint |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const paletteItems = {
  navigation: [
    { value: "patients", label: "Patients", shortcut: "G P" },
    { value: "appointments", label: "Appointments", shortcut: "G A" },
    { value: "billing", label: "Billing", shortcut: "G B" },
  ],
  actions: [
    { value: "new-patient", label: "New patient", shortcut: "N" },
    { value: "new-appointment", label: "New appointment", shortcut: "Shift A" },
    { value: "new-note", label: "New clinical note", shortcut: "Shift N" },
  ],
};

export const Playground: Story = {
  render: () => (
    <div className="w-[360px]">
      <Command>
        <CommandInput placeholder="Search command..." />
        <CommandList>
          <CommandEmpty>No matching command.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {paletteItems.navigation.map((item) => (
              <CommandItem key={item.value} value={item.value}>
                {item.label}
                <CommandShortcut>{item.shortcut}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            {paletteItems.actions.map((item) => (
              <CommandItem key={item.value} value={item.value}>
                {item.label}
                <CommandShortcut>{item.shortcut}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};

export const SearchableList: Story = {
  name: "Searchable List",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "A simple searchable list surface for commands, options, or internal navigation items.",
      },
    },
  },
  render: () => (
    <div className="w-[360px]">
      <Command>
        <CommandInput placeholder="Search patient actions..." />
        <CommandList>
          <CommandEmpty>No action found.</CommandEmpty>
          <CommandGroup heading="Patient actions">
            <CommandItem value="schedule">Schedule follow-up</CommandItem>
            <CommandItem value="invoice">Create invoice</CommandItem>
            <CommandItem value="record">Open patient record</CommandItem>
            <CommandItem value="message">Send WhatsApp reminder</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};

export const WithGroupsAndShortcuts: Story = {
  name: "With Groups And Shortcuts",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Grouped command palette layout with shortcuts for fast scanning and keyboard-heavy workflows.",
      },
    },
  },
  render: () => (
    <div className="w-[360px]">
      <Command>
        <CommandInput placeholder="Type a command..." />
        <CommandList>
          <CommandEmpty>No command found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {paletteItems.navigation.map((item) => (
              <CommandItem key={item.value} value={item.value}>
                {item.label}
                <CommandShortcut>{item.shortcut}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            {paletteItems.actions.map((item) => (
              <CommandItem key={item.value} value={item.value}>
                {item.label}
                <CommandShortcut>{item.shortcut}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};

export const EmptyState: Story = {
  name: "Empty State",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Use an explicit empty state when the search has no matching results.",
      },
    },
  },
  render: () => (
    <div className="w-[360px]">
      <Command>
        <CommandInput value="xyz" readOnly />
        <CommandList>
          <CommandEmpty>No patient command found.</CommandEmpty>
        </CommandList>
      </Command>
    </div>
  ),
};

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs.command.title}
      tokens={componentTokenDocs.command.tokens}
    />
  ),
};
