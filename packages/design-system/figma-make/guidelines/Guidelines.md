# Dubo Design System — Figma Make Guidelines

## Product character

Dubo is operational software for dental clinics. Interfaces must feel calm, clinical, precise,
trustworthy, and fast to scan. Build a professional workspace, not a marketing page.

- Keep information dense enough for repeated daily work without visual noise.
- Use neutral page backgrounds and white or subtle surfaces.
- Reserve Dubo blue for the primary action, focus, selection, and active navigation.
- Use semantic status colors only for their intended meaning.
- Prefer stable grids, tables, lists, drawers, and compact panels.
- Default copy is PT-PT. Allow longer EN and ES translations without overlap.

## Mandatory reading order

Before writing code, read:

1. `setup.md` for package imports, provider setup, and runtime rules.
2. `tokens.md` for color, typography, spacing, radius, and elevation.
3. `components/overview.md` to select an existing component.
4. The relevant category guideline before using a component.
5. `composition/layout.md` before combining components into a page.

## Non-negotiable rules

- Always prefer `dubo-design-system` components over raw HTML controls.
- Never recreate an existing component locally.
- Never use product data, permissions, fetching, or business rules inside design-system components.
- Never invent token values or hardcode colors when a semantic token exists.
- Use one visually dominant primary action per visible area.
- Every icon-only action must have an accessible label and tooltip.
- Destructive actions require explicit confirmation.
- Clinical, financial, authentication, and patient-data states must never be visually ambiguous.

## Package

```tsx
import { Button, Card, DuboProvider } from "dubo-design-system";
import "dubo-design-system/styles/figma-make.css";
```

The package supports the React 18 runtime used by Figma Make and also React 19 in production.
