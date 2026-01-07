import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/maplibre-gl-multiple-color-draw-demo/",
  plugins: [react(), tailwindcss()],
})
