import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const distRoot = resolve(packageRoot, "dist");
const staticSpecifierPattern = /(\b(?:from|export\s+\*\s+from)\s+["'])(\.\.?\/[^"']+)(["'])/g;
const dynamicSpecifierPattern = /(\bimport\(\s*["'])(\.\.?\/[^"']+)(["']\s*\))/g;

function withJavaScriptExtension(specifier) {
  return extname(specifier) ? specifier : `${specifier}.js`;
}

async function collectJavaScriptFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const entryPath = join(directory, entry.name);
      return entry.isDirectory()
        ? collectJavaScriptFiles(entryPath)
        : entry.isFile() && entry.name.endsWith(".js")
          ? [entryPath]
          : [];
    })
  );

  return nested.flat();
}

const files = await collectJavaScriptFiles(distRoot);
let rewritten = 0;

for (const file of files) {
  const source = await readFile(file, "utf8");
  const output = source
    .replace(staticSpecifierPattern, (_, prefix, specifier, suffix) => {
      const nextSpecifier = withJavaScriptExtension(specifier);
      if (nextSpecifier !== specifier) rewritten += 1;
      return `${prefix}${nextSpecifier}${suffix}`;
    })
    .replace(dynamicSpecifierPattern, (_, prefix, specifier, suffix) => {
      const nextSpecifier = withJavaScriptExtension(specifier);
      if (nextSpecifier !== specifier) rewritten += 1;
      return `${prefix}${nextSpecifier}${suffix}`;
    });

  if (output !== source) await writeFile(file, output, "utf8");
}

process.stdout.write(
  `Rewrote ${rewritten} ESM specifiers across ${files.length} files in ${relative(packageRoot, distRoot)}\n`
);
