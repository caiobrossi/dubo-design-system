/**
 * Dubo Design System — Foundations (data for MDX documentation pages)
 *
 * All color values reference the OKLCH tokens from design-tokens.ts.
 */

import { primitives, semantic, component, frostedGlass } from "./design-tokens";

// ─────────────────────────────────────────────
// Interfaces (unchanged — consumed by MDX pages)
// ─────────────────────────────────────────────

export interface ColorSwatch {
  scale: string;
  tailwind: string;
  value: string;
  note?: string;
}

export interface SemanticToken {
  token: string;
  css: string;
  usage: string;
}

export interface TokenRow {
  category: string;
  name: string;
  value: string;
  usage: string;
}

export interface TypographyToken {
  token: string;
  utility: string;
  family: string;
  size: string;
  lineHeight: string;
  recommendedWeight: string;
  weightUtility: string;
  usage: string;
  example: string;
}

export interface FontWeightToken {
  token: string;
  value: string;
  css: string;
  usage: string;
}

export interface RadiusToken {
  token: string;
  value: string;
  usage: string;
}

export interface ShadowToken {
  name: string;
  value: string;
  usage: string;
  when: string;
}

export interface SpacingToken {
  px: number;
  tailwind: string;
  usage: string;
}

export interface InteractionToken {
  token: string;
  value: string;
  usage: string;
}

export interface FrostedGlassToken {
  token: string;
  value: string;
  usage: string;
}

export interface ComponentTokenSummary {
  component: string;
  tokens: string[];
  description: string;
}

const swatch = (scale: string, tailwind: string, value: string, note?: string): ColorSwatch => ({
  scale,
  tailwind,
  value,
  note,
});

const paletteSwatches = (
  prefix: string,
  palette: Record<string, string>,
  notes: Record<string, string> = {}
): ColorSwatch[] =>
  Object.entries(palette).map(([scale, value]) =>
    swatch(scale, `bg-${prefix}-${scale}`, value, notes[scale])
  );

const tokenRowsFromPalette = (
  category: string,
  prefix: string,
  palette: Record<string, string>,
  usage: Record<string, string> = {}
): TokenRow[] =>
  Object.entries(palette).map(([scale, value]) => ({
    category,
    name: `${prefix}-${scale}`,
    value,
    usage: usage[scale] ?? `${prefix} palette step ${scale}`,
  }));

// ─────────────────────────────────────────────
// Color Palettes — OKLCH from design-tokens.ts
// ─────────────────────────────────────────────

export const brandPalette: ColorSwatch[] = paletteSwatches("brand", primitives.colors.blue, {
  "25": "Softest brand tint",
  "50": "Subtle bg, hover tertiary",
  "100": "Badge fill",
  "200": "Info border",
  "500": "Primary CTA, focus ring",
  "600": "Hover primary",
  "700": "Active primary",
  "900": "Deep brand for high-contrast moments",
  "950": "Darkest brand extension",
});

export const bluePalette: ColorSwatch[] = paletteSwatches("blue", primitives.colors.blue, {
  "500": "Current Dubo CTA blue",
});

export const slatePalette: ColorSwatch[] = paletteSwatches("slate", primitives.colors.slate, {
  "0": "Pure white surface",
  "25": "Page background in light mode",
  "100": "Input background in light mode",
  "300": "Default border",
  "400": "Strong border",
  "600": "Muted text",
  "700": "Secondary text",
  "800": "Deep neutral surface",
  "900": "Primary text and deep surface",
  "950": "Deepest neutral extension",
});

export const graphitePalette: ColorSwatch[] = paletteSwatches(
  "graphite",
  primitives.colors.graphite,
  {
    "50": "Primary text in dark mode",
    "300": "Secondary text in dark mode",
    "400": "Interactive border in dark mode",
    "500": "Muted text in dark mode",
    "700": "Default border in dark mode",
    "800": "Card surface in dark mode",
    "900": "Page background in dark mode",
    "950": "Deep glass and overlay base",
  }
);

/** @deprecated Use slatePalette instead — coolPalette is kept only for backwards compatibility */
export const coolPalette = slatePalette;
/** @deprecated Use slatePalette instead — neutralPalette is kept only for backwards compatibility */
export const neutralPalette = slatePalette;

export const indigoPalette: ColorSwatch[] = paletteSwatches("indigo", primitives.colors.indigo);
export const cyanPalette: ColorSwatch[] = paletteSwatches("cyan", primitives.colors.cyan);
export const peachPalette: ColorSwatch[] = paletteSwatches("peach", primitives.colors.peach, {
  "50": "Warm editorial tint used for expressive secondary surfaces",
  "200": "Peach border for soft highlighted cards and panels",
  "600": "Primary peach accent for stronger UI moments",
});
export const skyPalette: ColorSwatch[] = paletteSwatches("sky", primitives.colors.sky, {
  "50": "Soft blue tint derived from the patients search hero surface",
  "200": "Sky border for calm highlighted surfaces",
  "600": "Primary sky accent for expressive blue UI moments",
});
export const tealPalette: ColorSwatch[] = paletteSwatches("teal", primitives.colors.teal);
export const limePalette: ColorSwatch[] = paletteSwatches("lime", primitives.colors.lime);
export const yellowPalette: ColorSwatch[] = paletteSwatches("yellow", primitives.colors.yellow);
export const orangePalette: ColorSwatch[] = paletteSwatches("orange", primitives.colors.orange);
export const pinkPalette: ColorSwatch[] = paletteSwatches("pink", primitives.colors.pink);
export const tomatoPalette: ColorSwatch[] = paletteSwatches("tomato", primitives.colors.tomato);

export const errorPalette: ColorSwatch[] = [
  swatch("50", "bg-error-50", primitives.colors.error[50], "Danger subtle fill"),
  swatch("200", "bg-error-200", primitives.colors.error[200], "Danger border"),
  swatch("500", "bg-error-500", primitives.colors.error[500], "Danger strong"),
  swatch("600", "bg-error-600", primitives.colors.error[600], "Destructive button"),
  swatch("800", "bg-error-800", primitives.colors.error[800], "Danger on-dark text"),
];

export const warningPalette: ColorSwatch[] = [
  swatch("50", "bg-warning-50", primitives.colors.warning[50], "Warning subtle fill"),
  swatch("200", "bg-warning-200", primitives.colors.warning[200], "Warning border"),
  swatch("500", "bg-warning-500", primitives.colors.warning[500], "Warning strong"),
  swatch("600", "bg-warning-600", primitives.colors.warning[600], "Warning text"),
  swatch("800", "bg-warning-800", primitives.colors.warning[800], "Warning on-dark text"),
];

