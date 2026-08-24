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

The installable package is `dubo-design-system`. It supports React 18.2 and React 19, ships a
complete precompiled stylesheet, and includes a Vite + React 18 verification flow for Figma Make.

```bash
npm install dubo-design-system
```

```tsx
import { Button, DuboProvider } from "dubo-design-system";
import "dubo-design-system/styles/figma-make.css";
```

Prepared Make-kit guidelines live in `packages/design-system/figma-make/guidelines`.

The compatibility contract follows Figma's official requirements for
[React 18 and Vite packages](https://developers.figma.com/docs/code/bring-your-design-system-package/).

## Licensing

This repository is publicly visible for transparency and design-system reference. No licence is
granted to copy, modify, redistribute or use the code commercially. Copyright © 2026 Dubo. All
rights reserved.
