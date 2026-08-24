import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const uiDir = path.join(root, "src/components/ui");
const storiesDir = path.join(root, "src/stories");
const pagesDir = path.join(root, "src/app/components");
const docsFile = path.join(root, "../../packages/design-system/src/component-token-docs.ts");

const ignoredUi = new Set(["field-styles", "drag-and-drop-cards", "metrics-bar"]);
const ignoredPageDirs = new Set(["_missing-component-demos"]);

const docsText = fs.readFileSync(docsFile, "utf8");
const docKeys = [...docsText.matchAll(/^\s*(?:"([a-z0-9-]+)"|([a-z][a-z0-9-]*)):\s*\{/gm)]
  .map((match) => match[1] || match[2])
  .sort();

const uiNames = fs
  .readdirSync(uiDir)
  .filter((file) => file.endsWith(".tsx"))
  .map((file) => file.replace(/\.tsx$/, ""))
  .filter((name) => !ignoredUi.has(name))
  .sort();

const storyNames = fs
  .readdirSync(storiesDir)
  .filter((file) => file.endsWith(".stories.tsx"))
  .map((file) => file.replace(/\.stories\.tsx$/, ""))
  .map((name) =>
    name
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .toLowerCase()
      .replace("text-area", "textarea")
      .replace("input-o-t-p", "input-otp")
  )
  .sort();

const pageNames = fs
  .readdirSync(pagesDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)
  .filter((name) => !name.startsWith("_") && !ignoredPageDirs.has(name))
  .sort();

const missingDocs = uiNames.filter((name) => !docKeys.includes(name));
const missingStories = uiNames.filter((name) => !storyNames.includes(name));
const missingPages = uiNames.filter((name) => !pageNames.includes(name));
const extraDocs = docKeys.filter((name) => !uiNames.includes(name));

const targets = [
  path.join(root, "src/components"),
  path.join(root, "src/stories"),
  path.join(root, "src/content/foundations"),
  path.join(root, "src/app/globals.css"),
];

const bannedPatterns = [
  { label: "rgb(", regex: /\brgb\(/ },
  { label: "rgba(", regex: /\brgba\(/ },
  { label: "hex field", regex: /\bhex\b/ },
  { label: "--label-color", regex: /--label-color/ },
  { label: "--description-color", regex: /--description-color/ },
  { label: "--alert-*", regex: /--alert-/ },
  { label: "--tab-*", regex: /--tab-/ },
  { label: "--nav-*", regex: /--nav-/ },
  { label: "--btn-px-*", regex: /--btn-px-/ },
  { label: "--input-bg", regex: /--input-bg/ },
  { label: "--input-border", regex: /--input-border/ },
  { label: "input-padding-x", regex: /input-padding-x/ },
  { label: "select-padding-x", regex: /select-padding-x/ },
  { label: "--label-font-size", regex: /--label-font-size/ },
  { label: "--label-font-weight", regex: /--label-font-weight/ },
  { label: "--label-line-height", regex: /--label-line-height/ },
  { label: "--description-font-size", regex: /--description-font-size/ },
  { label: "--description-font-weight", regex: /--description-font-weight/ },
  { label: "--description-line-height", regex: /--description-line-height/ },
  { label: "--label-required-color", regex: /--label-required-color/ },
  { label: "--label-optional-color", regex: /--label-optional-color/ },
  { label: "--label-info-color", regex: /--label-info-color/ },
  { label: "--label-info-hover-color", regex: /--label-info-hover-color/ },
];

const allowedHashPattern = /\B#\d+\b/;
const fileExtensions = new Set([".ts", ".tsx", ".css", ".mdx"]);

function walk(entryPath, files = []) {
  const stat = fs.statSync(entryPath);
  if (stat.isDirectory()) {
    for (const child of fs.readdirSync(entryPath)) {
      walk(path.join(entryPath, child), files);
    }
    return files;
  }

  if (fileExtensions.has(path.extname(entryPath))) {
    files.push(entryPath);
  }

  return files;
}

const violations = [];

for (const target of targets) {
  const files = fs.existsSync(target) ? walk(target) : [];
  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");

    for (const banned of bannedPatterns) {
      if (banned.regex.test(content)) {
        violations.push(`${path.relative(root, file)} contains banned pattern: ${banned.label}`);
      }
    }

    for (const match of content.matchAll(/#[0-9A-Fa-f]{3,8}\b/g)) {
      if (!allowedHashPattern.test(match[0])) {
        violations.push(
          `${path.relative(root, file)} contains banned hex-like color/reference: ${match[0]}`
        );
      }
    }
  }
}

if (missingDocs.length || missingStories.length || missingPages.length || extraDocs.length) {
  console.error("Coverage drift detected:");
  if (missingDocs.length) console.error("Missing docs:", missingDocs.join(", "));
  if (missingStories.length) console.error("Missing stories:", missingStories.join(", "));
  if (missingPages.length) console.error("Missing pages:", missingPages.join(", "));
  if (extraDocs.length) console.error("Extra docs:", extraDocs.join(", "));
  process.exit(1);
}

if (violations.length) {
  console.error("Design system integrity violations:");
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log(
  `Design system integrity OK: ${uiNames.length} UI components aligned with docs, stories, pages, and token guardrails.`
);
