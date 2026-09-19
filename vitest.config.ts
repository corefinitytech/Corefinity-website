import { defineConfig } from "vitest/config";
import path from "node:path";

/**
 * No React plugin here on purpose. The suite tests logic, not rendered output,
 * and esbuild already handles the TSX transform using the jsx setting from
 * tsconfig. Pulling in @vitejs/plugin-react drags a second major version of
 * Vite into the tree along with a native binding that npm regularly fails to
 * install on Windows.
 */
export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["./src/test/setup.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
