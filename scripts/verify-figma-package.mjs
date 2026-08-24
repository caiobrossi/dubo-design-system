import { cp, mkdir, mkdtemp, open, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawn } from "node:child_process";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const packageRoot = resolve(repoRoot, "packages/design-system");
const fixtureRoot = resolve(repoRoot, "fixtures/figma-make-react18-vite");
const tempRoot = await mkdtemp(join(tmpdir(), "dubo-figma-make-"));
const packDirectory = resolve(tempRoot, "pack");
const consumerDirectory = resolve(tempRoot, "consumer");

async function run(command, args, options = {}) {
  const childEnvironment = { ...process.env, CI: "1", ...options.env };
  for (const key of Object.keys(childEnvironment)) {
    const normalized = key.toLowerCase();
    if (
      normalized.includes("npm_globalconfig") ||
      normalized.includes("verify_deps_before_run") ||
      normalized.includes("jsr_registry")
    ) {
      delete childEnvironment[key];
    }
  }

  await new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(command, args, {
      cwd: options.cwd ?? repoRoot,
      env: childEnvironment,
      stdio: options.stdio ?? "inherit",
    });

    child.once("error", rejectPromise);
    child.once("exit", (code, signal) => {
      if (code === 0) return resolvePromise();
      rejectPromise(
        new Error(`${command} ${args.join(" ")} failed with ${signal ?? `exit ${code}`}`)
      );
    });
  });
}

try {
  await mkdir(packDirectory, { recursive: true });
  await run("npm", ["pack", "--pack-destination", packDirectory], { cwd: packageRoot });

  const packedFiles = (await readdir(packDirectory)).filter((file) => file.endsWith(".tgz"));
  if (packedFiles.length !== 1) {
    throw new Error(`Expected one npm tarball, found ${packedFiles.length}`);
  }

  const tarballPath = resolve(packDirectory, packedFiles[0]);
  const listingPath = resolve(tempRoot, "tarball-contents.txt");
  const listingHandle = await open(listingPath, "w");
  await run("tar", ["-tzf", tarballPath], {
    stdio: ["ignore", listingHandle.fd, "inherit"],
  });
  await listingHandle.close();
  const listing = await readFile(listingPath, "utf8");

  for (const required of [
    "package/dist/index.js",
    "package/dist/index.d.ts",
    "package/dist/styles/figma-make.css",
    "package/figma-make/guidelines/Guidelines.md",
  ]) {
    if (!listing.includes(required)) throw new Error(`Tarball is missing ${required}`);
  }

  for (const forbidden of ["/src/", ".test.js", ".env", "node_modules/"]) {
    if (listing.includes(forbidden)) throw new Error(`Tarball contains forbidden path: ${forbidden}`);
  }

  await cp(fixtureRoot, consumerDirectory, { recursive: true });
  const consumerManifestPath = resolve(consumerDirectory, "package.json");
  const consumerManifest = JSON.parse(await readFile(consumerManifestPath, "utf8"));
  consumerManifest.dependencies["dubo-design-system"] = `file:${tarballPath}`;
  await writeFile(consumerManifestPath, `${JSON.stringify(consumerManifest, null, 2)}\n`, "utf8");

  await run("npm", ["install", "--no-audit", "--no-fund"], { cwd: consumerDirectory });

  const installedRoot = resolve(consumerDirectory, "node_modules/dubo-design-system");
  const installedManifest = JSON.parse(
    await readFile(resolve(installedRoot, "package.json"), "utf8")
  );
  if (!installedManifest.peerDependencies.react.includes("18.2.0")) {
    throw new Error("Published peer dependency does not include React 18.2");
  }

  const uiDirectory = resolve(installedRoot, "dist/components/ui");
  const modules = (await readdir(uiDirectory)).filter(
    (file) => file.endsWith(".js") && !file.includes(".test.")
  );
  for (const moduleFile of modules) {
    await import(pathToFileURL(resolve(uiDirectory, moduleFile)).href);
  }

  const rootExports = await import(pathToFileURL(resolve(installedRoot, "dist/index.js")).href);
  for (const requiredExport of ["Button", "Card", "DuboProvider", "Input", "primitives"]) {
    if (!(requiredExport in rootExports)) {
      throw new Error(`Root API is missing ${requiredExport}`);
    }
  }

  const css = await readFile(resolve(installedRoot, "dist/styles/figma-make.css"), "utf8");
  for (const selector of [".inline-flex", ".text-body-md", ":root", "html.dark"]) {
    if (!css.includes(selector)) throw new Error(`Figma stylesheet is missing ${selector}`);
  }

  await run("npm", ["run", "build"], { cwd: consumerDirectory });

  process.stdout.write(
    [
      "Figma Make package verification passed",
      `- package: ${basename(tarballPath)}`,
      `- React: ${consumerManifest.dependencies.react}`,
      `- Vite: ${consumerManifest.devDependencies.vite}`,
      `- UI entrypoints imported: ${modules.length}`,
      `- root exports: ${Object.keys(rootExports).length}`,
      `- precompiled CSS: ${Buffer.byteLength(css)} bytes`,
    ].join("\n") + "\n"
  );
} finally {
  await rm(tempRoot, { recursive: true, force: true });
}
