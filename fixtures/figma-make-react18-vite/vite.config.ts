import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    // The smoke intentionally references the entire root namespace so Vite
    // resolves every public component in one bundle.
    chunkSizeWarningLimit: 2000,
    sourcemap: true,
  },
});
