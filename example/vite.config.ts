import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import HotFile from 'vite-plugin-hot-file'
import svgr from 'vite-plugin-svgr'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    HotFile(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    })
  ]
})
