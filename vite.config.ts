import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import glsl from 'vite-plugin-glsl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // React Compiler — auto-memoizes components; valuable under the heavy R3F
    // render workload. Runs via Rolldown's Babel hook (Vite 8).
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    glsl(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})