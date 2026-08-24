import tailwindcss from "@tailwindcss/postcss";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = resolve(packageRoot, "dist/styles/figma-make.css");
const [themeCss, badgeCss] = await Promise.all([
  readFile(resolve(packageRoot, "dist/styles/theme.css"), "utf8"),
  readFile(resolve(packageRoot, "dist/styles/badge-info3-tokens.css"), "utf8"),
]);

const input = [
  '@import "tailwindcss" source(none);',
  '@source "./src";',
  themeCss,
  badgeCss,
].join("\n\n");

const result = await postcss([tailwindcss()]).process(input, {
  from: resolve(packageRoot, "figma-make.css"),
  to: outputPath,
});

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, result.css, "utf8");

for (const required of [".inline-flex", ".text-body-md", ":root", "html.dark"]) {
  if (!result.css.includes(required)) {
    throw new Error(`Generated Figma Make CSS is missing ${required}`);
  }
}

process.stdout.write(`Generated ${outputPath} (${Buffer.byteLength(result.css)} bytes)\n`);
