import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173,
//     open: true, // automatically open browser
//     host: true, // expose to network
//   },
//   optimizeDeps: {
//     exclude: ['lucide-react'],
//   },
//   build: {
//     sourcemap: true, // helps with debugging
//     outDir: 'dist',
//     minify: 'terser',
//   }
// });