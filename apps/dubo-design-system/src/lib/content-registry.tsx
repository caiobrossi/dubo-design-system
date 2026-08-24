import type { ComponentType } from "react";
import ColorsDoc from "@/content/foundations/colors.mdx";
import BorderRadiusDoc from "@/content/foundations/border-radius.mdx";
import TypographyDoc from "@/content/foundations/typography.mdx";
import ShadowsDoc from "@/content/foundations/shadows.mdx";
import SpacingsDoc from "@/content/foundations/spacings.mdx";
import EffectsDoc from "@/content/foundations/effects.mdx";
import DesignTokensDoc from "@/content/design-tokens/index.mdx";
import type { DocEntry, NavItem } from "@/lib/schemas";
import { docEntrySchema, navItemSchema } from "@/lib/schemas";
import { buildStorybookUrl } from "@/lib/storybook";
import { humanizeSlug } from "@/lib/utils";

export interface FoundationDoc extends DocEntry {
  component: ComponentType;
}

export interface TokenDoc extends DocEntry {
  component: ComponentType;
}

const foundationDocsRaw = [
  {
    slug: "colors",
    title: "Colors",
    category: "Foundations",
    kind: "foundation",
    status: "ready",
    description:
      "Brand, neutral, feedback and semantic color tokens used across the Dubo ecosystem.",
    order: 10,
    component: ColorsDoc,
  },
  {
    slug: "border-radius",
    title: "Border Radius",
    category: "Foundations",
    kind: "foundation",
    status: "ready",
    description:
      "Decision rules and radius scale for clickable elements, containers and glass surfaces.",
    order: 20,
    component: BorderRadiusDoc,
  },
  {
    slug: "typography",
    title: "Typography",
    category: "Foundations",
    kind: "foundation",
    status: "ready",
    description:
      "Poppins-first typography system with shared semantic roles and Tailwind utilities.",
    order: 30,
    component: TypographyDoc,
  },
  {
    slug: "shadows",
    title: "Shadows",
    category: "Foundations",
    kind: "foundation",
    status: "ready",
    description:
      "Borders-first elevation strategy and the limited shadow scale reserved for floating surfaces.",
    order: 40,
    component: ShadowsDoc,
  },
  {
    slug: "spacings",
    title: "Spacings",
    category: "Foundations",
    kind: "foundation",
    status: "ready",
    description:
      "4px base spacing scale with practical layout rules for micro, meso and macro rhythm.",
    order: 50,
    component: SpacingsDoc,
  },
  {
    slug: "effects",
    title: "Effects",
    category: "Foundations",
    kind: "foundation",
    status: "ready",
    description:
      "Transitions, glass effect patterns and interaction motion used in the current Dubo UI.",
    order: 60,
    component: EffectsDoc,
  },
] satisfies FoundationDoc[];

const tokenDocRaw = {
  slug: "design-tokens",
  title: "Design Tokens",
  category: "Design Tokens",
  kind: "token",
  status: "ready",
  description: "A consolidated catalog of the real tokens used in the current Dubo system.",
  order: 10,
  component: DesignTokensDoc,
} satisfies TokenDoc;

export const foundationDocs = foundationDocsRaw
  .map((entry) => ({
    ...docEntrySchema.parse(entry),
    component: entry.component,
  }))
  .sort((a, b) => a.order - b.order);

export const designTokensDoc = {
  ...docEntrySchema.parse(tokenDocRaw),
  component: tokenDocRaw.component,
};

