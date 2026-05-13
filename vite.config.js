import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // Pre-bundle heavy dependencies for faster cold starts
  optimizeDeps: {
    include: [
      '@react-three/fiber',
      '@react-three/drei',
      '@react-three/postprocessing',
      'postprocessing',
      'three',
      'framer-motion',
    ],
  },
})