export const successPalette: ColorSwatch[] = [
  swatch("50", "bg-success-50", primitives.colors.success[50], "Success subtle fill"),
  swatch("200", "bg-success-200", primitives.colors.success[200], "Success border"),
  swatch("500", "bg-success-500", primitives.colors.success[500], "Success strong"),
  swatch("600", "bg-success-600", primitives.colors.success[600], "Success active"),
  swatch("800", "bg-success-800", primitives.colors.success[800], "Success on-dark text"),
];

export const purplePalette: ColorSwatch[] = [
  swatch("50", "bg-purple-50", primitives.colors.purple[50], "Accent subtle fill"),
  swatch("100", "bg-purple-100", primitives.colors.purple[100], "Light accent"),
  swatch("200", "bg-purple-200", primitives.colors.purple[200], "Accent border"),
  swatch("400", "bg-purple-400", primitives.colors.purple[400], "Accent mid"),
  swatch("500", "bg-purple-500", primitives.colors.purple[500], "Accent default"),
  swatch("600", "bg-purple-600", primitives.colors.purple[600], "Accent strong"),
  swatch("800", "bg-purple-800", primitives.colors.purple[800], "Accent on-dark"),
];

// ─────────────────────────────────────────────
// Semantic Color Tokens
// ─────────────────────────────────────────────

export const semanticColorTokens: SemanticToken[] = [
  {
    token: "color-brand",
    css: "--color-brand",
    usage: "Primary brand color for CTA buttons and focus rings",
  },
  {
    token: "color-brand-hover",
    css: "--color-brand-hover",
    usage: "Brand hover state (brand-600)",
  },
  {
    token: "color-brand-active",
    css: "--color-brand-active",
    usage: "Brand active/pressed state (brand-700)",
  },
  {
    token: "color-brand-subtle",
    css: "--color-brand-subtle",
    usage: "Brand tinted background (brand-50)",
  },
  { token: "color-accent", css: "--color-accent", usage: "Secondary accent using purple-500" },
  {
    token: "color-accent-subtle",
    css: "--color-accent-subtle",
    usage: "Subtle accent background (purple-50)",
  },
  {
    token: "color-peach",
    css: "--color-peach",
    usage: "Warm secondary accent for expressive editorial surfaces",
  },
  {
    token: "color-peach-subtle",
    css: "--color-peach-subtle",
    usage: "Soft peach background for warm supporting surfaces",
  },
  {
    token: "color-peach-border",
    css: "--color-peach-border",
    usage: "Warm peach border for expressive cards and highlights",
  },
  {
    token: "color-sky",
    css: "--color-sky",
    usage: "Soft blue accent derived from the patients search hero",
  },
  {
    token: "color-sky-subtle",
    css: "--color-sky-subtle",
    usage: "Soft blue background for calm supporting surfaces",
  },
  {
    token: "color-sky-border",
    css: "--color-sky-border",
    usage: "Soft blue border for expressive panels and hero treatments",
  },
  {
    token: "color-bg-page",
    css: "--color-bg-page",
    usage: "Page-level background (slate-50 light / graphite-900 dark)",
  },
  {
    token: "color-bg-surface",
    css: "--color-bg-surface",
    usage: "Card and panel surface (slate-0 light / graphite-800 dark)",
  },
  {
    token: "color-bg-elevated",
    css: "--color-bg-elevated",
    usage: "Elevated surface for modals and popovers",
  },
  {
    token: "color-bg-subtle",
    css: "--color-bg-subtle",
    usage: "Muted list/row surface for tables, file rows and soft supporting containers",
  },
  {
    token: "color-bg-subtle-hover",
    css: "--color-bg-subtle-hover",
    usage: "Hover and selected state for muted list/row surfaces",
  },
  {
    token: "color-bg-input",
    css: "--color-bg-input",
    usage: "Input background (slate-100 light / graphite-800 dark)",
  },
  {
    token: "color-text-primary",
    css: "--color-text-primary",
    usage: "Primary text throughout the interface",
  },
  {
    token: "color-text-secondary",
    css: "--color-text-secondary",
    usage: "Secondary text, descriptions, helpers",
  },
  {
    token: "color-text-muted",
    css: "--color-text-muted",
    usage: "Muted text, placeholders, inactive icons",
  },
  {
    token: "color-text-on-brand",
    css: "--color-text-on-brand",
    usage: "Text on brand-colored backgrounds",
  },
  {
    token: "color-border",
    css: "--color-border",
    usage: "Default border for inputs, cards and dividers",
  },
  {
    token: "color-border-strong",
    css: "--color-border-strong",
    usage: "Strong border for emphasis",
  },
  {
    token: "color-border-focus",
    css: "--color-border-focus",
    usage: "Focus ring border using brand-500",
  },
  { token: "color-success", css: "--color-success", usage: "Success state (success-600)" },
  {
    token: "color-success-subtle",
    css: "--color-success-subtle",
    usage: "Success background fill (success-50)",
  },
  {
    token: "color-success-border",
    css: "--color-success-border",
    usage: "Success border (success-200)",
  },
  { token: "color-warning", css: "--color-warning", usage: "Warning state (warning-600)" },
  {
    token: "color-warning-subtle",
    css: "--color-warning-subtle",
    usage: "Warning background fill (warning-50)",
  },
  {
    token: "color-warning-border",
    css: "--color-warning-border",
    usage: "Warning border (warning-200)",
  },
  { token: "color-danger", css: "--color-danger", usage: "Danger/error state (error-600)" },
  {
    token: "color-danger-subtle",
    css: "--color-danger-subtle",
    usage: "Danger background fill (error-50)",
  },
  {
    token: "color-danger-border",
    css: "--color-danger-border",
    usage: "Danger border (error-200)",
  },
  { token: "color-info", css: "--color-info", usage: "Info subtle background (info-50)" },
  { token: "color-info-strong", css: "--color-info-strong", usage: "Info strong (info-500)" },
  {
    token: "color-on-dark",
    css: "--color-on-dark",
    usage: "Light text on dark backgrounds (slate-0)",
  },
];

// ─────────────────────────────────────────────
// Interaction / Overlay Tokens (replaces old overlayTokens)
// ─────────────────────────────────────────────

