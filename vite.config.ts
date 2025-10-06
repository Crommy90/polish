import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite'; // <--- Add this
import react from '@vitejs/plugin-react';
import path from "path";
import { defineConfig } from 'vite';



// https://vite.dev/config/
export default defineConfig(() => {
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
  base: '/polish/',
}
})
