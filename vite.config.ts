import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/VOTRE_NOM_DE_REPO/" : "/",
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"],
    include: ['recharts'],
  },
  plugins: [
    react(),
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
        warn(warning);
      },
    },
    commonjsOptions: {
      include: [/recharts/, /node_modules/],
      transformMixedEsModules: true,
    },
  },
  // Force recharts to be treated as external in SSR or use CJS version
  ssr: {
    noExternal: ['recharts'],
  },
});