export const overlayTokens = [
  {
    token: "color-hover",
    value: semantic.colors.hover,
    usage: "Hover state overlay — slate-900 at 5% (light mode)",
  },
  {
    token: "color-pressed",
    value: semantic.colors.pressed,
    usage: "Pressed state overlay — slate-900 at 10% (light mode)",
  },
  {
    token: "color-hover-dark",
    value: semantic.colors.hoverDark,
    usage: "Hover state overlay — graphite-50 at 5% (dark mode)",
  },
  {
    token: "color-pressed-dark",
    value: semantic.colors.pressedDark,
    usage: "Pressed state overlay — graphite-50 at 21% (dark mode)",
  },
  {
    token: "color-hover-brand",
    value: semantic.colors.hoverBrand,
    usage: "Brand-tinted hover — brand-500 at 5%",
  },
  {
    token: "color-pressed-brand",
    value: semantic.colors.pressedBrand,
    usage: "Brand-tinted pressed — brand-500 at 10%",
  },
];

export const expressiveSurfaceTokens = [
  {
    token: "status-peach-subtle",
    value: "var(--status-peach-subtle-bg / border / text / icon)",
    usage: "Warm secondary recipe for editorial cards, quick notes, and soft product highlights",
  },
  {
    token: "status-sky-subtle",
    value: "var(--status-sky-subtle-bg / border / text / icon)",
    usage: "Calm blue recipe for hero panels and supporting product surfaces",
  },
  {
    token: "surface-gradient-product",
    value: "var(--surface-gradient-product-bg / border / text)",
    usage: "Canonical Dubo expressive gradient recipe for soft branded surfaces",
  },
  {
    token: "surface-gradient-sunrise",
    value: "var(--surface-gradient-sunrise-bg / border / text)",
    usage:
      "Classic Dubo sunrise gradient for welcoming flows, onboarding, and soft explanatory modals",
  },
  {
    token: "surface-gradient-warm-tint",
    value: "var(--surface-gradient-warm-tint-bg / border / text)",
    usage:
      "Classic warm editorial tint for patient groups, templates, and supportive hover surfaces",
  },
];

// ─────────────────────────────────────────────
// Typography Scale
// ─────────────────────────────────────────────

export const typographyScale: TypographyToken[] = [
  {
    token: "hero",
    utility: "text-hero",
    family: "Poppins",
    size: semantic.typography.hero.size,
    lineHeight: semantic.typography.hero.lineHeight,
    recommendedWeight: primitives.typography.fontWeight.medium,
    weightUtility: "font-medium",
    usage: "Hero titles — rarely used",
    example: "Dubo Dental",
  },
  {
    token: "heading-1",
    utility: "text-heading-1",
    family: "Poppins",
    size: semantic.typography.heading1.size,
    lineHeight: semantic.typography.heading1.lineHeight,
    recommendedWeight: primitives.typography.fontWeight.regular,
    weightUtility: "font-normal",
    usage: "Page titles",
    example: "Patient Overview",
  },
  {
    token: "heading-2",
    utility: "text-heading-2",
    family: "Poppins",
    size: semantic.typography.heading2.size,
    lineHeight: semantic.typography.heading2.lineHeight,
    recommendedWeight: primitives.typography.fontWeight.light,
    weightUtility: "font-light",
    usage: "Section titles",
    example: "Appointments",
  },
  {
    token: "heading-3",
    utility: "text-heading-3",
    family: "Poppins",
    size: semantic.typography.heading3.size,
    lineHeight: semantic.typography.heading3.lineHeight,
    recommendedWeight: primitives.typography.fontWeight.regular,
    weightUtility: "font-normal",
    usage: "Card titles and subsections",
    example: "Personal Information",
  },
  {
    token: "heading-4",
    utility: "text-heading-4",
    family: "Poppins",
    size: semantic.typography.heading4.size,
    lineHeight: semantic.typography.heading4.lineHeight,
    recommendedWeight: primitives.typography.fontWeight.regular,
    weightUtility: "font-normal",
    usage: "Compact headings",
    example: "Clinical notes",
  },
  {
    token: "body-lg",
    utility: "text-body-lg",
    family: "Open Sans",
    size: semantic.typography.bodyLg.size,
    lineHeight: semantic.typography.bodyLg.lineHeight,
    recommendedWeight: primitives.typography.fontWeight.regular,
    weightUtility: "font-normal",
    usage: "Default input, button and paragraph text",
    example: "Patient has no known allergies.",
  },
  {
    token: "body-md",
    utility: "text-body-md",
    family: "Open Sans",
    size: semantic.typography.bodyMd.size,
    lineHeight: semantic.typography.bodyMd.lineHeight,
    recommendedWeight: primitives.typography.fontWeight.regular,
    weightUtility: "font-normal",
    usage: "Labels, table headers and compact interface text",
    example: "Date of birth",
  },
  {
    token: "body-sm",
    utility: "text-body-sm",
    family: "Open Sans",
    size: semantic.typography.bodySm.size,
    lineHeight: semantic.typography.bodySm.lineHeight,
    recommendedWeight: primitives.typography.fontWeight.regular,
    weightUtility: "font-normal",
    usage: "Captions, timestamps, metadata and secondary labels",
    example: "09:30 · 45 min",
  },
];

export const fontWeightScale: FontWeightToken[] = [
  {
    token: "extra-light",
    value: primitives.typography.fontWeight.extraLight,
    css: "--font-weight-200",
    usage: "Delicate editorial text and soft hierarchy moments when 300 still feels too heavy",
  },
  {
    token: "light",
    value: primitives.typography.fontWeight.light,
    css: "--font-weight-300",
    usage: "Lighter page titles and editorial emphasis when a softer hierarchy is needed",
  },
  {
    token: "regular",
    value: primitives.typography.fontWeight.regular,
    css: "--font-weight-400",
    usage: "Default paragraphs, input text, and general reading content",
  },
  {
    token: "medium",
    value: primitives.typography.fontWeight.medium,
    css: "--font-weight-500",
    usage: "Slight emphasis for controls, inline labels, and supporting UI text",
  },
  {
    token: "semibold",
    value: primitives.typography.fontWeight.semibold,
    css: "--font-weight-600",
    usage: "Section headings, buttons, and stronger UI emphasis",
  },
  {
    token: "bold",
    value: primitives.typography.fontWeight.bold,
    css: "--font-weight-700",
    usage: "Primary labels, dense tables, and strong emphasis moments",
  },
  {
    token: "extra-bold",
    value: primitives.typography.fontWeight.extraBold,
    css: "--font-weight-800",
    usage: "Display text and high-contrast emphasis moments when 700 is not enough",
  },
];

// ─────────────────────────────────────────────
// Radius Scale — updated to match primitives.radius
// ─────────────────────────────────────────────

