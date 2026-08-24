import tailwindcss from "@tailwindcss/postcss";
import { resolve } from "node:path";
import postcss from "postcss";
import { describe, expect, it } from "vitest";

import { generateDesignSystemThemeCss } from "./theme-css";

describe("generateDesignSystemThemeCss", () => {
  it("serializes the canonical light and dark token values", () => {
    const css = generateDesignSystemThemeCss();

    expect(css).toContain("--type-hero-size: 2rem;");
    expect(css).toContain("--type-body-sm-size: 0.75rem;");
    expect(css).toContain("--font-weight-300: 300;");
    expect(css).toContain("html.dark {");
    expect(css).toContain("--color-bg-page: oklch(0.240 0.003 256);");
  });

  it("makes every semantic typography role available to Tailwind v4", async () => {
    const theme = generateDesignSystemThemeCss();
    const input = [
      '@import "tailwindcss" source(none);',
      '@source inline("text-hero text-heading-1 text-heading-2 text-heading-3 text-heading-4 text-body-lg text-body-md text-body-sm font-light font-normal font-medium font-semibold font-dubo-heading font-dubo-body font-dubo-mono");',
      theme,
    ].join("\n");

    const result = await postcss([tailwindcss()]).process(input, {
      from: resolve(process.cwd(), "theme-css-test.css"),
    });

    expect(result.css).toContain(".text-body-sm");
    expect(result.css).toContain("font-family: var(--font-family-body)");
    expect(result.css).toContain("font-size: var(--type-body-sm-size)");
    expect(result.css).toContain("var(--type-body-sm-line-height)");
    expect(result.css).toContain(".text-heading-1");
    expect(result.css).toContain(".text-heading-2");
    expect(result.css).toContain("font-family: var(--font-family-heading)");
    expect(result.css).toContain("var(--type-heading-2-letter-spacing)");
    expect(result.css).not.toContain("--text-body-sm--font-weight");
    expect(result.css).toContain(".font-dubo-body");
    expect(result.css).toContain(".font-dubo-heading");
    expect(result.css).toContain(".font-dubo-mono");
  });
});
