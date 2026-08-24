import type { Metadata } from "next";
import {
  DesignTokensDocTable,
  NotesTable,
  PropsTable,
  ShowcaseCard,
} from "@/components/docs/component-doc-helpers";
import { ComponentHero } from "@/components/docs/component-hero";
import { DocsSection } from "@/components/docs/section";
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
import { getComponentDoc } from "@/lib/content-registry";
import { componentTokenDocs } from "@/lib/component-token-docs";

const entry = getComponentDoc("command");

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
};

const useCaseRows = [
  {
    item: "Command palette",
    details: "Use for keyboard-first actions, global navigation, and power-user workflows.",
  },
  {
    item: "Searchable overlay list",
    details:
      "Use when a simple menu is not enough and people need live filtering inside the same surface.",
  },
  {
    item: "Internal primitive",
    details:
      "Command is also the search engine behind Combobox, so keeping its tokens aligned prevents drift across overlays.",
  },
];

const propRows = [
  {
    prop: "value / onValueChange",
    type: "string / setter",
    default: "internal",
    description: "cmdk manages the search query and item matching through the root surface.",
  },
  {
    prop: "heading",
    type: "string",
    default: "—",
    description: "CommandGroup heading text for section labels inside the list.",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "CommandItem respects the shared disabled opacity and becomes non-interactive.",
  },
  {
    prop: "className",
    type: "string",
    default: "—",
    description: "Supports layout-level customization without replacing the shared field and surface roles.",
  },
];

const accessibilityRows = [
  {
    item: "Search clarity",
    details:
      "Use concise placeholder and empty-state copy so filtering behavior is obvious before and after typing.",
  },
  {
    item: "Group labels",
    details: "Section headings help people scan longer action sets and understand the command taxonomy.",
  },
  {
    item: "Shortcut hints",
    details: "Expose shortcuts as hints only when the same action is available by keyboard elsewhere in the product.",
  },
];

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

function CommandPaletteDemo() {
  return (
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
  );
}

function SearchableListDemo() {
  return (
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
  );
}

export default function CommandPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="Command is the searchable action surface behind richer overlays and command palettes. Use it when a plain menu or select can no longer carry the information scent alone."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ShowcaseCard
              title="Command palette"
              description="Grouped actions and shortcuts for keyboard-heavy flows."
            >
              <CommandPaletteDemo />
            </ShowcaseCard>
            <ShowcaseCard
              title="Searchable list"
              description="A leaner list mode for overlays that only need filtering."
            >
              <SearchableListDemo />
            </ShowcaseCard>
          </div>
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="Command now uses the same dropdown panel recipe as Select and the same searchable list language as Combobox, keeping overlays and command palettes visually locked to one shared system."
        >
          <NotesTable rows={useCaseRows} />
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="Compose Command with input, list, groups, items, shortcuts, and empty state based on the density of the action set."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs.command.tokens} />
          </div>
        </DocsSection>

        <DocsSection
          id="accessibility"
          title="Accessibility"
          description="Searchable command surfaces should communicate both what can be searched and what happens when nothing matches."
        >
          <NotesTable rows={accessibilityRows} />
        </DocsSection>
      </div>
    </div>
  );
}
