import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const createAlias = (dirName: string) =>
  path.resolve(__dirname, `src/${dirName}`);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
      // fastRefresh: true,
    }),
    tailwindcss(),
    svgr(),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": createAlias(""),
      components: createAlias("components"),
      "~img": createAlias("assets/images"),
      "~fonts": createAlias("assets/fonts"),
      "#types": createAlias("types"),
    },
  },
});
