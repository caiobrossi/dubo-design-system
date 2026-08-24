import { readFileSync, readdirSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { cn } from "./lib/utils";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const themeImport = '@import "dubo-design-system/styles/theme.css";';
const consumerStylesheets = ["apps/dubo-design-system/src/app/globals.css"];
const executableRoots = [
  "apps/dubo-design-system/src",
  "packages/design-system/src",
];
const sourceExtensions = new Set([".css", ".js", ".jsx", ".mdx", ".ts", ".tsx"]);
const legacyTypographyClass = new RegExp(
  String.raw`\b(?:text-(?:caption|body-(?:small|medium|large|sm-strong|md-strong)(?:-\/-bold)?|heading-(?:sm|md|lg)|label(?!-)|label-(?:sm|md|small|medium)|monospace-body)|font-(?:caption|body-(?:small|medium|large)(?:-\/-bold)?|heading-[1-4]|label(?!-)|label-(?:small|medium)|monospace(?:-body)?|dubo-sans))\b`
);
const legacyTypographyVariable = new RegExp(
  String.raw`--type-(?:caption|body-(?:sm|md)-strong|label-(?:sm|md)|heading-(?:sm|md|lg))-`
);
const nonCanonicalFontSizeClass = new RegExp(
  String.raw`\btext-(?:xs|sm|base|lg|xl|[2-9]xl)\b|\btext-\[(?:\d|clamp\(|length:|var\(--type-)`
);
const typographyLineHeightOverride = new RegExp(
  String.raw`(?:\[[^\]\s]+\]:)?leading-(?:\[[^\]]+\]|[A-Za-z0-9.-]+)|\[line-height:[^\]]+\]`
);
const conflictingTypographyFamily = new RegExp(
  String.raw`(?:font-(?:app|body|sans)[^"\n]*(?:text-hero|text-heading-[1-4])|(?:text-hero|text-heading-[1-4])[^"\n]*font-(?:app|body|sans)|font-(?:display|heading)[^"\n]*text-body-(?:sm|md|lg)|text-body-(?:sm|md|lg)[^"\n]*font-(?:display|heading))`
);
const untypedArbitraryTextVariable = /\btext-\[var\(--/;
const tableHeaderTag = /<th\b[\s\S]*?>/g;

function collectSourceFiles(relativeDirectory: string): string[] {
  const absoluteDirectory = resolve(repoRoot, relativeDirectory);

  return readdirSync(absoluteDirectory, { withFileTypes: true }).flatMap((entry) => {
    const relativePath = `${relativeDirectory}/${entry.name}`;
    if (entry.isDirectory()) return collectSourceFiles(relativePath);
    if (!sourceExtensions.has(extname(entry.name))) return [];
    if (entry.name === "theme-contract.test.ts") return [];
    return [relativePath];
  });
}

describe("design system theme contract", () => {
  it("is imported exactly once by every web consumer", () => {
    for (const stylesheet of consumerStylesheets) {
      const css = readFileSync(resolve(repoRoot, stylesheet), "utf8");
      expect(css.split(themeImport)).toHaveLength(2);
    }
  });

  it("does not reintroduce the ignored JavaScript preset", () => {
    const packageJson = readFileSync(
      resolve(repoRoot, "packages/design-system/package.json"),
      "utf8"
    );

    expect(packageJson).not.toContain("tailwind-theme");
  });

  it("keeps legacy typography classes out of executable sources", () => {
    const offenders = executableRoots
      .flatMap(collectSourceFiles)
      .filter((file) => legacyTypographyClass.test(readFileSync(resolve(repoRoot, file), "utf8")));

    expect(offenders).toEqual([]);
  });

  it("keeps removed compound typography variables out of executable sources", () => {
    const offenders = executableRoots
      .flatMap(collectSourceFiles)
      .filter((file) =>
        legacyTypographyVariable.test(readFileSync(resolve(repoRoot, file), "utf8"))
      );

    expect(offenders).toEqual([]);
  });

  it("keeps font sizes on the official semantic scale", () => {
    const offenders = executableRoots
      .flatMap(collectSourceFiles)
      .filter((file) =>
        nonCanonicalFontSizeClass.test(readFileSync(resolve(repoRoot, file), "utf8"))
      );

    expect(offenders).toEqual([]);
  });

  it("keeps every text line height inside the official typography utilities", () => {
    const offenders = executableRoots
      .flatMap(collectSourceFiles)
      .filter((file) =>
        typographyLineHeightOverride.test(readFileSync(resolve(repoRoot, file), "utf8"))
      );

    expect(offenders).toEqual([]);
  });

  it("does not override the font family owned by a semantic typography role", () => {
    const offenders = executableRoots
      .flatMap(collectSourceFiles)
      .filter((file) =>
        conflictingTypographyFamily.test(readFileSync(resolve(repoRoot, file), "utf8"))
      );

    expect(offenders).toEqual([]);
  });

  it("types arbitrary text colors so class merging preserves typography roles", () => {
    const offenders = executableRoots
      .flatMap(collectSourceFiles)
      .filter((file) =>
        untypedArbitraryTextVariable.test(readFileSync(resolve(repoRoot, file), "utf8"))
      );

    expect(offenders).toEqual([]);
  });

  it("teaches the shared class merger about the official typography roles", () => {
    expect(cn("text-body-md", "text-[color:var(--color-text-primary)]")).toBe(
      "text-body-md text-[color:var(--color-text-primary)]"
    );
    expect(cn("text-body-md", "text-heading-2")).toBe("text-heading-2");
  });

  it("keeps every web consumer on the shared class merger", () => {
    const designSystemMerger = readFileSync(
      resolve(repoRoot, "apps/dubo-design-system/src/lib/utils.ts"),
      "utf8"
    );

    expect(designSystemMerger).toContain(
      'export { cn } from "dubo-design-system/lib/utils"'
    );
    expect(designSystemMerger).not.toContain('from "tailwind-merge"');
  });

  it("keeps table headers on body medium at weight 400", () => {
    const offenders = executableRoots.flatMap(collectSourceFiles).flatMap((file) => {
      const source = readFileSync(resolve(repoRoot, file), "utf8");

      return Array.from(source.matchAll(tableHeaderTag))
        .filter(([tag]) => !tag.includes("text-body-md") || !tag.includes("font-normal"))
        .map((match) => `${file}:${source.slice(0, match.index).split("\n").length}`);
    });

    expect(offenders).toEqual([]);
  });

  it("keeps shared labels on body medium at weight 400", () => {
    const label = readFileSync(
      resolve(repoRoot, "packages/design-system/src/components/ui/label.tsx"),
      "utf8"
    );
    const fieldStyles = readFileSync(
      resolve(repoRoot, "packages/design-system/src/components/ui/field-styles.ts"),
      "utf8"
    );

    expect(label).toContain('"text-body-md"');
    expect(label).toContain('"[font-weight:var(--font-weight-400)]"');
    expect(fieldStyles).toContain('export const floatingLabelCompactClass = [\n  "text-body-md"');
    expect(fieldStyles).toContain("export const floatingLabelIdleClass = fieldLabelClass");
    expect(fieldStyles).toContain(
      'export const fieldBodyLgClass = ["text-body-lg", "[font-weight:var(--font-weight-400)]"]'
    );
    expect(fieldStyles).toContain(
      'export const fieldBodyMdClass = ["text-body-md", "[font-weight:var(--font-weight-400)]"]'
    );
    expect(fieldStyles).toContain('"peer-focus:text-body-md"');
    expect(fieldStyles).toContain('"peer-[:not(:placeholder-shown)]:text-body-md"');
    expect(fieldStyles).not.toContain("leading-none");
  });

  it("defines Next font variables on the root element", () => {
    for (const layout of ["apps/dubo-design-system/src/app/layout.tsx"]) {
      const source = readFileSync(resolve(repoRoot, layout), "utf8");
      const htmlTag = source.match(/<html\b[\s\S]*?>/)?.[0] ?? "";

      expect(htmlTag).toContain("openSans.variable");
      expect(htmlTag).toContain("poppins.variable");
    }
  });
});
