# dubo-design-system

Design tokens and accessible React components for calm, precise clinical software. The package is
compatible with React 18.2 and React 19 and is verified in Vite for Figma Make.

## Install

```bash
npm install dubo-design-system
```

## Figma Make and standalone Vite apps

Import the complete precompiled stylesheet once and wrap the app root:

```tsx
import { DuboProvider } from "dubo-design-system";
import "dubo-design-system/styles/figma-make.css";

export function App() {
  return <DuboProvider>{/* application */}</DuboProvider>;
}
```

No Tailwind or PostCSS configuration is required in the consuming project.

## Components

Import from the root API:

```tsx
import { Button, Card, Input } from "dubo-design-system";
```

Or use component-specific entrypoints:

```tsx
import { Button } from "dubo-design-system/components/ui/button";
```

Use `dubo-design-system/styles/theme.css` only when the consuming app already compiles the package's
Tailwind utilities. Figma Make should always use `styles/figma-make.css`.

## Make-kit guidelines

Curated guidelines are included under `figma-make/guidelines`. Copy them into the Make kit's
`guidelines/` folder after adding the npm package.

## Licensing

No licence is granted to copy, modify, redistribute or use this package commercially. Copyright
© 2026 Dubo. All rights reserved.
