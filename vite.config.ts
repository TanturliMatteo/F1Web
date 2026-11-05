import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // In development there is no Vercel Function: forward /api/f1 straight
      // to Jolpica, translating ?path=/2026/results&limit=100 into
      // /ergast/f1/2026/results?limit=100 (same contract as api/f1.ts)
      "/api/f1": {
        target: "https://api.jolpi.ca",
        changeOrigin: true,
        rewrite: (url) => {
          const { searchParams } = new URL(url, "http://localhost");
          const resource = searchParams.get("path") ?? "";
          searchParams.delete("path");
          const query = searchParams.toString();
          // Trailing slash: without it Jolpica answers with a redirect, which
          // the proxy would hand to the browser instead of following
          return `/ergast/f1${resource}/${query ? `?${query}` : ""}`;
        },
      },
    },
  },
});
