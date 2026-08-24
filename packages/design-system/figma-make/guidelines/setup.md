# Project setup

## Required stylesheet

Import the complete precompiled stylesheet exactly once in the application entrypoint:

```tsx
import "dubo-design-system/styles/figma-make.css";
```

Do not add Tailwind, PostCSS, `@source`, or custom token generation for this package. The stylesheet
already contains the reset, utilities used by the components, light/dark variables, typography
roles, and component recipes.

## Required provider

Wrap the application root with `DuboProvider`:

```tsx
import { DuboProvider } from "dubo-design-system";

export function App() {
  return <DuboProvider>{/* generated application */}</DuboProvider>;
}
```

`DuboProvider` configures class-based themes and accessible fallback labels. Pass translated labels
when the prototype needs non-English embedded control names.

## Vite configuration

The standard Figma Make Vite configuration is enough:

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
});
```

Do not alias React, bundle another React copy, or add Next.js-specific plugins.

## Imports

Prefer root imports for generated Make code:

```tsx
import { Button, Card, Input } from "dubo-design-system";
```

Component-specific imports are supported when precise entrypoints are useful:

```tsx
import { Button } from "dubo-design-system/components/ui/button";
```

Icons are available through the `Icons` namespace. Verify a name before using it:

```tsx
import { Icons } from "dubo-design-system";

<Icons.Plus aria-hidden="true" />;
```
