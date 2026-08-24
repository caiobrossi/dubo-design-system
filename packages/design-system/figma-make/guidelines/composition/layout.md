# Composition and responsive layout

## Operational page recipe

1. Use `SideNavigation` when the prototype represents the full Dubo product shell.
2. Add `PageHeader` with one clear title and the primary page action.
3. Select a `PageLayout` ratio based on information hierarchy.
4. Place dense data in `Table`/`DataTable`; place grouped tools in `LayoutCard`.
5. Use drawers, popovers, and dialogs for secondary work instead of expanding the page endlessly.

## Responsive behavior

- Design desktop and mobile behavior deliberately; do not merely shrink desktop.
- Preserve 40px interactive control height unless a component defines another supported size.
- Allow labels and translated copy to wrap without overlapping controls.
- Convert dense rows to `DataCards` when a table no longer scans well.
- Keep the primary action reachable and preserve keyboard/focus order.
- Never hide clinically or financially important state only behind hover.

## Surfaces

- Page background is neutral.
- Primary work surfaces are white or the shared subtle surface.
- Borders and spacing establish hierarchy before shadows.
- Reserve elevation for content that physically floats above another layer.
- Expressive peach/sky surfaces support onboarding or editorial moments; they do not decorate dense
  clinical or financial workflows.
