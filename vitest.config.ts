import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const designSystemSource = fileURLToPath(
  new URL("./packages/design-system/src", import.meta.url)
);

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^dubo-design-system\/(.*)$/,
        replacement: `${designSystemSource}/$1`,
      },
      {
        find: /^@dubo-design\/(.*)$/,
        replacement: `${designSystemSource}/$1`,
      },
    ],
  },
});
