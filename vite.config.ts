import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite' // <--- Add this
import tailwindcss from '@tailwindcss/vite'



// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tanstackRouter(),
  tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Add a temporary base for GitHub Pages, we'll refine this later
  // Replace 'YOUR_REPO_NAME' with the actual name of your GitHub repository
  base: '/polish/',
})