export const radiusScale: RadiusToken[] = [
  {
    token: "rounded-sm",
    value: primitives.radius.sm,
    usage: "Small badges and nested inner elements (6px)",
  },
  {
    token: "rounded-md",
    value: primitives.radius.md,
    usage: "Inputs, selects, table rows and small components (8px)",
  },
  { token: "rounded-lg", value: primitives.radius.lg, usage: "Cards, panels and drawers (12px)" },
  { token: "rounded-xl", value: primitives.radius.xl, usage: "Large cards and modals (16px)" },
  {
    token: "rounded-2xl",
    value: primitives.radius["2xl"],
    usage: "Large modals and featured sections (24px)",
  },
  {
    token: "rounded-3xl",
    value: primitives.radius["3xl"],
    usage: "Page-level cards and glass panels (32px)",
  },
  {
    token: "rounded-full",
    value: primitives.radius.full,
    usage: "Buttons, badges, avatars and interactive pills (9999px)",
  },
];

// ─────────────────────────────────────────────
// Shadow Scale — OKLCH values from primitives.shadow
// ─────────────────────────────────────────────

export const shadowScale: ShadowToken[] = [
  {
    name: "shadow-xs",
    value: primitives.shadow.xs,
    usage: "Minimal lift for subtle hover states",
    when: "Rarely — prefer borders",
  },
  {
    name: "shadow-sm",
    value: primitives.shadow.sm,
    usage: "Subtle elevation for inline elements and hover states",
    when: "Cards on hover, elevated inline elements",
  },
  {
    name: "shadow-md",
    value: primitives.shadow.md,
    usage: "Dropdowns, popovers and context menus",
    when: "Second-level floating elements",
  },
  {
    name: "shadow-lg",
    value: primitives.shadow.lg,
    usage: "Modals, drawers and floating panels",
    when: "Elements covering main content",
  },
];

// ─────────────────────────────────────────────
// Spacing Scale — extended to 64px
// ─────────────────────────────────────────────

export const spacingScale: SpacingToken[] = [
  {
    px: 4,
    tailwind: "gap-1 / p-1 / m-1",
    usage: "Icon padding, tight gaps between icon and label",
  },
  {
    px: 8,
    tailwind: "gap-2 / p-2 / m-2",
    usage: "Default gap between elements within a component",
  },
  { px: 12, tailwind: "gap-3 / p-3 / m-3", usage: "Button horizontal padding and form field gaps" },
  { px: 16, tailwind: "gap-4 / p-4 / m-4", usage: "Card internal padding and section spacing" },
  { px: 20, tailwind: "gap-5 / p-5 / m-5", usage: "Charting cards and dense content sections" },
  { px: 24, tailwind: "gap-6 / p-6 / m-6", usage: "Large container padding and grouped sections" },
  { px: 32, tailwind: "gap-8 / p-8 / m-8", usage: "Page rhythm and major layout spacing" },
  { px: 40, tailwind: "gap-10 / p-10 / m-10", usage: "Large section separators" },
  { px: 48, tailwind: "gap-12 / p-12 / m-12", usage: "Hero section padding" },
  { px: 64, tailwind: "gap-16 / p-16 / m-16", usage: "Maximum page-level spacing" },
];

// ─────────────────────────────────────────────
// Interaction Tokens — shared transition, disabled, focus
// ─────────────────────────────────────────────

