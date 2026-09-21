import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";

/**
 * `BASE_PATH` lets the same build target GitHub Pages (served from
 * /atc-website/) and, later, a custom domain at the root. CI sets it; local
 * dev falls back to "/".
 */
const base = process.env.BASE_PATH ?? "/";

/**
 * Browser support is declared once, in .browserslistrc, and Lightning CSS
 * reads it to decide what to prefix and what to lower. So `mask`,
 * `backdrop-filter` and `color-mix` all get the right fallbacks without
 * anyone hand-maintaining a prefix list.
 */
const targets = browserslistToTargets(browserslist());

export default defineConfig({
  base,
  plugins: [react()],
  css: {
    transformer: "lightningcss",
    lightningcss: { targets },
  },
  build: {
    outDir: "dist",
    assetsInlineLimit: 2048,
    cssMinify: "lightningcss",
    rollupOptions: {
      output: {
        // Keep React in its own long-lived chunk so content edits don't
        // invalidate the framework bundle for returning visitors.
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
});
