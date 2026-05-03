import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// En `vite dev` usamos `/` para que http://localhost:5173/ funcione.
// En `vite build` mantenemos el subpath de GitHub Pages (renombrá si tu repo tiene otro nombre).
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'serve' ? '/' : '/Dino-Culture-Academy/',
  resolve: {
    alias: {
      // Evita el stub de `ws` que lanza en runtime (pantalla en blanco con Supabase en el bundle).
      ws: path.resolve(__dirname, 'src/shims/ws-browser.ts'),
    },
  },
}))