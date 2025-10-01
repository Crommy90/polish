import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite' // <--- Add this
import tailwindcss from '@tailwindcss/vite'

// Get the base path from environment variables (defaults to '/' for local dev)
const BASE_URL = process.env.VITE_APP_BASE_URL || '/';

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
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
  // Set base to the repository name ONLY if we are building for production
  base: command === 'build' ? BASE_URL : '/',
}
})
