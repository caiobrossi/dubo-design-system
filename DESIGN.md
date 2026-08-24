---
version: alpha
name: Dubo Design System
description: Premium cloud-native dental clinic management UI for Portugal. Quiet, precise, trustworthy, and fast to scan.
colors:
  primary: "#3651E5"
  primary-hover: "#2840CD"
  primary-active: "#1D4ED8"
  accent: "#852BE4"
  neutral: "#F5F7FB"
  surface: "#FFFFFF"
  surface-subtle: "#FAFAFA"
  text-primary: "#404040"
  text-secondary: "#737373"
  text-muted: "#A3A3A3"
  border: "#E5E5E5"
  border-strong: "#D4D4D4"
  success: "#166534"
  success-subtle: "#F0FDF4"
  warning: "#713F12"
  warning-subtle: "#FEFCE8"
  danger: "#991B1B"
  danger-subtle: "#FEF2F2"
  peach: "#D8924A"
  peach-subtle: "#FFF4E8"
  sky: "#4E97D8"
  sky-subtle: "#EEF6FF"
typography:
  hero:
    fontFamily: Poppins
    fontSize: 32px
    recommendedFontWeight: 500
    lineHeight: 1.25
    letterSpacing: 0em
    utility: text-hero
  heading-1:
    fontFamily: Poppins
    fontSize: 24px
    recommendedFontWeight: 400
    lineHeight: 1.25
    letterSpacing: 0em
    utility: text-heading-1
  heading-2:
    fontFamily: Poppins
    fontSize: 20px
    recommendedFontWeight: 300
    lineHeight: 1.25
    letterSpacing: 0em
    utility: text-heading-2
  heading-3:
    fontFamily: Poppins
    fontSize: 18px
    recommendedFontWeight: 400
    lineHeight: 1.333333
    letterSpacing: 0em
    utility: text-heading-3
  heading-4:
    fontFamily: Poppins
    fontSize: 16px
    recommendedFontWeight: 400
    lineHeight: 1.25
    letterSpacing: 0em
    utility: text-heading-4
  body-lg:
    fontFamily: Open Sans
    fontSize: 16px
    recommendedFontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
    utility: text-body-lg
  body-md:
    fontFamily: Open Sans
    fontSize: 14px
    recommendedFontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
    utility: text-body-md
  body-sm:
    fontFamily: Open Sans
    fontSize: 12px
    recommendedFontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
    utility: text-body-sm
  monospace:
    fontFamily: JetBrains Mono
    utility: font-dubo-mono
rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  2xl: 24px
  3xl: 32px
  full: 9999px
spacing:
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  5: 20px
  6: 24px
  8: 32px
  10: 40px
  12: 48px
  16: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: 16px
    height: 40px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.surface}"
    rounded: "{rounded.full}"
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.surface}"
    rounded: "{rounded.full}"
  button-secondary:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: 16px
    height: 40px
  button-danger:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: 16px
    height: 40px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.2xl}"
    padding: 8px
    height: 40px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.2xl}"
    padding: 24px
  card-muted:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.2xl}"
    padding: 24px
  page-background:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.text-primary}"
  divider:
    backgroundColor: "{colors.border}"
    width: 1px
    height: 1px
  divider-strong:
    backgroundColor: "{colors.border-strong}"
    width: 1px
    height: 1px
  placeholder:
    backgroundColor: "{colors.surface}"
    typography: "{typography.body-lg}"
  muted-swatch:
    backgroundColor: "{colors.text-muted}"
    width: 16px
    height: 16px
  chip:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: 12px
  chip-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: 12px
  panel-peach:
    backgroundColor: "{colors.peach-subtle}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.2xl}"
    padding: 24px
  peach-swatch:
    backgroundColor: "{colors.peach}"
    width: 16px
    height: 16px
  panel-sky:
    backgroundColor: "{colors.sky-subtle}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.2xl}"
    padding: 24px
  sky-swatch:
    backgroundColor: "{colors.sky}"
    width: 16px
    height: 16px
  status-success:
    backgroundColor: "{colors.success-subtle}"
    textColor: "{colors.success}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: 8px
  status-warning:
    backgroundColor: "{colors.warning-subtle}"
    textColor: "{colors.warning}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: 8px
  status-danger:
    backgroundColor: "{colors.danger-subtle}"
    textColor: "{colors.danger}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.full}"
    padding: 8px
---

## Overview

Dubo is a premium operational product for dental clinics. The interface should feel calm, clinical, precise, and modern: more like an excellent practice management cockpit than a marketing website.

The product is used repeatedly throughout the day by clinical and administrative teams. Screens should be dense enough for scanning, but never visually noisy. Prioritize fast recognition, clear hierarchy, stable controls, and trustworthy medical-adjacent calm. The emotional goal is: "I know where I am, I know what needs attention, and I trust this system with patient data."

Default product copy is PT-PT. UI structure must support i18n for PT, EN, and ES, with PT-PT as the primary market voice.

The canonical implementation lives in `packages/design-system`. Product-specific composition and business behavior stay in `src`. Documentation and demos live in `apps/dubo-design-system`.

## Colors

The primary brand color is Dubo blue `#3651E5`, with hover `#2840CD`. Use it for primary actions, focus rings, selected navigation, and the most important interaction on a screen. Do not flood dashboards with brand blue.

The visual base is neutral and work-focused: light page backgrounds, white surfaces, neutral text, thin borders, and restrained hover layers. Clinical data must remain legible before it is expressive.

Purple is the brand accent and logo color. Use it sparingly for secondary branded moments, product highlights, or cross-feature emphasis. It should not compete with the primary action color.

