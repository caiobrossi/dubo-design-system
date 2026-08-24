import type { StorybookConfig } from "@storybook/react-vite";
import { resolve } from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = resolve(__dirname, "..");
const designSystemSrcRoot = resolve(projectRoot, "../../packages/design-system/src");

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@chromatic-com/storybook"
  ],
  framework: "@storybook/react-vite",
  async viteFinal(config) {
    config.resolve = config.resolve || {};
    const existingAliases = Array.isArray(config.resolve.alias)
      ? config.resolve.alias
      : Object.entries(config.resolve.alias || {}).map(([find, replacement]) => ({
          find,
          replacement,
        }));
    config.resolve.alias = [
      { find: "@", replacement: resolve(projectRoot, "src") },
      {
        find: "@dubo/design-system/foundations",
        replacement: resolve(designSystemSrcRoot, "foundations.ts"),
      },
      { find: /^@dubo-design\/(.*)$/, replacement: `${designSystemSrcRoot}/$1` },
      ...existingAliases,
    ];
    config.resolve.dedupe = Array.from(
      new Set([...(config.resolve.dedupe || []), "react", "react-dom"])
    );
    config.server = config.server || {};
    config.server.fs = config.server.fs || {};
    config.server.fs.allow = Array.from(
      new Set([...(config.server.fs.allow || []), projectRoot, resolve(projectRoot, ".."), resolve(projectRoot, "../..")])
    );
    config.plugins = config.plugins || [];
    config.plugins.push(tailwindcss());
    return config;
  },
};

export default config;