const componentDocEntriesRaw: DocEntry[] = [
  docEntrySchema.parse({
    slug: "button",
    title: "Button",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Primary interaction element with 6 variants, 3 sizes, icon support, loading state, and the Dubo signature 3D shadow animation.",
    order: 10,
  }),
  docEntrySchema.parse({
    slug: "page-layout",
    title: "Page Layout",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Page composition primitive for full-width, 50/50, 25/75 and 75/25 structures using shared spacing and fixed column ratios.",
    order: 12,
  }),
  docEntrySchema.parse({
    slug: "layout-card",
    title: "Layout Card",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Quiet content wrapper for panels placed inside PageLayout and other page structures, with shared surface, border, radius, and padding tokens.",
    order: 13,
  }),
  docEntrySchema.parse({
    slug: "tabs",
    title: "Tabs",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Inline underline tabs for page-level content switching with animated sliding indicator.",
    order: 20,
  }),
  docEntrySchema.parse({
    slug: "segment-control",
    title: "Segment Control",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "iOS-style segmented control with animated spring pill indicator. 3 variants and 2 sizes.",
    order: 30,
  }),
  docEntrySchema.parse({
    slug: "card",
    title: "Card",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Container component for grouping content with 2 variants (base and faded) and 5 composable sub-components.",
    order: 40,
  }),
  docEntrySchema.parse({
    slug: "empty-state",
    title: "Empty State",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Centered empty-state pattern with illustration container, concise copy, optional supporting text, and optional recovery action.",
    order: 43,
  }),
  docEntrySchema.parse({
    slug: "drag-and-drop",
    title: "Drag And Drop",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Sortable surface pattern for prioritization, ranking, and lightweight workflow ordering with shared surface and motion tokens.",
    order: 45,
  }),
  docEntrySchema.parse({
    slug: "floating-panel",
    title: "Floating Panel",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Movable secondary workspace with expanded and minimized states, anchored start positions, and optional footer/header actions.",
    order: 44,
  }),
  docEntrySchema.parse({
    slug: "table",
    title: "Table",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Static table primitive with default, outline, striped and card variants, plus optional sortable headers.",
    storybookUrl: buildStorybookUrl("component", "table"),
    order: 46,
  }),
  docEntrySchema.parse({
    slug: "dental-selector",
    title: "Dental Selector",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Dental-domain field patterns for FDI tooth selection and multi-surface selection with shared Dubo field styling.",
    storybookUrl: buildStorybookUrl("component", "dentalselector"),
    order: 47,
  }),
  docEntrySchema.parse({
    slug: "data-table",
    title: "Data Table",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "TanStack-based interactive table for sorting, selection, empty states and larger operational datasets.",
    storybookUrl: buildStorybookUrl("component", "data-table"),
    order: 47,
  }),
  docEntrySchema.parse({
    slug: "stats-bar",
    title: "Stats Bar",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Dashboard stats row with illustrations, separators, large values, optional trend comparison, and transparent/card surface variants.",
    order: 48,
  }),
  docEntrySchema.parse({
    slug: "weekday-picker",
    title: "Weekday Picker",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Compact seven-day selector with animated selected pill and optional previous/next navigation.",
    order: 49,
  }),
  docEntrySchema.parse({
    slug: "data-display",
    title: "Data Display",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Structured label/value list with quiet dividers for metadata blocks, summaries, and footer-like information groups.",
    order: 51,
  }),
  docEntrySchema.parse({
    slug: "avatar",
    title: "Avatar",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Visual representation of a user with initials, image, or fallback icon. 6 color variants, 5 sizes, status badges, and avatar groups.",
    order: 50,
  }),
  docEntrySchema.parse({
    slug: "badge",
    title: "Badge",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Unified badge and chip component with 6 status variants, 2 color intensities, 2 sizes, icon support, avatar, close button, and loading state.",
    order: 60,
  }),
  docEntrySchema.parse({
    slug: "sonner",
    title: "Sonner",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Toast notification system with 5 semantic variants (default, success, info, warning, error), promise support, action buttons, and design token integration.",
    order: 70,
  }),
  docEntrySchema.parse({
    slug: "alert",
    title: "Alert",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Grid-based feedback component with 6 variants (default, destructive, info, success, warning, invert), composable sub-components, responsive actions, and direct icon support. ReUI-inspired.",
    order: 80,
  }),
  docEntrySchema.parse({
    slug: "alert-dialog",
    title: "Alert Dialog",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Confirmation modal for destructive or high-impact actions with enforced cancel path and focused decision-making.",
    storybookUrl: buildStorybookUrl("component", "alert-dialog"),
    order: 85,
  }),
  docEntrySchema.parse({
    slug: "checkbox",
    title: "Checkbox",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Selection control with checked, unchecked, indeterminate, disabled, and invalid states. Includes CheckboxGroup for grouping with shared labels and error handling.",
    order: 90,
  }),
  docEntrySchema.parse({
    slug: "label",
    title: "Label",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Reusable form label with required asterisk, optional indicator, info icon, and description subtext. Uses shared semantic tokens.",
    order: 95,
  }),
  docEntrySchema.parse({
    slug: "radio-group",
    title: "RadioGroup",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Radio selection component with group label, descriptions, disabled, invalid, and horizontal layout. Uses shared semantic tokens — zero component-specific tokens.",
    order: 100,
  }),
  docEntrySchema.parse({
    slug: "input",
    title: "Input",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Two input styles — standard (40px, label above) and floating label (56px, animated label inside→top). 2 variants, icon support, error, disabled, and help text. Zero component-specific tokens.",
    order: 105,
  }),
  docEntrySchema.parse({
    slug: "textarea",
    title: "TextArea",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Two textarea styles — standard (label above, 120px min) and floating label (animated label inside→top). 2 variants, clearable, character count, auto-resize, error, disabled, and help text. Zero component-specific tokens.",
    order: 110,
  }),
  docEntrySchema.parse({
    slug: "select",
    title: "Select",
    category: "Components",
    kind: "component" as const,
    status: "ready" as const,
    description:
      "Dropdown selection with floating label, frosted glass dropdown, and same variants as Input.",
    order: 115,
  }),
  docEntrySchema.parse({
    slug: "field-trigger",
    title: "Field Trigger",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Floating-label field shell for controls that open a dialog or richer surface while keeping the same language as Select and Input.",
    storybookUrl: buildStorybookUrl("component", "field-trigger"),
    order: 116,
  }),
  docEntrySchema.parse({
    slug: "autocomplete",
    title: "Autocomplete",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Inline searchable field for selecting real entities while preserving the same visual language as Input, Select, and Command.",
    storybookUrl: buildStorybookUrl("component", "autocomplete"),
    order: 117,
  }),
  docEntrySchema.parse({
    slug: "combobox",
    title: "Combobox",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Searchable selection pattern built on Popover + cmdk with single, multiple and grouped option flows.",
    storybookUrl: buildStorybookUrl("component", "combobox"),
    order: 118,
  }),
  docEntrySchema.parse({
    slug: "command",
    title: "Command",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Searchable command surface built on cmdk for palettes, searchable lists, and richer overlay selection flows.",
    storybookUrl: buildStorybookUrl("component", "command"),
    order: 119,
  }),
  docEntrySchema.parse({
    slug: "dropdown-menu",
    title: "Dropdown Menu",
    category: "Components",
    kind: "component" as const,
    status: "ready" as const,
    description:
      "Frosted glass dropdown menu with checkboxes, radio groups, submenus, and shortcuts.",
    order: 120,
  }),
  docEntrySchema.parse({
    slug: "tooltip",
    title: "Tooltip",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Contextual overlay on hover/focus with 4 positioning sides, optional arrow, configurable delay, and dark inverted surface. Built on Radix Tooltip.",
    order: 130,
  }),
  docEntrySchema.parse({
    slug: "dialog",
    title: "Dialog",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "General-purpose modal dialog with size variants, overlay backdrop and composable header, content and footer regions.",
    storybookUrl: buildStorybookUrl("component", "dialog"),
    order: 135,
  }),
  docEntrySchema.parse({
    slug: "switch",
    title: "Switch",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Toggle control for binary on/off settings with 3 sizes, label and description support, smooth thumb animation, and the Dubo 3D inner shadow.",
    order: 140,
  }),
  docEntrySchema.parse({
    slug: "toggle",
    title: "Toggle",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Pill-shaped two-state button (on/off) with 3 variants, 3 sizes, icon support, and both subtle and emphatic pressed states. Zero component-specific tokens.",
    order: 150,
  }),
  docEntrySchema.parse({
    slug: "toggle-group",
    title: "Toggle Group",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Groups multiple toggle buttons for single or multiple selection with horizontal/vertical orientation. Items inherit variant and size via context, including the stronger choice-pill variant.",
    order: 160,
  }),
  docEntrySchema.parse({
    slug: "spinner",
    title: "Spinner",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "CSS wave bars loading indicator with 4 sizes (16–40px), 3 color modes (muted, brand, inherit), and reduced-motion support. Zero component-specific tokens.",
    order: 170,
  }),
  docEntrySchema.parse({
    slug: "skeleton",
    title: "Skeleton",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Pulse animation loading placeholders with 3 variants (text, circle, card) and configurable dimensions. Zero component-specific tokens.",
    order: 180,
  }),
  docEntrySchema.parse({
    slug: "sheet",
    title: "Sheet",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Side panel / drawer built on Radix Dialog with 4 directions, frosted glass overlay, rounded borders, composable header/footer, and smooth slide animation.",
    order: 190,
  }),
  docEntrySchema.parse({
    slug: "separator",
    title: "Separator",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Visual divider with horizontal/vertical orientations, optional centered label text, and decorative mode. Zero component-specific tokens.",
    order: 200,
  }),
  docEntrySchema.parse({
    slug: "scroll-area",
    title: "ScrollArea",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Custom scrollbar overlay built on Radix ScrollArea with thin 4px track, hover expansion, vertical/horizontal/both orientations. Zero component-specific tokens.",
    order: 210,
  }),
  docEntrySchema.parse({
    slug: "resizable",
    title: "Resizable",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Resizable panel layout with drag handles, horizontal/vertical directions, collapsible panels, nested groups, and optional grip icon. Zero component-specific tokens.",
    order: 220,
  }),
  docEntrySchema.parse({
    slug: "progress",
    title: "Progress",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Linear progress bar with 5 color variants (default, success, warning, danger, brand), 3 sizes, animated fill, indeterminate shimmer, and optional label/percentage. Zero component-specific tokens.",
    order: 230,
  }),
  docEntrySchema.parse({
    slug: "stepper",
    title: "Stepper",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Sequential progress indicator for wizard flows with horizontal and vertical orientations plus default, active and completed states.",
    storybookUrl: buildStorybookUrl("component", "stepper"),
    order: 235,
  }),
  docEntrySchema.parse({
    slug: "popover",
    title: "Popover",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Floating content panel with frosted glass background, 4 side positions, 3 alignments, optional arrow, 32px radius, and smooth enter/exit animations. Zero component-specific tokens.",
    order: 240,
  }),
  docEntrySchema.parse({
    slug: "pagination",
    title: "Pagination",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Responsive controlled pagination for 320 px, 375 px and desktop, plus preserved composable primitives. Uses shared control, selection and accessibility roles with zero component-specific tokens.",
    order: 250,
  }),
  docEntrySchema.parse({
    slug: "navigation-menu",
    title: "Navigation Menu",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Horizontal navigation with dropdown content, links, icons, and sub-menu items with descriptions. Built on Radix Navigation Menu. Zero component-specific tokens.",
    order: 260,
  }),
  docEntrySchema.parse({
    slug: "input-otp",
    title: "Input OTP",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "One-time password input with 4-digit, 6-digit, separator, and dash variants. Built on input-otp package. Zero component-specific tokens.",
    order: 270,
  }),
  docEntrySchema.parse({
    slug: "search-field",
    title: "Search Field",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Pill-shaped search input built on top of Input, with a search icon, clear action, and the shared page-toolbar search styling.",
    storybookUrl: buildStorybookUrl("component", "search-field"),
    order: 275,
  }),
  docEntrySchema.parse({
    slug: "phone-input-split",
    title: "Phone Input Split",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Split phone field with searchable country picker, floating number input, and the same field language used across the design system.",
    storybookUrl: buildStorybookUrl("component", "phone-input-split"),
    order: 277,
  }),
  docEntrySchema.parse({
    slug: "date-range-filter-chip",
    title: "Date Range Filter Chip",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Approved date-range filter composition with FilterChip trigger, two date pickers, and a preset list for consistent history and toolbar filtering.",
    storybookUrl: buildStorybookUrl("component", "date-range-filter-chip"),
    order: 278,
  }),
  docEntrySchema.parse({
    slug: "hover-card",
    title: "HoverCard",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Rich preview popup on hover with solid and frosted glass variants. Built on Radix HoverCard with configurable delay and positioning. Zero component-specific tokens.",
    order: 280,
  }),
  docEntrySchema.parse({
    slug: "interactive-card",
    title: "Interactive Card",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Unified interactive card with single select (radio), multi select (checkbox), and link (clickable navigation with hover gradient + scale) modes. Composable Header, Content, and Footer sub-components.",
    order: 290,
  }),
  docEntrySchema.parse({
    slug: "filter-chip",
    title: "FilterChip",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Pill-shaped filter button that opens a popover with any content. Brand styling when active, optional clear button, and composable popover content. Zero component-specific tokens.",
    order: 300,
  }),
  docEntrySchema.parse({
    slug: "calendar",
    title: "Calendar",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Date selection calendar built on react-day-picker v9 with single, range, and multiple selection modes, availability indicator dots, legend, multi-month view, and dropdown navigation.",
    order: 310,
  }),
  docEntrySchema.parse({
    slug: "date-picker",
    title: "DatePicker",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Composition of Calendar + Popover + trigger button with standard and floating label styles, single/range modes, presets, indicator dots, clearable, error and disabled states.",
    order: 320,
  }),
  docEntrySchema.parse({
    slug: "date-field",
    title: "Date Field",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Floating date entry field with typed formatting, automatic separators, calendar popup, and easy adaptation to Dubo date settings.",
    storybookUrl: buildStorybookUrl("component", "date-field"),
    order: 321,
  }),
  docEntrySchema.parse({
    slug: "time-field",
    title: "Time Field",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Floating time field for scheduling flows with digit-only typing, auto-correction, and an hour/minute popup selector.",
    storybookUrl: buildStorybookUrl("component", "time-field"),
    order: 322,
  }),
  docEntrySchema.parse({
    slug: "page-header",
    title: "Page Header",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Consistent page-level header with 3-column grid layout: title on the left, truly centered navigation, and optional right actions. Supports back button, sticky mode, bordered, and responsive mobile variant.",
    order: 15,
  }),
  docEntrySchema.parse({
    slug: "side-navigation",
    title: "Side Navigation",
    category: "Components",
    kind: "component",
    status: "ready",
    description:
      "Primary application navigation with expanded and collapsed desktop modes, flush top-content support, matched utility actions, active-item elevation, and a mobile bottom drawer treatment.",
    order: 16,
  }),
];

