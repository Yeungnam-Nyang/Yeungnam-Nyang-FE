import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: import.meta.VITE_PUBLIC_URL || "/",
  plugins: [react()],
  define: {
    global: "window", // global 변수를 window로 설정
  },
  resolve: {
    alias: {
      "react-router-dom": "react-router-dom",
    },
  },
  optimizeDeps: {
    include: ["react-router-dom"],
  },
});
