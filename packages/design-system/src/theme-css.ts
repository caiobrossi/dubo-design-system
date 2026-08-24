import { generateDarkModeVars, generateLightModeVars } from "./design-tokens";
import { headingTypographyRoles, typographyRoleNames } from "./typography-roles";

function serializeDeclarations(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");
}

function serializeRule(selector: string, vars: Record<string, string>): string {
  return `${selector} {\n${serializeDeclarations(vars)}\n}`;
}

function generateTailwindTheme(): string {
  const declarations = [
    "  --font-dubo-heading: var(--font-family-heading);",
    "  --font-dubo-body: var(--font-family-body);",
    "  --font-dubo-mono: var(--font-family-mono);",
  ];

  return `@theme inline {\n${declarations.join("\n")}\n}`;
}

function generateTypographyUtilities(): string {
  return typographyRoleNames
    .map((role) => {
      const family = headingTypographyRoles.has(role) ? "heading" : "body";
      const declarations = [
        `  font-family: var(--font-family-${family});`,
        `  font-size: var(--type-${role}-size);`,
        `  line-height: var(--type-${role}-line-height);`,
        ...(headingTypographyRoles.has(role)
          ? [`  letter-spacing: var(--type-${role}-letter-spacing);`]
          : []),
      ];

      return `@utility text-${role} {\n${declarations.join("\n")}\n}`;
    })
    .join("\n\n");
}

/**
 * Generates the static CSS contract consumed by every Dubo application.
 * Values remain owned by design-tokens.ts; this module only serializes them
 * and exposes their semantic typography roles to Tailwind v4.
 */
export function generateDesignSystemThemeCss(): string {
  return [
    "/* Generated from packages/design-system/src/design-tokens.ts. Do not edit. */",
    generateTailwindTheme(),
    generateTypographyUtilities(),
    serializeRule(":root", generateLightModeVars()),
    serializeRule("html.dark", generateDarkModeVars()),
    "",
  ].join("\n\n");
}
