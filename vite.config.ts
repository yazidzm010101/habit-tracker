import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/habit-tracker",
  plugins: [
    react(),
    VitePWA({
      base: "/habit-tracker",
      registerType: "autoUpdate",
      devOptions: {
        enabled: true
      },
      manifest: {
        name: "Habit Tracker",
        icons: [
          {
            src: "/habit-tracker/habit-tracker.svg",
            sizes: "48x48 72x72 96x96 128x128 256x256 512x512",
            type: "image/svg+xml",
            purpose: "any",
          },
        ],
      },
    }),
  ],
});
