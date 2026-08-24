import createMDX from "@next/mdx";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  experimental: {
    externalDir: true,
  },
  turbopack: {
    root: path.resolve(__dirname, "../.."),
  },
};

export default withMDX(nextConfig);