export const componentDocEntries = componentDocEntriesRaw.toSorted((a, b) => a.order - b.order);
export const productComponentDocEntries: DocEntry[] = [];

export const siteNavigation = [
  {
    label: "Foundations",
    href: "/foundations/colors",
    visible: true,
    children: foundationDocs.map((doc) => ({
      label: doc.title,
      href: `/foundations/${doc.slug}`,
      visible: true,
    })),
  },
  {
    label: "Design Tokens",
    href: "/design-tokens",
    visible: true,
  },
  {
    label: "Components",
    href: "/components",
    visible: true,
    children: componentDocEntries.map((doc) => ({
      label: doc.title,
      href: `/components/${doc.slug}`,
      visible: true,
    })),
  },
  {
    label: "Product Components",
    href: "/product-components",
    visible: true,
  },
] satisfies NavItem[];

siteNavigation.forEach((item) => navItemSchema.parse(item));

export function getFoundationDocBySlug(slug: string) {
  return foundationDocs.find((doc) => doc.slug === slug);
}

export function getComponentDoc(slug: string): DocEntry {
  const match = componentDocEntries.find((entry) => entry.slug === slug);
  if (match) return match;

  return docEntrySchema.parse({
    slug,
    title: humanizeSlug(slug),
    category: "Components",
    kind: "component",
    status: "draft",
    description:
      "This page is ready to receive the final component documentation. Usage, style, code and accessibility will be added component by component.",
    storybookUrl: buildStorybookUrl("component", slug),
    order: 999,
  });
}

export function getProductComponentDoc(slug: string): DocEntry {
  const match = productComponentDocEntries.find((entry) => entry.slug === slug);
  if (match) return match;

  return docEntrySchema.parse({
    slug,
    title: humanizeSlug(slug),
    category: "Product Components",
    kind: "product-component",
    status: "draft",
    description:
      "This page is ready to receive product-specific documentation tied to real Dubo workflows and screens.",
    storybookUrl: buildStorybookUrl("product-component", slug),
    order: 999,
  });
}