export const interactionTokens: InteractionToken[] = [
  {
    token: "transition-fast",
    value: semantic.interaction.transitionFast,
    usage: "Fast transitions for buttons, toggles and interactive elements (200ms)",
  },
  {
    token: "transition-normal",
    value: semantic.interaction.transitionNormal,
    usage: "Standard transitions for panels, drawers and layout shifts (300ms)",
  },
  {
    token: "transition-easing",
    value: semantic.interaction.transitionEasing,
    usage: "Default easing curve — cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  },
  {
    token: "transition-easing-out",
    value: semantic.interaction.transitionEasingOut,
    usage: "Ease-out for exit animations",
  },
  {
    token: "motion-dropdown-enter-duration",
    value: semantic.interaction.dropdownEnterDuration,
    usage: "Dropdown and popover enter duration",
  },
  {
    token: "motion-dropdown-enter-easing",
    value: semantic.interaction.dropdownEnterEasing,
    usage: "Dropdown and popover enter easing curve",
  },
  {
    token: "motion-dropdown-enter-scale-from",
    value: semantic.interaction.dropdownEnterScaleFrom,
    usage: "Initial scale used by dropdown and popover enter motion",
  },
  {
    token: "motion-tooltip-enter-duration",
    value: semantic.interaction.tooltipEnterDuration,
    usage: "Tooltip enter duration",
  },
  {
    token: "motion-tooltip-enter-easing",
    value: semantic.interaction.tooltipEnterEasing,
    usage: "Tooltip enter easing curve",
  },
  {
    token: "motion-tooltip-exit-duration",
    value: semantic.interaction.tooltipExitDuration,
    usage: "Tooltip exit duration",
  },
  {
    token: "motion-tooltip-exit-easing",
    value: semantic.interaction.tooltipExitEasing,
    usage: "Tooltip exit easing curve",
  },
  {
    token: "motion-tooltip-enter-x-from",
    value: semantic.interaction.tooltipTranslateXFrom,
    usage: "Initial X offset used by tooltip motion",
  },
  {
    token: "motion-overlay-enter-duration",
    value: semantic.interaction.overlayEnterDuration,
    usage: "Overlay fade-in duration for modal surfaces",
  },
  {
    token: "motion-overlay-enter-easing",
    value: semantic.interaction.overlayEnterEasing,
    usage: "Overlay fade-in easing",
  },
  {
    token: "motion-overlay-exit-duration",
    value: semantic.interaction.overlayExitDuration,
    usage: "Overlay fade-out duration for modal surfaces",
  },
  {
    token: "motion-overlay-exit-easing",
    value: semantic.interaction.overlayExitEasing,
    usage: "Overlay fade-out easing",
  },
  {
    token: "motion-modal-enter-duration",
    value: semantic.interaction.modalEnterDuration,
    usage: "Modal panel enter duration",
  },
  {
    token: "motion-modal-enter-easing",
    value: semantic.interaction.modalEnterEasing,
    usage: "Modal panel enter easing curve",
  },
  {
    token: "motion-modal-enter-scale-from",
    value: semantic.interaction.modalEnterScaleFrom,
    usage: "Initial scale used by modal enter motion",
  },
  {
    token: "motion-modal-enter-y-from",
    value: semantic.interaction.modalEnterTranslateYFrom,
    usage: "Initial Y offset used by modal enter motion",
  },
  {
    token: "disabled-opacity",
    value: semantic.interaction.disabledOpacity,
    usage: "Opacity for disabled interactive elements (0.40)",
  },
  {
    token: "focus-ring",
    value: semantic.interaction.focusRing,
    usage: "Focus ring color — brand-500",
  },
  {
    token: "focus-ring-offset",
    value: semantic.interaction.focusRingOffset,
    usage: "Focus ring offset from element edge (2px)",
  },
];

// ─────────────────────────────────────────────
// Frosted Glass Tokens
// ─────────────────────────────────────────────

export const frostedGlassTokens: FrostedGlassToken[] = [
  {
    token: "glass-bg-light",
    value: frostedGlass.bgLight,
    usage: "Light frosted glass background — white at 72% opacity",
  },
  {
    token: "glass-bg-dark",
    value: frostedGlass.bgDark,
    usage: "Dark frosted glass background — graphite-950 at 80% opacity",
  },
  {
    token: "glass-bg-brand",
    value: frostedGlass.bgBrand,
    usage: "Brand-tinted glass background — brand-500 at 12% opacity",
  },
  {
    token: "glass-blur-sm",
    value: frostedGlass.blurSm,
    usage: "Small blur for subtle glass effect (8px)",
  },
  {
    token: "glass-blur-md",
    value: frostedGlass.blurMd,
    usage: "Medium blur for standard glass panels (16px)",
  },
  {
    token: "glass-blur-lg",
    value: frostedGlass.blurLg,
    usage: "Large blur for hero glass sections (24px)",
  },
  {
    token: "glass-border-light",
    value: frostedGlass.borderLight,
    usage: "Glass border in light mode — white at 30% opacity",
  },
  {
    token: "glass-border-dark",
    value: frostedGlass.borderDark,
    usage: "Glass border in dark mode — graphite-50 at 8% opacity",
  },
  {
    token: "glass-saturate",
    value: frostedGlass.saturate,
    usage: "Saturation boost for glass surfaces — saturate(180%)",
  },
  {
    token: "overlay-glass-bg",
    value: component.overlayGlass.bgLight,
    usage: "Dropdown/popover frosted glass background derived from the shared surface token",
  },
  {
    token: "overlay-glass-border",
    value: component.overlayGlass.borderLight,
    usage: "Dropdown/popover frosted glass border derived from the shared border token",
  },
  {
    token: "overlay-glass-blur",
    value: component.overlayGlass.blur,
    usage: "Dropdown/popover backdrop blur reusing the shared glass blur token",
  },
  {
    token: "overlay-glass-saturate",
    value: component.overlayGlass.saturate,
    usage: "Dropdown/popover saturation boost reusing the shared glass saturate token",
  },
];

// ─────────────────────────────────────────────
// Component Tokens Summary
// ─────────────────────────────────────────────

export const componentTokens: ComponentTokenSummary[] = [
  {
    component: "Button",
    tokens: [
      "btn-height-{sm|md|lg}",
      "btn-px-{sm|md|lg}",
      "btn-gap",
      "btn-radius (pill)",
      "btn-primary-bg / hover / active / text / shadow",
      "btn-secondary-bg / hover / active / text",
      "btn-outline-bg / hover / active / border / text",
      "btn-ghost-bg / hover / active / text",
      "btn-destructive-bg / hover / active / text / shadow",
      "btn-disabled-opacity",
      "btn-focus-ring / offset",
      "btn-primary-scale-hover / active",
    ],
    description:
      "Full set of button variant tokens covering primary (3D shadow + scale), secondary (opacity-based), outline, ghost and destructive variants. All sizes use primitives.sizing and pill radius.",
  },
  {
    component: "Tabs",
    tokens: [
      "height-control-{sm|md|lg}",
      "space-8 / space-3 / space-4",
      "type-label-sm-*",
      "icon-size-{md|lg}",
      "color-border / color-text-* / color-hover / color-pressed",
      "focus-ring / disabled-opacity / transition-fast",
      "primitive-indicator-height-2px",
    ],
    description:
      "Inline tab component with animated bottom indicator. Its token surface is now mostly shared: control heights, spacing, typography, interactive colors, and focus/disabled motion roles.",
  },
  {
    component: "Segment Control",
    tokens: [
      "segment-padding / segment-pill-shadow",
      "radius-control-pill / space-*",
      "type-label-sm-*",
      "color-bg-surface / color-hover / color-text-*",
      "focus-ring / transition-fast",
    ],
    description:
      "Segmented control with animated pill indicator using spring physics. Only the active-pill padding and shadow remain component-specific; the rest is shared semantic spacing, typography, color, and interaction.",
  },
  {
    component: "Drag and Drop",
    tokens: [
      "radius-scale-xl / space-2 / space-3 / space-4",
      "type-label-sm-* / type-body-sm-* / type-caption-*",
      "color-bg-surface / color-border / color-text-* / color-hover",
      "icon-size-md / focus-ring / disabled-opacity / transition-fast",
    ],
    description:
      "Sortable card stack for prioritization and queue ordering. It uses only shared surface, spacing, typography, interaction, and focus roles, with no component-specific tokens.",
  },
  {
    component: "Stats Bar",
    tokens: [
      "radius-scale-xl / size-12 / size-20 / space-1 / space-4 / space-5",
      "type-body-sm-* / type-heading-lg-* / type-caption-*",
      "color-bg-surface / color-border / color-text-*",
      "color-success / color-danger / icon-size-sm / transition-fast",
    ],
    description:
      "Dashboard-style metric row with illustrations, values, separators, and optional trend comparison. It is built entirely on shared size, spacing, typography, surface, and status tokens.",
  },
  {
    component: "Weekday Picker",
    tokens: [
      "radius-control-pill / radius-scale-lg",
      "height-control-md / height-control-lg / space-1 / space-2",
      "type-body-sm-strong-* / type-caption-*",
      "color-bg-input / color-bg-surface / color-hover / color-brand / color-text-*",
      "icon-size-md / disabled-opacity / transition-fast / shadow-sm",
    ],
    description:
      "Compact seven-day selector with optional previous/next navigation and animated selected pill. It reuses shared control, selection, spacing, typography, and motion roles with no component-specific tokens.",
  },
  {
    component: "Data Display",
    tokens: [
      "radius-scale-xl / height-control-md / height-control-lg / space-3 / space-4",
      "type-body-md-* / type-body-md-strong-*",
      "color-bg-surface / color-border / color-text-*",
    ],
    description:
      "Structured label/value list for metadata blocks and summary footers. It is built entirely from shared surface, spacing, control-height, divider, and typography roles.",
  },
  {
    component: "Empty State",
    tokens: [
      "size-25 / size-32",
      "radius-scale-3xl",
      "space-3 / space-4",
      "type-body-md-strong-* / type-body-sm-*",
      "color-bg-input / color-border / color-text-*",
    ],
    description:
      "Centered empty-state pattern for illustrations, concise copy, and optional actions. It now uses only shared scale, spacing, typography, and surface roles with no component-specific size tokens.",
  },
  {
    component: "Floating Panel",
    tokens: [
      "floating-panel-width / floating-panel-minimized-width / floating-panel-height-default / floating-panel-height-tall",
      "surface-elevated-* / radius-scale-2xl",
      "space-3 / space-4",
      "type-label-md-* / type-label-sm-* / type-body-sm-*",
      "icon-size-* / focus-ring / transition-fast",
    ],
    description:
      "Movable secondary workspace with expanded and minimized states. Surface, typography, spacing, and interaction largely come from shared roles; only width and height presets remain component-specific.",
  },
];

// ─────────────────────────────────────────────
// Design Tokens — Full 3-layer overview
// ─────────────────────────────────────────────

export const designTokens: TokenRow[] = [
  ...tokenRowsFromPalette("Primitives / Brand Blue", "brand", primitives.colors.blue, {
    "25": "Softest brand tint",
    "50": "Hover state of brand-tertiary button",
    "100": "Brand badge fill and secondary button background",
    "200": "Info border and light brand highlight",
    "300": "Mid-light brand accent",
    "400": "Brand mid-tone",
    "500": "Primary action button and focus ring",
    "600": "Hover state for primary button",
    "700": "Active state and brand-colored text",
    "800": "Deep brand for high-contrast contexts",
    "900": "Darkest brand for on-dark text",
    "950": "Darkest brand extension",
  }),
  ...tokenRowsFromPalette("Primitives / Slate", "slate", primitives.colors.slate, {
    "0": "Pure white surface",
    "25": "Page background in light mode",
    "50": "Raised light neutral",
    "100": "Input background in light mode",
    "200": "Subtle neutral border",
    "300": "Default border in light mode",
    "400": "Strong border in light mode",
    "500": "Soft text and neutral fills",
    "600": "Muted text and inactive icons",
    "700": "Secondary text",
    "800": "Deep neutral surface",
    "900": "Primary text and deep neutral surface",
    "950": "Deepest neutral extension",
  }),
  ...tokenRowsFromPalette("Primitives / Graphite", "graphite", primitives.colors.graphite, {
    "50": "Primary text in dark mode",
    "300": "Secondary text in dark mode",
    "400": "Interactive border in dark mode",
    "500": "Muted text in dark mode",
    "700": "Default border in dark mode",
    "800": "Card surface in dark mode",
    "900": "Page background in dark mode",
    "950": "Deep glass and overlay base",
  }),
  ...tokenRowsFromPalette("Primitives / Indigo", "indigo", primitives.colors.indigo),
  ...tokenRowsFromPalette("Primitives / Cyan", "cyan", primitives.colors.cyan),
  ...tokenRowsFromPalette("Primitives / Peach", "peach", primitives.colors.peach, {
    "50": "Warm editorial tint",
    "200": "Soft expressive border",
    "600": "Primary peach accent",
  }),
  ...tokenRowsFromPalette("Primitives / Sky", "sky", primitives.colors.sky, {
    "50": "Soft blue tint from the patients search hero",
    "200": "Soft blue border",
    "600": "Primary sky accent",
  }),
  ...tokenRowsFromPalette("Primitives / Teal", "teal", primitives.colors.teal),
  ...tokenRowsFromPalette("Primitives / Lime", "lime", primitives.colors.lime),
  ...tokenRowsFromPalette("Primitives / Yellow", "yellow", primitives.colors.yellow),
  ...tokenRowsFromPalette("Primitives / Orange", "orange", primitives.colors.orange),
  ...tokenRowsFromPalette("Primitives / Tomato", "tomato", primitives.colors.tomato),
  ...tokenRowsFromPalette("Primitives / Pink", "pink", primitives.colors.pink),

  // ── Layer 1: Primitives — Purple ──
  {
    category: "Primitives / Purple",
    name: "purple-50",
    value: primitives.colors.purple[50],
    usage: "Accent subtle fill",
  },
  {
    category: "Primitives / Purple",
    name: "purple-500",
    value: primitives.colors.purple[500],
    usage: "Secondary accent color",
  },
  {
    category: "Primitives / Purple",
    name: "purple-600",
    value: primitives.colors.purple[600],
    usage: "Accent strong",
  },

  // ── Layer 1: Primitives — Status ──
  {
    category: "Primitives / Success",
    name: "success-50",
    value: primitives.colors.success[50],
    usage: "Success subtle background",
  },
  {
    category: "Primitives / Success",
    name: "success-200",
    value: primitives.colors.success[200],
    usage: "Success border",
  },
  {
    category: "Primitives / Success",
    name: "success-600",
    value: primitives.colors.success[600],
    usage: "Success active state",
  },
  {
    category: "Primitives / Warning",
    name: "warning-50",
    value: primitives.colors.warning[50],
    usage: "Warning subtle background",
  },
  {
    category: "Primitives / Warning",
    name: "warning-200",
    value: primitives.colors.warning[200],
    usage: "Warning border",
  },
  {
    category: "Primitives / Warning",
    name: "warning-600",
    value: primitives.colors.warning[600],
    usage: "Warning text",
  },
  {
    category: "Primitives / Error",
    name: "error-50",
    value: primitives.colors.error[50],
    usage: "Danger subtle background",
  },
  {
    category: "Primitives / Error",
    name: "error-200",
    value: primitives.colors.error[200],
    usage: "Danger border",
  },
  {
    category: "Primitives / Error",
    name: "error-600",
    value: primitives.colors.error[600],
    usage: "Destructive button and danger text",
  },

  // ── Layer 2: Semantic ──
  {
    category: "Semantic / Color",
    name: "color-brand",
    value: "var(--color-brand)",
    usage: "Primary brand — adapts to mode",
  },
  {
    category: "Semantic / Color",
    name: "color-brand-hover",
    value: "var(--color-brand-hover)",
    usage: "Brand hover state",
  },
  {
    category: "Semantic / Color",
    name: "color-brand-subtle",
    value: "var(--color-brand-subtle)",
    usage: "Brand tinted background",
  },
  {
    category: "Semantic / Color",
    name: "color-peach",
    value: "var(--color-peach)",
    usage: "Warm secondary accent",
  },
  {
    category: "Semantic / Color",
    name: "color-peach-subtle",
    value: "var(--color-peach-subtle)",
    usage: "Warm secondary surface tint",
  },
  {
    category: "Semantic / Color",
    name: "color-peach-border",
    value: "var(--color-peach-border)",
    usage: "Warm secondary border",
  },
  {
    category: "Semantic / Color",
    name: "color-sky",
    value: "var(--color-sky)",
    usage: "Soft blue secondary accent",
  },
  {
    category: "Semantic / Color",
    name: "color-sky-subtle",
    value: "var(--color-sky-subtle)",
    usage: "Soft blue supporting surface tint",
  },
  {
    category: "Semantic / Color",
    name: "color-sky-border",
    value: "var(--color-sky-border)",
    usage: "Soft blue supporting border",
  },
  {
    category: "Semantic / Color",
    name: "color-bg-page",
    value: "var(--color-bg-page)",
    usage: "Primary app canvas shared with homepage and migrated pages",
  },
  {
    category: "Semantic / Color",
    name: "color-bg-surface",
    value: "var(--color-bg-surface)",
    usage: "Card surface — adapts to mode",
  },
  {
    category: "Semantic / Color",
    name: "color-bg-subtle",
    value: "var(--color-bg-subtle)",
    usage: "Muted row/list surface — adapts to mode",
  },
  {
    category: "Semantic / Color",
    name: "color-bg-subtle-hover",
    value: "var(--color-bg-subtle-hover)",
    usage: "Muted row/list hover surface — adapts to mode",
  },
  {
    category: "Semantic / Color",
    name: "color-bg-input",
    value: "var(--color-bg-input)",
    usage: "Input background — adapts to mode",
  },
  {
    category: "Semantic / Color",
    name: "color-text-primary",
    value: "var(--color-text-primary)",
    usage: "Primary text — adapts to mode",
  },
  {
    category: "Semantic / Color",
    name: "color-text-secondary",
    value: "var(--color-text-secondary)",
    usage: "Secondary text and descriptions",
  },
  {
    category: "Semantic / Color",
    name: "color-text-muted",
    value: "var(--color-text-muted)",
    usage: "Muted text, placeholders",
  },
  {
    category: "Semantic / Color",
    name: "color-border",
    value: "var(--color-border)",
    usage: "Default border — adapts to mode",
  },
  {
    category: "Semantic / Color",
    name: "color-border-strong",
    value: "var(--color-border-strong)",
    usage: "Strong border — adapts to mode",
  },
  {
    category: "Semantic / Interaction",
    name: "color-hover",
    value: "var(--color-hover)",
    usage: "Hover overlay — adapts to mode",
  },
  {
    category: "Semantic / Interaction",
    name: "color-pressed",
    value: "var(--color-pressed)",
    usage: "Pressed overlay — adapts to mode",
  },
  {
    category: "Semantic / Interaction",
    name: "color-hover-brand",
    value: "var(--color-hover-brand)",
    usage: "Brand-tinted hover overlay",
  },
  {
    category: "Semantic / Interaction",
    name: "color-pressed-brand",
    value: "var(--color-pressed-brand)",
    usage: "Brand-tinted pressed overlay",
  },
  {
    category: "Semantic / Recipe",
    name: "status-peach-subtle-*",
    value: "var(--status-peach-subtle-*)",
    usage: "Warm secondary recipe for expressive product widgets",
  },
  {
    category: "Semantic / Recipe",
    name: "status-sky-subtle-*",
    value: "var(--status-sky-subtle-*)",
    usage: "Calm blue recipe for hero panels and supporting surfaces",
  },
  {
    category: "Semantic / Surface",
    name: "surface-gradient-product-*",
    value: "var(--surface-gradient-product-*)",
    usage: "Canonical Dubo expressive gradient background, border, and text recipe",
  },
  {
    category: "Semantic / Surface",
    name: "surface-gradient-sunrise-*",
    value: "var(--surface-gradient-sunrise-*)",
    usage: "Classic Dubo sunrise gradient background, border, and text recipe",
  },
  {
    category: "Semantic / Surface",
    name: "surface-gradient-warm-tint-*",
    value: "var(--surface-gradient-warm-tint-*)",
    usage: "Classic warm tint gradient background, border, and text recipe",
  },

  // ── Layer 2: Semantic — Typography ──
  {
    category: "Typography",
    name: "text-hero / font-medium",
    value: "Poppins / 32px / 1.25 / recommended 500",
    usage: "Hero titles",
  },
  {
    category: "Typography",
    name: "text-heading-1 / font-normal",
    value: "Poppins / 24px / 1.25 / recommended 400",
    usage: "Page titles",
  },
  {
    category: "Typography",
    name: "text-heading-2 / font-light",
    value: "Poppins / 20px / 1.25 / recommended 300",
    usage: "Section titles",
  },
  {
    category: "Typography",
    name: "text-heading-3 / font-normal",
    value: "Poppins / 18px / 1.333333 / recommended 400",
    usage: "Card titles and subsections",
  },
  {
    category: "Typography",
    name: "text-heading-4 / font-normal",
    value: "Poppins / 16px / 1.25 / recommended 400",
    usage: "Compact headings",
  },
  {
    category: "Typography",
    name: "text-body-lg / font-normal",
    value: "Open Sans / 16px / 1.5 / recommended 400",
    usage: "Default inputs, buttons and paragraphs",
  },
  {
    category: "Typography",
    name: "text-body-md / font-normal",
    value: "Open Sans / 14px / 1.5 / recommended 400",
    usage: "Labels, table headers and compact interface text",
  },
  {
    category: "Typography",
    name: "text-body-sm / font-normal",
    value: "Open Sans / 12px / 1.5 / recommended 400",
    usage: "Captions, timestamps, metadata and secondary labels",
  },
  {
    category: "Typography / Weight",
    name: "font-weight-200",
    value: primitives.typography.fontWeight.extraLight,
    usage: "Extra-light weight token for delicate editorial typography",
  },
  {
    category: "Typography / Weight",
    name: "font-weight-300",
    value: primitives.typography.fontWeight.light,
    usage: "Light weight token for softer headings and editorial moments",
  },
  {
    category: "Typography / Weight",
    name: "font-weight-400",
    value: primitives.typography.fontWeight.regular,
    usage: "Regular weight token for default body copy",
  },
  {
    category: "Typography / Weight",
    name: "font-weight-500",
    value: primitives.typography.fontWeight.medium,
    usage: "Medium weight token for moderate UI emphasis",
  },
  {
    category: "Typography / Weight",
    name: "font-weight-600",
    value: primitives.typography.fontWeight.semibold,
    usage: "Semibold weight token for headings and actions",
  },
  {
    category: "Typography / Weight",
    name: "font-weight-700",
    value: primitives.typography.fontWeight.bold,
    usage: "Bold weight token for labels and strong emphasis",
  },
  {
    category: "Typography / Weight",
    name: "font-weight-800",
    value: primitives.typography.fontWeight.extraBold,
    usage: "Extra-bold weight token for display typography and strong accents",
  },

  // ── Layer 2: Semantic — Radius ──
  {
    category: "Border Radius",
    name: "rounded-sm",
    value: primitives.radius.sm,
    usage: "Small badges and nested elements",
  },
  {
    category: "Border Radius",
    name: "rounded-md",
    value: primitives.radius.md,
    usage: "Inputs, selects and table rows",
  },
  {
    category: "Border Radius",
    name: "rounded-lg",
    value: primitives.radius.lg,
    usage: "Cards, panels and drawers",
  },
  {
    category: "Border Radius",
    name: "rounded-xl",
    value: primitives.radius.xl,
    usage: "Large cards and modals",
  },
  {
    category: "Border Radius",
    name: "rounded-2xl",
    value: primitives.radius["2xl"],
    usage: "Large modals and featured sections",
  },
  {
    category: "Border Radius",
    name: "rounded-3xl",
    value: primitives.radius["3xl"],
    usage: "Page-level cards and glass panels",
  },
  {
    category: "Border Radius",
    name: "rounded-full",
    value: primitives.radius.full,
    usage: "Buttons, badges and avatars",
  },

  // ── Layer 2: Semantic — Shadow ──
  {
    category: "Shadow",
    name: "shadow-xs",
    value: primitives.shadow.xs,
    usage: "Minimal lift for hover states",
  },
  {
    category: "Shadow",
    name: "shadow-sm",
    value: primitives.shadow.sm,
    usage: "Subtle elevation for inline elements",
  },
  {
    category: "Shadow",
    name: "shadow-md",
    value: primitives.shadow.md,
    usage: "Dropdowns and popovers",
  },
  {
    category: "Shadow",
    name: "shadow-lg",
    value: primitives.shadow.lg,
    usage: "Modals and drawers",
  },

  // ── Layer 2: Semantic — Spacing ──
  {
    category: "Spacing",
    name: "gap-1 / p-1",
    value: primitives.spacing[1],
    usage: "Tight internal gaps and icon + label",
  },
  {
    category: "Spacing",
    name: "gap-2 / p-2",
    value: primitives.spacing[2],
    usage: "Default gap between elements",
  },
  {
    category: "Spacing",
    name: "gap-3 / p-3",
    value: primitives.spacing[3],
    usage: "Button horizontal padding and form fields",
  },
  {
    category: "Spacing",
    name: "gap-4 / p-4",
    value: primitives.spacing[4],
    usage: "Card padding and section spacing",
  },
  {
    category: "Spacing",
    name: "gap-5 / p-5",
    value: primitives.spacing[5],
    usage: "Charting cards and dense sections",
  },
  {
    category: "Spacing",
    name: "gap-6 / p-6",
    value: primitives.spacing[6],
    usage: "Large containers and grouped sections",
  },
  {
    category: "Spacing",
    name: "gap-8 / p-8",
    value: primitives.spacing[8],
    usage: "Page-level spacing",
  },
  {
    category: "Spacing",
    name: "gap-10 / p-10",
    value: primitives.spacing[10],
    usage: "Large section separators",
  },
  {
    category: "Spacing",
    name: "gap-12 / p-12",
    value: primitives.spacing[12],
    usage: "Hero section padding",
  },
  {
    category: "Spacing",
    name: "gap-16 / p-16",
    value: primitives.spacing[16],
    usage: "Maximum page-level spacing",
  },

  // ── Layer 3: Component — Button (summary) ──
  {
    category: "Component / Button",
    name: "btn-primary-bg",
    value: "var(--btn-primary-bg)",
    usage: "Primary CTA background — brand-500",
  },
  {
    category: "Component / Button",
    name: "btn-primary-shadow",
    value: component.button.primaryShadow,
    usage: "3D inset shadow for primary button",
  },
  {
    category: "Component / Button",
    name: "btn-secondary-bg",
    value: "var(--btn-secondary-bg)",
    usage: "Secondary bg — graphite-50 at 5% opacity in dark mode",
  },
  {
    category: "Component / Button",
    name: "btn-outline-border",
    value: "var(--btn-outline-border)",
    usage: "Outline button border — adapts to mode",
  },
  {
    category: "Component / Button",
    name: "btn-ghost-text",
    value: "var(--btn-ghost-text)",
    usage: "Ghost button text — adapts to mode",
  },
  {
    category: "Component / Button",
    name: "btn-destructive-bg",
    value: "var(--btn-destructive-bg)",
    usage: "Destructive button background — error-600",
  },
  {
    category: "Component / Button",
    name: "radius-control-pill",
    value: semantic.controls.radius.pill,
    usage: "Shared pill radius reused by buttons",
  },

  // ── Layer 3: Component — Tabs (summary) ──
  {
    category: "Component / Tabs",
    name: "color-border",
    value: "var(--color-border)",
    usage: "Shared divider color for the tablist baseline",
  },
  {
    category: "Component / Tabs",
    name: "primitive-indicator-height",
    value: "2px",
    usage: "Bottom active indicator height",
  },
  {
    category: "Component / Tabs",
    name: "space-8",
    value: primitives.spacing[8],
    usage: "32px gap between tab items",
  },

  // ── Layer 3: Component — Segment (summary) ──
  {
    category: "Component / Segment",
    name: "segment-pill-shadow",
    value: component.segment.pillShadow,
    usage: "3D pill shadow for active segment",
  },
  {
    category: "Component / Segment",
    name: "segment-padding",
    value: component.segment.padding,
    usage: "Inset padding that creates the segmented track gutter",
  },
  {
    category: "Component / Segment",
    name: "radius-control-pill",
    value: semantic.controls.radius.pill,
    usage: "Shared pill radius reused by the control and active thumb",
  },
];
