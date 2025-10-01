import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite' // <--- Add this


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tanstackRouter()
  ],
  // Add a temporary base for GitHub Pages, we'll refine this later
  // Replace 'YOUR_REPO_NAME' with the actual name of your GitHub repository
  // base: '/polish/',
})
