# Dubo Design System

The public source for Dubo's design tokens, React primitives, documentation site and Storybook.
It is designed for calm, precise and highly scannable dental-clinic software.

## Repository structure

- `packages/design-system` — executable tokens, generated theme CSS, React components and shared utilities.
- `apps/dubo-design-system` — documentation, examples and Storybook stories.
- `DESIGN.md` — the human- and tool-readable visual language.

## Requirements

- Node.js 22 or newer
- pnpm 10.34.5

## Local development

```bash
pnpm install
pnpm dev
```

The documentation app runs at `http://localhost:3010`.

To run Storybook instead:

```bash
pnpm storybook
```

Storybook runs at `http://localhost:6008`.

## Validation

```bash
pnpm check
```

This runs linting, TypeScript checks, package tests, design-system integrity checks and a static
Storybook build.

## Package status

The source package is `@dubo/design-system-shared`. It is currently distributed with Dubo's
applications and is not published to npm. The `private` package flag prevents accidental registry
publication.

## Licensing

This repository is publicly visible for transparency and design-system reference. No licence is
granted to copy, modify, redistribute or use the code commercially. Copyright © 2026 Dubo. All
rights reserved.
