# Tokens and visual foundations

## Color

- Page canvas: `var(--color-bg-page)`.
- Primary surface: `var(--color-bg-surface)`.
- Subtle surface: `var(--color-bg-subtle)`.
- Primary text: `var(--color-text-primary)`.
- Secondary text: `var(--color-text-secondary)`.
- Borders: `var(--color-border)` and `var(--color-border-strong)`.
- Brand action: `var(--color-brand)` with the package's hover and active states.
- Semantic states: use success, warning, danger, and info recipes; do not swap meanings.

Never use large saturated brand backgrounds for operational content. Brand blue is sparse and
action-oriented. Purple is a secondary brand accent, not the primary CTA color.

## Typography

- `text-hero`: rare product moments only.
- `text-heading-1`: page title.
- `text-heading-2`: major page section.
- `text-heading-3`: card or panel section.
- `text-heading-4`: compact section heading.
- `text-body-lg`: inputs and normal reading text.
- `text-body-md`: labels, tables, buttons, and compact UI.
- `text-body-sm`: captions, metadata, helper text, and timestamps.

Headings use Poppins; body roles use Open Sans. Do not introduce arbitrary font sizes, negative
tracking, or viewport-scaled typography.

## Spacing

Use the 4px scale. Common values are 8, 12, 16, 24, 32, 48, and 64px.

- Dense component internals: 8–16px.
- Card and panel padding: normally 24px.
- Major page sections: 24–32px.
- Page-level breathing room: 48–64px only where appropriate.

## Shape and elevation

- Buttons, chips, badges, and segmented controls use pill radii.
- Inputs use the shared rounded field recipe.
- Cards and panels use controlled 16–24px radii.
- Prefer borders, tonal surfaces, and spacing before shadows.
- Use stronger shadows only for popovers, drawers, modals, and floating panels.

## Dark mode

`DuboProvider` manages the `.dark` class. Never create a second theme system or hardcode dark-mode
colors in component markup.
