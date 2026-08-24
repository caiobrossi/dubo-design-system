import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { generateDesignSystemThemeCss } from "../dist/theme-css.js";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = resolve(packageRoot, "dist/styles/theme.css");

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, generateDesignSystemThemeCss(), "utf8");

process.stdout.write(`Generated ${outputPath}\n`);
