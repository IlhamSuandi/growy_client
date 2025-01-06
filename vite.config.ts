import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"
import pages from "vite-plugin-pages"

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  plugins: [
    react(),
    pages({
      dirs: ["src/pages"],
      extensions: ["tsx", "jsx", "js", "ts"],
    })

  ],
})