Status colors are semantic: success for completed/healthy states, warning for attention, danger for destructive or clinical-risk states. Status colors should usually appear in subtle fills with strong readable text rather than large saturated blocks.

Peach and sky are expressive support families. Use them for soft editorial surfaces, onboarding, patient-group highlights, or calm product panels. They should support the workflow, not decorate it.

The design system source uses OKLCH tokens for perceptual consistency. This `DESIGN.md` front matter uses hex tokens because the current Google DESIGN.md alpha schema validates color tokens as sRGB hex.

## Typography

Dubo uses Poppins for Hero and H1–H4, and Open Sans for all body text. The scale defines family, size and line height; weight is always selected separately with a font-weight utility. Caption reuses Body Small, while labels and table headers reuse Body Medium at weight 400.

- `hero` is rare and reserved for hero-level product moments.
- `heading-1` is used for page titles; `heading-2`, `heading-3`, and `heading-4` carry section and card hierarchy.
- `body-lg` is the default for inputs and normal reading text.
- `body-md` is used by labels, table headers, buttons, and compact interface text.
- `body-sm` is also the caption role and carries timestamps, metadata, helper text, and dense secondary text.
- This file documents the system; executable values live in `packages/design-system/src/design-tokens.ts`.
- Labels and table headers are semantic uses of `body-md` at weight 400, not separate size or weight tokens.

Letter spacing is `0em` across the app. Do not introduce negative tracking or viewport-scaled typography. Keep text sizes stable and make layout solve responsiveness.

## Layout

Dubo layouts should optimize repeated operational work. Prefer structured grids, tables, lists, sidebars, drawers, and compact panels over large editorial sections.

Use the 4px spacing base with common steps of 8, 12, 16, 24, 32, 48, and 64px. Dense components should use 8-16px internal rhythm. Major page sections usually use 24-32px spacing. Reserve 48-64px spacing for page-level breathing room, onboarding, or full-page product flows.

The main app uses a fixed side navigation width of 240px and a collapsed width of 80px. Full-page clinical tools can opt out of the normal sidebar margin when they need maximum workspace.

Cards and panels are not marketing containers. Use them for repeated items, grouped operational data, modals, and genuinely framed tools. Avoid putting cards inside cards.

## Elevation & Depth

Hierarchy is mostly conveyed through tonal surfaces, borders, spacing, and typography. Shadows are restrained:

- `shadow-xs` and `shadow-sm` are for subtle hover or inline lift.
- `shadow-md` is for dropdowns, popovers, and context menus.
- `shadow-lg` is for drawers, modals, and floating panels.

Primary buttons use a small inset/outer shadow recipe to feel tactile. Cards are normally border-first and shadowless. Heavy depth should be reserved for elements that physically cover or detach from the main workspace.

Glass/frosted surfaces exist in the token system for overlays and special panels. Use them intentionally and keep contrast readable.

## Shapes

The Dubo shape language is soft but controlled. It is friendlier than a hospital EMR and more disciplined than consumer wellness software.

Use pill radius for buttons, badges, avatars, segmented controls, filter chips, and small selection controls. Inputs use a large 24px radius in the current shared component system. Cards and surfaces usually use 16-24px radius depending on density and prominence.

Avoid mixing very sharp and very round shapes in the same local component group. If a component is operational and dense, prefer 8-16px. If a component is a primary action or chip-like selector, prefer pill radius.

## Components

Buttons are tactile and compact. The primary button uses brand blue, white text, pill radius, 40px default height, and a subtle 3D shadow. Use only one visually dominant primary action per area. Secondary, outline, and ghost buttons should stay quiet.

Inputs are clear, rounded, and stable. Standard inputs are 40px high; floating-label inputs are 56px. Support left/right icons, help text, clear buttons, errors, and disabled states without resizing the field unexpectedly.

Cards use white or subtle neutral surfaces, thin borders, 24px padding, and restrained radius. Interactive cards may lift slightly or reveal a soft product gradient on hover, but data cards should stay calm.

Tables and dense lists should prioritize scanning: stable row heights, clear dividers, muted helper text, and obvious selected/hover states. Avoid decorative backgrounds behind dense clinical or financial data.

Tabs and segmented controls are preferred for mode switching. Use underline tabs for page-level navigation and segmented controls for local view modes.

Badges and chips should use semantic color recipes. Use soft backgrounds for status, filters, counts, and categories. Strong filled statuses are reserved for high-emphasis states.

Icons should come from the shared icon layer, backed by Lucide where available. Use icons in tool buttons and action buttons when a familiar symbol exists, with accessible labels and tooltips for icon-only actions.

## Do's and Don'ts

- Do reuse shared primitives from `packages/design-system` for visual components.
- Do keep product-specific state, permissions, routing, and API calls in `src`.
- Do use `@dubo-design/*` imports from the product app for shared components.
- Do preserve PT-PT copy quality and allow longer translations to fit without overlap.
- Do make dashboards dense, calm, and scannable.
- Do reserve brand blue for primary actions, selected states, and focus.
- Do use status colors semantically and with WCAG-conscious contrast.
- Do prefer borders and tonal layers before adding shadows.
- Don't create duplicate design system components inside `src` or `apps/dubo-design-system`.
- Don't build landing-page-style hero layouts for app screens.
- Don't use decorative gradients, blobs, or oversized marketing cards in operational tools.
- Don't introduce negative letter spacing or viewport-based font scaling.
- Don't make clinical, billing, auth, or patient-data workflows visually ambiguous.
- Don't put business logic into shared design system primitives.
