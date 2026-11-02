import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [vue()],
  base: "./",
  resolve: { preserveSymlinks: true },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        magaze: fileURLToPath(new URL("./magaze.html", import.meta.url)),
        restoran: fileURLToPath(new URL("./restoran/index.html", import.meta.url)),
        smestaj: fileURLToPath(new URL("./smestaj/index.html", import.meta.url)),
        proslave: fileURLToPath(new URL("./proslave/index.html", import.meta.url)),
        kontakt: fileURLToPath(new URL("./kontakt/index.html", import.meta.url)),
      },
    },
  },
});
